---
title: "FRI PCS"
date: "2024-04-01T00:00:00Z"
tags:
- math
- cryptography
- zk
---

Note that most of these notes are taken from incredibly accessible resources. They're written by actual mathematicians and cryptographers, so please check those out.

[FRI](https://drops.dagstuhl.de/storage/00lipics/lipics-vol107-icalp2018/LIPIcs.ICALP.2018.14/LIPIcs.ICALP.2018.14.pdf) is a [[polynomial-commitments|polynomial commitment scheme]] based on hashing, and can be combined with any PIOP to create a [[snark|SNARK]]. Basic idea is to prove that a vector commitment is close to a [[reed-solomon|Reed-Solomon]] codeword using [low-degree](https://medium.com/starkware/low-degree-testing-f7614f5172db) testing.

Let's first explain what the full form of FRI is:

- **Fast**: corresponds to use [[fourier-transform|Fast Fourier Transform]] algorithm used in folding property of FRI.
- **Reed-Solomon**: converts a polynomial evaluations at roots of unity to a reed solomon codeword.
- **IOPP**: [[iop|Interactive Oracle Proofs]] of Proximity
	- **Interactive**: soundness is proved in interactivity between Prover and Verifier. **TODO**
	- **Oracle Proofs**: Prover behaves like an oracle answering queries of the verifier at random points.
	- **Proximity**: verifier rejects any codewords that are $\delta$ far from original codeword.

Pros: post quantum secure, transparent (based on hashing), doesn’t require cryptographic [[group-theory|groups]], thus, can work with smaller fields (mersenne or babybear or goldilocks). Later, you'll see that FRI does work with groups due to polynomials being evaluated at roots of unity but that's just for performance.

Cons: proof size is large (order of 10s of KBs)

so, let’s start with a very naïve polynomial commitment scheme:

- you have a polynomial of degree d on a field with size $|F| >> d$
- evaluate polynomial evaluation on every field element
- encode in a merkle tree, prove merkle path for every leaf

cons: field size is too large to encode in a tree, prover time in equal to field size, want to reduce that to **linear time in polynomial degree**

improvement: take a specific group $\Omega$ of size $\rho^{-1}k$ for some constant $\rho ≤ 1/2$: which is group formed by root of unity, evaluate on that, and encode in a tree. $\rho^{-1}$ is termed as **FRI blowup factor**.

Now, one other transformation: we do not encode direct polynomial evaluations but rather its reed solomon encoding with rate $\rho$.

$\rho$ can be tweaked accordingly to tradeoff between prover time and verifier time. as more the $\rho$, more the prover cost as evaluations increase. Proof length of FRI-PCS is $\lambda/\log (\rho^{-1}) \cdot \log^2(k)$ where $\log^2(k)$ is the proof length of one evaluation query from verifier and number of queries = $\lambda/\log(\rho^{-1})$.

- $\lambda$ is the security parameter of the protocol, i.e. bits of security.

Now, the second problem is verifier doesn’t know if prover really committed to a degree $k-1$ polynomial. This is called FRI **low degree test**. But naïve way isn’t really ideal as proof size for each query will be $\log n$ hash values of merkle tree path. Instead, low degree test will be interactive:

- **folding phase**: $\log(k)$ rounds, to reduce the vector evaluations of length $\rho^{-1}k$ to $\rho^{-1}$, thus making the reduced vector evaluations of a degree 0 polynomial.
- **query phase**: 1 round, because prover might not fold a length k vector evaluations and send artificial folded vector.

## Folding phase

let’s take all evaluations of size: $\rho^{-1}k$ the polynomial, we’ll use folding phase to reduce the evaluations vector to a degree 0 polynomial.

- take a vector of length $\rho^{-1}k$ and randomly combine the vector such that resultant vector has half length.
- create a merkle tree where the evaluations are leaves of the tree. send tree root as commitment.
- get random value $r$ from $\mathcal{V}$
- get a random $i\in[0,N/2^k]$, where k is the current round value. do colinearity test and send $y$ values of $A,B,C$ where:
	- $A: (\omega^i, f(\omega^i))$
	- $B: (\omega^{N/2+i},f(\omega^{N/2+i}))$
	- $C: (r,f_{fold}(\omega^{2i}))$
- repeat step $1-4$ until vector length reaches $\rho^{-1}$, i.e. $\log(k)$ rounds. this means that degree of polynomial from this vector is 0

take use of [[fourier-transform|FFT]] equation to divide polynomial into two polynomials of equal and half length:

$$
\begin{align}
q(X) &= q_{\textsf{even}}(X^{2}) + Xq_{\textsf{odd}}(X^{2})  \\
q_{even}(X^{2}) &= \frac{q(X) + q(-X)}{2} = \sum^{(d+1)/2-1}_{i=0} c_{2i}X^{2i}\\
q_{odd}(X^{2}) &= \frac{q(X)-q(-X)}{2X} = \sum^{(d+1)/2-1}_{i=0} c_{2i+1}X_{2i}\\
\end{align}
$$

Now, let’s combine $q_e$ and $q_o$ in a random linear combination, where $r$ is sent by verifier to get half length poly: $q_{\textsf{fold}}(Z) = q_e(Z) + \textsf{r}q_o(Z)$. evaluating $q(X)$ at $x$ and $-x$, both being roots of unity and $z=x^2$, expanding above expression with the definitions of $q_{even(x)}$ and $q_{odd(x)}$, we get:

$$q_{\textsf{fold}}(z) = \frac{(x+r)}{2x}q(x) + \frac{(x-r)}{2x}q(-x)$$

Note: q takes values in $\omega\in \mathbb{F}$ where, $\omega$ is nth root of unity. Thus $-1 = \omega^{N/2}$, so The above expression takes same values as initial expression of $q_{fold}(z)$ for $r = \{x, -x\}$ and thus can be used to combine two poly into one.

![fri-folding-merkle](https://i.imgur.com/GSIy2YT.png)

## Query Phase

- $\mathcal{V}$ take each folded vector from each step of folding procedure and demand $\lambda/\log(\rho^{-1})$ entries.
- this happens for $\log(k)$ rounds
- and each entry is accompanied with merkle verification path, i.e. $\log(k)$ hash evaluations.

Total proof length and $\mathcal{V}$ time: $\lambda/\log (\rho^{-1}) \cdot \log^2(k)$

- Difference between PC based on linear correcting codes and FRI?
	- both are based on error correcting codes
		- linear codes: [Brakedown](), [Ligero](), [Orion]()
		- RS codes: FRI
	- used cryptographic procedure is merkle hashing + fiat-shamir (non-interactivity)
	- In linear codes one big folding for poly of degree $d$ is done to reduce proof size to $\sqrt{d}$ and thus are field agnostic while In FRI, proofs are recursively reduced in half logarithmically.

![fri-folding-query](https://i.imgur.com/Yhb626l.png)

Above image by Alan Szepieniec's series [anatomy of a stark proof: part 3](https://aszepieniec.github.io/stark-anatomy/fri) very clearly explains the different rounds of interaction between $\mathcal{P}$ and $\mathcal{V}$.

There is another very accessible diagram [summarising](https://x.com/EllipticHector/status/1639698732064165893) FRI protocol by Hector.

Pseudocode:

```
 1. take out all roots and generate alpha for all codewords
 2. take out last codeword, check if last root equals last codeword merkle commitment
 3. evaluate on last_omega to get evaluation
 4. interpolate on domain to get last poly
 5. check if last poly == last codeword
 6. sample indices for colinearity test
 7. for each codeword, do:
 8. start each colinearity test:
 9. take out ay, by, cy
 10. create ax, bx, cx, and check if (ax, ay), (bx, by), (cx, cy) lie on same line
 11. verify merkle authentication paths
```

> [!question]- why at step 2, do we need to check whether last codeword merkle commitment equals last root?
> verifier doesn't know that prover is honest and has committed to correct polynomial in merkle root as well as codeword is indeed a RS codeword. Thus, it verifies prover's claim by first, checking that root commitment is correct and polynomial interpolation of last codeword indeed equals codeword.

## Security Analysis

$q$ - cheating polynomial ; $h$ - honest polynomial

$\delta$ - relative hamming distance b/w $q$ and $h$, unique decoding radius of reed solomon code

$P$ passes all $t$ verifier queries with probability: $k/p + (1-\delta)^t$

- interpretation of probability
	- $k/p$ denotes adversarial prover creating a poly which has degree 0 in last folding round but starting with a poly with degree less than honest degree $k$. If prover has a incorrect poly which is $\delta$ far of degree $k$, random linear combinations of two functions, one of which must also be $\delta$ far from $d/2$ degree poly.
	- $(1-\delta)^t$ denotes prover passing all t queries when point doesn’t equal $\delta$ distant points.

Each verifier query is conjectured to provide $\log(\rho^{-1})$ bits of security but in practical scenarios, only provides half of that.

## Known attacks on FRI

let honest polynomial be $q$ with degree $k-1$.

Prover picks a set $T$ with size $k = \rho n$ and computes a polynomial $s$ of degree $k-1$, i.e. same degree of original polynomial. then folds $s$ rather than $q$ during FRI folding phase

verifier will accept proof if all verifier queries lie within $T$ with probability $\rho^t$

## PCS from FRI

Problem with FRI is following two things:

1. P merkle commit q to nth roots of unity in field but not the complete field. but verifier can send random point in the complete field, and thus, prover won’t be able to open the polynomial at that point. even if it opens, the commitment doesn’t have the property to prove from that random point.
2. V after low degree test, only knows that q is `not too far` from degree k-1 honest polynomial, but doesn’t know if it’s exactly low degree.

How a PCS is described? create a quotient polynomial similar to done in KZG, and apply fold+query procedure on that quotient poly of degree k-1. So, to illustrate:

1. take a degree $k$ poly $q$
2. get a random variable from V: $r$
3. compute degree $k-1$ poly: $\textsf{w}(X) = (q(X)-v)(X-r)^{-1}$
4. to pass V’s checks in the FRI procedure for $w$, it has to equal $h(r)$ with high probability where $h$ is the degree-d poly that is closest to $q$.
5. Also, reed-solomon decoding has [unique decoding radius](https://crypto.stackexchange.com/questions/64133/unique-decoding-radius-in-reed-solomon-codes) of $(1-\rho)/2$, and thus each verifier query bring less than 1 bit of security.
	1. This makes FRI PCS bound to small set of low degree polynomials $h$, rather than to a single one. This might violate binding property of PCS, but since probability is so low, and not proven formally, it suffices for SNARK security.

The above process can be repeated any number of times for opening a single polynomials at multiple points $z_{0},\dots,z_{n-1}$ and proving validity of evaluations $y_{0},\dots,y_{n-1}$.

- Prover computes $g(X)=\frac{f(X) - p(X)}{\prod_{i=0}^{n-1} X-z_i}$ where $p(X)$ is minimal polynomial that interpolates multiple points.
- Prove using FRI that $g(X)$ is a polynomial of degree $k-n$

## Polynomial IOP from FRI

If the prover wants to prove that polynomials $f_{0}(X),\dots,f_{n-1}(X)$ represent polynomial of degree $d_{1},\dots,d_{n-1}$, then it can do one FRI claim for polynomial which is a weighted non-linear sum of all the polynomials: 

$$g(x)=\sum^{i=0}_{n-1}\alpha_{i}f_{i}(X)+\beta_{i}X^{2^k-d_{i}-1}f_{i}(X)$$

This *combination polynomial* proves that $g(X)$ is a polynomial of $deg(g(X))<2^k$ where $2^k>max(d_{i})$. A weighted sum is required so that polynomial evaluation don't cancel each other in a field when codeword is created.

> Quoting [Alan's FRI](https://aszepieniec.github.io/stark-anatomy/fri#compiling-a-polynomial-iop) tutorial:
> 
> The intuition why this random nonlinear combination trick is secure is as follows. If all the polynomials $f_i(X)$ satisfy their proper degree bounds, then clearly $g(X)$ has degree less than $2^k$ and the FRI protocol succeeds. However, if any one $f_i(X)$ has degree larger than $d_i$, then with overwhelming probability over the randomly chosen $\alpha_i$ and $\beta_i$, the degree of $g(X)$ will be larger than or equal to $2^k$. As a result, FRI will fail.
 
## Open questions

- what is the need of the offset for coset-FRI?
- what is the meaning of index folding? why folding phase is more secure when codewords are folded at particular index rather than random index at each step?
- when simulating a PCS from FRI: anatomy tutorial creates a new polynomial $g(X) = f(X) + X^{2^k-d-1}f(X)$, and then prove that $deg(g(X)) < 2^k$. Why another polynomial g(X) is required? why specifically $2^k$?
	- Maybe because proving low-degree of a polynomial of 2th power is easier than some arbitrary number.

## Resources

- [ZKP MOOC Lecture 7](https://youtu.be/A3edAQDPnDY)
- [Anatomy of STARK Proof: Part 3](https://aszepieniec.github.io/stark-anatomy/fri)
- [Arithmetization I](https://medium.com/starkware/arithmetization-i-15c046390862) & [Arithmetization II](https://medium.com/starkware/arithmetization-ii-403c3b3f4355) & [Low-Degree Testing](https://medium.com/starkware/low-degree-testing-f7614f5172db)
- [EthSTARK](https://eprint.iacr.org/2021/582)
- [DEEP-FRI](https://eprint.iacr.org/2019/336)
- [A summary on FRI Low-Degree test](https://eprint.iacr.org/2022/1216)
- [Fiat-Shamir security of FRI and related SNARKs](https://eprint.iacr.org/2023/1071)
- [STARKs](https://eprint.iacr.org/2018/046)
