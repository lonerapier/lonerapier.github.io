---
title: "Understanding Lookup arguments in SNARKs"
date: 2024-01-24T00:00:00Z
tags:
- zk
- cryptography
- math
---

Basic idea of lookups in [[snark|SNARKs]] is similar to what has been used in LUTs in processors. Having a table $T = \left\{t_i\right\}_{i=0,\ldots,N-1}$  and a set of lookups $F = \left\{ f_{j} \right\}_{j=0,\ldots,m-1}$, and $F\subseteq T$, such that table represents all possible legal values of a computation and lookup represent input to the computation.

Let's take an example of k-bit XOR computation:

Naïve way of doing would mean having arithmetic constraints on each bit, which would amount to 

## SoK

For doing $m$ lookups in a table of size $N$. Assuming, commitments are multi-exponentiations.

| Protocol     | Commitment Cost                   | Comments                                                                             |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------ |
| Plookup      | $5*\max\{ m,N \}$                 |                                                                                      |
| Hyperplonk   | $4*\max\{ m,N \}$                 |                                                                                      |
| Baloo, Caulk |                                   | Move table $N$ commitment cost to preprocessing phase, but requires SRS of size $N$. |
| cq           | $8m$, $\symcal{O}(m \log{m})$ FFT | commit to table $N$ only once in preprocessing                                       |
| logUp        |                                   |                                                                                      |
| Lasso        |                                   |                                                                                      |


## [Plookup](https://eprint.iacr.org/2020/315)

builds a permutation argument similar to [[PLONK|plonk’s]] permutation argument to prove that witness values $f_i:i\in [n]$ exist in lookup table $t_i:i\in [d]$ in the same order, i.e. these two sequences are permutation of $s$ of length $n+d$.

> Note: $f \subset s$ means $f$ is sorted by $s$, i.e. value of $f$ appear in **same order** as $s$. So, plookup is basically just another permutation argument on **neighbouring values**.

Any lookup consists of `(input, output)` pair that can be compressed in a field element $f_i$ and looked up in table $t_i$. Purpose is to prove $t$ is included and $f$ is _sorted_ by $t$. Plookup takes approach of _set differences_ to check that a vector is subsequence of the [other](https://hackmd.io/@arielg/ByFgSDA7D). Explained really well [here](https://research.metastate.dev/on-plonk-and-plookup/). Note, plookup uses randomised set differences of form $f_i + \beta f_{i+1}$ as another sequence with same set difference can be easily found.

Let's build the intuition behind the [protocol](https://hackmd.io/@Wimet/SynBU9hfY):[^1]

- Take two sequences $f_{i}: i\in [n]$ and $t_{i}: i\in[d]$ such that $f \subset t$. This means, every value of t must appear in f.
- Take another sequence $s_{j}: j\in[d]$ such that $s \subset t$, in other words $\forall i \in [d], (t_{i},t_{i+1})=(s_{i},s_{i+1})$.
	- Define two multivariate polys $F(\beta,\gamma) = \prod_{i \in [d-1]}\gamma + t_{i} + \beta t_{i+1} \equiv G(\beta,\gamma) = \prod_{i \in [d-1]}\gamma + s_{i} + \beta s_{i+1}$.
- Now, let's take our witness values $f_{i}$ and extend $s$ by concatenating $f$ such that $s:=(f,t) \subset t$. Thus, every element of $s$ is now sorted according to $t$ and $f$ is already sorted according to $t$.
	- This means, there will be $n$ indices in $s$ such that $s_{i}=s_{i+1}$, and $s_{i}$ equals $\left\{f_{i}\right\}_{i\in[n]}$ as multisets.

So, the relation $F\equiv G$ holds when following relation satisfies:

$$
\begin{align}
F(\beta, \gamma) &:= \prod_{i \in [n]} \Big( (1 + \beta) (\gamma + f_i) \Big) \cdot \prod_{i \in [d-1]} \Big( \gamma (1 + \beta) + t_i + \beta t_{i+1} \Big) \\
G(\beta, \gamma) &:= \prod_{i \in [n+d-1]} (\gamma (1 + \beta) + s_i + \beta s_{i+1})
\end{align}
$$

### Protocol

1. $\mathcal{P}$ computes and commits two polynomials $h_{1},h_{2}\in \mathbb{F}[x]_{<N}$ s.t. $h_{1}(\omega^i)=s_{i}$ and $h_{2}(\omega^i)=s_{N+i-1}$
2. $\mathcal{V}\rightarrow \mathcal{P}:\gamma,\beta$
3. $\mathcal{P}$ computes quotient polynomial $Z$ that aggregates $\frac{F(\beta,\gamma)}{G(\beta,\gamma)}$:
	1. $Z(\omega) = 1$
	2. $Z(\omega^i)=$
	3. $Z(\omega^N)=1$
4. $\mathcal{V}$ checks:
	1. $L_{1}(x)(Z(x)-1)=0$
	2. $L_{N}(x)(Z(x)-1)=0$
	3. $L_{N}(x)(Z(x)-Z(\omega x))=0$

$$\begin{align}
&(x-\omega^{N})Z(x)(1+\beta)(\gamma+f(x))(\gamma(1+\beta)+t(x)+\beta t(\omega x))=\\&(x-\omega^N)Z(\omega x)(\gamma(1+\beta)+h_{1}(x)+\beta h_{1}(\omega x))(\gamma(1+\beta)+h_{2}(x)+\beta h_{2}(\omega x))
\end{align})$$

We can extend the plookup protocol for multiple 

## [[logUp-lookup]]

## [cq](https://eprint.iacr.org/2022/1763)

cq uses the trick of logarithmic derivative to create lookup for *"large tables"*. so, it says that for two polynomials $p(x)=\prod_{a\in A}(x+a)$ and $q(x)=\prod_{b\in B}(x+b)$ are equal iff rational functions: $\frac{p'(x)}{p(x)}=\frac{q'(x)}{q(x)}$.

## [Lasso](https://eprint.iacr.org/2023/1216)

### Unindexed v/s Indexed Lookup args

- Unindexed: lookup into table only needs to assert that $m_i \in N$, i.e. it doesn't matter where in the table the looked up operand lies.
- Indexed: lookups inside table are indexed.
	- More formally: $\forall i \in [m],\ \exists (b_{i},m_{i}) \implies m_{i}=N[b_{i}]$

Table structures:
- LDE-structured: also called *decomposable* in the paper.
- MLE-structured: table can be expressed an MLE polynomial, evaluable in logarithmic time.
	- According to the Lasso paper, almost all useful tables like in Jolt, are MLE structured.

## Resources

- [Ingonyama: Brief History of Lookup Arguments](https://github.com/ingonyama-zk/papers/blob/main/lookups.pdf)

[^1]: Note that the protocol described in this article is from [Plonkup](https://eprint.iacr.org/2022/086) paper which extends plookup protocol with alternating method for $s$.