---
title: "Chapter 03: Definitions and Technical Preliminaries"
date: "2024-05-04:12:00:00"
tags:
- pazk
- zk
- cryptography
---

## Interactive Proofs

Given: function $f$ mapping $\{0,1\}^n$ to finite range $\mathcal{R}$, a k-message IP for $f$
- probabilistic verifier $\mathcal{V}$ time $poly(n)$.
> [!question] what does it mean to be probabilistic?
- deterministic prover $\mathcal{P}$
- P and V exchange messages $m_{i}\space\forall \space i\in[0,k]$ alternatively. Both work as next-message-computing algorithms, i.e. if it's V's turn, it's algorithm is run on $x,m_{1},\dots,m_{i-1}$.

Properties:

1. Completeness: For every $x\in\{0,1\}^n$: $Pr[\text{out}(\mathcal{V},x,r,\mathcal{P})=1]\geq 1-\delta_{c}$
2. Soundness: For every $x\in\{0,1\}^n$ and every deterministic prover strategy $P'$, if $\mathcal{P'}$ sends a value $y\neq f(x)$, then $Pr[\text{out}(\mathcal{V},x,r,\mathcal{P'})=1]\leq\delta_{s}$

An IP is valid if $\delta_{c},\delta_{s}\leq \frac{1}{3}$

> [!question] what is the difference between message and rounds?

## Argument system

- Statistical soundness: computationally unbounded provers $\mathcal{P'}$
- computational soundness: prover runs in poly time

Argument system for function $f$ is an IP for $f$ where adversarial prover strategy only runs in poly time.

> [!question] Why argument systems perform better than IP?
> Because due to adversarial prover being computationally bounded, argument systems can use cryptographic primitives which can't be broken by polynomial time adversaries. Thus, argument systems often have reusability, public verifiability, etc.

- Perfect vs Imperfect Completeness: Perfect completeness refers to $\delta_{c}=0$ which is what most proof systems utilise.
- Soundness error: $\delta_{s}\leq \frac{1}{\mid \mathbb{F}\mid}$ is what most proof systems target or able to achieve. $\delta_{s}\leq \frac{1}{3}$ is merely a convention.
- Public vs Private randomness: When verifiers randomness is internal, its called Private randomness, and when Verifiers randomness is made public, i.e. coin tosses can be seen by prover as soon as it is done, then the randomness is public.
	- Public randomness can utilise cryptographic primitives such as Fiat-Shamir transform to convert an interactive argument system non-interactive.
- Deterministic vs probabilistic provers: In IPs, soundness is required to hold against deterministic adversarial prover. Note that: if there is a probabilistic cheating prover $\mathcal{P'}$, then there is a deterministic prover strategy achieving the same.

## IP for language vs functions

We've so far defined IP for function $f$, complexity theorists often work in the concept of language. A decision problem can be associated with subset $\mathcal{L}\in\{0,1\}^n$ where this subset is termed as language.

IP for language, given a public input $x\in \{0,1\}^{n}$, let $f_{\mathcal{L}}: x\to \left\{0,1\right\}$ be the corresponding decision problem. So, $\mathcal{V}$ outputs $f_{\mathcal{L}}(x)=0$, if x not in $\mathcal{L}$, and 1 if $f_{\mathcal{L}}(x)=1$. Difference between IP for language and function is that for language, there doesn't need to be a valid proof if $f_{\mathcal{L}}(x)=0$, but for function, there does need to be a valid proof strategy that convinces the verifier.

### NP and IP

- IP: class of all languages solvable by an interactive, randomised proof system with polynomial time verifier.
- NP: class of language obtained by restricting IP to be non-interactive and deterministic

## Schwartz Zippel Lemma

[[SZ Lemma|schwartz-zippel-lemma]]

## Multilinear extensions

[[sumcheck-and-gkr]]

Also introduces algorithm for evaluation multilinear extensions in $v$ variables in $\mathcal{O}(2^v)$.
