---
title: "Recurrent Neural Networks"
date: 2026-04-18
tags:
- machine-learning
- notes
---


# RNNs
- Introduces the concept of feedback with Neural networks from past states and the notion of timestep. RNNs are represented as computational DAGs.
- Adds a state variable h (hidden unit), and the operation of the layer depends on its state. State is updated at every time step. $f,g$ can be arbitrary differentiable functions (required for backpropagation).
$$\begin{align}
h_{t}&=f(h_{t-1},x_{\text{in}}[t]) \\
x_{\text{out}}[t]&=g(h_{t}) 
\end{align}$$
- Backpropagation through time: our goal is to compute MLE of the parameters by solving $\theta^{*}=\arg\max_{\theta}p(y_{1:T}\vert x_{1:T},\theta)$. To compute the MLE, we need the gradients of the loss wrt parameters. Consider a general parameterized RNN model 
$$
\begin{align}
h_{t}&=W_{hx}x_{t}+W_{hh}h_{t-1}&=f(x_{t},h_{t},w_{h}) \\
o_{t}&=W_{ho}h_{t}&=g(h_{t},w_{o})
\end{align}
$$
	- Loss can be written as: $L=\frac{1}{T}\sum_{t=1}^{T}\ell(y_{t},o_{t})$ and we need to compute $\frac{ \partial L }{ \partial W_{hx} },\frac{ \partial L }{ \partial W_{hh} },\frac{ \partial L }{ \partial W_{ho} }$, and $w_{h}$ is just flattened version of $W_{hx},W_{hh}$.
	- $\frac{ \partial L }{ \partial w_{h} }=\frac{1}{T}\sum_{t=1}^{T}\frac{ \partial \ell(y_{t},o_{t}) }{ \partial w_{h} }$
	- Using chain rule, this can be calculated, and takes $\mathcal{O}(T^{2})$ to compute overall and thus, need to truncated at some time step to maintain computable tracatability.
- Exploding and vanishing gradients: We are multiplying by the jacobian to compute backpropagation at each time step (consider the gradient of $\frac{ \partial x_{\text{out}}[t] }{ \partial x_{in}[0] }=\frac{ \partial x_{out}[t] }{ \partial h_{t} }\frac{ \partial h_{t} }{ \partial h_{t-1} }\dots \frac{ \partial h_{0} }{ \partial x_{\text{in}}[0] }$ and $\frac{ \partial h_{t} }{ \partial h_{t-1} }=\sigma'W$ where $\sigma'$ is gradient of the nonlinearity). If the gradients are high or low, it can result in exploding and vanishing gradients respectively.

## LSTM

> [!note] Much better introduction by [Chris Olah](https://colah.github.io/posts/2015-08-Understanding-LSTMs).

- Avoids the vanishing/exploding gradient problem.
- LSTM adds a memory cell $C_{t}$ that is controlled using three gates output gate $O_{t}$, Input gate $I_{t}$, and forget gate $F_{t}$. Each serves a specific purpose:
	- Output: determines what gets reads out from the input and hidden state.
	- Input: determines what gets reads in.
	- Forget: determines when to reset the cell.
	- Each gate is composed of a sigmoid NN and a pointwise multiplication. Sigmoid controls when to switch something on and off, and pointwise multiplication uses the sigmoid output for switching operation. A "1" keeps something, and "0" corresponds to removing it.
- Let's first write the computation equations, and then understand them:
$$
\begin{align}
O_{t}&=\sigma(W_{o}[H_{t-1},X_{t}]+b_{o}) \\
I_{t}&=\sigma(W_{i}[H_{t-1},X_{t}]+b_{i}) \\
F_{t}&=\sigma(W_{f}[H_{t-1},X_{t}]+b_{f})
\end{align}
$$
- At the first step, $C_{t}=C_{t-1}F_{t}$. This means, we use the forget gate output to forget some of the information from the cell state.
- At the second step $C_{t}=C_{t-1}F_{t}+I_{t}\tilde{C}_{t}$, we use the output from input gate $I_{t}$ which scales the information as per its importance, and use the candidate memory $\tilde{C}_{t}=\text{tanh}(W_{c}[H_{t-1},X_{t}]+b_{c})$ to select the new candidate values that could be added to the state.
- Our memory is updated at this point, and LSTM now decides what to output.
- Output gate $O_{t}$ decides what gets read out from the input and hidden state, and is transformed with the cell state to compute the next hidden state: $H_{t}=O_{t}\cdot\text{tanh}(C_{t})$

### GRU

GRU combines forget and input gate into a single "update" gate $Z_{t}\in \mathbb{R}^{N\times H}$. And also merges cell and hidden state.

$$
\begin{align}
R_{t} &= \sigma(W_{r}[H_{t-1},X_{t}]+b_{r}) \\
Z_{t} &= \sigma(W_{z}[H_{t-1},X_{t}]+b_{z}) \\
\tilde{H}*{t} & = \text{tanh}(W*{h}[R*{t}\odot H_{t-1},X_{t}]+b_{h}) \\
H_{t} & = Z_{t}\odot H_{t-1}+(1-Z_{t})\odot \tilde{H}*{t}
\end{align}
$$

## Beam search

Compute top K candidate outputs at each step, and expand each one in V possible ways, to generate VK candidates. Select top K again.
- Stochastic beam search samples top K without replacement, i.e. pick the top one, renormalize, and pick the new top one.
