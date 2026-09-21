---
title: Discrete Diffusion
date: 2026-07-15
tags:
  - machine-learning
  - deep-learning
  - diffusion-modelling
  - generative-modeling
---
# Introduction

We've been working so far with continuous space $\mathbb{R}^{d}$ where we learned to predict mean posterior $\mathbb{E}[\mathbf{x}_{0}|\mathbf{x}_{t}]$, score or the noise itself. But in discrete space, the same strategy fails to hold.

- Why? Because there is no means to add continuous noise to a discrete input, so you might not get a valid input after adding random noise to data.
- Why should we care about discrete data in the first place? Well, because unlike images or audio, some modalities like text, molecules can be represented using a finite discrete vocabulary, and are more suited to be represented in discrete space.

# First Approach

Let's talk about some naïve first approaches.

> [!question] *What if we convert the text to an embedding vector, add gaussian noise, and perform diffusion in embedding space?*
>

# D3PM

# MDLM

# CTMC

# References
- [Continuous diffusion language models – Sander Dieleman](https://sander.ai/2026/08/24/continuous-dlms.html)
- [How to Build a Diffusion Language Model \| Kuleshov Group](https://kuleshov-group.github.io/blog/blog/2026/how-to-build-a-diffusion-language-model/)
- [GitHub - pengzhangzhi/Open-dLLM: Open diffusion language model for code generation — releasing pretraining, evaluation, inference, and checkpoints. · GitHub](https://github.com/pengzhangzhi/Open-dLLM)
- [GitHub - LiQiiiii/DLLM-Survey: \[TMLR‘26\] Discrete Diffusion in Large Language and Multimodal Models: A Survey · GitHub](https://github.com/LiQiiiii/DLLM-Survey)

- Reasoning for dLLMs
	- [d1: Scaling Reasoning in Diffusion Large Language Models via Reinforcement Learning](https://dllm-reasoning.github.io/)
	- [SPG: Sandwiched Policy Gradient for Masked Diffusion Language Models](https://chenyuwang-monica.github.io/spg/)
	- [\[2509.21474v4\] d2: Improving Reasoning in Diffusion Language Models via Trajectory Likelihood Estimation](https://arxiv.org/abs/2509.21474v4)