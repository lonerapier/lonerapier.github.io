---
title: Representation Learning
date: 2026-04-01
tags:
- machine-learning
- representation-learning
- draft
---

> Ch 32 in book2

Representation Learning vs Generative Modelling

Representation of a data domain $\mathcal{X}$ is a function $f:\mathcal{X}\to \mathbb{R}^{d}$ that assigns a feature vector to each input in the domain, and is called an **encoder** parametrised by weights and biases.

Difference between pretraining, adaptation and testing

What are the properties of good representations?
- Compact (Minimal)
- Explanatory (Sufficient)
- Disentangled (Independent factors)
- Interpretable
- make Subsequent problem solving easy

Representation learning using:
- Compression
	- Autoencoder
	- Contrastive
	- Clustering
- Prediction
	- Future Prediction
	- Imputation: predict missing data
	- pretext tasks: predict abstract properties of data

> [!question] Compression and Prediction
> - Is both compression and prediction principle same? What are the differences? Does models that are good at compression better at prediction? Is it true the other way around? 
> - Does transfer learning to new problems a function of how good your model is at compression? Can you find such a function and theorise it?

Autoencoder (section 20.3)
- Learning objective
- Minimising the objective
- Why autoencoders are just non-linear generalisations of PCA?
- How representation view of clustering, precisely k-means, can be seen as encoder-decoder model where the encoder is outputting a one-hot integer, and decoder is learning the best possible mean to minimise the reconstruction error.

Data prediction (self-supervised learning)
-  Masked prediction: mask part of your input data, and model predicts the masked data
	- BERT
	- MAE: Masked Autoencoder
- Why does masked prediction works better than encoding

Questions
- A pretrained model doesn't know the downstream task it will be used for. It will be generally pretrained on as much data and as general task as possible. Does a pretraining algorithm add some way to forget or to make the representation more compact? and make the independent features in the representation axes aligned?

**Metric Learning**
- A better representations is compact, explanatory, and concentrated (intra-class) and separated (inter-class).
- Introduce a distance metric that can be used to better separate classes and keep elements in same class as close together as possible.
- First idea: Perform linear fitting by using euclidean distance i.e. L2 norm to learn W in $z=Wx$ on similar set of class $S$ and dissimilar set of class $D$, and minimise $\lVert x_{i}-x_{j} \rVert^{2}$. This is equivalent to Mahalanobis distance, and can be turned into an optimisation problem by minimising $\min_{A \succeq 0}d_{A}(x_{i},x_{j})^{2},\ \text{s.t}\ \sum_{k,l\in D}d_{A}(x_{k},x_{l})\geq\epsilon$.
- Deep Metric Learning (16.2.2): learned using non-linear function and optimise using SGD

**Contrastive Loss** (16.2.4)
- Pairwise loss and Siamese networks
- Triplet loss
- N-pairs loss
- It essentially boils down to finding the hard negatives to accelerate training
- Self-supervised contrastive representation learning: combine ideas from metric learning and self-supervision
	- Use an encoder to get the representation to some hypersphere and use cross-entropy to build softmax classifier to discriminate the classes
	- Now the error: $\min_{f}E_{(x,x^{+})\sim p_{\text{pos}},\{ x_{i}^{-} \}_{i=1}^{N}\sim p_{\text{data}}}\left[ -\log \frac{e^{f(x)^{\top}f(x^{+})/\tau}}{e^{f(x)^{\top}f(x^{+})/\tau}+\sum_{i=1}^{N}e^{f(x)^{\top}f(x_{i}^{-})/\tau}} \right]$ turn into softmax loss where positive samples are pulled close together and negative samples are pulled further apart.
	- Why map to a hypersphere? Classes are linearly separable due to similarity being measured by angles and dot-products and easily understandable.
	- How to turn this into self-supervised training? By generating augmentations for positive examples and rest of the batch can be sampled as negative examples.
	- What's the effect of contrastive loss? Why is it effective?
		- Maximises a lower bound on mutual information between positive samples: $\text{MI}(f(x),f(x^{+}))\geq \log(N)-\mathcal{L}(f)$
		- But just maximising the mutual information actually worsens the performance. TODO: add citation.
		- This indicates that the contrastive loss is maximising not just alignment of similar data together.
		- *Uniformity*: In order to build the optimal representation, models also separate the dissimilar classes or in other words, feature distribution on the hypersphere representation is uniform.
		- Unsupervised contrastive Learning maximises the uniformity.
	- To formalise the metric for alignment and uniformity
		- $\mathcal{L}_{\text{align}}(f;\alpha)=E_{(x,y)\sim p_{\text{pos}}}[\lVert f(x)-f(y) \rVert_{2}^{\alpha}]$: expected pairwise positive distance
		- $\mathcal{L}_{\text{uniform}}(f;t)=\log E_{(x,y)\sim p_{\text{data}}}[G_{t}(f(x),f(y))]=\log E[e^{-t\lVert f(x)-f(y) \rVert_{2}^{2}}]$: log of expected pairwise Gaussian potential. To minimise this, the pairwise distance of negative samples should be farther apart from each other.  TODO: what's the meaning of gaussian potential
		- Combining above two, the solution that minimise the loss is the one that uniformly cover the whole hypersphere. Or in other words, uniform distribution on the hyperspehere is the unique measure minimising the expected pairwise potential.
	-  So, the contrastive loss asymptotically as the number of samples $M\to \infty$, converges to 
$$
\begin{align}
\lim_{ M \to \infty }\mathcal{L}*{\text{contrastive}}&(f;\tau,M)-\log M \\
&=\lim*{ M \to \infty } E_{(x,y)\sim p_{\text{pos}}}\left[ -\log \frac{e^{f(x)^{\top}f(y)/\tau}}{e^{f(x)^{\top}f(y)/\tau}+\sum_{i}e^{f(x^{-}*{i})^{\top}f(y)/\tau}} \right]-\log M \\
&=-\frac{1}{\tau}E[f(x)^{\top}f(y)]+E*{x\sim p_{\text{data}}}\left[\log E_{x^{-}\sim p_{\text{data}}}[e^{f(x^{-})f(x)/\tau}]\right]
\end{align}
$$
		- And the loss is minimised when $\mathcal{L}_{\text{align}}$ is optimal and perfect uniformity is achieved.
	- Intuitively, with the data, we want the model to learn the right invariances about positive samples so that it doesn't classify a false negative.
	- Projection heads: contrastive loss is applied to a transformed version of the representation, i.e. the representation is a layer below the final layer.
		- What's the reason behind this? We want some kind of variance in augmentations, and not perfect uniformity for downstream tasks.
	- In summary, for self-supervised CL to work, we need: heavy data augmentation, projection heads, large batch size (for negative samples), hard negative examples in the batch.

**Kernel methods** (chapter 17):
- Prior knowledge about similarity between two input vectors is encoded as the notion of **kernel function**.
- Mercer Kernel is defined as a positive definite kernel which is any symmetric function $\mathcal{K}:\mathcal{X}\times \mathcal{X}\to \mathbb{R}^{+}$ such that $\sum_{i=1}^{N}\sum_{j=1}^{N}\mathcal{K}(x_{i},x_{j})c_{i}c_{j}\geq0$ for any set of unique points $x_{i}\in \mathcal{X}$ and any choice of numbers $c_{i}\in \mathbb{R}$.
	- Gram matrix is defined as the NxN similarity matrix:
$$
\mathbf{K}=\begin{pmatrix}
\mathcal{K}(x_{1},x_{1}) & \cdots & \mathcal{K}(x_{1},x_{N}) \\
\vdots & \ddots & \vdots \\
\mathcal{K}(x_{N},x_{1}) & \cdots & \mathcal{K}(x_{N},x_{N})
\end{pmatrix}
$$
	- $\mathcal{K}$ is a Mercer kernel iff Gram matrix is positive definite for any set of inputs.
	- Example kernel: squared exponential kernel or Gaussian kernel: $\mathcal{K}(x,x')=\exp\left( - \frac{\lVert x-x' \rVert^{2}}{2\ell^{2}} \right)$.
- TODO: write more