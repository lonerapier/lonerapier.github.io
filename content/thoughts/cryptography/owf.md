---
title: "One-Way Functions"
date: 2024-07-11:12:00:00
tags:
- cryptography
- theoretical
---

$$f:\{ 0,1 \}^{*}\to \{ 0,1 \}^{*}$$

A function that can be computed in polynomial time but computationally infeasible for a PPT adversary to invert, i.e. find a pre-image of value $y$.

> [!info] Inverting experiment $\textsf{Invert}_{\mathcal{A},f}(n)$:
> - Choose uniform $x \in \{ 0,1 \}^{n}$, compute $y=f(x)$
> - $\mathcal{A}$ gets $f,y$, outputs $x'$
> - $\mathcal{A}$ succeeds if $f(x')=y$

Any function is one-way if:
- easy to compute
- hard to invert

- But any function that isn't one-way doesn't have to be easy to invert. There can an inverse polynomial probability of finding pre-image of function for certain values of x for $f$ to not be one-way.
- Since $f$ is actually statistically invertible, by trying all values of $x\in\{ 0,1 \}^{n}$, we're intereted in computational hardness.
- $f$ is one-way permutation, when $|f(x)|=|x|$ and one-one. then $\forall x \in \{ 0,1 \}^{n}:f(x)=y \implies f^{-1}(y)=x$.
- One-way function families are used to output candidate one-way functions: $\textsf{Gen,Samp,}f$:
	- $\textsf{Gen}(1^{n})$: outputs parameter $I:|I|\geq n$. Each I corresponds to $D_{I},R_{I}$ domain and range of function $f_{I}$.
	- $\textsf{Samp}(I)$: outputs uniformly distributed elements of $D_{I}$
	- $f$: inputs $x\in D_{I}$, outputs $y\in R_{I}:=f_{I}(x)$.
- $\Pi$ is a permutation family if $R_{I}=D_{I}$ and $f:D_{I}\to D_{I}$ is a bijection.
- Similar experiment to: $\textsf{Invert}_{\mathcal{A},\Pi}(n)$.
- OWFs are usually based on certain problems that are deemed to be hard, i.e. computationally hard. This is because even if a problem is NP-complete, we only know it can't be solved in polynomial time with the current known algorithms but still not mathematically proven whether solution to the problem is almost always non-invertible.
	- Classic example to this is *Subset-Sum Problem* where $f_{ss}(x_{1},\dots,x_{n},J)=\left( x_{1},\dots,x_{n},\left[ \sum_{j\in J}x_{j} \mod{2^{n}} \right] \right)$. This problem is NP-complete.
	- Thus, usual OWF are based on other hard problems like DLP.
- To define better OWFs, one need to identify what sort of information does $f$ hides about input $x$, hard-core predicates are exactly that. They're the function that defines the information that is hidden by $f$.
- **Hard-core predicates:** a function $\textsf{hc}(x)$ of a function $f$ that can be computed in polynomial time, and for every PPT adversary, $\Pr_{x\leftarrow\{ 0,1 \}^{n}}[\mathcal{A}(1^{n},f(x))=hc(x)]\leq \frac{1}{2}+\text{negl}(n)$, i.e. boolean functions that are hard to guess right.
- Note that: HC isn't necessarily defined for OWFs, but for permutations, hc is only defined, if it's one-way.

## OWF->PR (pseudorandom)

Let's understand how each of these constructions happen and their proofs.

- Goldreich-Levin Theorem states that if OWF exist, then there exists a function $g$ and hard-core predicate $\textsf{gl}$ of $g$. defined as, $g(x)=(f(x),r)$ and $gl(x,r)\xlongequal{def}\bigoplus_{i=1}^{n}x_{i}\cdot r_{i}$, i.e. if $f$ is OWF, then $f(x)$ hides the XOR of a random subset of $x$.
- $\textsf{OWP} \to \textsf{PRG}_{+1}$: Main result of [Goldreich-Levin][GL89] was to show how a pseudorandom generator of length $n+1$ can be calculated from a one-way permutation, such that $G(s)\xlongequal{def}f(s)\lVert \textsf{hc}(s)$ with $l(n)=n+1$.
- $\textsf{PRG}_{+1}\to \textsf{PRG}_{\textsf{poly}(n)}$: [Blum-Micali][BM82] showed that it's possible to construct a PRG of any polynomial $\textsf{poly}$ with $l(n)=\textsf{poly}(n)$ from a PRG of $l(n)=n+1$.
- $\textsf{PRG}\to \textsf{PRF}$: For creating CPA-secure encryption, PRFs are needed, [Goldreich-Goldwasser-Micali][GGM86] showed how to construct PRF from PRG.
- $\textsf{PRF}\to \textsf{PRP}$: it was shown by [Luby-Rackoff][LR98], how to construct PRPs from PRFs.

### Goldreich-Levin Theorem

> [!info] To Prove: if $f$ is a OWF, then there exists a function $g(x,r)=(f(x),r)$, $\textsf{gl}(x,r)=\bigoplus_{i=1}^{n}x_{i}\cdot r_{i}$ of $g$. 

Can be proven by modelling 2 adversaries $\mathcal{A}',\mathcal{A}$ where $\mathcal{A}(f(x),r)=\textsf{gl}(x,r)$, i.e. $\mathcal{A}$ can give hard-core predicate and $\mathcal{A}'(1^{n},f(x))\in f^{-1}(f(x))$, i.e. if $\mathcal{A}$ can output hard-core predicate of $g$, then $\mathcal{A}'$ can invert $f$ with some probability.

Prove this using three intermediate results:
- If $\mathcal{A}$ can output $gl$ with probability 1 always, then $\mathcal{A}'$ works for all n and for all x.
- Tighten $\mathcal{A}'s$ probability such that $\Pr_{x,r\leftarrow \{ 0,1 \}^{n}}[\mathcal{A}(f(x),r)=\textsf{gl}(x,r)]\geq \frac{3}{4}+\frac{1}{p(n)}$ for some polynomial $p(\cdot)$, then $\Pr_{x\leftarrow\{ 0,1 \}^{n}}[\mathcal{A}'(1^{n},f(x))\in f^{-1}(f(x))]\geq \frac{1}{4\cdot p(n)}$
- Make $\mathcal{A}$ more involved by $\Pr[\mathcal{A}(f(x),r)=\textsf{gl}(x,r)]\geq \frac{1}{2}+\frac{1}{p(n)}$, then $\Pr[\mathcal{A}'(1^{n},f(x))\in f^{-1}(f(x))]\geq \frac{1}{p'(n)}$.
- This proves that if $\mathcal{A}$ can output $gl$ of $g$ with some non-negligible probability which is better than guessing the hard-core predicate, then $f$ can be inverted with some non-negligible probability, and hence, OWF exist if $\mathcal{A}$ doesn't exist.

Complete proof: TODO

## PRG from OWF

> [!info] To prove: if $f$ is a OWP with hard-core predicate $\textsf{hc}$, then algorithm $G(x)=f(x)\lVert \textsf{hc}(x)$ is a PRG with $l(n)=n+1$.
> $$\Pr_{r\leftarrow\{ 0,1 \}^{n+1}}[D(r)=1]-\Pr_{s\leftarrow\{ 0,1 \}^{n}}[D(f(s)\lVert hc(s))=1]\leq \text{negl}(n)$$

- First prove that above relation is equivalent to $\Pr[D(f(s)\lVert hc(s))=1]-\Pr[D(f(s)\lVert \overline{hc}(s))=1]\leq \text{negl}(n)$.
- Then, create a reduction proof with adversary $\mathcal{A}$ that can output $hc(s)$, if $D$ can differentiate between $f(s)\lVert hc(s)$ and $f(s)\lVert \overline{hc}(s)$.
- so, $\Pr[\mathcal{A}(f(s))=hc(s)]=\frac{1}{2}\cdot(\Pr[D(f(s)\lVert hc(s))-D(f(s)\lVert \overline{hc}(s))])$. this means that if D outputs 0 then $\mathcal{A}$ outputs $R$

Now our goal is to prove that if PRG of expansion factor of N+1 exsits then a PRG of expansion factor $\textsf{poly}(n)$

## References

- [Intro to Modern Cryptography: Chapter 8](https://www.cs.umd.edu/~jkatz/imc.html)