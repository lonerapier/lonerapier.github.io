---
title: "Convolutional Neural networks"
date: 2025-04-15
tags:
- machine-learning
- computer-vision
- notes
---


# CNN

- Convolution: $\mathbf{x}_{\text{out}}=w\cdot \mathbf{x}_{\text{in}}+b$, where $\theta=[w,b]$ are the parameters, w is the kernel, and b is the bias.
- Channels, input: $C_{\text{in}}\times H\times W$. Output: $C_{\text{out}}\times H\times W$
- Filters: $C_{\text{in}}$, filter bank = $C_{\text{out}}$
- Spatial resolution
- Convolutions: Strided, Dilated
- Nonlinearity: Pooling (Mean, Max, Min).
- Downsampling and upsampling
- Receptive field
- Feature maps
- Architecture: Encoder & Decoder, AlexNet, UNet, ResNet
- Reason that images are processed locally while MLPs are processed globally?
	- Divide and Conquer
	- Translational Invariance

> [!note] Equivariance and Invariance
> **Invariance**: Consider G to be the group of actions (for example: group of translation for an image I), and g is a specific element of the translation group. A function f is said to be invariant under the group of actions G if for all elements I and for any $g \in G$, f(g(I)) = f(I).
> **Equivariance**: Consider G' to another group of actions, function f is said to be equivariant under the group of action, if for any element I, and g in G, there exists $g'\in G'$ such that f(g(I)) = g'(f(I)).
> Source: [Theoretical view](https://datascience.stackexchange.com/questions/16060/what-is-the-difference-between-equivariant-to-translation-and-invariant-to-tr)