---
title: "Variational Auto-encoders"
date: 2026-04-25
tags:
- machine-learning
- generative-modelling
- notes
---

Autoencoders learn low-dimensional representation of the data in unsupervised way by aiming to imitate the identity function i.e. reconstruct the original data while having a low-dimensional representation bottleneck in the process. In other words, Autoencoders are neural networks trained to generate output y that is as close to the input x, and an internal layer that gives the representation z(x) for each new input.

Composed of two networks:
- Encoder $E_{\theta}:\mathcal{X\to Z}$: Maps high-dimensional input to low-dimensional latent representation, usually $\lvert \mathcal{Z}\rvert\leq \lvert \mathcal{X}\rvert$.
- Decoder $D_{\phi}:\mathcal{Z\to Y}$: Outputs data as close to original from latent representation.

Encoder network is generally used to accomplish dimensionality reduction when $\lvert \mathcal{Z}\rvert\ll \lvert \mathcal{X}\rvert$ and can be seen as a non-linear generalisation to PCA.

> [!todo] Deterministic AE
> - Denoising AE
> - Sparse AE
> - Contractive AE

Consider random variables x and z, with g being deterministic decoder (generator) and f being deterministic encoder. The process looks like:
$$
\begin{array}[cc] \\
\mathbf{x}\sim p_{\mathcal{D}} & \mathbf{z}\sim p_{\mathbf{z}} \\
\hat{\mathbf{z}}=f(\mathbf{x}) & \hat{\mathbf{x}}=g(\mathbf{z})
\end{array}
$$

Our goal is to generate $\mathbf{x}$ or in other words sample $\mathbf{x}$ from distribution $p_{\theta}(\mathbf{x})$. If we know the distribution to latent variable z, then expressing x is just taking marginal likelihood $p_{\theta}(\mathbf{x})=\int_{\mathbf{z}}p_{\theta}(\mathbf{x}|\mathbf{z})p(\mathbf{z})d\mathbf{z}$ over latent variables $p(\mathbf{z})$ with the conditional distribution of $p_{\theta}(\mathbf{x}|\mathbf{z})$, or if we have access to ground truth latent encoder, we can also write $$p(x)=\frac{p(x,z)}{p(z|x)}$$ 

Using log likelihood objective $\sum_{i=1}^{N}\log p_{\theta}(\mathbf{x}^{(i)})$, we can optimise $\theta$ by minimising the NLL.

But generally, z is not known, and primary goal of a generative model is to create output from scratch. So, we need a distribution $p_{\mathbf{z}}$ so that z can be sampled from the distribution. You might ask, why can't an AE be used for this, where we can use the encoder to get the sample z? Firstly, encoder works on an input, and secondly, is optimised to work as a identity lookup table. The latent space might not be structured, and AE doesn't provide any guarantee about the structure of the latent variable distribution.

To calculate the intractable data likelihood $p_{\theta}(\mathbf{x})$, we make following assumptions:
1. Hypothesis space $p_{\theta}(\mathbf{x}|\mathbf{z})$ is modelled using a product mixture of distributions (e.g., Gaussians or Bernoullis) with a prior $p_{z}$ (usually Gaussian). Thus, VAEs can be seen as an infinite mixture of Gaussians. To prevent learning infinite set of parameters over discrete latent space, VAE uses a function $g_{\theta}$ that outputs the parameters of a continuous latent variable, and smoothens the latent space.
$$
p_{\theta}(\mathbf{x})=\int_{z}\mathcal{N}(\mathbf{x};g_{\theta}^{\mu}(\mathbf{z}),g_{\theta}^{\Sigma}(\mathbf{z}))\mathcal{N}(\mathbf{z};0,I)d\mathbf{z}
$$
2. Importance sampling using another density $z\sim q_{z}$. Instead of approximating the integral over all z (because most of the term will be near zero), we want to sample z from the distribution $p_{\theta}(z|x)$ whose sample places maximum likelihood on x $p_{\theta}(x|z)$. Optimal $q^{*}=p_{\theta}(\mathbf{z}|\mathbf{x})$.
$$
p_{\theta}(\mathbf{x})=E_{z\sim p_{z}}[p_{\theta}(\mathbf{x}|\mathbf{z})]=\int_{z}q_{\mathbf{z}}(\mathbf{z}) \frac{p_{\mathbf{z}}(\mathbf{z})}{q_{\mathbf{z}}(\mathbf{z})}p_{\theta}(\mathbf{x}|\mathbf{z})d\mathbf{z}=E_{\mathbf{z}\sim p_{\mathbf{z}}}[\frac{p_{\mathbf{z}}(\mathbf{z})}{q_{\mathbf{z}}(\mathbf{z})}p_{\theta}(\mathbf{x}|\mathbf{z})]
$$
3. Use variational inference to estimate p by modelling $q_{\phi}$ parametrised by $\phi$. Posterior distribution $q_{\phi}(\mathbf{z}|\mathbf{x})=\mathcal{N}(f_{\phi}^{\mu}(\mathbf{x}),f_{\phi}^{\Sigma}(\mathbf{x}))$ uses approximation function $f$ that outputs the parameters of the distribution and can be seen as **probabilistic encoder**.

Our goal will be to use the representation of the distribution $p(x)$ to derive a term called the Evidence Lower Bound (ELBO), which gives a lower bound on the evidence. Evidence is written as log likelihood of the observed data: $\log p(\boldsymbol{x})$. ELBO gives a proxy objective that can be optimised with respect to a latent variable model, and in the best case (when true distribution is learned), ELBO exactly equals the evidence.

<p align="center">
	<img src="vae.png" width="300">
</p>

**Objective**

The estimated posterior $q_{\phi}(\mathbf{z}|\mathbf{x})$ needs to be close to best approximation $p_{\theta}(\mathbf{z}|\mathbf{x})$, and is measured using reversed KL divergence $D_\text{KL}( q_\phi(\mathbf{z}\vert\mathbf{x}) \| p_\theta(\mathbf{z}\vert\mathbf{x}) )$.

> [!question] Why use reverse KL? 
> Doesn't KL $D(p\|q)$ measure how many bits is required to estimate p using q? Then, why are measuring how many bits are required to go from p to q, when instead we are approximating p with q?

$$
\begin{align}
D_{\text{KL}}(q_{\phi}(\mathbf{z}|\mathbf{x})\|p_{\theta}(\mathbf{z}|\mathbf{x}))&=E_{z\sim q_{\phi}}[\log q_{\phi}(\mathbf{z}|\mathbf{x})-\log p_{\theta}(\mathbf{z}|\mathbf{x})] \\
 & =E_{z\sim q_{\phi}}[\log q_{\phi}(\mathbf{z}|\mathbf{x})-\log p_{\theta}(\mathbf{x}|\mathbf{z})-\log p_{\mathbf{z}}(\mathbf{z})+\log p_{\theta}(\mathbf{x})] & \text{Using bayes rule} \\
 & =E_{z\sim q_{\phi}}[\log q_{\phi}(\mathbf{z}|\mathbf{x})-\log p_{\theta}(\mathbf{x}|\mathbf{z})-\log p_{\mathbf{z}}(\mathbf{z})]+\log p_{\theta}(\mathbf{x})  & \text{$\log p_{\theta}(\mathbf{x})$ is constant over distribution $q_{\phi}$} \\  \\
 & =E_{z\sim q_{\phi}}\left[ \log \frac{q_{\phi}(\mathbf{z}|\mathbf{x})}{p_{z}(\mathbf{z})} \right]-E_{z\sim q_{\phi}}[\log p_{\theta}(\mathbf{x}|\mathbf{z})]+\log p_{\theta}(\mathbf{x}) \\
 & =D_{\text{KL}}(q_{\phi}(\mathbf{z}|\mathbf{x})\|p_{z}(\mathbf{z}))-E_{z\sim q_{\phi}}[\log p_{\theta}(\mathbf{x}|\mathbf{z})]+\log p_{\theta}(\mathbf{x})
\end{align}
$$

We can rearrange the terms to get the learning objective. To get optimal parameters $\theta^{*},\phi^{*}$, we want to minimise the KL divergence between the two distributions $p_{\theta}(\mathbf{z}|\mathbf{x}),q_{\phi}(\mathbf{z}|\mathbf{x})$ and maximise the log likelihood of generating real data $p_{\theta}(\mathbf{x})$.

$$
L(\theta,\phi)=-\log p_\theta(\mathbf{x}) + D_\text{KL}( q_\phi(\mathbf{z}\vert\mathbf{x}) \| p_\theta(\mathbf{z}\vert\mathbf{x}) ) = -\underset{ \text{reconstruction term} }{ \mathbb{E}_{\mathbf{z}\sim q_\phi}[\log p_\theta(\mathbf{x}\vert\mathbf{z})] } + \underset{ \text{prior matching term} }{ D_\text{KL}(q_\phi(\mathbf{z}\vert\mathbf{x}) \| p_\theta(\mathbf{z})) }
$$

This term is known as Variational lower bound or **Evidence lower bound (ELBO)**. For more details on why *variational* bound, refer to this amazing [post](https://blog.evjang.com/2016/08/variational-bayes.html). Let's understand what each term in the objective represents: 
1. Reconstruction term: Measures how well are we able to convert a latent vector $z$ into an observation $x$. 
2. Prior matching term: Measures how well is the learned encoder $q_{\phi}$ matching our prior belief over latent variables, $p(\boldsymbol{z})$. 

Lower bound is achieved because KL-divergence is always non-negative, thus $L\geq-\log p_{\theta}(\mathbf{x})$.

As briefed in the assumptions, encoder of the VAE is generally chosen to be multivariate gaussian with diagonal covariance, and the prior is selected to be a distribution, we can easily sample from like standard multivariate Gaussian.

$$
\begin{align}
q_{\phi}(\boldsymbol{z}|\boldsymbol{x}) & =\mathcal{N}(\boldsymbol{z};\mu_{\phi}(x),\sigma_{\phi}^{2}\mathbf{I}) \\
p(\boldsymbol{z}) & =\mathcal{N}(\boldsymbol{z};0,\mathbf{I})
\end{align}
$$

While training the model, the backward pass follows:
- Computing the KL term using closed form solution.
- For computing the likelihood term:
	- Encode x using $f_{\phi}(x)=\mu_{z},\sigma^{2}_{z}$
	- Sample z from the distribution $\mathcal{N}(\mu_{z},\sigma^{2}_{z})$
	- Decode z to obtain parameters for likelihood distribution $g_{\theta}(z)=\mu_{x},\sigma^{2}_{x}$
	- Measure the reconstruction error by computing the probability distribution $\log p_{\theta}[x|z]=\log \mathcal{N}(x;\mu_{x},\sigma^{2}_{x})\propto(x-\mu_{x})^{2}$

We want to compute gradient of $E_{z\sim q_{\phi}(z|x)}[\log p_{\theta}(x|z)]$ with respect to parameter $\phi$, but gradient does not follow z as it random due to being sampled from the distribution. The trick is to fix the parameters $\mu_{z},\sigma^{2}_{z}$ and write z as deterministic variable $z=\mu+\sigma^{2}\odot \boldsymbol{\varepsilon}$ where $\varepsilon\sim \mathcal{N}(0,I)$.

After training the VAE, to use it as a generative model, we can simply sample a latent variable $z\sim p(z)$ from the latent space, and run it through the decoder. VAE are able to learn a compressed, low-dimensional representation of the high-dimensional data manifold as dimension of $z$ is much less than $x$, and the output can be controlled by carefully editing the latent variable.

**Hierarchical VAE**: Introduced in \[2, 3\], HVAE can be seen as a generalisation of VAE to multiple hierarchies of latent variables. We can generate arbitrary graphical models to condition latent on all other previous latents, which themselves are generated from other higher-level, more abstract latents.

![hvae](thoughts/images/hvae.png)

To consider a simple example, take a Markovian chain of VAEs, where each decoding latent variable $z_{t}$ is dependent on the previous one $z_{t+1}$. This can be simply seen as a recursive stack of VAEs and we can model the joint distribution, and the posterior as:

$$
\begin{align}
p(x,z_{1:T})&=p(z_{T})p_{\theta}(x|z_{1})\prod_{t=2}^{T}p_{\theta}(z_{t-1}|z_{t}) \\
q_{\phi}(z_{1:T}|x) & =q_{\phi}(z_{1}|x)\prod_{t=2}^{T}q_{\phi}(z_{t}|z_{t-1})
\end{align}
$$

And similarly, ELBO can be extended:

$$
\begin{align}
\log p(x) & =\log \int p(x,z_{1:T})dz_{1:T} \\
 & =\log E_{q_{\phi}(z_{1:T}|x)}\left[ \frac{p(x,z_{1:T})}{q_{\phi}(z_{1:T}|x)} \right] \\
  & \geq E_{q_{\phi}(z_{1:T}|x)}\left[ \log \frac{p(x,z_{1:T})}{q_{\phi}(z_{1:T}|x)} \right]
\end{align}
$$

### References
- [33  Generative Modeling Meets Representation Learning – Foundations of Computer Vision](https://visionbook.mit.edu/generative_modeling_and_rep_learning.html)
- [Understanding Diffusion Models&#58; A Unified Perspective](https://www.calvinyluo.com/2022/08/26/diffusion-tutorial.html)
- [From Autoencoder to Beta-VAE \| Lil'Log](https://lilianweng.github.io/posts/2018-08-12-vae/)
- [Eric Jang: A Beginner's Guide to Variational Methods: Mean-Field Approximation](https://blog.evjang.com/2016/08/variational-bayes.html)

1. Kingma, D. P., & Welling, M. (2013). Auto-encoding variational bayes. _arXiv preprint arXiv:1312.6114_.
2. Sønderby, C. K., Raiko, T., Maaløe, L., Sønderby, S. K., & Winther, O. (2016). Ladder variational autoencoders. _Advances in neural information processing systems_, _29_.
3. Kingma, D. P., Salimans, T., Jozefowicz, R., Chen, X., Sutskever, I., & Welling, M. (2016). Improved variational inference with inverse autoregressive flow. _Advances in neural information processing systems_, _29_.
