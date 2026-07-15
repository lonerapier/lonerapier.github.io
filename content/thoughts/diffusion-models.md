---
title: Diffusion Models
date: 2026-05-05
tags:
  - machine-learning
  - generative-modeling
  - notes
---

> Most of these notes are inspired from amazing posts, tutorials, and research papers mentioned in the reference. I urge readers to look at them, before reading this.

Variational Diffusion Models are just Markovian [[thoughts/vae|HVAE]] with following modifications:
1. Input dimension and latent dimension is exactly equal.
2. Latent encoder at each step is pre-defined as Linear Gaussian model aka. Gaussian distribution centred at output from previous timestamp, and is not learned.
3. Latent distributions are added in such a manner that latent at final timestamp is standard Gaussian.

If latent and input dimension is equal, that means for timestamp $t\in\{1,\dots,T\}$, the posterior is equal to:

$$
q(x_{1:T}|x_{0})=\prod_{t=1}^{T}q(x_{t}|x_{t-1})
$$

Then, from the second assumption, each encoder $q(\mathbf{x}_{t}|\mathbf{x}_{t-1})$ is a linear gaussian model, which we write as $q(\mathbf{x}_{t}|\mathbf{x}_{t-1})=\mathcal{N}(\mathbf{x}_{t}|\sqrt{ \alpha_{t} }\mathbf{x}_{t-1},\sqrt{ 1-\alpha_{t} }\mathbf{I})$. Think of this step as adding noise gradually at each step into the data, and initial input $\mathbf{x}_{0}\sim q(\mathbf{x}_{0})$ is sampled from real data distribution, and is termed as **Forward diffusion process**. The coefficients $\alpha_{t}$ for each step can either be set as hyperparameters in the network [DDPM] or learned as parameters [VDM]. The reason for choosing the Gaussian encoder in this specific form is to keep the variance of latent variables at similar scale, i.e. the encoding process is *variance-preserving*.  We can telescope the error to calculate $q(\mathbf{x}_{t}|\mathbf{x}_{0})$ by combining the gaussians.

$$
\begin{align}
\mathbf{x}_{t} & =\sqrt{ \alpha_{t} }\mathbf{x}_{t-1}+\sqrt{ 1-\alpha_{t} }\epsilon_{t} \\
 & = \sqrt{ \alpha_{t}\alpha_{t-1} }\mathbf{x}_{t-2}+\sqrt{\alpha_{t}( 1-\alpha_{t-1} })\epsilon_{t-2}+\sqrt{ 1-\alpha_{t} }\epsilon_{t-1}
\end{align}
$$

> [!note] Linear combinations of Gaussians = Gaussian.
> Let $\tilde{\epsilon}=c_{t}\epsilon_{t-1}+c_{t-1}\epsilon_{t-2}$, and $\tilde{\epsilon}\sim \mathcal{N}(0,\sigma^{2}I)$. We need to find $\text{Var}(\tilde{\epsilon})$ which equals $c^{2}I$. Thus, $\sigma^{2}=1-\alpha_{t}+\alpha_{t}(1-\alpha_{t-1})=1-\alpha_{t}\alpha_{t-1}$.

Telescoping till the last state, we get:
$$
\boxed{ q(\mathbf{x}_{t}|\mathbf{x}_{0})=\mathcal{N}(\mathbf{x}_{t};\sqrt{ \bar{\alpha}_{t} }\mathbf{x}_{0},(1-\bar{\alpha}_{t})I)}
$$

where $\bar{\alpha}_{t}=\prod_{k=1}^{t}\alpha_{k}$. Noise schedule is chosen such that scale term converges to 0, $\bar{\alpha}_{T}\approx0$, and the final sample turns into an isotropic Gaussian $q(\mathbf{x}_{T}|\mathbf{x}_{0})\approx \mathcal{N}(0,I)$. In other words, the forward process is defined as a *Linear Gaussian Markov chain* and the joint distribution conditioned on the input $\mathbf{x}_{0}$ thus, is defined over all latent states as $$q(\mathbf{x}_{1:T}|\mathbf{x}_{0})=\prod_{t=1}^{T}q(\mathbf{x}_{t}|\mathbf{x}_{t-1})$$

![VDM](thoughts/images/vdm.png)

**Reverse Diffusion Process**: We invert the forward process to find $q(\mathbf{x}_{t-1}|\mathbf{x}_{t})$, but this is intractable as we need to know the whole distribution to compute $q(\mathbf{x}_{t})=\int q(\mathbf{x}_{t}|\mathbf{x}_{0})q(\mathbf{x}_{0})d\mathbf{x}_{0}$ so we condition the distribution on $\mathbf{x}_{0}$ and compute $q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})$. Using Bayes rule and Markov property ($q(\mathbf{x}_{t}|\mathbf{x}_{t-1},\mathbf{x}_{0})=q(\mathbf{x}_{t}|\mathbf{x}_{t-1})$)
$$
\begin{align}
q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})&=\frac{q(\mathbf{x}_{t}|\mathbf{x}_{t-1},\mathbf{x}_{0})q(\mathbf{x}_{t-1}|\mathbf{x}_{0})}{q(\mathbf{x}_{t}|\mathbf{x}_{0})} & \text{Using Bayes rule} \\
 & = \frac{q(\mathbf{x}_{t}|\mathbf{x}_{t-1})q(\mathbf{x}_{t-1}|\mathbf{x}_{0})}{q(\mathbf{x}_{t}|\mathbf{x}_{0})} & \text{Markov property} \\
  & \propto q(\mathbf{x}_{t}|\mathbf{x}_{t-1})q(\mathbf{x}_{t-1}|\mathbf{x}_{0}) & \text{Keep terms with $x_{t-1}$}
\end{align}
$$

Computing the product of Gaussians gives another Gaussian, $q(x_{t-1}|x_{t},x_{0})=\mathcal{N}(x_{t-1}|\tilde{\mu}_{t}(x_{t},x_{0}),\tilde{\beta}_{t}I)$

$$
\begin{align}
q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})&\propto q(\mathbf{x}_{t}|\mathbf{x}_{t-1})q(\mathbf{x}_{t-1}|\mathbf{x}_{0}) \\
 & = \exp\left( -\frac{1}{2} \left( \frac{(\mathbf{x}_{t}-\sqrt{ \alpha_{t} }\mathbf{x}_{t-1})^{2}}{\beta_{t}}+ \frac{(\mathbf{x}_{t-1}-\sqrt{ \bar{\alpha}_{t-1} }\mathbf{x}_{0})^{2}}{1-\bar{\alpha}_{t-1}} \right) \right) \\
  & =\exp\left( -\frac{1}{2}\left( \left( \frac{\alpha_{t}}{\beta_{t}}+\frac{1}{1-\bar{\alpha}_{t-1}} \right)\mathbf{x}_{t-1}^{2} -2\mathbf{x}_{t-1}\left( \frac{\bar{\alpha}_{t}}{\beta_{t}}\mathbf{x}_{t}+ \frac{\sqrt{ \bar{\alpha}_{t-1} }}{1-\bar{\alpha}_{t-1}}\mathbf{x}_{0} \right)+C \right) \right) & \text{C contains term not involving $x_{t-1}$} \\
\end{align}
$$

Using Gaussian property: $\exp\left( -\frac{1}{2}(x^{\top}Ax+b^{\top}x) \right)\sim \mathcal{N}(A^{-1}b,A^{-1})$

$$
\begin{align}
A=\left( \frac{\alpha_{t}}{\beta_{t}}+\frac{1}{1-\bar{\alpha}_{t-1}} \right)I \\
b=\frac{\sqrt{ \alpha_{t} }}{\beta_{t}}x_{t}+\frac{\sqrt{ \bar{\alpha}_{t-1} }}{1-\bar{\alpha}_{t-1}}x_{0}
\end{align}
$$

Calculating parameters $\mu_{q}(x_{t},x_{0}),\tilde{\beta}_{q}$,

$$
\begin{align}
\tilde{\beta}_{q}=A^{-1}&=\left( \frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_{t}} \right)\beta_{t} \\
\mu_{q}(\mathbf{x}_{t},\mathbf{x}_{0})=A^{-1}b&=\left( \frac{1-\bar{\alpha}_{t-1}}{1-\bar{\alpha}_{t}} \right)(1-\alpha_{t})\left( \frac{\sqrt{ \alpha_{t} }}{(1-\alpha_{t})}\mathbf{x}_{t}+\frac{\sqrt{ \bar{\alpha}_{t-1} }}{1-\bar{\alpha}_{t-1}}\mathbf{x}_{0} \right) \\
&=\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t}}\mathbf{x}_{t}+\frac{\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})}{1-\bar{\alpha}_{t}}\mathbf{x}_{0} \\
&= \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} \mathbf{x}_t + \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_t}{1 - \bar{\alpha}_t} \frac{1}{\sqrt{\bar{\alpha}_t}}(\mathbf{x}_t - \sqrt{1 - \bar{\alpha}_t}\boldsymbol{\epsilon}_t) \\
&= \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{1 - \alpha_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_t \right)
\end{align}
$$

where $\mathbf{x}_{0}=\frac{1}{\sqrt{ \bar{\alpha}_{t} }}(\mathbf{x}_{t}-\sqrt{ 1-\bar{\alpha}_{t} }\boldsymbol{\epsilon}_{t})$. Contrary to forward diffusion process, as t decreases to 0, mean of the distribution estimates $x_{0}$ and variances tends to 0.

We can write the final Gaussian form of $q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})$ as
$$
\begin{equation}\boxed{
q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})\propto \mathcal{N}\left( \mathbf{x}_{t-1};\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})\mathbf{x}_{t}+\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})\mathbf{x}_{0}}{1-\bar{\alpha}_{t}}, \frac{(1-\alpha_{t})(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t}}\mathbf{I} \right)
}\end{equation}
$$

Our goal is to train a generative model that learns the reverse diffusion process to approximate the above distribution: $p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})=\mathcal{N}(\mathbf{x}_{t-1}|\mu_{\theta}(\mathbf{x}_{0},\mathbf{x}_{t}),\Sigma_{\theta}(\mathbf{x}_{t},t))$. The process is defined as Markov chain with learned Gaussian parameters starting at $p(\mathbf{x}_{T})=\mathcal{N}(\mathbf{x}_{T};0,\mathbf{I})$. Joint distribution of all the generated variables is given by

$$
\begin{equation}
p_{\theta}(\mathbf{x}_{0:T})=p(\mathbf{x}_{T})\prod_{t=1}^{T}p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})
\end{equation}
$$

**Model Fitting**: We can maximise the model log likelihood: $\log p_{\theta}(\mathbf{x}_{0})$

$$
\begin{align}
\log p_{\theta}(\mathbf{x}_{0})&=\log\int p_{\theta}(\mathbf{x}_{0}|\mathbf{x}_{1:T})p_{\theta}(\mathbf{x}_{1:T})d\mathbf{x}_{1:T} \\
 & =\log \int p_{\theta}(\mathbf{x}_{0:T})d\mathbf{x}_{1:T}
\end{align}
$$
But this integral is intractable due to dependency on all the latent variables during denoising process. Using variational inference, we can compute the evidence lower bound (**ELBO**) similar to VAEs, and optimise the negative log likelihood.

$$
\begin{align}
-\log p_{\theta}(\mathbf{x}_{0}) & =-\log \int \frac{p_{\theta}(\mathbf{x}_{0:T})}{q(\mathbf{x}_{1:T}|\mathbf{x}_{0})}q(\mathbf{x}_{1:T}|\mathbf{x}_{0}) d\mathbf{x}_{1:T} \\
 & \geq -\int d\mathbf{x}_{1:T}q(\mathbf{x}_{1:T}|\mathbf{x}_{0})\log \frac{p_{\theta}(\mathbf{x}_{0:T})}{q(\mathbf{x}_{1:T}|\mathbf{x}_{0})}  & \text{(Jensen's Inequality)}\\
 & \geq -\mathbb{E}_{q}\left[ \log p(\mathbf{x}_{T})+\log\prod_{t=1}^{T}\frac{p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})}{q(x_{t}|x_{t-1})} \right]  & \text{($p_{\theta}, q$ definitions)} \\
 & =-\mathbb{E}_{q}\left[ \log p(\mathbf{x}_{T})+\sum_{t=1}^{T} \log \frac{p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})}{q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})} \frac{q(\mathbf{x}_{t-1}|\mathbf{x}_{0})}{q(\mathbf{x}_{t}|\mathbf{x}_{0})} \right] & (\text{Bayes' rule}) \\
 & =-\mathbb{E}_{q}\left[ \log p(\mathbf{x}_{T})+\sum_{t=2}^{T} \log \frac{p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})}{q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})}+\sum_{t=2}^{T} \log \frac{q(\mathbf{x}_{t-1}|\mathbf{x}_{0})}{q(\mathbf{x}_{t}|\mathbf{x}_{0})} +\log \frac{p_{\theta}(\mathbf{x}_{0}|\mathbf{x}_{1})}{q(\mathbf{x}_{1}|\mathbf{x}_{0})}\right] \\
 & =-\mathbb{E}_{q}\left[ \log \frac{p(\mathbf{x}_{T})}{q(\mathbf{x}_{T}|\mathbf{x}_{0})}+ \sum_{t=2}^{T} \log \frac{p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})}{q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})}+\log p_{\theta}(\mathbf{x}_{0}|\mathbf{x}_{1})\right]  \\
 & =\underbrace{ D_{\text{KL}}(q(\mathbf{x}_{T}|\mathbf{x}_{0})\|p(\mathbf{x}_{T})) }_{ L_{T}(\text{prior matching term}) }+ \sum_{t=2}^{T} \underbrace{\mathbb{E}_{q(\mathbf{x}_{t}|\mathbf{x}_{0})}[D_{\text{KL}}(q(\mathbf{x}_{t-1}|\mathbf{x}_{t})\|p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})) ]}_{ L_{t-1}(\text{denoising term}) }-\underbrace{ \mathbb{E}_{q(\mathbf{x}_{1}|\mathbf{x}_{0})}[\log p_{\theta}(\mathbf{x}_{0}|\mathbf{x}_{1})] }_{ L_{0}(\text{reconstruction term}) }
\end{align}
$$

We can write the variational lower bound loss as the combination of separate KL terms for each time step: $L_{t}$. Every KL term (except for $L_{0}$) compares $q,p_{\theta}$ which are both Gaussians and can be computed in closed form.

Let's interpret the ELBO term by term:
1. $L_{0}$ can be interpreted as reconstruction term, which is analogous to the reconstruction term in the ELBO for VAE, and can be approximated using MC estimate.
2. $L_{T}$, or the prior matching term measures the final noisy output with the prior $p(\mathbf{x}_{T})$ which is the standard Gaussian. As can be noted, this term has no trainable parameters, and is ignored during training.
3. $L_{t}$, or the denoising matching term that measures the divergence between the learned denoising step with the ground truth denoising transition. Optimizing the loss function means minimizing this term with respect to the ground truth signal.

> [!note] Closed form KL for Gaussian distribution
> Computing the KL term using closed form solution for d-dimensional Gaussian distributions. $D_{\text{KL}}(\mathcal{N}(a,\Sigma_{a})\|\mathcal{N}(b,\Sigma_{b}))=\frac{1}{2}\left(\log\frac{\det\Sigma_{b}}{\det\Sigma_{a}}-d+ (a-b)^{\top}\Sigma_{b}^{-1}(a-b)+\mathrm{Tr}(\Sigma_{b}^{-1}\Sigma_{a})\right)$.

Note that in the ELBO term, majority of the optimisation cost lies in the denoising term. We need to train a parametrised model $p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})=\mathcal{N}(\mathbf{x}_{t-1};\mu_{\theta}(\mathbf{x}_{t},\mathbf{x}_{0}),\Sigma_{\theta}(\mathbf{x}_{t},t))$ to learn the reversed diffusion process. We can simplify the optimisation problem by modelling learned denoising process $p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})$ as Gaussian, and since $\alpha$ terms are frozen at timestep, we can set $\Sigma_{q}=\sigma^{2}_{q}\mathbf{I}=\beta_{q}\mathbf{I}$:

$$
\begin{align}
 & \arg \min_{\theta}D_{\text{KL}}(q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})\|p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})) \\
 = & \arg \min_{\theta}D_{\text{KL}}(\mathcal{N}(\mathbf{x}_{t-1};\mu_{q},\Sigma_{q}(t))\|\mathcal{N}(\mathbf{x}_{t-1};\mu_{\theta},\Sigma_{q}(t))) \\
 =&\arg \min_{\theta} \frac{1}{2}\left( \log \frac{\det\Sigma_{q}}{\det\Sigma_{q}}-d+ (\mu_{\theta}-\mu_{q})^{\top}\Sigma_{q}^{-1}(\mu_{\theta}-\mu_{b})+\mathrm{Tr}(\Sigma_{q}^{-1}\Sigma_{q})\right) \\
= & \arg \min_{\theta} \frac{1}{2\sigma^{2}_{q}(t)}\left[\lVert \mu_{\theta}-\mu_{q} \rVert^{2}_{2} \right]
\end{align}
$$

Thus, Our goal for the model is to predict $\mu_{\theta}\approx \tilde{\mu}_{t}=\frac{1}{\sqrt{ \alpha_{t} }}\left( \mathbf{x}_{t}- \frac{\beta_{t}}{\sqrt{ 1-\bar{\alpha}_{t} }}\epsilon_{t} \right)$.

We can further write $\mu_{\theta}(\mathbf{x}_{t},t)$ which conditions on $\mathbf{x}_{t}$ to match $\mu_{q}(\mathbf{x}_{t},\mathbf{x}_{0})$ as

$$
\begin{align}
\mu_{q}(\mathbf{x}_{t},\mathbf{x}_{0})&=\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t}}\mathbf{x}_{t}+\frac{\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})}{1-\bar{\alpha}_{t}}\mathbf{x}_{0} \\
\mu_{\theta}(\mathbf{x}_{t},t) & =\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t}}\mathbf{x}_{t}+\frac{\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})}{1-\bar{\alpha}_{t}}\mathbf{\hat{x}}_{\theta}(\mathbf{x}_{t},t) \\ \\
\end{align}
$$

which simplifies the optimisation term to

$$
\begin{align}
 & \arg \min_{\theta}D_{\text{KL}}(q(\mathbf{x}_{t-1}|\mathbf{x}_{t},\mathbf{x}_{0})\|p_{\theta}(\mathbf{x}_{t-1}|\mathbf{x}_{t})) \\ 
= & \arg \min_{\theta} \frac{1}{2\sigma^{2}_{q}(t)} \frac{\bar{\alpha}_{t-1}(1-\alpha_{t})^{2}}{(1-\bar{\alpha}_{t})^{2}}[\lVert \mathbf{\hat{x}}_{\theta}(\mathbf{x}_{t},t)-\mathbf{x}_{0} \rVert_{2}^{2} ]
\end{align}
$$

Optimisation goal is equal to learning a neural network that can predict the original input using any noisy version of it, at any timestep $t$. Across all timestamps, the optimisation term can be approximated as  minimising the expectation over all time steps:

$$
\begin{align}
& \quad \,\underset{\boldsymbol{\theta}}{\arg \min}\, \sum_{t=2}^{T} \mathbb{E}_{q(\mathbf{x}_{t}\mid\mathbf{x}_0)}\left[\mathcal{D}_{\text{KL}}(q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0) \mid\mid p_{\boldsymbol{\theta}}(\mathbf{x}_{t-1}\mid\mathbf{x}_t))\right] \nonumber \\
 &= \underset{\boldsymbol{\theta}}{\arg \min}\, \mathbb{E}_{t\sim U\{2, T\}}\left[\mathbb{E}_{q(\mathbf{x}_{t}\mid\mathbf{x}_0)}\left[ \frac{1}{2\sigma_q^2(t)}\frac{\bar\alpha_{t-1}(1-\alpha_t)^2}{(1 -\bar{\alpha_{t}})^2}\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right] \right]\right]
\end{align}
$$

We can reparameterise the model to predict the noise $\epsilon_{t}$ instead of the directly predicting the denoised version $\mathbf{x}_{t-1}$. Notice,

$$
\begin{equation}
\mu_{\theta}(\mathbf{x}_{t},t)=\frac{1}{\sqrt{ \alpha_{t} }}\left( \mathbf{x}_{t}-\frac{\beta_{t}}{\sqrt{ 1-\bar{\alpha}_{t} }} \boldsymbol{\epsilon}_{\theta}(\mathbf{x}_{t},t)\right)
\end{equation}
$$

Usually $\Sigma_{\theta}$ is set to $\sigma_{t}^{2}I$, and setting $\sigma_{t}^{2}=\beta_{t}$ or $\sigma^{2}_{t}=\tilde{\beta}_{t}$ yield same results. We'll use the former, and compute the quantity:

$$
\begin{aligned}
L_t &= \mathbb{E}_{\mathbf{x}_0, \epsilon} \left[\frac{1}{2 \sigma^{2}_{t}} \| \tilde{\mu}_t(\mathbf{x}_t, \mathbf{x}_0) - \mu_\theta(\mathbf{x}_t, t) \|^2 \right] \\
&= \mathbb{E}_{\mathbf{x}_0, \epsilon} \left[\frac{1}{2\sigma^{2}_{t}} \left\| \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{1 - \alpha_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_t \right) - \frac{1}{\sqrt{\alpha_t}} \left( \mathbf{x}_t - \frac{1 - \alpha_t}{\sqrt{1 - \bar{\alpha}_t}} \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t) \right) \right\|^2 \right] \\
&= \mathbb{E}_{\mathbf{x}_0, \epsilon} \left[\frac{ (1 - \alpha_t)^2 }{2 \alpha_t (1 - \bar{\alpha}_t)\sigma^{2}_{t}} \|\boldsymbol{\epsilon}_t - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\|^2 \right] \\
&= \mathbb{E}_{\mathbf{x}_0, \epsilon} \left[\frac{ (1 - \alpha_t)^2 }{2 \alpha_t (1 - \bar{\alpha}_t)\sigma^{2}_{t}} \|\boldsymbol{\epsilon}_t - \boldsymbol{\epsilon}_\theta(\sqrt{\bar{\alpha}_t}\mathbf{x}_0 + \sqrt{1 - \bar{\alpha}_t}\boldsymbol{\epsilon}_t, t)\|^2 \right] 
\end{aligned}
$$

[Ho et al.](https://arxiv.org/abs/2006.11239) found empirically that removing the weighting term in $L_{t}$ loss improved the generation output.

> [!todo] write a timeline on how and when diffusion models were introduced and what improved/added what?
> - [\[2006.11239\] Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)
> - [\[2102.09672\] Improved Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2102.09672)
> - [\[2107.00630\] Variational Diffusion Models](https://arxiv.org/abs/2107.00630)
> - [\[2511.13720\] Back to Basics: Let Denoising Generative Models Denoise](https://arxiv.org/abs/2511.13720)

**Learning Noise schedule**

In the beginning, we said that noise parameters can be set as hyperparameters of the network or learned simultaneously with the neural network. Let's now see how is it possible to learn the noise parameters.

Our first naive approach could be to model $\alpha_{t}$ using another network $\hat{\alpha}_{\eta}(t)$ with parameters $\eta$, but this quickly turns into a problem of finding the true signal for these parameters which could be harder to define and track, and then running multiple inference for each time step. Let's look a more natural way to define the noise. Let's take the ELBO term and rewrite it,

$$
\begin{align}
\frac{1}{2\sigma_q^2(t)}\frac{\bar\alpha_{t-1}(1-\alpha_t)^2}{(1 -\bar\alpha_{t})^2}\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right] = \frac{1}{2}\left(\frac{\bar\alpha_{t-1}}{1 - \bar\alpha_{t-1}} -\frac{\bar\alpha_t}{1 -\bar\alpha_{t}}\right)\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right]
\end{align}
$$

With $q(\mathbf{x}_{t}|\mathbf{x}_{0})\sim \mathcal{N}(\mathbf{x}_{t};\sqrt{ \bar{\alpha}_{t} }\mathbf{x}_{0},(1-\bar{\alpha}_{t})\mathbf{I})$, then using the definition of signal to noise ratio, we can write $\text{SNR}(t)=\frac{\mu^{2}}{\sigma^{2}}$. Our derived ELBO term now can be rewritten as

$$
\begin{align}
\frac{1}{2\sigma_q^2(t)}\frac{\bar\alpha_{t-1}(1-\alpha_t)^2}{(1 -\bar\alpha_{t})^2}\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right] &= \frac{1}{2}\left(\text{SNR}(t-1) -\text{SNR}(t)\right)\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right]
\end{align}
$$

In a diffusion model, we require the SNR to decrease monotonically with time t. This is ensured by defining $\text{SNR}(t)=\exp(-\gamma_{\eta}(t))$, where $\gamma_{\eta}$ is a monotonic increasing neural network. Due to SNR being decreasing, it eventually reaches 0 which is analogous to the final output being standard Gaussian noise. The final optimization equation is now minimized over both $\theta,\eta$ to be

$$
\begin{align}
& \quad \,\underset{\boldsymbol{\theta}, \,\boldsymbol{\eta}}{\arg\min}\, \sum_{t=2}^{T} \mathbb{E}_{q(\mathbf{x}_{t}\mid\mathbf{x}_0)}\left[\mathcal{D}_{\text{KL}}(q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0) \mid\mid p_{\boldsymbol{\theta}}(\mathbf{x}_{t-1}\mid\mathbf{x}_t))\right] \nonumber \\
&= \underset{\boldsymbol{\theta}, \,\boldsymbol{\eta}}{\arg\min}\, \mathbb{E}_{t\sim U\{2, T\}}\left[\mathbb{E}_{q(\mathbf{x}_{t}\mid\mathbf{x}_0)}\left[ \frac{1}{2}\left(\text{SNR}(t-1) -\text{SNR}(t)\right)\left[\left\lVert\hat{\mathbf{x}}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \mathbf{x}_0\right\rVert_2^2\right] \right]\right]
\end{align}
$$

**Alternative view of Diffusion using Score function**

VDM formulation of diffusion models that we've derived in the previous section is also directly related with another interpretation using score function, which is the gradient of the log-probability wrt x, $\nabla_{\mathbf{x}}\log p(\mathbf{x})$. To see this, we'll first introduce Tweedie's formula, which states that true mean of an exponential family distribution, given samples from a distribution, is equal to max likelihood estimate of the samples (aka. empirical mean), along with a term that contains the score. Mathematically, for a Gaussian: $z\sim\mathcal{N}(z;\mu_{z},\Sigma_{z})$,

$$
\begin{equation}
\mathbb{E}[\mu_{z}|z]=z+\Sigma_{z}\nabla_{z}\log p(z)
\end{equation}
$$

Applying the Tweedie's formula to the posterior: $q(\mathbf{x}_{t}|\mathbf{x}_{0})=\mathcal{N}(\mathbf{x}_{t};\sqrt{ \bar{\alpha}_{t} }\mathbf{x}_{0},(1-\bar{\alpha}_{t})\mathbf{I})$,
$$
\begin{align}
\mathbb{E}[\mu_{\mathbf{x}_{t}}|\mathbf{x}_{t}] & =\mathbf{x}_{t}+(1-\bar{\alpha}_{t})\nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t}) \\
\sqrt{ \bar{\alpha}_{t} }\mathbf{x}_{0} & =\mathbf{x}_{t}+(1-\bar{\alpha}_{t})\nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t}) \\
\mathbf{x}_{0} & =\frac{\mathbf{x}_{t}+(1-\bar{\alpha}_{t})\nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t})}{\bar{\alpha}_{t}}
\end{align}
$$

We can use the alternate parametrization from noising step into the mean $\mu_{q}(\mathbf{x}_{t},\mathbf{x}_{0})$ of denoising step:

$$
\begin{align}
\mu_{q}(\mathbf{x}_{t},\mathbf{x}_{0}) & =\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})\mathbf{x}_{t}+\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})\mathbf{x}_{0}}{1-\bar{\alpha}_{t}} \\
 & =\frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})\mathbf{x}_{t}+\sqrt{ \bar{\alpha}_{t-1} }(1-\alpha_{t})\frac{\mathbf{x}_{t}+(1-\bar{\alpha}_{t})\nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t})}{\bar{\alpha}_{t}}
}{1-\bar{\alpha}_{t}} \\
 & =\left( \frac{\sqrt{ \alpha_{t} }(1-\bar{\alpha}_{t-1})}{1-\bar{\alpha}_{t}} +\frac{1-\alpha_{t}}{(1-\bar{\alpha}_{t})\sqrt{ \alpha_{t} }}\right)\mathbf{x}_{t}+\frac{1-\alpha_{t}}{\sqrt{ \alpha_{t} }}\nabla \log p(\mathbf{x}_{t}) \\
  & =\frac{1-\bar{\alpha}_{t}}{(1-\bar{\alpha}_{t})\sqrt{ \alpha_{t} }}\mathbf{x}_{t}+\frac{1-\alpha_{t}}{\sqrt{ \alpha_{t} }}\nabla \log p(\mathbf{x}_{t}) \\
	 & =\frac{1}{\sqrt{ \alpha_{t} }}\mathbf{x}_{t}+\frac{1-\alpha_{t}}{\sqrt{ \alpha_{t} }}\nabla \log p(\mathbf{x}_{t})
\end{align}
$$

Then, we can approximate the score using a neural network $s_{\theta}(\mathbf{x}_{t},t)$ in the approximate denoising step. The new mean becomes $$\mu_{\theta}(\mathbf{x}_{t},t)=\frac{1}{\sqrt{ \alpha_{t} }}\mathbf{x}_{t}+\frac{1-\alpha_{t}}{\sqrt{ \alpha_{t} }}s_{\theta}(\mathbf{x}_{t},t)$$, with the new optimization problem updated to,

$$
\begin{align}
& \quad \,\underset{\boldsymbol{\theta}}{\arg\min}\, \mathcal{D}_{\text{KL}}(q(\mathbf{x}_{t-1}\mid\mathbf{x}_t, \mathbf{x}_0) \mid\mid p_{\boldsymbol{\theta}}(\mathbf{x}_{t-1}\mid\mathbf{x}_t)) \nonumber \\
 &= \underset{\boldsymbol{\theta}}{\arg\min}\, \frac{1}{2\sigma_q^2(t)}\frac{(1-\alpha_t)^2}{\alpha_{t}}\left[\left\lVert\mathbf{s}_{\boldsymbol{\theta}}(\mathbf{x}_t, t) - \nabla \log p(\mathbf{x}_{t})\right\rVert_2^2\right]
\end{align}
$$

This leads to an alternative view of diffusion models, where on availability of ground truth scores of the distribution wrt $\mathbf{x}$, training a VDM is equivalent to training a neural network that predicts the score function, for any arbitrary noise level $\mathbf{x}_{t}$.

We can further extend this to equate $\mathbf{x}_{0}$ with the noise $\boldsymbol{\epsilon}_{0}$ by equating formula for $\mathbf{x}_{0}$ derived from Tweedie formula to reparameterization formula:

$$
\begin{align}
\boldsymbol{x}_0 = \frac{\boldsymbol{x}_t + (1 - \bar\alpha_t)\nabla\log p(\boldsymbol{x}_t)}{\sqrt{\bar\alpha_t}} &= \frac{\boldsymbol{x}_t - \sqrt{1 - \bar\alpha_t}\boldsymbol{\epsilon}_0}{\sqrt{\bar\alpha_t}}\\
\therefore (1 - \bar\alpha_t)\nabla\log p(\boldsymbol{x}_t) &= -\sqrt{1 - \bar\alpha_t}\boldsymbol{\epsilon}_0\\
\nabla\log p(\boldsymbol{x}_t) &= -\frac{1}{\sqrt{1 - \bar\alpha_t}}\boldsymbol{\epsilon}_0
\end{align}
$$

So, score function is equal to the noise along with a constant factor that decreases as time increases. Noisifying the input adds some noise in a direction, and intuitively, moving opposite in the direction of noise must lead to opposite of noise, i.e. "denoising" step.

# Conditional Diffusion Models

We focus at deriving the generative model conditioned on some information. The simplest way would be maximise the conditional likelihood $p(x|c)$, where $c$ can be a scalar (class label) which can be mapped to embedding vector, and added into the network using spatial addition, or another image, or text prompt. We could then modify the neural network approximators of VDM with the additional information as $\hat{x}_{\theta}(x_{t},t,c)\approx x_{0},\hat{\epsilon}_{\theta}(x_{t},t,c)\approx\epsilon_{0},s_{\theta}(x_{t},t,c)\approx \nabla \log p(x_{t}|c)$. But the network has to be learned separately for each of the different kind of conditioning that we want to perform.

**Classifier Guidance**: Dhariwal et al. proposed classifier guidance to leverage pre-trained discriminative classifiers of the form $p_{\phi}(c|x)$ to control the generation process. Let's derive the objective, using bayes rule, we write: $\log p(x|c)=\log p(c|x)+\log p(x)-\log p(c)$. Taking the gradient with respect to x,

$$
\begin{equation}
\nabla_{x}\log p(x|c)=\underset{ \text{unconditional score} }{ \nabla_{x}\log p(x) }+\underset{ \substack{\text{adversarial} \\ \text{conditioning signal}} }{ \nabla_{x}\log p(c|x) }
\end{equation}
$$

In classifier guidance, apart from learning a network that learns to output the score of an unconditional diffusion model, a separate classifier has to be trained that outputs the value of conditional information $c$ given arbitrary noisy input $x$. Conditional information influence on the final score can be amplified by scaling it by a factor $\lambda>1$ such that:

$$
\begin{equation}
\nabla_{x}\log p(x|c)=\underset{ \text{unconditional score} }{ \nabla_{x}\log p(x) }+\underset{ \substack{\text{adversarial} \\ \text{conditioning signal}} }{ \lambda\nabla_{x}\log p(c|x) }
\end{equation}
$$

Now, the samples can be generated using a combination of unconditional score and conditioning signal, and then using the standard Annealed Langevin sampling procedure, or directly sampling from a Gaussian,

$$
x_{t-1}\sim \mathcal{N}(\mu+\lambda\Sigma g,\Sigma),\quad \mu=\mu_{\theta}(x_{t},t),\quad\Sigma=\Sigma_{\theta}(x_{t},t),\quad g=\nabla_{x_{t}}\log p_{\phi}(c|x_{t})
$$

**Classifier-free Guidance**

Training a classifier for different kind of conditioning is infeasible, and since the classifier is pre-trained, it may or may not map the noisy input to correct conditioning information. If we train it alongside the diffusion model, then it defeats the purpose of conditioning the generative model in the first place.

First, note that we can write classifier guidance equation such that $\nabla_{x}\log p(c|x)=\nabla_{x}\log p(x|c)-\nabla_{x}\log p(x)$, and then substituting the equation into the final weighted form:

$$
\begin{align}
\nabla_{x}\log p(x|c) & = \nabla_{x}\log p(x) + \lambda\nabla_{x}\log p(c|x) \\
\nabla_{x}\log p(x|c) & =\underset{ \text{conditional score} }{ \lambda \nabla \log p(x|c) }+\underset{ \text{unconditional score} }{ (1-\lambda)\nabla \log p(x) }
\end{align}
$$

We now need to learn two diffusion models, namely $p(x|c),p(x)$. But notice that unconditional model is equivalent to conditional model with $c=\emptyset$. Using the weight hyperparameter $\lambda$, the diffusion model can be guided in the direction that respects the conditioning information by using $\lambda>1$.

# Latent Diffusion Model

- What diffusion models have done until now is perform diffusion in pixel space directly, and the problem with that is pixel space is huge and also sparsely populated. This makes it difficult for the model to learn the image manifold, it also makes optimization hard to perform (requires hundreds of GPU), and inference is awfully slow.
- Idea: Run full diffusion in latent space of pretrained autoencoders.
- Why does the idea work?
	- An image consists of immense amount of information composed of many "pixels". Stripping away these seemingly irrelevant details should still give sufficient semantic information such that a diffusion model can learn the information manifold and produce relevant results.
	- Perceptual compression: An autoencoder is used to take a massive, high-resolution pixel image and squeeze it down into a much lower-dimensional representation.
	- Semantic compression: The diffusion model learns to focus on the conceptual and semantic structure of the data and image composition (concepts, objects, structures, relationship between objects, etc.) in the low dimensional space.
- Training is divided into two phases:
	- AE: train an autoencoder which provides a low-dimensional representation space. Only need to be trained once, and can be used with any downstream diffusion model.
	- Diffusion model: Train a conditional/unconditional diffusion model in the representational space.

- *"Our perceptual compression model is based on previous work and consists of an autoencoder trained by combination of a perceptual loss and a patch-based adversarial objective. This ensures that the reconstructions are confined to the image manifold by enforcing local realism and avoids bluriness introduced by relying solely on pixel-space losses such as L2 or L1 objectives."*
	- What are the variants of these pixel-space losses that induce bluriness in generated images? and what's the loss used by AE in this work?
- *"To pre-process y from various modalities (such as language prompts) we introduce a domain specific encoder $\tau_{\theta}$ that projects y to an intermediate representation $\tau_{\theta}(y)\in \mathbb{R}^{M\times d_{\tau}}$ , which is then mapped to the intermediate layers of the UNet via a cross-attention layer implementing $\text{Attention}(Q, K, V ) = \text{softmax}\left(  \frac{QK^{\top}}{√d} \right)· V$ , with $Q = W^{(i)}_{Q} · \varphi_{i}(z_{t}), K = W^{(i)}_{K} · \tau_{\theta} (y), V = W^{(i)}_{V} · \tau_{\theta}(y)$."*
	- *"Here, $\varphi_{i}(z_{t}) \in \mathbb{R}^{N \times d_{i}}$ denotes a (flattened) intermediate representation of the UNet implementing $\theta$ and $W^{(i)}_{V} \in \mathbb{R}{d\times d_{i}}, W^{(i)}_{Q} \in \mathbb{R}^{d\times d_{\tau}}$ & $W^{(i)}_{K} \in \mathbb{R}^{d\times d_{\tau}}$ are learnable projection matrices."*
- *"We employ the BERT-tokenizer and implement $\tau_{\theta}$ as a transformer to infer a latent code which is mapped into the UNet via (multi-head) crossattention."*

> [!note] Questions
> - **Autoregressive models (ARM) achieve strong performance in density estimation.**
>   
>   Why does AR model perform good in density estimation? What exactly is density estimation?
> - **How does VQ-VAE, VQ-GANs work?**
>   
>   VQ-VAEs use autoregressive models to learn an expressive prior over a discretized latent space. Different from VQ-VAEs, VQGANs employ a first stage with an adversarial and perceptual objective to scale autoregressive transformers to larger images.

# References
- [What are Diffusion Models? \| Lil'Log](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)
- [Understanding Diffusion Models&#58; A Unified Perspective](https://www.calvinyluo.com/2022/08/26/diffusion-tutorial.html)
- [Latent Diffusion (Stable Diffusion) \| José Salgado-Rojas](https://josesalgr.github.io/blog/2022/Stable-Diffusion/)
- PML Book 2, Chapter 25

1. Sohl-Dickstein, Jascha, et al. "Deep unsupervised learning using nonequilibrium thermodynamics." _International conference on machine learning_. pmlr, 2015.
2. Ho, Jonathan, Ajay Jain, and Pieter Abbeel. "Denoising diffusion probabilistic models." _Advances in neural information processing systems_ 33 (2020): 6840-6851.
3. Kingma, Diederik, et al. "Variational diffusion models." _Advances in neural information processing systems_ 34 (2021): 21696-21707.
4. Dhariwal, Prafulla, and Alexander Nichol. "Diffusion models beat gans on image synthesis." _Advances in neural information processing systems_ 34 (2021): 8780-8794.
5. Ho, Jonathan, and Tim Salimans. "Classifier-free diffusion guidance." _arXiv preprint arXiv:2207.12598_ (2022).