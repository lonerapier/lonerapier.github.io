---
title: "MSM - Multi scalar multiplication"
date: 2023-07-08T10:00:00-07:00
tags:
- tech
- math
- cryptography
---

Problem: calculate $\sum_{i=0}^{n-1}k_{i}P_{i}$, where $k_{i}$ is a scalar and $P_{i}$ is point on an [[elliptic-curves|EC]].

Scalar size: $b$ bits

# Naive

Complexity: $N(b-1)$ squaring and $N(b-1)$ point additions

![msm](thoughts/images/msm.png)

MSM can be divided into two main parts:

1. Modular multiplication
2. Point additions

# Pippenger Bucketed Approach

> [!info]
>
> Squaring: double add, i.e. $2*P$, where P is an EC point.

1. Divide scalar into windows of m, each with $w$ bits.
2. calculate: $P=\sum_{i} k_iP_i=\sum_{j}2^{cj}\left(\sum_{i} k_{ij}P_i\right)=\sum_j 2^{cj} B_j$
3. $B_{j}=\sum_{i}k_{ij}P_{i}=\sum_{2^{w}-1}\lambda\sum_{u(\lambda)}P_{u}$
4. Example: c=3, j=15, $B_{1}=4P_{1}+3P_{2}+5P_{3}+1P_{4}+4P_{5}+6P_{7}+6P_{8}+\ldots+3P_{14}+5P_{15}$
5. Now, group points with same coefficients together, i.e. create buckets of $2^c-1$, and $B_{j}=\sum_{\lambda}\lambda S_{j\lambda}$
6. Take partial sums:
$$\begin{align}T_{j1}&=S_{j7}\\ T_{j2}&=S_{j6}+T_{j1}\\ T_{j3}&=T_{j2}+S_{j5}\\ &\vdots\\ T_{j7}&=T_{j6}+S_{j1}\end{align}$$
7. Sum each window.

Complexity: $\frac{b}{c}(2^c+N+1)$ additions +. $b$ squarings

- Part 1: window result calculation: $(2^c+N)b/c$
- Part 2: sum over all windows: each iteration require $1$ addition and $c$ squarings. $b/c$ windows -> $\frac{b}{c} + \frac{b}{c}*c$ squarings

# Point Addition Optimisations

Majority of complexity is due to point additions. Point addition complexity for affine coordinates is 1 division, 2 multiplications, 6 additions on $\mathbb{F}$. Division is very costly.

Use projective coordinates. Division can be defered to when there is need for switch back to affine coordinates.

Complexity: 7 mults, 4 squarings, 9 additions, 3 mults by 2, 1 by 1. But no division is required.

## Batch Affine

Can be used in cases where aim is to find: $G_{i}=P_i+Q_i$ where P, Q are points on EC.

Denote: $a_{i}=x_{i,2}-x_{i,1}$

- $s$: $\prod_{i=1}^{n}a_i$
- $l_i$: $\prod_{j=1}^{i-1}a_{j}$
- $r_i$: $\prod_{j=i+1}^{n}a_{j}$
- $G_{i}=\frac{1}{x_{i,2}-x_{i,1}}=s*l_{i}*r_{i}$

## GLV with Endomorphism

Goal: accelerate single point scalar mult $k*P$

### Naive Approach

1. Divide into windows of c bits
2. pre-compute $i*P \forall i\in[0,\ldots,2^c-1]$
3. compute $k_i$ for each window $i$
4. $d=b/c$
5. $R=0$
6. For i from d-1 to 0:
	1. $R = 2^c*R$ (require c squaring)
	2. $R = R+(k_{i}*P)$ (require 1 point addition)
7. return $R$

Complexity: $2^c(precompute)+d$ point additions and $c*d=b$ squarings

### Endomorphism

For some curves like BN254, we can use cube roots of unity to find new points on the curve for same y.

> [!info] Equation of BN254: $y^2=x^3+b$.

So, $k*P$ can be divided into $k_{1}*P_{1}+k_{2}*P_{2}$, where

- $k=k_1+(s*k_{2})$
- $P_{2}=s*P_{1}$

This reduces no of point doublings by half.

$k_1$ and $k_2$ are found using [barret-reduction](https://hackmd.io/@chaosma/SyAvcYFxh) techniques.

Complexity: b/2 squaring and $d/2+2^{c+1}$ additions

## WNAF (windowed Non-adjacent form)

Most of the time in MSM is spent in additions, and number of additions depend on hamming weight of the scalar. Less number of additions will have to be done if the number of 1's in the scalar bits is less.

That's exactly what NAF is used for in terms of MSM. Instead of representing number in bits 0, 1. It is represented in {-1, 0, 1}. This reduces the number of number of non-zero bits in the number by 1/3rd.

Also, when the b-bit scalars are divided into c-bit slices, value of each slice is used as bucket index. In total, we need $2^{c}-1$ buckets. Using NAF, we map $0,1,\ldots,2^{c}-1$ to ${-2^{c-1},\ldots,-1,0,1,\ldots,2^{c-1}}$. For example, for slice $s_{i}\in{1,2,3,4,5,6,7}$ that needs $2^3−1=7$ buckets in total, if we map $s_i$ to ${−4,−3,−2,−1,1,2,3}$, only $2^(3−1)=4$ buckets are needed.

Pseudocode to find NAF:

Input: I = $(b_{n-1},b_{n-1},\ldots,b_{0})$
Output O = $(\omega_{n-1},\omega_{n-2},\ldots,\omega_{0})$

```
i=0
while I > 0:
	if I is odd:
		w(i) = I mod 2^2
		I = I - w(i)
	else:
		w(i) = 0
	I = I/2
	i = i+1
return O
```

Let's take a scalar $s$, with c-bit window size, $L = 2^c$. Split scalar into K slices, where $K = ceil(b/c)$.

$$
s = s_{0}+s_1L+\ldots+s_{K-1}L^{K-1} = \sum_{i}L^{i}K_{i}
$$

Now, to take advantage of wnaf, use following relation:

$$
s_{i}L^{i}+s_{i+1}L^{i+1}=(s_{i}-L)L^{i}+(s_{i+1}+1)L^{i+1}
$$

i.e. subtract $2^c$ from current slice and add 1 to next slice, whenever $s_i >= L/2$. After this, slice comes in range $[-L/2,L/2)$. To convert it into array form, whenever sign of $s_i$ is negative, subtract it from ith index in bucket array.

$$
\begin{sequencediagram}

\newinst[1]{p}{Prover}

\newinst[3]{v}{Verifier}
\end{sequencediagram}
$$

# Resources

- [zkStudyClub: Multi-scalar multiplication](https://www.youtube.com/watch?v=Bl5mQA7UL2I)
- [Known optimisation for MSM](https://www.notion.so/Known-Optimizations-for-MSM-13042f29196544938d98e83a19934305#9d8b79321f584477ac945a738042c396)
- [Aztec's wnaf](https://hackmd.io/@aztec-network/rJ3VZcyZ9)
- [Optimizing Multi-Scalar Multiplication (MSM): Learning from ZPRIZE](https://hackmd.io/@drouyang/msm)
- [EC arithmetic](https://cryptographyinrustforhackers.com/chapter_4/elliptic_curves.html)
- [Hardware Review: GPUs , FPGAs and Zero Knowledge Proofs](https://www.ingonyama.com/blog/hardware-review-gpus-fpgas-and-zero-knowledge-proofs#section-6)
- [Optimisation of MSM](https://hackernoon.com/optimization-of-multi-scalar-multiplication-algorithm-sin7y-tech-review-21)
- [Accelerating the PlonK zkSNARK Proving System using GPU Architectures](https://bpb-us-w2.wpmucdn.com/wordpress.lehigh.edu/dist/0/2548/files/2023/05/Master_Thesis_Tal_Derei.pdf)
- [FPGA Acceleration of Multi-Scalar Multiplication: CycloneMSM](https://eprint.iacr.org/2022/1396)
- [EdMSM: Multi-Scalar-Multiplication for SNARKs and Faster Montgomery multiplication](https://eprint.iacr.org/2022/1400)
- [cuZK: Accelerating Zero-Knowledge Proof with A Faster Parallel Multi-Scalar Multiplication Algorithm on GPUs](https://eprint.iacr.org/2022/1321.pdf)
- [PipeMSM: Hardware Acceleration for Multi-Scalar Multiplication](https://eprint.iacr.org/2022/999)
- [DJB's Pippenger logs](https://cr.yp.to/papers/pippenger.pdf)
