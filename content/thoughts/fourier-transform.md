---
title: "Fourier Transform"
date: 2023-06-21T14:02:48-07:00
tags:
- technical
- ongoing
---

Erasure Coding is a fundamental part of many algorithms and have a variety of use cases like securing data availability in blockchains and STARKs. And one of the key building blocks of Erasure Coding is **Fast Fourier Transforms**. Life is a full circle, right? I ran away from the course teaching Fourier Transforms as far as possible and here I am, trying to learn it again. But this time it's different as *curiosity* has appeared wildly.

> *But you're a dirty little liar with a message of obsession to come*
> 
> *You got your head in the clouds*
> 
> *And your world's upside down*
> 
> *Get away from the life you're living*

Song time baby!! This time it's [Dirty Little Thing](https://open.spotify.com/track/1PlTjGYNKGsU7Rqi5dZZCk?si=3f7cb22c42c64ee0) by Velvet Revolver. Oooooh, it's a wild song. I couldn't get the tune out of my head when I first listened to it.

## DFT

Process to convert sequence of complex numbers $\lbrace x_{n} \rbrace := x_0,x_1,\ldots,x_{n-1}$ to another sequence of complex numbers $\lbrace X_{n} \rbrace:=X_0,X_1,\ldots,X_{n-1}$.[^1]

$$
\begin{align}
\mathcal{F}&: C^{N} \rightarrow C^{N} \\
X_{k}&=\sum_{n=0}^{N-1}x_{k}e^{\frac{-2\pi i}{N}kn} \\
\end{align}
$$

## IDFT

## Interpolation

### Vandermode

Vandermode matrix: $O(n^3)$

$$
\begin{pmatrix}
1 &x_0 &x_0^2 &\ldots &x_{0}^{n-1} \\
1 &x_1 &x_1^2 &\ldots &x_1^{n-1} \\
\vdots &\vdots &\vdots &\ldots &\vdots \\
1 &x_{n-1} &x_{n-1}^2 &\ldots &x_{n-1}^{n-1} \\
\end{pmatrix}
\begin{pmatrix}
a_0 \\
a_1 \\
\vdots \\
a_{n-1}
\end{pmatrix}
=
\begin{pmatrix}
y_0 \\
y_1 \\
\vdots \\
y_{n-1}
\end{pmatrix}
$$

### Working With Polynomials

> [!tldr]-
> - **DFT**: Coefficient representation -> point-value
> - **Inverse DFT**: Point-value -> coefficient

An $n$-degree polynomial is represented in coefficient form:

$$
A(x) = \sum_{j=0}^{n-1}a_{j}x^{j}
$$

Lagrange coefficients:

$$
A(x) = \sum_{k=0}^{n-1}y_k\frac{\prod_{j\neq k}(x-x_{j})}{\prod_{j \neq k}x_{k}-x_{j}}
$$

Algorithms and Time Complexity:

1. Addition/Subtraction: $O(n)$ in coefficient and point-value
2. Multiplication: $O(n^2)$ in coefficient and $O(n)$ in point-value and converting between the two can be done in $O(n\log n)$

Let the polynomial $A$ be defined with coefficients $a={a_0,a_1,\ldots,a_{n-1}}$, with results $y_{k}$ for $k=0,1,\ldots,n-1$.

$$
\begin{align}
y_{k} &= A(\omega^{k}_{n}) \\
&= \sum^{n-1}_{j=0}a_{j}\omega_{n}^{kj}
\end{align}
$$

Above equation is the DFT equation, represented as $DFT_n(a)$.

## FFT

![recursive-fft|600](thoughts/images/recursive-fft.png)

Lemma's that help in understanding FFT:

1. Cancellation Lemma: $\omega_{dn}^{dk}=\omega_n^k$
2. Halving Lemma: squares of nth complex root of unity are n/2 complex n/2th root of unity. $(\omega_n^{k+n/2})^{2}=(\omega_n^{k})^2$
3. Summation Lemma: $\sum_{j=0}^{n-1}(\omega_{n}^{k})^j=0$

Uses the following relation: $A(x)=A_{even}(x^2)+xA_{odd}(x^2)$.

$$
\begin{align}
y_{even,k}=A_{even}(\omega_{n}^{2k}) \\
y_{odd,k}=A_{odd}(\omega_{n}^{2k})
\end{align}
$$

![fft|600](thoughts/images/fft.png)

Domain should be power of 2, and complex roots of unity, $\omega_n^i$.

> Why does it need to be power of 2?

It actually depends upon the algorithm used, the most optimised Cooley-Tukey algorithm runs in $O(nlogn)$ time, and uses roots of unity as the domain. And Cooley-Tuckey uses $\omega$ properties to divide into length $k$, mostly 2. This is the radix property of the algorithm, thus it requires domain to order of length $k^{r}$.

Let's understand radix-2 Cooley-Tukey FFT algorithm

### Cooley-Tukey Algorithm

## Resources

- CLRS, Introduction to Algorithms, Chapter 30
- [Radix-4 FFT](https://hackmd.io/@akshayk07/ryn-yR7qr)
- [FFT](https://vanhunteradams.com/FFT/FFT.html)
- [CP algorithms: FFT](https://cp-algorithms.com/algebra/fft.html)
- [FFT over Finite Fields](https://decentralizedthoughts.github.io/2023-09-01-FFT)
- [Ingonyama's NTT 201](https://github.com/ingonyama-zk/papers/blob/main/ntt_201_book.pdf)
- [Cryptography Caffe's NTT: Part 1](https://cryptographycaffe.sandboxaq.com/posts/ntt-01/) & [Part 2](https://cryptographycaffe.sandboxaq.com/posts/ntt-02/)

[^1]: [Discrete Fourier Transform](https://en.wikipedia.org/wiki/Discrete_Fourier_transform)
