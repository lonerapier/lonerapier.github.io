---
title: "Polynomial Commitments"
date: 2022-10-11T10:00:00-07:00
tags:
- cryptography
- math
---

This is a really informal post of my understanding of polynomial commitments. I am in no way a professional in cryptography and is just learning this for fun. Most of the excerpts in these notes are borrowed from the amazing article by [Dankrad](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) and [Alinush](https://alinush.github.io/2020/05/06/kzg-polynomial-commitments.html).

> *My pain*
>
> *Is self-chosen*
>
> *At least*
>
> *So The Prophet says*

Now, another song for you to listen along for this ride that you're embarking on with me. [River of Deceit](https://open.spotify.com/track/5EUsI3LIV042IV5ydksV9y?si=7e97529079ca4e70) by Mad Season. This was a total random song found while listening to my Daily Mix playlist. Anyways, I like it.

# Commitments

Contains two algorithms:

1. $commit(m,r) \rightarrow com$
2. $verify(m,com,r) \rightarrow 0/1$

Properties:

1. Binding: can't produce two valid openings for one commitment
2. Hiding: com doesn't reveal about committed data.

## Functional Commitments

committing to a function $f$ in family $F={f:X\rightarrow Y}$.

Steps followed:

1. $setup()$ -> pp
2. $commit(f,pp,r)$->$com$
3. eval(Prover P, Verifier V): $x\in X$, $y \in Y$ s.t. $f(x)=y$
	1. $P(f,pp,x,y,r)$ -> succinct proof $pi$
	2. $V(pp,com,x,y,\pi)$ -> 0/1

Three main types of functional commitments possible:

1. Polynomial commitments: Univariate polynomial of at most degree d
2. Multilinear commitments: Multivariate polynomial
3. Linear commitments: Linear functions $f_\vec{v}(\vec{u}) = <\vec{u},\vec{v}>=\sum^{i=1}_{n}u_{i}v_{i}$

> [!info]- Different types of PCS:
> 1. Basic Elliptic curves: Bulletproofs
> 2. Bilinear groups: KZG
> 3. Groups of unknown order: DARK
> 4. Hash functions: FRI
>
> More info about comparison between these schemes [here](https://hackernoon.com/kzg10-ipa-fri-and-darks-analysis-of-polynomial-commitment-schemes).

## Polynomial Commitment Scheme (PCS)

- what properties are desirable for an efficient PCS? :: commitment time is fast and proof is small, verify/eval time is fast
- what do you mean by small and fast? :: small means few bytes, for ex: in KZG, it's just one group element and BN254 is just 32 bytes. By fast, i mean in quasilinear time. for ex: verification in KZG takes $O(logd)$, where d is degree of polynomial. 

- see, commitment to a polynomial is just evaluation of that polynomial at a point and brute force method takes $O(d)$ time, where d is the degree of the polynomial and if you want to commit to d polynomials, it amounts to $O(d^2)$ time.
	- there's a better method than that, i.e. NTT Number theory transform which can do this in O(d logd).
		- implement this
	- even better than this -> use lagrange interpolation to find $f(\tau)$ which is linear in $d$.
 - then comes evaluation proofs $\pi_{a}$ -> naively each evaluation proof takes $O(d)$ time, and for $d$ polynomials this goes to $O(d^2)$
	 - comes Feist-Khovartovich algorithm, which takes it in $O(d logd)$ if $\Upomega$ domain is multiplicative subgroup.

## KZG Commitments

A **polynomial commitment scheme** allows anyone to commit to a polynomial $p(X)$ with the properties that this commitment $C$ (an [[elliptic-curves|elliptic curve]] point) can later be verified by anyone at any position $z$ on that polynomial. The prover proves at a position the value of the polynomial known as *proof* $\pi$ versus the claimed value known as *evaluation* $p(z)$ and this is only possible when prover actually has provided proof for that one polynomial that it committed to.

![kzg-steps](thoughts/images/kzg-steps.png)

### Notation

- Let $\mathbb{G_1}$ and $\mathbb{G_2}$ be two elliptic curves with a pairing $e: \mathbb{G}_1 \times \mathbb{G}_2 \rightarrow \mathbb{G}_T$.
- Let $p$ be the order of $\mathbb{G}_1$ and $\mathbb{G}_2$ and $G$ is generator of $\mathbb{G}_1$ and $H$ is generator of $\mathbb{G}_2$.
- $[x]_1 = xG \in \mathbb{G}_1$ and $[x]_2 = xH \in \mathbb{G}_2$ where $x \in \mathbb{F}_p$.

### Trusted Setup

You might've read multiple times in twitter threads that there is a trusted ceremony that is associated with DAS, SNARKs or words like KZG Ceremony. They are usually talking about this trusted setup. Also known as [Powers of tau](https://vitalik.ca/general/2022/03/14/trustedsetup.html#what-does-a-powers-of-tau-setup-look-like).

In this ceremony, a random secret $\tau \in \mathbb{F}_p$ is created, using which its powers $[\tau^i]_1$ and $[\tau^i]_2$ for $i = 0, \ldots, n-1$  are created. In additive notation, it is represented as:

$$[\tau^i]_1 = (G, \tau G, \tau^2 G, \ldots, \tau^{n-1} G) \in \mathbb{G}_1$$
$$[\tau^i]_2 = (H, \tau H, \tau^2 H, \ldots, \tau^{n-1} H) \in \mathbb{G}_2$$

These elements which are just elliptic curve points are made public but the secret has to be destroyed otherwise this ceremony has no meaning as anyone will be able to forge invalid proofs later. In practice this is usually implemented via a secure multiparty computation (MPC), which uses multiple participants to derive these elements and require all participants together to know secret $\tau$. Thus, this has a nice 1-to-N security assumption, basically only 1 honest participant is required which is easy to obtain.

Now, you must be thinking what are they used for? We know that a polynomial is represented as:

$$Polynomial: p(X) = \sum_{i=0}^{n}p_iX^i$$

Now, the prover can compute the commitment to the polynomial as:

$$Commitment: C = [p(\tau)]_{1}$$

$$= \left[\sum_{i=0}^{n} p_{i} {\tau}^{i}\right] = \sum_{i=0}^{n}p_i[\tau^i]$$

This is a really interesting output, as prover is able to evaluate polynomial at point $\tau$, even when he doesn't know the secret and this becomes the commitment of prover of the polynomial.

Now, you might be wondering if a malicious prover find another polynomial $q(X) \neq p(X)$ such that $[q(\tau)]_1 = [p(\tau)]_1$. But the prover doesn't know $\tau$, so the best bet for prover to achieve $p(\tau) = q(\tau)$ is to make the polynomial pass through as many points $n$ as possible. But it's computably inefficient to find the exact polynomial that passes through $n$ points where curve order $p \approx 2^{256}$ as $n <<< p$.

### Proof Evaluation

We need a mechanism so that prover could verify its commitment on the polynomial and this is done through *evaluations* on the polynomial $p(X)$. Evaluation is done at a point $z$ and the claimed value $p(z)$ is verified by the verifier.

Now, a value $z$ is chosen such that $p(z) = y$. This means that $p(X)-y$ should have a factor $X-z$. So, a quotient polynomial $q(X) = \frac{p(X) - y}{X-z}$ is computed and the evaluation proof becomes,

$$\pi = [q(\tau)]_1$$

$$ = \sum_{i=0}^{n}[\tau^i] \cdot q_i$$

Prover sends this proof to verifier which verifiers this proof.

### Verifying Evaluation

Now, verifier has following things:

- Polynomial: $p(X) = \sum_{i=0}^{n}p_iX^i$
- Commitment: $C = \sum_{i=0}^{n}p_i[\tau^i]$
- Evaluation point: $z$
- Claimed value: $y$
- Proof: $\pi = [q(\tau)]_1$

Now verifier wants to verify that claimed value is indeed correct using the proof. That's where [[bilinear-pairings|pairings]] come into play. Pairings allow us to multiply two polynomials in different curves and get the output in a target curve. This unfortunately is not possible in a single curve which is a property called Fully Homomorphic Encryption for elliptic curves. ECs are only homomorphic additively.

Verifier checks the following equation:

$$e(\pi, [\tau]_2-[z]_2) = e(C-[y]_1, H)$$

> Note: verifier has $[\tau]_2$ from the trusted setup and $[\tau - z]_2$ is computed through EC arithmetic.

This convinces verifier that claimed value is indeed the evaluation of the committed polynomial at the point $z$. How? Let's unroll the equation,

$$e(\pi, [\tau]_2-[z]_2) = e(C-[y]_1, H)$$
$$e(\pi, [\tau-z]_2) = e(p[\tau]_1-[y]_1, H)$$
$$[q(\tau) \cdot (\tau-z)]_T = [p(\tau)-y]_T$$

We need two properties from this equation:

- Correctness: If prover followed right steps, then proof is correct.
- Soundness: if they produce incorrect proof, verifier won't be convinced.

Correctness checks out as this equation is similar to what we defined in the quotient polynomial $q(X)(X-z) = p(X)-y$.

For soundness, prover would have to compute incorrect proof,

$$\pi' = (C - [y']_1)^{\frac{1}{\tau-z}}$$

But it's not possible to do this as $\tau$ is not known to prover and if they can forge this proof, then they can convince verifier for anything. Or it would have to forge a fake proof with fake evaluation $\omega$ which somehow has $\tau$ as root of $\frac{P-\omega}{X-z}$, whose probability is negligible due to Schwartz Zippel Lemma.

### Comparison to Merkle Trees

Merkle trees are a form of *vector commitments*, i.e. Using a merkle tree of depth $d$ will have $2^{d}-1$ elements, anyone can compute a commitment to a vector $(a_0, a_1, a_2, \ldots, a_{2^d-1})$. Thus, using Merkle trees anyone can prove that element a_i is a member of a vector at position i using d hashes.

![merkle-tree](thoughts/images/merkle-tree.png)

You can even make polynomial commitment out of Merkle trees. A polynomial is represented as $p(X) = \sum_{i=0}^{n} p_i X^i$, using $a_i = p_i$, we can construct a polynomial of degree $n = 2^d-1$ and computing merkle root of the coefficients. Now, the prover can prove the evaluation by sending all the $p_i$ and verifier verifying the evaluation by computation $p(z) = y$.

This is a very simple polynomial commitment that is inefficient to its core but will help to understand the marvel KZG commitment is.

- Prover has to send all the $p_i$ to verifier in order to commence verification. So, proof size is linear with the degree of the polynomial. While in Kate Commitments, commitment and proof size is just one group element of an elliptic group. Commonly used pairing curve is BLS12-381, that would make proof size to be 48 bytes.
- The verifier need to do linear work to compute $z$. While in KZG, verification is constant as only two multiplications and pairings are required to verify proof.
- commitments using merkle trees makes the polynomial public and doesn't hide anything. While it's mostly hidden in Kate commitments.

Now, the best part about Kate proofs are it can create one proof for multiple evaluation, i.e. only one group element for multiple proofs. [^1]

### Multiproofs

Let's say we have a list of $k$ points that we want to prove, $(z_0, y_0), (z_1, y_1), \ldots, (z_k, y_k)$. We find a polynomial $I(X)$ that goes through these points using Lagrange Interpolation:

$$I(X) = \sum_{i=0}^{k-1} y_i \prod_{j=0 \atop j \neq i}^{k-1} \frac{X-z_j}{z_i-z_j}$$

For the evaluation proof, while in the single proof we compute $q(x) = \frac{p(x)-y}{x-z}$, we will replace $y$ as single point with $I(x)$, and $x-z$ will be replaced with $Z(x) = \prod_{i=0}^{k}x-z_i$. Now, we replace our values and $q(x)$ becomes

$$q(x) = \frac{p(x) - I(x)}{Z(x)}$$

This is possible due to $p(x)-I(x)$ being divisible by all linear factors of $Z(x)$ and being divisible by whole $Z(x)$. The multiproof for evaluation $(z_0, y_0), (z_1, y_1), \ldots, (z_k, y_k)$: $\pi = [q(s)]_1$. Now, our prover equation becomes

$$e(\pi,[Z(s)]_{2})=e(C-[I(s)]_{1},H)$$

$$[q(s) \cdot Z(s)]_{T} = [p(s)-I(s)]_T$$

This really blew my mind when I was first studying them. You can have a million proofs batch together in one single 48 bytes proof which anyone can verify by just computing $I(x)$ and $Z(x)$.  Cryptography really is cool.

```pseudo
    \begin{algorithm}
    \caption{Quicksort}
    \begin{algorithmic}
      \Procedure{Quicksort}{$A, p, r$}
        \If{$p < r$}
          \State $q \gets $ \Call{Partition}{$A, p, r$}
          \State \Call{Quicksort}{$A, p, q - 1$}
          \State \Call{Quicksort}{$A, q + 1, r$}
        \EndIf
      \EndProcedure
      \Procedure{Partition}{$A, p, r$}
        \State $x \gets A[r]$
        \State $i \gets p - 1$
        \For{$j \gets p$ \To $r - 1$}
          \If{$A[j] < x$}
            \State $i \gets i + 1$
            \State exchange
            $A[i]$ with $A[j]$
          \EndIf
        \State exchange $A[i]$ with $A[r]$
        \EndFor
      \EndProcedure
      \end{algorithmic}
    \end{algorithm}
```

## Resources

- [KZG Commitments By Dankrad](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
- [Kate Commitments in ETH](https://hackmd.io/yqfI6OPlRZizv9yPaD-8IQ?view)
- [Efficient polynomial commitment schemes for multiple points and polynomials](https://eprint.iacr.org/2020/081.pdf)
- [Fast amortized KZG proofs](https://eprint.iacr.org/2023/033.pdf)
- [ethresear.ch post about commitments](https://ethresear.ch/t/open-problem-ideal-vector-commitment/7421/27)
- [Using polynomial commitments to replace state roots](https://ethresear.ch/t/using-polynomial-commitments-to-replace-state-roots/7095)]
- [Kate Commitments: A Primer](https://hackmd.io/@tompocock/Hk2A7BD6U)
- [Understanding KZG10 Polynomial Commitments](https://taoa.io/posts/Understanding-KZG10-Polynomial-Commitments)
- [Polynomials in bit reversal permutation](https://github.com/ethereum/consensus-specs/pull/3006)
- [Formulas for Polynomial Commitments](https://hackmd.io/@Evaldas/SJ9KHoDJF)
- [Uncovering KZG](https://scroll.io/blog/kzg)

[^1]: This is the first footnote.
