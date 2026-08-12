---
title: Sampling
date: 2026-05-05
tags:
- machine-learning
- deep-learning
- statistics
- draft
- notes
---

# 1 Inverse Transform
Suppose the analytical formula for PDF of a distribution is known, and we want to sample from the distribution. We know that range of CDF of a distribution is between \[0,1\]. By sampling from a uniform \[0,1\] distribution, and then inverting the CDF will give the respected sample from the domain.
- Generate $z\sim U(0,1)$
- We want $y\sim p(y)$, so we need a transformation $y=g(z)$
- Using change of variables formula, we get $p(y)=p(z)\left\lvert  \frac{dz}{dy} \right\rvert$
- Integrating both sides, we get $\underbrace{ \int p(y)dy }_{ \text{CDF}=h(y) }=\int dz$. Note: ($p(z)=1$ as $z\sim U(0,1)$).
- By inverting the CDF, we get $y=h^{-1}(z)$. We can prove that $h^{-1}(z)=\inf\{ z\ |\ h(y)\geq z \}$ because CDF is a monotonic increasing continuous function.

Thus, if a distribution CDF is analytically invertible, we can use Inverse transform method to sample from any univariate distribution. But this directly doesn't work with distribution with unknown CDF, and one such distribution that's highly relevant in real-world use cases is Gaussian distribution.

## 1.1 Box-Muller Method

# 2 Rejection Sampling


# 3 Importance Sampling

# 4 MCMC

## 4.1 Metropolis-Hastings

## 4.2 Gibbs

## 4.3 Hamiltonian

## 4.4 Langevin

[A Simplified Overview of Langevin Dynamics \| Roy Friedman](https://friedmanroy.github.io/blog/2022/Langevin/)

# 5 References
- Murphy, Kevin P. _Probabilistic machine learning: Advanced topics_. MIT press, 2023.
- [The intuition behind the Hamiltonian Monte Carlo algorithm - YouTube](https://youtu.be/a-wydhEuAm0)
- [Metropolis - Hastings : Data Science Concepts - YouTube](https://youtu.be/yCv2N7wGDCw)
- [MATH\_285J\_topics\_in\_high\_dimensional\_sampling\_and\_generative\_diffusion.pdf](https://yifanc96.github.io/slides/MATH_285J_topics_in_high_dimensional_sampling_and_generative_diffusion.pdf)