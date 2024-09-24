---
title: "Pseudorandom generator, function and permutation"
date: 2024-07-07:12:00:00
tags:
- cryptography
---


## PRG

> [!question]- what do you mean by pseudorandomness?
> Let's consider the distribution of strings of l-bit length. Now, distribution is *pseudorandom* if choosing any string from the distribution is *indistinguishable* from choosing a uniform l-bit string, i.e. any **polynomial time algorithm** can't distinguish between string from the distribution and uniform l-bit string.

- thus, pseudorandomness is property of a distribution and similar to how semantic security is computational relaxation of perfect secrecy, pseudorandomness is to true randomness.

**Pseudorandom generator (PRG)**: Informally, PRG is a efficiently computable function $G$ that takes as input $n-$bit strings and output $l(n)-$bit string where $l(n)>n$, and let $\mathsf{Dist}_{n}$ be distribution of $l(n)-$bit strings which are the outputs of $G(s)$, by choosing $s\in \{ 0,1 \}^{n}$ uniformly, then $G$ is PRG iff $\mathsf{Dist}_{n}$ is pseudorandom, i.e. any polynomial-time observer can't distinguish between $G(s)$ and uniformly chosen l(n)-bit string.

- define properties of PRG as:
	- **expansion**: PRG outputs l(n)-bit string, where  $l(n)>n$
	- **pseudorandomness**: $\Pr[D(G(s))=1]-\Pr[D(r)=1]\leq \text{negl}(n)$

![prg](https://i.imgur.com/lURIq0q.png)

- existence of PRG $G$, depend on how computationally feasible it is to for a polynomial time distinguisher $D$ to distinguish between a uniform string and the one output by $G$, because if $D$ were modelled as exponential time distinguisher then the probability of brute force attack become large.

## Pseudorandom functions

- A function is not pseudorandom, but chosen from a distribution.
- Keyed function $F(k,x)=y$ where $|k|\leftarrow l_{key}(n),|x|\leftarrow l_{in}(n),|y|\leftarrow l_{out}(n)$
- defining and fixing key $k\in \{ 0,1 \}^{n}$ creates a function $F_{k}:\{ 0,1 \}^{n}\to \{ 0,1 \}^{n}$
- This induces a distribution of function in $\textsf{Func}_{n}$, where $\textsf{Func}_{n}$ is distribution of all function that maps n-bit input to n-bit output strings.
- How large is $\textsf{Func}_{n}$? each function $f$ can be viewed as lookup table of $2^{n}$ n-bit length string rows, with output of function $f$ in the row. Thus, each function can be represented as $n\cdot 2^{n}$ bit string. Total functions are $2^{n\cdot 2^{n}}$.
- So, any function $F_{k}$ is called pseudorandom if polynomial-time Distinguisher $D$ cannot differentiate between $F_{k}$ or uniformly chosen function $f$ from $\textsf{Func}_{n}$.
	- $\Pr[D^{F_{k}(\cdot)}(1^{n})=1]-\Pr[D^{f(\cdot)}(1^{n})=1]\leq \textsf{negl}(n)$
	- Note that distinguisher $D$ doesn't get full description of the function $f$ since it's exponential length and $D$ is polynomial time. So, D is given access to oracle that can evaluate $f(x)$ in polynomial time and $D$ can interact with oracle polynomial times.
- PRG can be made from PRF by concatenating evaluations of $F_{k}$, i.e. $G(s)=F_{s}(1)\parallel F_{s}(2)\parallel \dots \parallel F_{s}(l)$ to get $l(n)$ bit pseudorandom string.
- in other direction, creating a PRF $F: \{ 0,1 \}^{n}\times \{ 0,1 \}^{t(n)}\to \{ 0,1 \}^{n}$ from PRG requires $l(n)=n*2^{t(n)}$ which is then viewed as lookup table with $2^{t(n)}$ rows and n-bit outputs. But this is only possible for short input lengths, i.e.  

> [!note] Note, however, that F is efficient only if $t(n) = O(\log n)$.
> don't understand why this?

- Pseudorandom permutations: $\textsf{Perm}_{n}\subset \textsf{Func}_{n}$ is the set of all bijection on $\{ 0,1 \}^{n}$. Total size of Perm distribution is $2^{n}!$.
- keyed permutation $F$ defined as function $F$ for which $l_{in}=l_{out}$ and for key $k\in\{ 0,1 \}^{l_{key}(n)}$, $F:\{ 0,1 \}^{l_{in}(n)}\to \{ 0,1 \}^{l_{out}(n)}$ is one-to-one and $F_{k}$ should be efficiently computable and invertible.
- Proposition: If $F$ is a PRP, then it is also a PRF. **Prove this**.
- **Strong PRP**: when distinguisher $D$ is given oracle access to $F$ and $F^{-1}$ and need to distinguish between $F_{k}$ and uniform function $f$, then it is called Pseudorandom permutation.
	- $\Pr[D^{F_{k},F^{-1}_{k}}(1^{n})=1]-\Pr[D^{f,f^{-1}}(1^{n})=1]\leq \textsf{negl}(n)$

## PRP

## References

- [Ben Lynn's notes: PRNG](https://crypto.stanford.edu/pbc/notes/crypto/prng.html)
- [Luca Trevisan's notes](https://lucatrevisan.github.io/books/crypto.pdf#page=22.22)
- 