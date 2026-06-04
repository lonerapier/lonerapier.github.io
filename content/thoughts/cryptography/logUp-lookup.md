---
title: "Notes: logUp-lookup"
date: 2024-11-08:12:37
tags:
  - notes
  - zk
  - cryptography
---

# [logUp][logUp]

## TL;DR

Idea is to convert the linear product into fractional sums of reciprocals using logarithmic derivatives.

> [!info] [Logarithmic derivative](https://tutorial.math.lamar.edu/classes/calci/logdiff.aspx) is a popular method to differentiate functions which have high multiplicities as logarithms turn that into summations.  
> $\Pi_{i=0}^{n}(X-z_{i})$ is $\sum_{i=0}^{n}\frac{1}{X-z_{i}}$

Identity underlying logarithm based lookup arguments is: Assuming set $A=\left\{a_{0},a_{1},\dots,a_{N}\right\}$ and table $t=\left\{t_{0},t_{1},\dots,t_{M}\right\}$ such that $N\leq M$, then if $A\subseteq t$, then there must exist a sequence $m=\left\{m_{0},m_{1},\dots ,m_{M}\right\}$ such that following relation holds:
$$\sum_{i=0}^{N} \frac{1}{X-a_{i}}=\sum_{j=0}^{M} \frac{m_{j}}{X-t_{j}}$$

> [!question] TODO: sketch proof of above relation

logUp focuses for lookups in multivariate setting where multiple columns are required to be looked upon from same table.

> [!question] why are logarithmic derivatives useful here? Can a cheating prover create a false relation where it shows existence of a vector $A'=\left\{a'_{0},a'_{1},\dots,a'_{N}\right\}$ which doesn't exist in the table $t$?
> To do this, prover needs to choose $m_{i}$'s and create a linear combination of $\sum \frac{m_{i}}{X-a_{i}}$ such that it can create a summand $\frac{1}{X-s}$, where $s\not\in t$. But, set of all element $\frac{1}{X-b}$ such that $b\in\mathbb{F}$ are linearly independent, so no combination of elements in LHS can ever give an element which is not in the table.

Another thing that prover can do to cheat is choose $m_{i}$'s such that terms cancel each other, then it can cheat with extra elements.

Let's see how logUp prevents this:
- $\mathcal{P}\to \mathcal{V}$ commits to $m$
- $\beta \xleftarrow{\$}\mathcal{V}$ and sends to $\mathcal{P}$
- Uses Aurora lemma to prove a sub-relation:

## Previous Research

- Lookups popularised by Plookup
- Logarithmic derivatives first used in Bulletproofs++ paper
- Large table lookups introduced by Caulk, Caulk+
- Cached Quotients used logarithmic derivatives based lookups for large-table lookup protocols

## Preliminaries

### Lagrange Kernel of Boolean Hypercube
Boolean Hypercube: $H=\left\{\pm1\right\}^{n}$ as multiplicative subgroup of $\left\{\mathbb{F^{*}}\right\}^{n}$, Lagrange polynomial for a multivariate function $f(\vec{X})$ is written as:
$$L_{H}(\vec{X},\vec{Y})=\frac{1}{2^{n}}\cdot \prod^{n}_{j=1}(1+X_{j}\cdot Y_{j})$$


- Lemma 1 (Boolean Hypercube):  For function $f$,  $\langle f,L_{H}(\cdot,y)\rangle_{H}:=\sum_{\vec{x}\in H}f(\vec{x})\cdot L_{H}(\vec{x},\vec{y})=f(\vec{y})$
- Lemma 2 (Formal Derivative): for a polynomial $p(X)\in \mathbb{F}[X]$ where characteristic of field $\mathbb{F}$ is $p$, if $p'(X)=0$, then $p(X)=g(X^{p})$. Thus, if $\deg p(X)<p$ and $p'(X)=0$, then $p(X)$ must be a constant.
	- Let $\frac{p(X)}{g(X)}$ be a rational function for polynomial $p(X),g(X)\in \mathbb{F}[X]$, where $\deg p(X)<p,\deg g(X)<p$. If $\Big(\frac{p(X)}{g(X)}\Big)'=0$, then $\frac{p(X)}{g(X)}$ must be a constant.
- Lemma 3 (Logarithmic derivative): if $(a_{i})_{i=1}^{N}$,$(b_{i})_{i=1}^{N}$ are sequences over field $F$, then $\prod_{i=1}^{N}(X+a_{i})=\prod_{i=1}^{N}(X+b_{i}) \iff \sum_{i=0}^{N} \frac{1}{X-a_{i}}=\sum_{i=i}^{N} \frac{m_{i}}{X-t_{i}}$.
- Lemma 4: let $m_{1},m_{2}$ be functions $\mathbb{F}\to \mathbb{F}$, then $\sum_{z\in\mathbb{F}}\frac{m_{1}}{X-z}=\sum_{z\in\mathbb{F}} \frac{m_{2}}{X-z}\iff m_{1}=m_{2}\forall z\in\mathbb{F}$
- Lemma 5 (Set inclusion): Let $(a_{i})_{i=1}^{N},(b_{i})_{i=1}^{N}$ be two sequences of elements in field $\mathbb{F}$, then $a \subseteq b$ iff there exists a sequence $(m_{i})_{i=1}^{N}$ such that $\sum_{i=1}^{N} \frac{1}{X+a_{i}}=\sum_{i=1}^{N} \frac{m_{i}}{X+b_{i}}$.

[[sumcheck-and-gkr#Sumcheck protocol]]

## Technical Deep dive (magic)

Let $f_{1}, \dots,f_{M}$ and $t:H\to \mathbb{F}$ be functions over $H$, then $\cup_{i=1}^{M}\left\{f_{i}(\vec{x})\right\}_{\vec{x}\in H}\subseteq \left\{t(\vec{x})\right\}_{\vec{x}\in H}$ iff there exists a function $m:H\to \mathbb{F}$ such that:
$$\sum_{\vec{x}\in H}\sum_{i=1}^{M} \frac{1}{X+f_{i}(\vec{x})}=\sum_{i=1}^{M} \frac{m(\vec{x})}{X+t(\vec{x})}$$

- Prover commits to $m$.
- Verifier sends a random value $x\in\mathbb{F}$. Mostly, this value doesn't lie in $H$.
- turns above relation into an identity by shifting RHS, and equaling to 0.
- To turns this into a polynomial, $P$ divides the relation into partial sums of roughly the same number of terms $l$.
- combines using random scalars from verifier
- prove 2 relations in a single polynomial using sumcheck

### Protocol

Let $l$ be the chosen number, then $K=\left\lceil\frac{M+1}{l}\right\rceil$ subintervals $I_{K}=[(k-1)\cdot l,k\cdot l] \in [0,M]$ is formed.

$$h_{k}=\sum_{i\in I_{K}} \frac{m_{i}(\vec{x})}{\varphi_{i}(\vec{x})}, \enspace k=1,\dots,K$$

Above relation represents $\frac{m(x)}{x+t(x)}-\frac{1}{x+f_{1}(\vec{x})}-\frac{1}{x+f_{2}(\vec{x})}-\dots-\frac{1}{x+f_{M}(\vec{x})}$. Thus, $m_{0}=m(x)$, and for $i>1, m_i(x)=-1$. Similarly for $\varphi_0(x)=x+t(x)$, and for $i>1, \varphi_i(x)=x+f_i(\vec{x})$.

This gets reduced to 2 expression combined using random scalars $\lambda_i$ by verifier:
- $\sum_{i=1}^{K} h_i(\vec{x})=0$ at $H$
- $\forall{k}\in [1,K], \space h_k(\vec{x}) \prod_{i\in I_{k}}\varphi(\vec{x})=\sum_{i\in I_{k}}m_{i}(\vec{x})\prod_{j\in I_{k} \setminus \{ i \}} \varphi_{i}(\vec{x})$

## Cost

## Soundness/ZK Proofs

## References

- [notes on logup](https://building-babylon.net/2024/02/14/a-royal-road-to-logup/)

[logUp]: <https://eprint.iacr.org/2022/1530>