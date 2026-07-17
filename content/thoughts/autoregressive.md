---
title: Autoregressive Models
date: 2026-05-17
tags:
  - machine-learning
  - generative-modeling
  - notes
---


Model the probability of subsequent elements using previous observations or graphically, can be interpreted as fully connected DAG. By chain rule of probability:
$$
\begin{equation}
p(x_{1:T})=p(x_{1})p(x_{2}|x_{1})\dots =\prod_{t=1}^{T} p(x_{t}|x_{1:t-1})
\end{equation}
$$
Above equation can be relaxed in various ways to treat the intractability of conditional dependence:
- Markov assumption: $p(x_{t}|x_{1:t-1})=p(x_{t}|x_{t-1})$
- N-gram model: $p(x_{t}|x_{1:t-1})=p(x_{t}:x_{t-n-1:t-1})$
- Hidden state $z_{t}$: compress past into hidden state
	- when $z_{t}$ is a deterministic function of past states, resulting model is RNN
	- when $z_{t}$ is stochastic function, resulting model is hidden markov model.

Looking at some neural models used in classification.

Classification problem: Given $X \in \{ 0,1 \}^{n}$, predict $Y \in \{ 0,1 \}$. We care about $P(Y=1|x;\alpha)=f(x,\alpha)$. For logistic regression, $f=\sigma()$

- FVSBN

---

> [!note] Questions
> - **Autoregressive models (ARM) achieve strong performance in density estimation.**
> 
> Why does AR model perform good in density estimation? What exactly is density estimation?
> - **How does VQ-VAE, VQ-GANs work?**
> 
> VQ-VAEs use autoregressive models to learn an expressive prior over a discretized latent space. Different from VQ-VAEs, VQGANs employ a first stage with an adversarial and perceptual objective to scale autoregressive transformers to larger images.