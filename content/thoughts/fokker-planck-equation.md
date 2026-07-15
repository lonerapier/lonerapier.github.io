---
title: Fokker-Planck Equation and Diffusion Models
date: 2026-07-07
tags:
  - machine-learning
  - deep-learning
  - generative-modeling
  - stochastic-processes
  - diffusion-modelling
---

> [!questions] Questions that we're going to answer in this document:
> 1. Why FP equation is necessary to show that stochastic equation used in score-based models preserve the intermediate distribution?
> 2. Write Fokker-Planck equation. Understand the physical intuition behind it.
> 3. Derive FP equation, and reverse SDE using FP equation.
> 4. Derive PF-ODE from the SDE and FP equation.

For the drift function $f:\mathbb{R}^{d}\times \mathbb{R}\to \mathbb{R}^{d}$ and diffusion function $g:\mathbb{R}^{d}\times \mathbb{R}\to \mathbb{R}^{d\times d}$ SDE,

$$dX_{t}=f(X_{t},t)dt+g(X_{t},t)dW_{t}$$