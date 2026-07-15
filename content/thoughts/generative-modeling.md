---
title: Generative Modeling
date: 2026-06-01
tags:
  - deep-learning
  - machine-learning
  - generative-modeling
---


When learning a generative model, our goals are:
- generate new samples from the distribution
- estimate density of the distribution
- unsupervised representation learning: learn features that best explain the data. To discover the hidden structure inside the data.

It's difficult to get the exact distribution from limited data and computational issues. What does it mean to get the "best" estimate of the distribution?

What are the different ways to estimate the data distribution?
- Usually we have either samples from true distribution
- Oracle access to log-likelihood function. What does it mean to have oracle access? How does log-likelihood function work or look like?

How do we measure the distance between two distribution?
- If true distribution is $p_{\mathcal{D}}(y)$ and approximate distribution is $p_{\theta}(y)$, then KL-divergence $\text{KL}(p\|q)$ measures the extra bits required to represent the data coming from p, but using the compression scheme optimized for q distribution.
- $\text{KL}(p_{\mathcal{D}}\|p_{\theta})$ measures the *"compression loss"* (in bits) of using $p_{\theta}$ instead of $p_{\mathcal{D}}$, for data coming from $p_{\mathcal{D}}$.
- And $\arg \underset{p_{\theta}}{\min}(\text{KL}(p_{\mathcal{D}}\|p_{\theta}))=\arg \underset{p_{\theta}}{\min}-\mathbb{E}_{x\sim p_{\mathcal{D}}}[\log p_{\theta}(x)]$. Thus, minimizing KL is equivalent to maximizing expected log-likelihood of the data.
- Using Monte-Carlo estimation, expected log-likelihood is written as $max_{p_{\theta}}\frac{1}{\lvert \mathcal{D}\rvert}\sum_{x \in \mathcal{D}}\log p_{\theta}(x)$.
- Considering I.I.D data, maximizing likelihood of the data: $p_{\theta}(x^{(1)},\dots,x^{(m)})=\prod_{x \in \mathcal{D}}p_{\theta}(x)$
- Why is using MC estimate okay?
	- Bias-variance tradeoff. MC estimates are unbiased estimators which converges to true value by Law of Large numbers and variance is inversely proportional to number of samples.

Generative model is defined as a stochastic function $g:\mathcal{Z\times Y\to X}$ (contrary to a discriminative model (e.g. classifier) $f:\mathcal{X\to Y}$), where $z\in \mathcal{Z}$ is the latent variable, and $y\in \mathcal{Y}$ is the label/description. Output of the generator $g$ can be varied using the randomised latent variable.
$$
\begin{align}
z&\sim p(Z) \\
x&=g(z,y)
\end{align}
$$

Latent variable z is a multi-dimensional vector that describes the features of the output not mentioned in label to the model. In an image generation model, it could be the setting of the environment, colour depth, pose, background.

Process:
- Learner: Given output data for a discriminative: $\{ y^{(i)} \}_{i=1}^{N}$, learner gets fed and outputs a generator function $g$.
- Generator: Sampling the generator with a randomised vector $z$ produces output $\{ \hat{x}^{(i)} \}_{i=1}^{N}$.

Unconditional vs Conditional generative models: Model may be conditioned on inputs or some other variables c of the form $p(X|Y)$.

Objective: How to measure the quality of the output by a generative model?
- Output synthetic data that matches original data on certain marginal statistics. For example, it has the same mean colour as real photos or same colour variance.
	> [!question] How to find the statistics for other modalities like text/molecules? Number of words/sentences?
- Output synthetic data that has high probability under a density model fit to the real data, i.e. $\hat{x}\sim p_{\mathcal{D}}$ where $p_{\mathcal{D}}$ is the true process that produces original data.

Approaches: How to form data generators?
- Direct approach: learn the generator function $G:\mathcal{Z\times X\to Y}$ directly. GANs or Diffusion models work based on direct approach.
- Indirect approach: learn a score function $E:\mathcal{X}\to \mathbb{R}$ and generate samples that scores highly under this function. Density models and Energy based models work under indirect approach.

---

Why are autoregressive models preferred over RNNs?
- Due to easy log-likelihood computation, and thus, MLE can be performed.
- But sequential, and cannot learn features in unsupervised ways.
- Performing Maximum-likelihood learning on autoregressive models. Update $\theta_{t+1}=\theta_{t}+\alpha_{t} \nabla_{\theta}\ell(\theta)$. Perform ERM on $\nabla_{\theta}\ell(\theta)$, but keep in mind, the risk of under/over fitting.

# Classes of Generative Models:

1. [[thoughts/autoregressive]]
2. [[thoughts/ebm]]
3. [[thoughts/gan]]
4. [[thoughts/vae]]
5. [[thoughts/lit-review-diffusion-models]]
	1. [[thoughts/diffusion-models]]
6. [[thoughts/score-matching]]
7. [[thoughts/flow-matching]]
8. [[thoughts/discrete-diffusion]]