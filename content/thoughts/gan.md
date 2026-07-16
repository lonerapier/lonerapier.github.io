---
title: Generative Adversarial Networks
date: 2026-04-20
tags:
- machine-learning
- generative-modeling
- notes
---

> [!note] KL Divergence, Jensen-Shannon Divergence and f-divergence
>
> Given two probability distributions p and q,
> 
> **KL divergence** $D_{\text{KL}}(p\|q)$ measures how "far" q is from p without requiring that D is a metric.
> $$
> \begin{align}
> D_{\text{KL}}(p\|q)&=\sum_{k=1}^{K}p_{k}\log \frac{p_{k}}{q_{k}}=\int p(x)\log \frac{p(x)}{q(x)}dx \\
> &=\underbrace{ \sum_{k=1}^{K}p_{k}\log p_{k} }_{-\mathbb{H}(p) }-\underbrace{ \sum_{k=1}^{K}p_{k}\log q_{k} }_{ \mathbb{H}_{\text{ce}}(p,q) }
> \end{align}
> $$
> - $D_{\text{KL}}\geq0$ with equality iff p=q. Can be proven using Jensen's inequality.
> - Asymmetric, i.e. $D_{\text{KL}}(p\|q)\neq D_{\text{KL}}(q\|p)$
> - Minimising KL divergence to the empirical distribution is equivalent to maximising likelihood.
>
> **Jensen-Shannon divergence**
> $$
> D_{\text{JS}}(p\|q)=\frac{1}{2}D_{\text{KL}}\left( p\|\frac{p+q}{2} \right)+\frac{1}{2}D_{\text{KL}}\left( q\| \frac{p+q}{2} \right)
> $$
> JS divergence is **symmetric** and more smooth.

GAN consists of two models:
- **Discriminator** or critic $D_{\phi}:\mathcal{X}\to\Delta$ is a comparison model that estimates the probability that the sample $q$ matches the true distribution $p^{*}$.
- **Generator** $G_{\theta}:\mathcal{Z\to X}$ that outputs samples, given a latent variable $z$, as close to true distribution. Or informally, generator's job is to trick the critic into offering a high probability for the synthetic output.

Our goal is to play the adversarial game between $D_{\phi}$ and $G_{\theta}$, where the generator tries to create images that match the true distribution as close as possible, and critic becomes better at detecting any errors generator is making by classifying the generated samples.

We can compare the two distribution by computing the density ratio $r(x)=\frac{p^{*}(x)}{q_{\theta}(x)}$, and converting the problem into binary classification: $\frac{p^{*}(x)}{q_{\theta}(x)}=\frac{D(x)}{1-D(x)}$. Using cross-entropy loss, objective becomes

$$
\begin{align}
V(q_{\theta},p^{*})&=\underset{ \phi }{ \arg \max }E_{p(x|y)p(y)}[y\log D_{\phi}(x)+(1-y)\log(1-D_{\phi}(x))] \\
\end{align}
$$

Optimal discriminator's maximises the probability of classifying true distribution $E_{x\sim p_{\mathcal{D}}(x)}[\log D_{\phi}(x)]$, and maximises the probability of detecting a fake sample $E_{z\sim p_{z}}[\log(1-D_{\phi}(G_{\theta}(z)))]$. While generator's objective is to minimise the discriminator's probability of classifying incorrect samples $E_{z\sim p_{z}}[\log(1-D_{\phi}^{*}(G_{\theta}(z)))]$.

Together this turns into minimax game:

$$
\arg \min_{\theta}\max_{\phi}E_{x\sim p_{\mathcal{D}}}[\log D_{\phi}(x)]+E_{z\sim p_{z}}[\log(1-D_{\phi}(G_{\theta}(z)))]
$$