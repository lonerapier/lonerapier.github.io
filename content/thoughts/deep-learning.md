---
title: Deep Learning
date: 2026-03-23
tags:
- machine-learning
- deep-learning
- learning
- notes
- draft
---

[[thoughts/approximation-theory]]

[[thoughts/cnn]]

[[thoughts/gnn]]

# Generalisation

Empirical Risk vs Population Risk

- Approximation
- Optimisation
- Generalisation

[[thoughts/rnn]]

[[thoughts/transformers]]

# Probabilistic Graphical Models
- joint distribution of random variables modelled as DAGs.
- TODO: write more about them

Reference:
- [29  Probabilistic Graphical Models – Foundations of Computer Vision](https://visionbook.mit.edu/graphical_models.html)
- DL: Bishop Chapter 11
- Murphy book 2: Chapter 4

[[thoughts/representation-learning]]

[[thoughts/gaussian-processes]]

[[thoughts/generative-modeling]]

# Beyond IID assumption

## References
- Murphy, Kevin P. Probabilistic machine learning: Advanced topics. MIT press, 2023.

# Transfer Learning
Few-shot learning: Learning with very little data

Ways to perform transfer learning:
- Knowledge of mapping
	- Finetuning
- Knowledge of outputs
	- Distillation
- Knowledge about inputs
	- Prompting

Contrastive Learning + Generative Modelling

## Meta Learning

# Scaling Laws

- Popularised by [Kaplan et al.](https://arxiv.org/abs/2001.08361). 
- Similar testes were performed at [Hoffman et al.](https://arxiv.org/abs/2203.15556) on a larger scale with new empirical foundings.
- [\[2004.10802\] A Neural Scaling Law from the Dimension of the Data Manifold](https://arxiv.org/abs/2004.10802): Theoretical explanation using data manifold and relationship of task (loss) and data with the low-dimensional manifold.

# Implementation

> [!question]
> - what effects does L2 norm, layer norm, RMS norm, batchnorm have on the data geometry? How does the statistic change? How to choose? and which to prefer?
> - Why layernorm can be a footgun in low dimensional spaces?

Data
- Pre-processing
	- Summary statistic
	- Visualisation
	- Shape
		- For testing, check dimensions are not the same. Say, for CNN, the dimensions are different.
		- Einops library
	- Type-checking
- Code assertions for size and type
- Data augumentation
- How to maximise learning from data? How to augument data so that it's hard to learn from it?

## Image Models

- [GitHub - huggingface/pytorch-image-models: The largest collection of PyTorch image encoders / backbones. Including train, eval, inference, export scripts, and pretrained weights -- ResNet, ResNeXT, EfficientNet, NFNet, Vision Transformer (ViT), MobileNetV4, MobileNet-V3 & V2, RegNet, DPN, CSPNet, Swin Transformer, MaxViT, CoAtNet, ConvNeXt, and more · GitHub](https://github.com/huggingface/pytorch-image-models)