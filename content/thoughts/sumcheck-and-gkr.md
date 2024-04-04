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

## Sumcheck protocol

To Prove: $\sum_{i=0}^{n} f = c$

### Univariate sumcheck

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

Uses theorem stated by Byott and Chapman [BC99]() that $\sum_{a\in H}f(a) = 0$ iff $f$ has degree less than $|H|-1$. Prove this using [[fri-pcs|FRI]] protocol by [BBHR18b]() which has proof complexity $\mathcal{O}(\log d)$ and proof length $\mathcal{O}(d)$. For case when degree $d>|H|-1$: we observe that we can split any polynomial $f$ into two polynomials $g$ and $h$ such that
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