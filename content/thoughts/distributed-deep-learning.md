---
title: Distributed Deep Learning
date: 2026-07-13
tags:
- deep-learning
- machine-learning
- distributed-systems
- gpu
---

Problem: How to train the model when you have multiple GPUs? Running the backpropagation on single GPU is straightforward, but obviously cannot be used to train GPT-class models. Scaling vertically is limited and cannot surpass the physical constraints of fitting chips, memory, and cooling under one card.

The solution is to deploy parallelism to train models on different GPUs, and shard something (either data, or model params or experts inside the model) to scale horizontally.

> [!Prerequisites]
> - [Collective Communication](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=a0:_parallel_programming_crash_course)

# Off-the-shelf Calculations

Taking example from [Llama3.1-8B](https://huggingface.co/meta-llama/Meta-Llama-3.1-8B/blob/main/config.json) with following dimensions:

- `hidden_size` = 4096
- `num_attn_heads` = 32
- `attn_dim` = 4096 // 32 = 128

With input shape `[B,L,4096]`, we perform following operations:
- $W_{K},W_{Q},W_{V}$ projection with linear weights of size `[4096, 3*4096]` applied to input to get the final projection as `[B,L,3*4096]`
- Partition into Q,K,V matrices as `3*[B,L,4096]`
- Partition each matrix into independent attention heads with dimensions  `[B,L,(32*128)] -> [B*32,L,128]`
- Compute Attention probs = $\text{softmax}\left( \frac{Q\cdot K^{\top}}{\sqrt{ d_{k} }} \right)$ with dimensions `[B*32,L,128] x [B*32, 128, L] -> [B*32, L, L]`
- Compute full dot-product attention, $\text{softmax}\left( \frac{Q\cdot K^{\top}}{\sqrt{ d_{k} }} \right)V$ with dimensions `[B*32,L,L] x [B*32, L, 128] -> [B*32, L, 128]`
- Reshape into output `[B*32,L,128] -> [B,L,4096]`

Total memory required for attention, assume `B=1` and BF16 (2 byte) weights, let's vary L:
- Inputs: `L * 4096`
- Projection matrices: `3 * 4096 * 4096`
- Projection outputs: `3 * 32 * L * 128`
- Attention output: `32 * L * 128`
- Total: for L = 10, Size = 0.104GB, for L = 1M, size ~41GB.

# Data Parallelism

Basic Idea:
- Idea is to divide the data in 1 epoch into `N` chunks (equal to the amount of training devices).
- Run forward and backward pass for each device separately.
- Communicate the gradients to other devices.
- Average the gradients, and update the parameters.

For example: If for one device, an epoch has size `M`, and we have `N` GPUs, then we can take a batch of size `M*N` and distribute the workload among the `N` GPUs, each training the same model on different chunk.

Now, the training dynamics can be designed differently depending when to communicate the gradients. We already know that the model trained using Mini-Batch Gradient descent is not mathematically equivalent to the model trained using gradient descent calculated for single data item.

- Visualizing the full spectrum, our goal is to minimize the gap between communication and compute cost. Communicating the gradients after each forward pass makes the communication cost the main bottleneck while waiting for the whole (or multiple) batch(s) to complete results in a model that's further away from the desired one.
- We can move towards even finer axis on the communication, where gradients are shared after each step. We obviously encounter the same under/over utilization of the compute vs communication bandwidth.
- What are the strategies?
	- Our two hyperparameters are size of the batch and frequency of communication.
	- Factors:
		- Size of the model (size of the gradients)
		- Number of training devices (GPUs)
		- Communication bandwidth
		- Size of the training batch.
	- **Bucketing gradients**: One strategy is to *bucket* the gradients for each data item as per the neural network architecture. As optimizer goes through the backward pass, subsets of the model's gradients are shared as per the sequence in the architecture.
	- **Parameter Averaging**: Instead of averaging the gradients, parameters of the model are shared and averaged. But this doesn't work because average of local minima of parameters is not guaranteed to be a local minima.
	- > [!todo] Add some diagrams.
- Glossary used in DDP:
	- **Node**: A node is a group of GPUs. A cluster is organized as group of multiple nodes.
	- **Master Node**: Node that is tasked with auxiliary items during synchronization like initiating model copies, overseeing communication and training failures, managing log entries.
	- **Local Rank**: *Rank* is the ID of each GPU within its node.
	- **Global Rank**: Unique ID of a GPU across all available nodes.
	- **World Size**: Global count of all available GPUs across all nodes.
- Limitation
	- Memory: Each machine loads the entire replica of the model into its memory. A typical LLM like GPT-3 has around 350GB of parameter weights, and H100 has around 80GB of HBM2 memory.
	- Batch size: Even if the model can be loaded into memory, gradient size over the entire batch can make communication the real bottleneck. Empirical observations are therefore, needed to find the sweet spot between different training dynamic parameters.

# Tensor Parallelism

Original proposed in @shoeybi2019megatron, Another way of sharding the data across multiple machines is to consider the computation and parallelize the underlying operations itself. For example: addition performed on two large matrices can be divided row and column wise on separate machines, and combined together afterwards.

Similarly, Neural networks especially attention-based architecture is full of large matrix multiplications, and matrix multiplications can be done independently using block multiplications.

## Block Matrix Multiplication

Suppose, we want to compute $Y=XA$, where $X\in \mathbb{R}^{n\times d},A\in \mathbb{R}^{d\times l}$, thus $Y\in \mathbb{R}^{n\times l}$ which is a common linear operation performed in feed-forward layers inside neural networks.

![[thoughts/images/tensor-parallelism-column-linear.png]]
*<center>Column Linear Block Matrix Multiplication. [Source](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=tensor_parallelism_in_a_transformer_block)</center>*

We can divide A by column $A=[A_{1}\ |\ A_{2}]$, perform matrix multiplication on two devices to get $XA_{1}\ |\ XA_{2}$ and perform an all-reduce operation to get $XA=[XA_{1}+XA_{2}]$. This is generally called as *Column Linear* operation.

![[thoughts/images/tensor-parallelism-row-linear.png]]
*<center>Row Linear Block Matrix Multiplication. [Source](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=tensor_parallelism_in_a_transformer_block)</center>*

Another way of doing the same operation is using *Row Linear* sharding. By dividing input by column $X=[X_{1}\ |\ X_{2}]$, first matrix by rows, and perform matrix multiplication on separate devices, combining the results using all-gather operation.

$$
\begin{aligned} 
X &= \bigl[X_1\ |\ X_2\bigr] \\
A &= \begin{bmatrix} A_1\\ \hline A_2 \end{bmatrix},\\
X &= \text{all-gather}(\underbrace{ X_1A_{1} }_{ \text{GPU1} },\underbrace{ X_2A_{2} }_{ \text{GPU2} })
\end{aligned} 
$$

> [!todo] add a tensor parallelism picture, maybe from [here](https://medium.com/@rjekstein/model-sharding-part-1-tensor-paralelism-f39b062a2fe6) or [Tensor Parallelism (TP) in Transformers: 5 Minutes to Understand](https://huggingface.co/blog/qgallouedec/tp)

## FFN

![[thoughts/images/tensor-parallelism-ffn.png]]
*<center>TP-FFN with Column + Row Linear. [Source](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=tensor_parallelism_in_a_transformer_block)</center>*

Usually, the operation includes two linear layers (expansion and compression linear operation) along with a non-linear operation like $\text{FFN}(x)=\text{ReLu}(xW_{1}+b_{1})\cdot W_{2}+b_{2}$, where $W_{1}\in \mathbb{R}^{d\times4d},W_{2}\in \mathbb{R}^{4d\times d}$.

We can divide the matrix $A$ and $B$ by columns and row partitions respectively, particularly $A$ can be partitioned across columns as $A=[A_{1}\ |\ A_{2}]$ where $A_{1},A_{2}\in \mathbb{R}^{d\times hd/2}$ and $XA=[XA_{1}\ |\ XA_{2}]$. Similarly, B can be partitioned across rows as $B=[B_{1}\ |\ B_{2}]^{^{\top}}$ and the final multiplication along with all-reduce operation is defined as $[XA_{1}\ |\ XA_{2}]\cdot[B_{1}\ |\ B_{2}]^{\top}=[XA_{1}B_{1}+XA_{2}B_{2}]$.

Practically, we use this method to severely reduce the storage, compute and communication overhead across different GPU machines when performing matrix multiplication in a layer.
- Each GPU receives same inputs.
- Weight matrices are divided as per the cluster topology.
- Produces a partial output ($XA_{1}B_{1}$ or $XA_{2}B_{2}$ in case of 2 GPUs in the above-mentioned example).
- Communicates with other GPUs which perform All-Reduce operation to combine the results.
- To put this into perspective, a single expansion layer that takes input of dimension $8192$, and outputs $1024$ with a 4x hidden layer in between require two matrices of size $A=8192\times32768,\ B=32768\times1024$ requires approximately 1.2GB memory, but due to tensor parallelism, each GPU now only require about 0.3GB of memory while reducing the computation overhead by 4x.

Communication runs on high-speed interconnects like NVLink SXM (900GB/s) or PCIe (600GB/s). Broadcast after the operation requires about 1.2GB bandwidth per GPU.

## Attention

For input $X\in \mathbb{R}^{b\times n\times d}$, where $b$ = batch size, $n$ = sequence length, and $d$ = dimension.

> [!hint] Attention recap
> we want to compute: $Y=\text{Attn}(Q,K,V)X$, where $\text{Attn}(Q,K,V)=\text{softmax}\left( \frac{QK^{\top}}{\sqrt{ d_{k} }} \right)\cdot V$ and, projection matrices $Q,K,V$ have dimensions $K,Q\in \mathbb{R}^{n\times d_{k}},\ V\in R^{n\times d_{v}}$. $d_{k},d_{v}$ are the hidden dimensions for Q,K,V matrices.
>
> With [GQA](https://arxiv.org/abs/2305.13245), multiple attention heads share key and value projections with distinct query heads. This leads to reduced memory requirements due to less parameters being loaded during inference, improved efficiency.

> [!todo] add an image that shows the actual computation across GPUs

To encourage model to learn diverse features, hidden dimension is divided into *`a`* independent attention heads.
- Splitting the projections: Split Q,K,V projection matrices by column and further divide into independent attention heads for each device.
	- For input of size $n\times d$, we split Q,K,V vertically by attention heads as $\left[a\times d\times \frac{d'}{a} \right]$ and distribute among the GPUs.
	- Each GPU computes its local projections $Q_{i},K_{i},V_{i}$ for the respective heads.
	- For example: If we have $N$ GPUs, then each GPU receives input $X$ and all three projection matrices of size $\left[ \frac{a}{N}\times d\times \frac{d'}{a} \right]$. Projection output has dimensions $\left[ \frac{a}{N}\times n\times \frac{d'}{a} \right]$.
- Splitting dot-product attention: Perform softmax and multiplication by V for the local projections.
	- $\text{softmax}\left( \frac{QK^{\top}}{\sqrt{ d' }} \right)$: Local independent heads are computed and the output is of dimensions $\left[ \frac{a}{N}\times n\times n\right]$.
	- Multiplied by V to get the output of size $\left[ \frac{a}{N}\times n\times \frac{d_{v}}{a} \right]$.
- Finally, *all-reduce* operation is performed to broadcast results from other devices and aggregated into the final output.
- Typically, deep learning libraries like PyTorch provides methods for batch matmul operations like [`torch.bmm`](https://docs.pytorch.org/docs/2.13/generated/torch.bmm.html) where first dimension of matmul is broadcasted.

![[thoughts/images/tensor-parallel.png]]*<center>Tensor Parallel. [Source](https://arxiv.org/abs/2205.05198)</center>*

- In forward pass, each Tensor parallel unit perform a **broadcast** when entering the TP stage and an **all-reduce** operation after exiting the TP stage for next operations like LayerNorm or Dropout which require all activations from each GPU.
- During backward pass, we apply a **no-op** operation (because $x=x_{1}+x_{2}\implies \nabla_{x_{1}}x=\nabla x_{1}$) when entering the TP stage and apply an **all-reduce** when exiting the stage.

Combining the activations after each stage partially reduce the memory savings that we gain on reducing model parameters, gradient and optimizer state. So far, we've applied Tensor parallelism to Linear and Attention stages, and note that these stages were naturally partitioned due to the independent nature of the operation underneath (eg. Matrix multiplication).

## Constraints
- Although storage requirements is considerably reduced, attention heads must be a multiple of world size so that each GPU receives equal share of heads.
- FFN hidden dimension must be a multiple of world size to divide parameters equally.
- High Communication cost due to combining the activations for other operations like LayerNorm or Dropout.
## Combining Data and Tensor Parallelism
- Hierarchical: Each Data parallel rank contains individual multiple tensor parallel ranks.
- Non-Hierarchical: Other way is to not define rigid boundaries between DP and TP ranks.

# Sequence Parallelism

If we can somehow parallelize operations like LayerNorm and Dropout, then Tensor + Sequence parallelism combined can be used to shard parameters, gradients, activations completely increasing the capacity to train large models efficiently.

Sequence Parallelism [@korthikanti2023reducing] refers to strategies that potentially address this problem as an extension to Tensor Parallelism. In later steps with *Context Parallelism*, we'll see how to divide the context (sequence/input) itself to multiple accelerators using methods like Ring Attention which can be used standalone without Tensor Parallelism.

$$\text{LayerNorm}(x)=\gamma\cdot\frac{x-\mu}{\sqrt{ \sigma^{2}+\epsilon }} + \beta$$

![[thoughts/images/tensor-sequence-parallelism.png]]
*<center>Tensor + Sequence Parallelism. [Source](https://arxiv.org/abs/2205.05198)</center>*

With sequence parallelism, we divide the input sequence, and apply a sequence of parallel operations at each boundary of SP -> TP and TP -> SP stages. For concreteness, let's take an example of a Linear layer with 2 GPUs and the input dimension `[B,L,H]`.
- SP layer starts with input `[B,L/2,H]` and LayerNorm is performed on the input at respective devices.
- **All-Gather** operation is performed before TP stage because TP requires complete input. Dimension: `[B,L,H]`
- Alternate column linear and row linear operations are performed inside TP stage. Dimension: `[B,L,H]`
- Output of TP stage is combined using reduce (dimension: `[B,L,H]`) and then scattered along sequence dimension for next SP stage `[B,L/2,H]`. We use **Reduce-Scatter** operation for TP -> SP transition.

Backward pass use conjugate operations, i.e.
- Instead of Reduce-Scatter, we use All-Gather since we divided the input into two parts, we'll sum the gradients from both branches.
- And All-Gather -> Reduce-Scatter because the input from both branches is gathered during forward pass, so the gradients from both branches is added and then scattered along the split dimension.

Notice, that activation memory usage **reduces** from $(B\times L\times H)\to\left( \frac{B\times L\times H}{TP} \right)$ because SP layer uses $B\times \frac{L}{TP}\times H$ storage and TP layer uses $B\times L\times \frac{H}{TP}$. Although, communication now **doubles** from 2 All-Reduce operation in a transformer block (1 after attention and 1 after MLP) to 2 All-Gather and 2 Reduce-Scatter operation, but All-Reduce is generally implemented using All-Gather then Reduce-Scatter operation.

In summary, TP shards the computation for attention and feedforward operation by splitting along hidden dimension and SP extends along other operations by splitting across the sequence.

> [!todo] create a table for activation memory savings.

Problems with TP + SP:
- Activation memory for attention probabilities in TP region for self-attention computation is still $L\times L$, which for larger sequence results in massive slowdown for memory and scales communication costs accordingly.
- Communication cost for large models causes massive slowdown due to inter-node connectivity (usually powered by Infiniband). [^1]

TODO
- [\[1910.02054\] ZeRO: Memory Optimizations Toward Training Trillion Parameter Models](https://arxiv.org/abs/1910.02054)
- [\[2205.14135\] FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)
- [\[2307.08691\] FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning](https://arxiv.org/abs/2307.08691)
- [\[2407.08608\] FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision](https://arxiv.org/abs/2407.08608)
- [\[2603.05451\] FlashAttention-4: Algorithm and Kernel Pipelining Co-Design for Asymmetric Hardware Scaling](https://arxiv.org/abs/2603.05451)
- [\[2309.14509\] DeepSpeed Ulysses: System Optimizations for Enabling Training of Extreme Long Sequence Transformer Models](https://arxiv.org/abs/2309.14509)

# Context Parallelism

For larger sequences, weights and gradients don't make up the majority of the storage requirements during token independent operations (FFN, LayerNorm, ReLu). If we follow TP + SP approach from previous section (by dividing the input sequence and weights alternatively between SP and TP stages), then the advantages plateau at certain input sequence length, and activations account for most of the usage. So, a naive strategy is for these layers (barring *"attention"* layer, more on this shortly) to split the sequence and duplicate the linear weights to each device. At the end, an All-Reduce operation is initiated to synchronize the gradients across the CP group.

> [!question] Why can't we do the same for Attention?
> Because Causal Attention requires attention scores to be computed for each token-pair in the sequence. And the particular problem is due to softmax

References
- [\[2105.13120\] Sequence Parallelism: Long Sequence Training from System Perspective](https://arxiv.org/abs/2105.13120): Ring Self-attention
- [\[2310.01889\] Ring Attention with Blockwise Transformers for Near-Infinite Context](https://arxiv.org/abs/2310.01889)
- [\[2310.03294\] DISTFLASHATTN: Distributed Memory-efficient Attention for Long-context LLMs Training](https://arxiv.org/abs/2310.03294)
- [From Online Softmax to FlashAttention](https://courses.cs.washington.edu/courses/cse599m/23sp/notes/flashattn.pdf)

# Pipeline Parallelism

TP split the model horizontally by exploiting the embarrassingly parallel matrix operations in modern neural networks.

Another solution under the category of *Model Parallelism* is **Pipeline Parallelism** that proposes to divide the model vertically, i.e. each machine hold only a subset of the model layers. *For example*, a model with 40 layers can be divided into 4 machines, each with 10 layers. This works because each layer is independent of the previous layer, and require only the inputs to perform the forward and backward passes.

> [!question] Can the model be broken down into unequal parts?

A tempting naive solution is to take 4 machines, divide the model into 4 equal parts, and run the forward and backward pass as usual. First machine takes the mini-batch (used in SGD), perform forward pass through the layers, stores the activations, passes the output to the next machines. Last machine after finishing the forward pass computes the loss for the batch, performs the backward pass, and pass the gradients to the next machine.

One obvious problem with this approach is any machine is idle for almost 75% of the total training time for the batch (assuming forward and backward takes same time on each machine).

Similar to [instruction pipelining](https://en.wikipedia.org/wiki/Instruction_pipelining) in CPUs, GPipe [@huang2019gpipe] proposed to instead split the mini-batch further into micro-batches.

> [!Note] Notation
> - $L$ layer Neural network model
> - $K$ accelerators (GPUs)
> - $N$ mini-batch size
> - $M$ number of micro-batch

## Forward & Backward Pass

Forward pass
- Suppose, mini-batch size is $M=4$, and we split it into $N=4$ micro-batch each of size $M/N=1$.
- Our model consists of $L=8$ layers, and we want to train on  $K=4$ accelerators.
- Micro-batch is passed one by one through each device. First micro-batch gets passed through device 1, performs forward pass and passes the output to next accelerator.
- Second micro-batch is added to the pipeline at device 1 immediately, so that no bandwidth is wasted between subsequent batch processing. Following in this manner, all micro-batches gets added to the pipeline eventually.
- What happens after the first microbatch has been processed by the last accelerator? Since previous device is still performing forward pass on the next micro-batch, the first device computes the loss of the first batch, and doesn't perform the backward pass immediately.
> [!todo] add an image.

Backward pass
- After all the forward passes are concluded, we start the backward passes the same way but starting from the last microbatch.
- Last device calculates the loss for the Batch $N$, performs the backward pass, and sends the gradient outputs to next accelerator which performs the backward pass for its layers. Immediately after sending the batch to next device, it starts the backward pass for batch $N-1$.
- Gradients are accumulated across micro-batches and then, used to run optimizers to update model parameters.

## Bubble
- Due to the pipeline structure, backward pass starts only after all forward passes are complete. This implies that the first datapoint waits a lot of time before the backward pass starts.
- Precisely, for K accelerators, the phases of the pipeline can be divided into:
	- Warmup phase, $\mathcal{O}(K-1)$: All the accelerators gets filled with the micro-batches. Last device sits idle until $K$th stage.
	- Forward pass high utilization, $\mathcal{O}(M-K+1)$: All accelerators are filled and performing forward passes on micro-batches.
	- Forward pass drain, $\mathcal{O}(K-1)$: Accelerators waiting until all forward passes are completed.
	- Backward pass warmup, $\mathcal{O}(K-1)$: First machine waiting for the gradients from previous machine.
	- Backward pass high utilization, $\mathcal{O}(M-K+1)$: All machines performing backward passes.
	- Tear down phase, $\mathcal{O}(K-1)$: First machine completes the last backward pass.
- Total running time: $\mathcal{O}(M+K)$, and low utilization period: $\mathcal{O}(K)$.
- Comparing the total time with the time spent during bubble phase: $\mathcal{O}\left( \frac{K}{M+K} \right)$, so only way to reduce the ratio for a fixed compute is to increase the number of micro-batches M.

## Re-materialization
- Introduced in [@chen2016training], Memory requirement without pipelining require the device to store activations for each layer and for every micro-batch which amounts to $\mathcal{O}(N\cdot L)$ storage.
- Even if naive pipelining is enabled, the device still has to store activations for all the layers across the complete mini-batch, on the order of $\mathcal{O}\left(N\cdot \frac{L}{K} \right)$.
- To cut this down even more, Re-materialization implies that a device only stores the input activation. During backward pass, after receiving the gradient output from the previous stage, the device can recompute the forward pass and generate activations again. This means only storing the input activations for the entire batch, and the recomputing the activations for each layer in the current stage which reduces peak memory usage to $\mathcal{O}\left( N+\frac{L}{K}\cdot \frac{M}{N} \right)$.

## Performance Gains
- Let's focus on a concrete example to look at the space complexity gains.
- We'll take Llama3-8B architecture with
	- Layers: $L=32$
	- Hidden dimension $d=4096$
	- Sequence length $s=4096$
	- Mini-batch size $N=128$ sequences
	- Pipeline stage $K=8$
	- Micro-batches $M=16$
- Thus, each stage has $\frac{L}{K}=4$ layers and micro-batch contains $\frac{N}{M}=8$ sequences.
- Assuming BF16 weights.
- Size of 1 activation layer = $N\times S\times d=128\times4096\times4096=2.1*10^{9}$, in bytes $=2.1*10^{9}*2=4.29GB$
- With no pipelining, across 32 layers = $4.29*32=137GB$
- With pipelining, $4.29*4=17.2GB$
- With pipelining + re-materialization, activation stored $\frac{N}{M}\times S\times D=8\times4096\times4096\times2B \times4 \text{layers}=1GB$ + 4.29GB activation memory = $5.3GB$

| Architecture                        | Size   | Reduction |
| ----------------------------------- | ------ | --------- |
| No pipelining                       | 137GB  | 1x        |
| Pipelining                          | 17.2GB | ~8x       |
| Pipelining + <br>Re-materialization | 5.3GB  | ~25.8x    |

## Issues with GPipe
- Bubble overhead: most devices are idle for majority of the operation stages, and experimental results suggests to set $M\geq4\times K$ for negligible overhead.
- PipeDream [@harlap2018pipedream] introduced asynchronous updates to minimize bubble overhead.
- Complete activations for inputs need to be stored at each stage fixed by Sequence Parallelism.
- Assumes equal number of layer partitions across stages. Modern deep neural nets are based on FLOPs, communication cost.
- Fixed Parameters like registers buffers, communication buffers still need to be fully replicated across devices.

## Other Scheduling Algorithms

**PipeDream (1F1B)**: Introduced by @harlap2018pipedream, it limits the number of in-flight micro-batches (batches for which backward pass is outstanding and activations need to be maintained) to the depth of the pipeline. After the warmup phase, workers enters steady state where 1-forward and 1-backward pass (**1F1B**) is performed. Finally at the end, all workers complete the outstanding backward passes for all micro-batches in-flight.
- Bubble overhead is present in PipeDream as well, due to batch filling phase and tear down phase so that gradient updates can be performed.
- PipeDream saves on memory usage as there's no need to save activations for batches whose backward computation is already scheduled (for example, the last device executes backward and forward for the same batch immediately, and doesn't need to save activations. But the first device still need to save it).
- Asynchronous 1F1B: Bubble overhead is introduced because pipeline has to be flushed so that gradient could be applied to update the weights. A simple solution is to maintain $K$ weight versions (at any point, at most K micro-batches in-flight), each corresponding to one micro-batch in the pipeline. Updates happen asynchronously for different micro-batch. But this creates a problem of managing multiple weights which beats the purpose of storage savings which is the reason for doing pipeline parallelism.

![[thoughts/images/pp-pipedream.png]]
*<center> PipeDream Schedule. [Source](https://sighingnow.github.io/machine%20learning/pipeline-model-parallelism.html)</center>*

**PipeDream-2BW**: Flushing happens because the next mini-batch needs the updated weights. What if we keep 2 versions of weights? This would imply that the next mini-batch can start immediately with old weights while the new updates happen asynchronously. PipeDream-2BW [@narayanan2021memory] solved the worst case weight versions using exactly this solution.
- By adding a 1-step weight delay $W^{(t+1)}=W^{(t)}-\eta \nabla f(W^{(t-1)})$, the double-buffered weight updates (2BW) can be applied to older version while the in-flight micro-batches uses the newest version.

![[thoughts/images/pp-pipedream-2bw.png]]
*<center>PipeDream-2BW. [Source](https://sighingnow.github.io/machine%20learning/pipeline-model-parallelism.html)</center>*

While this does eliminate all the bubbles in the pipeline, convergence of asynchronous training is still questionable. This is the main reason why Megatron-LM and DeepSpeed still uses synchronous 1B1W pipeline parallelism.

![[thoughts/images/deepspeed-pipeline.png]]
*<center>DeepSpeed Data + Pipeline Parallelism. [Source](https://www.deepspeed.ai/tutorials/pipeline/)</center>*

Other works like Alpa [@zheng2022alpa] improve the training dynamics by merging inter- and intra-operator parallelism in deep neural network training.

# Expert Parallelism

Running [[thoughts/transformers#Mixture of Experts|mixture of experts]] on multiple accelerators where only a subset of experts are active during inference is another method of Model Parallelism. For example: combining expert parallelism $E=2$ with data parallelism $D=2$ refers to running 4 accelerators each having 2 experts with 2 accelerators running 1 data batch. A typical LLM, say DeepSeek-V4-Pro with 1.6T parameters with 26B active parameters, boasts a ratio of $26B/1.6T=0.01625$ active to sparse parameters.

MoE gain both on quality with respect to dense counterparts with similar sparse parameters [@jiang2024mixtral] and scalability [@xu2026deepseek], and thus have become a fundamental strategy for efficient scaling in foundational Large Language models.

![[thoughts/images/models-expert-parallelism.png]]
*<center>[Source](https://arxiv.org/abs/2407.06204)</center>*

Following the analysis performed by LatentMoE [@elango2026latentmoe], with the example of Qwen3-235B-A22B for modeling on H200 ($F=2000\text{TFLOP}/s$ and $\text{BW}=4.8\text{TB}/s$ HBM bandwidth).
- Process flow for FFN layer in an expert parallel deployment looks like: `Router Gate -> Encode -> All-to-All Dispatch -> Expert FFN -> All-to-All combine -> Decode`.
- We have to look at the combination of computation efficiency, communication overhead, memory occupation such that in the goldilocks region of compute-bound latency-critical workflow, none of the three becomes a bottleneck
- H200 is compute bound when arithmetic intensity exceeds $\frac{2000}{4.8}\approx400\text{FLOPs/byte}$
- $\boldsymbol{N}=128$ experts, $\boldsymbol{K}=8$ active experts per token
- Hidden dimension $\boldsymbol{d}=4096$, intermediate hidden dimension $\boldsymbol{m}=1536$
- Expert parallelism across EP = 64 GPUs. Number of expert per GPU $\frac{N}{EP}=2$.
- Memory Bandwidth bottleneck
	- Compute cost per expert is $C_{\text{exp}}=2\text{ bytes}\cdot t_{\text{exp}}\cdot d\cdot m$
	- Memory cost per expert is $M_{\text{exp}}=d\cdot m+t_{\text{exp}}(d+m)$ accounting for weights, inputs and activations for gradient calculation
	- Arithmetic Intensity: $I=\frac{2\text{ experts} \cdot C_{\text{exp}}}{2\text{ experts}\cdot M_{\text{exp}}}\geq400\implies t_{\text{exp}}\geq450$. In a typical LLM workload, the decode phase has much smaller batch size than this.
- Communication Bottleneck
	- Both A2A communication (dispatch and combine) can become the bottleneck once we enter compute-bound phase.
	- Communication volume = $M_{\text{comm}}=2.5\left( \frac{N}{\text{EP}}\cdot t_{\text{exp}}\cdot d \right)$, where 2.5 comes from 0.5 bytes of FP4 weights during dispatch and 2 bytes of BF16 during aggregate.
	- Total computation per GPU = $C_{\text{comp}}=2 \text{}\cdot\left( \frac{N}{EP} \cdot t_{\text{exp}}\cdot d\cdot m\right)$
	- Time to communication $t_{\text{comm}}=\frac{M_{\text{comm}}}{\text{BW}_{\text{NVL}}}$ and time to compute = $t_{\text{comp}}=\frac{C_{\text{comp}}}{F}$
	- Ratio = $\frac{t_{comm}}{t_{comp}}=\frac{5\cdot F}{4\cdot m\cdot \text{BW}_{\text{NVL}}}\approx2$, which indicates communication seems to be the **bottleneck** in compute-bound regime.
- If we want to improve memory bandwidth, we have to decrease either $\boldsymbol{d}$ or $\boldsymbol{m}$ and improving communication cost means decreasing communication volume implying reducing hidden dimension $\boldsymbol{d}$ or number of active experts $\boldsymbol{K}$. However, model quality decreases if we reduce either $\boldsymbol{m}$ or $\boldsymbol{K}$.
- Furthermore, they establish that model quality is directly dependent on width of selected experts $\propto K\cdot m$. Using fine-expert segmentation [@dai2024deepseekmoe], they also scale N and K by a factor $\alpha$ to increase diversity of expert combinations.
- By increase $\boldsymbol{N}$ and $\boldsymbol{K}$ by $\alpha$ increases model quality, diversity in expert mixtures, and by reducing $\boldsymbol{d}$ by same factor, they keep the memory bandwidth and communication cost constant.

Next steps:
- [Expert Parallelism – Tinkerings](https://tinkerings.dev/posts/expert_parallel.html)
- [LLMs-from-scratch/ch04/07\_moe at main · rasbt/LLMs-from-scratch · GitHub](https://github.com/rasbt/LLMs-from-scratch/tree/main/ch04/07_moe)

# Megatron-LM & DeepSpeed

TODO

# Comments
- What's the maximum size of model that we can serve and train if we have 8 or 16 GPUs with 40 or 80GB VRAM. Progressively apply each of these parallelism steps (Data -> Tensor -> Sequence -> Context -> Pipeline -> Expert) and find how much it improves.

# ToDo
- GPU Networking and Data Center Topology: [GPU Networking Basics, Part 1 - by Austin Lyons - Chipstrat](https://www.chipstrat.com/p/gpu-networking-basics-part-1)

# References
- [The Ultra-Scale Playbook - a Hugging Face Space by nanotron](https://huggingface.co/spaces/nanotron/ultrascale-playbook)
- [RL Post-Training on Macs \| Pluralis Research](https://pluralis.ai/blog/rl-post-training-on-macs/)
- [GitHub - DLYuanGod/MegaTrain · GitHub](https://github.com/DLYuanGod/MegaTrain), [How to Train 100B+ Large Models on a Single GPU - Hanchi Sun’s Personal Website](https://mastergodzilla.github.io/posts/2026/04/megatrain/)
- [GitHub - NVIDIA/Megatron-LM: Ongoing research training transformer models at scale · GitHub](https://github.com/nvidia/megatron-lm)
	- [Scaling Language Model Training to a Trillion Parameters Using Megatron \| NVIDIA Technical Blog](https://developer.nvidia.com/blog/scaling-language-model-training-to-a-trillion-parameters-using-megatron)
	- [Parallelisms Guide — Megatron Bridge](https://docs.nvidia.com/nemo/megatron-bridge/latest/parallelisms.html)
- [Notion](https://projectfoundation.notion.site/Megatron-LM-OSLO-DeepSped-and-FSDP-s-implementation-details-dbfb2bacc65d42cda0a0633ab1bdc994)
- megakernels
- [🪆 ML at Scale: Tensor Parallelism \| Arushi Somani](https://www.amks.me/notes/tp/), [🪈 ML at Scale: Pipeline Parallelism \| Arushi Somani](https://www.amks.me/notes/pp/)
- Cai, Weilin, et al. "A survey on mixture of experts in large language models." IEEE Transactions on Knowledge and Data Engineering (2025). [\[URL\]](https://arxiv.org/abs/2407.06204)
- Korthikanti, Vijay Anand, et al. "Reducing activation recomputation in large transformer models." Proceedings of Machine Learning and Systems 5 (2023): 341-353. [\[URL\]](https://arxiv.org/abs/2205.05198)

---

# Bibliography

[^1]: [The Ultra-Scale Playbook - a Hugging Face Space by nanotron](https://huggingface.co/spaces/nanotron/ultrascale-playbook?section=sequence_parallelism)