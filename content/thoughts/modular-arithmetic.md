---
title: "Modular Arithmetic"
date: 2024-01-07T00:00:00Z
tags:
- math
- cryptography
---

## Modular multiplication

Problem: $a,b\in \mathbb{Z}_{N}$, calculate $a.b\mod{N}$

### [Montgomery multiplication](https://en.wikipedia.org/wiki/Montgomery_modular_multiplication)

Aim is to add a multiple of $N$ to $c$ such that, it becomes divisible by $R$. Choose different divisor $R>N$ such that,

$$
gcd(R,N) = 1 \implies \exists R^{-1}: RR^{-1} \equiv 1 \implies \exists N'<R: RR^{-1} = NN' + 1
$$

i.e. $N'$ is negative inverse of $N$. Generally, R is chosen to be power of 2, like $2^\omega$, so that division by R is just right bit shift by $\omega$.

$$
\begin{align}
\bar{a} &= aR \mod{N} \\
\bar{b} &= bR \mod{N} \\
c &= \bar{a}\bar{b} \mod{N} = [aR][bR] \equiv abR.R \equiv [abR].R \\
\bar{c} &= redc(c) = cR^{-1} \mod{N}
\end{align}
$$

Note: $0 \le c < N.N < R.N$. Let's understand how $redc$ works:

$$
\begin{align*}
R.R^{-1}&=N.N'+1 \\
c.N' \mod{R}&=c.\frac{R.R^{-1}+1}{N}\mod{R}=c.N'\mod{R} \\
k&=c.N'\mod{R} \\
t&=\frac{c+kN}{R} \\
t\mod{N}&=c.R^{-1}\mod{N} \\
\end{align*}
$$

**Cost:** 3 big-int mults. $3n^{2}$ integer multiplication.

**Prove:** $R|(c+kN)$ and $\frac{c+kN}{R}<2N$:

$$
\begin{equation}
c
\end{equation}
$$

#### Multi precision, radix $r$

Choose: $R:2^{nr}$, and $b=2^r$

$$
\begin{array}{c}
A &: a_{0}+a_{1}b+\ldots+a_{n-1}b^{n-1}&=\sum^{n-1}_{0}a_{i}b^{i} \\
c &: \bar{a}\bar{b}R^{-1} &= \sum^{r-1}_{i=0}x_{i}y2^{ir}2^{-nr}
\end{array}
$$

1. Initialize $t \leftarrow AB$
2. update t every loop $i: 0 \rightarrow n-1$, such that $b^{i+1}|t$
	1. $k_i=t_{i}.b^{i}.N'_{0} \mod{b}$
	2. $t=t+k_{i}.N$
3. divide R: $t=t/R$

Prove: $b^{i+1}|t$

$$
T^{(i)}=AB+\sum^{j=0}_{i}k_{i}N
$$

We'll prove this using induction. So,

$$
\begin{equation}
T^{(0)} = AB+k_{0}N = AB + t_{0}b^{0}N'_{0}(N_{0}+N_{1}b+\ldots+N_{r-1}b^{r-1})=AB_{0}(1+N'_{0}N_{0})+b(\ldots)
\end{equation}
$$

Thus, $b$ divides $T_0$. similarly, let's formulate $T^{(i)}$:

$$
\begin{equation}
T^{(i)}=(0,\cdots,0,T^{(i-1)}_i,\cdots)+m_iNb^i=T_i^{(i-1)}b^i+T_i^{(i-1)}n'_0n_0b^i+b^{i+1}(\cdots)\\
=T^{(i-1)}_ib^i(1+n'_0n_0)+b^{i+1}(\cdots)
\end{equation}
$$

> understand above from [Montgomery modular multiplication](https://hackmd.io/@chaosma/H1uSK1C35)

Instead of updating $t$ every loop, we'll split and update $t_{i}$ and shift $t$ by a word after each loop, which is essentially dividing by $R$. Explaining CIOS algorithm from



## Resources

- [Montgomery Reduction](https://hackmd.io/@70xfCGp1QViTYYJh3AMrQg/rkF-5hHwT)
- [Faster big-integer modular multiplication for most moduli](https://hackmd.io/@gnark/modular_multiplication)
- [Montgomery modular multiplication](https://hackmd.io/@chaosma/H1uSK1C35)
- [cliff's personal blog: montgomery multiplication](https://cliff0412.github.io/2023/12/07/arithmatic/montgomery-multiplication/)
- [montgomery: Fast MSM in WebAssembly](https://github.com/mitschabaude/montgomery)
- [](https://digitalassets.lib.berkeley.edu/techreports/ucb/incoming/EECS-2022-252.pdf)
- [EdMSM](https://eprint.iacr.org/2022/1400)
- [HPC: Montgomery](https://en.algorithmica.org/hpc/number-theory/montgomery/)
- [Ingonyama: modular multiplication](https://github.com/ingonyama-zk/papers/blob/main/modular_multiplication.pdf)
- [Barret reduction](https://en.wikipedia.org/wiki/Barrett_reduction)
-
