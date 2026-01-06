---
title: "Land of Sumcheck"
date: "2024-02-20T00:00:00Z"
tags:
- math
- cryptography
- zk
---

Prerequisite:

- multilinear polynomials
- low degree extension

## Multilinear Extensions

A multivariate polynomial $g$ is multilinear if the degree of the polynomial in each variable is at most one.

let $f:\left\{0,1\right\}^v\to \mathbb{F}$ be any function mapping the v-dimensional hypercube to $\mathbb{F}$, then multilinear extension of $f$  is $g$, a $v$-variate polynomial that agrees with $f$ on all $x\in\left\{0,1\right\}^v$.

> [!question] Why multilinear extensions?
> Allows to represent domain of length 2^v into v variable multilinear polynomial, which is way less than univariate polynomials where $v-1$ variable polynomial is needed to represent length $v$ domain.

Using SZ lemma, verifier gains power over prover as if two functions $f,f'$ differ at even one point in $\left\{0,1\right\}^v$, then their extension $g,g'$ disagree almost everywhere, precisely agree at most $\frac{d}{\mid \mathbb{F}\mid}$.

> Prove that a function $f:\left\{0,1\right\}^v\to \mathbb{F}$ has a unique multilinear extension $\widetilde{f}$ over $\mathbb{F}$.
> a

### Lagrange Interpolation

$$
\begin{equation}
\widetilde{f}(x_{1},x_{2},\dots,x_{v})=\sum_{w\in\left\{0,1\right\}^v }f(w)\cdot \widetilde{eq}(x_{1},\dots,x_{v})
\end{equation}
$$

where for any $w=(w_{1},\dots ,w_{v})$, $\widetilde{eq}_{w}(x)$ is called equality polynomial,

$$
\widetilde{eq}(x_{1},\dots,x_{v})=\prod_{i=1}^{v}(x_{i}w_{i}+(1-x_{i})(1-w_{i}))
$$

## Sumcheck Protocol

To Prove: $\sum_{i=0}^{n} f = c$

More precisely, sumcheck protocol is used to prove a v-variate polynomial defined over a Finite field $\mathbb{F}$.

$$
\begin{equation}
	H:=\sum_{b_{1}\in\left\{0,1\right\} }\sum_{b_{2}\in\left\{0,1\right\} }\cdots \sum_{b_{v}\in\left\{0,1\right\} }g(b_{1},\dots,b_{v})
\end{equation}
$$

Let's see how the protocol behaves:

- $\mathcal{P}\to \mathcal{V}:C$ claiming $C$ to equal to $H$
- round 1: $\mathcal{P}$ sends a univariate polynomial:
$$g_{1}(X_{1})=\sum_{x_{2},\dots,x_{v}\in\left\{0,1\right\}^{v-1}}g(X_{1},x_{2},\dots,x_{v})$$
- $\mathcal{V}$ checks that $C_{1}=g_{1}(0)+g_{1}(1)$, and $\deg_{1}(g)\leq \deg(X_{1})$
- $r\in\mathbb{F}\leftarrow\mathcal{V}$, and sends to $\mathcal{P}$
- round i:
	- $\mathcal{P}\to \mathcal{V}: g_{j}(X_{j})=\sum_{x_{j+1},\dots,x_{v}\in\left\{0,1\right\}^{v-i} }g(r_{1},\dots,r_{i-1},X_{j},x_{j+1},\dots,x_{v})\forall\space i\in[2,v-1]$
	- $\mathcal{V}$ checks $g_{j}(0)+g_{j}(1)=g_{j-1}(r_{j-1})$ and sends $r_{j}\in\mathbb{F}$ to $\mathcal{P}$
- last round: $\mathcal{P}\to \mathcal{V}:g_{v}(X_{v})=g(r_{1},\dots,r_{v-1},X_{v})$
	- $\mathcal{V}$ checks $g_{v}(0)+g_{v}(1)=g_{v-1}(r_{v-1})$, and $\deg(g_{v})\leq deg(X_{v}\in g)$
	- checks with oracle query access to $g$ that $g(r_{1},\dots,r_{v})=g_{v}(r_{v})$

Efficiency:
- $P$: for each round i: $\mathcal{O}(1+\deg_{i}(g))\cdot 2^{v-j}$ terms are sent

### Univariate Sumcheck

Introduced in [Aurora](https://eprint.iacr.org/2018/828) Paper, univariate sumcheck proves relation for a univariate polynomial $f(x)$ of degree $d$ and subset $H\subseteq \mathbb{F}$:

$$
\sum_{a\in H}f(a) = 0
$$

Properties of protocol:

1. rounds: $\mathcal{O}(\log d)$
2. proof complexity: $\mathcal{O}(d)$
3. query complexity: $\mathcal{O}(\log d)$
4. prover operations: $\mathcal{O}(d\log|H|)$
5. verifier operations: $\mathcal{O}(\log d+\log^2|H|)$

$\sum_{a\in H}f(a) = 0$ iff $f$ has degree less than $|H|-1$. Prove this using [[fri-pcs|FRI]] protocol by [BBHR18b](https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ICALP.2018.14) which has proof complexity $\mathcal{O}(\log d)$ and proof length $\mathcal{O}(d)$. For case when degree $d>|H|-1$: we observe that we can split any polynomial $f$ into two polynomials $g$ and $h$ such that
$f(x) \equiv g(x) + \prod_{\alpha\in H}(x − \alpha) \cdot h(x)$ with $deg(g) < |H|$ and $deg(h) < d − |H|$; in particular, $f$ and $g$ agree on $H$, and thus so do their sums on $H$.

$$
\begin{align}
\hat{f} &\equiv \hat{g}+\mathbb{Z}_{H}\cdot \hat{h} \\
\sum_{a\in H}\hat{f}(a) &\equiv \sum_{a\in H}\Big(\hat{g}(a) + \mathbb{Z}_{H} \cdot  \hat{h}(a)\Big) = \beta \sum_{a\in H}a^{|H|-1} \\
\end{align}
$$

## GKR

$\mathcal{P}$ and $\mathcal{V}$ agrees to a circuit.
$\mathcal{P}$ proves $\mathcal{V}$, the output of the circuit.

Taken from jolt repo:

GKR is a SNARK protocol for binary trees of multiplication / addition gates. The standard form allows combinations of both using a wiring predicate $\tilde{V}_i$, and two additional MLEs $\tilde{add}_i$ and $\tilde{mult}_i$.

$\widetilde{V}_i(j)$ evaluates to the value of he circuit at the $i$-th layer in the $j$-th gate. For example $\tilde{V}_1(0)$ corresponds to the output gate.

$\widetilde{add}_i(j)$ evaluates to 1 if the $j$-th gate of the $i$-th layer is an addition gate.

$\widetilde{mult}_i(j)$ evaluates to 1 if the $j$-th gate of the $i$-th layer is a multiplication gate.

The sumcheck protocol is applied to the following:
$$
\tilde{V}_i(z) = \sum_{(p,\omega_1,\omega_2) \in \{0,1\}^{s_i+2s_{i+1}}} f_{i,z}(p,\omega_1,\omega_2),
$$

where

$$
f_i(z, p, \omega_1, \omega_2) = \beta_{s_i}(z, p) \cdot \widetilde{add}_i(p, \omega_1, \omega_2)(\widetilde{V}_{i+1}(\omega_1) + \widetilde{V}_{i+1}(\omega_2)) + \widetilde{mult}_i(p, \omega_1, \omega_2)\widetilde{V}_{i+1}(\omega_1) \cdot \widetilde{V}_{i+1}(\omega_2)
$$
$$
\beta_{s_i}(z, p) = \prod_{j=1}^{s_i} ((1-z_j)(1-p_j) + z_j p_j).
$$


Lasso and Jolt implement the [Thaler13](https://eprint.iacr.org/2013/351.pdf) version of GKR which is optimized for the far simpler case of a binary tree of multiplication gates. This simplifies each sumcheck to:
$$
\tilde{V}_i(z) = \sum_{p \in \{0,1\}^{s_i}} g^{(i)}_z(p),
$$

where

$$
g^{(i)}_z(p) = \beta_{s_i}(z, p) \cdot \tilde{V}_{i+1}(p,0) \cdot \tilde{V}_{i+1}(p,1)
$$
GKR is utilized in memory-checking for the multi-set permutation check.

## Resources

- [recmo's post about sumcheck](https://xn--2-umb.com/24/sumcheck-gkr/)
- [JThaler's: unreasonable power of sumcheck](https://people.cs.georgetown.edu/jthaler/blogpost.pdf)
- [JThaler's sumcheck notes](https://people.cs.georgetown.edu/jthaler/sumcheck.pdf)
- [JThaler's: Proofs, Args, and ZK, Chapter 3, 4](https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.pdf)
- [JThaler's small sumcheck](https://people.cs.georgetown.edu/jthaler/small-sumcheck.pdf)
- [erhant's notes on Lecture 4 of ZKP MOOC](https://crypto.erhant.me/zklearning/snarks-via-ips.html)
- [NUS CS6230: The power of IPs](https://www.comp.nus.edu.sg/~prashant/teaching/CS6230/files/notes/lecture02.pdf)
- [Berkeley's CS294: Introduction to IP & Sumcheck](https://people.eecs.berkeley.edu/~alexch/docs/CS294-S2017/lecture-01.pdf)
- [risencrypto's sumcheck](https://risencrypto.github.io/Sumcheck/)
- [zk sumcheck](https://eprint.iacr.org/2017/305.pdf)
- [sumcheck arguments and their application](https://eprint.iacr.org/2021/333.pdf)
- [CPerez's post about sumcheck](https://hackmd.io/@CPerezz/BJXq7U9Bn)
- [CPerez's ideas about GKR](https://hackmd.io/@CPerezz/SkzDZmngT)
- [Database of Theorems, Lemmas and Proofs - HackMD](https://hackmd.io/@kIJ38IbETaGkxGkcxhrNVg/HycoeJUJh)