---
title: "Verkle Trees"
date: 2022-1w-12T10:00:00-00:00
tags:
- data-structures
- cryptography
---

![verkle_trie](thoughts/images/verkle_trie.svg)
*Credits: Dankrad's post on verkle tries*

Verkle Trees is one of the big change that is going to be included in the Ethereum protocol towards its push to weak statelessness. There are much better [resources](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html) to understand the reasoning behind going for statelessness.

In a Verkle trie, inner nodes are $d$-ary vector commitments to their children instead of hashes like a merkle trie. The root of a leaf is hash of the (key, value) pair, and root of an inner node is hash of the vector commitment. So, naively to prove value of a leaf, you only require $\log_{d}n - 1$ values.

- tree of some depth $d$
- to prove leaf node $x \rightarrow y$
- need $(d-1)\log_{d}n$ proofs/hashes to prove a leaf in case of merkle trees
- But for verkle tries, proofs are in terms of vector commitments i.e. $f(z_{i})=y_{i}$. Polynomial commitments most efficient and simple vector commitments
- thus require, $\log_{d}n-1$ commitments and proofs
- each commitments would me in terms of a polynomial, $f_{i}(X)$ where commitment $C_{i}=[f_i(s)]_{1}$
- domain in terms of $\omega$, i.e. $d$th root of unity.

But fortunately in case of polynomial commitments, instead of giving commitment and proof for each level, we can combine the proof and give a multiproof that convinces the verifier that value of a leaf node is indeed what we want to prove. Following is the steps of a scheme that generate multiproof using random evaluation.

# Proof

Given $m$ commitments $C_i=[f_{i}(s)]_1$, prove evaluations $f_{i}(z_{i})=y_{i}$ where $z_{i} \in \lbrace{\omega^i\rbrace}$ and $\omega$ is a $d$-th root of unity.

1. Generate $r\leftarrow H(C_{0},\ldots,C_{m-1},y_0,\ldots,y_{m-1},z_0,\ldots,z_{m-1})$
2. Prover encode all proofs in a polynomial $g(X)=r^{0}\frac{f_0(X)-y_0}{X-z_0}+r^1\frac{f_{1}(X)-y_{1}}{X-z_{1}}+\ldots+r^{m-1}\frac{f_{m-1}(X)-y_{m-1}}{X-z_{m-1}}$

   > Now, we just have to prove that $g(X)$ is indeed a valid polynomial (not a rational function). This can be done by committing to this polynomial $D$, evaluating it at a random point $t$ and verifier verifying it.

3. Prover create a commitment $D=[g(s)]_1$
4. evaluate $g(X)$ at point $t$, where $t \leftarrow H(r,D)$
   $$g(t) = \underbrace{\sum_{i=0}^{m-1} r^i \frac{f_i(t)}{t-z_i}}_{g_1(t)} -  \underbrace{\sum_{i=0}^{m-1} r^i \frac{y_i}{t-z_i}}_{g_2(t)}$$
5. $y=g_{2}(t)$ can be computed by verifier as all the inputs are known
6. $h(X) = \sum_{i=0}^{m-1}r^{i} \frac{f_{i}(X)}{t-z_{i}}$ => $E = [h(s)]_{1} = \sum^{m-1}_{i=0} \frac{r^{i}}{t-z_{i}} C_i$ can also be computed by verifier
7. Prover gives the proof $\pi=[(h(s)-g(s)-y)/(s-t)]_1$
8. Verifier verifies via $e(E-D-[y]_{1},[1]_{2})=e(\pi,(s-t)_{2})$

This allows us to prove an arbitrary number of evaluations.

- Proof is also constant size (one commitment $D$, one number $t$, two proofs).
- $x_{i}$, $z_{i}$ values do not need to be explicitly provided
- Only leaves keys and values, and corresponding commitment to each level are required
- For $n = 2^{30}$ and $d=2^{10}$, the average depth comes out to be $3$.

## Design Goals

- Cheaper access to neighbouring code chunks and storage slots to prevent thrashing
- distribute data as evenly as possible in the tree
- Fast in SNARKs
- Forward compatible, i.e. interface should be pure (key, value) pair of *32 bytes*.

## Reasoning for Pedersen Commitments

Now, there are two commitment schemes that can be used for vector commitments.

1. [[polynomial-commitments|KZG Polynomial commitments]]
2. [[thoughts/pedersen-commitments|Pedersen Vector commitments]] + IPA (Inner Product Arguments)

Ethereum has decided to go with Pedersen commitments citing following advantages:

1. No trusted setup
2. Everything can be done inside a SNARK as well
3. Developed new curve (Bandersnatch) that “fits inside” BLS12_381 (outer field = curve order)
4. Future proof for witness compression and zk-rollups

**Disadvantage**: Not as efficient for proving a single witness. But this is not very important to us.

## Changes in Tree Structure

![verkle_tree_structure](thoughts/images/verkle-tree-structure.png)

Verkle Trees introduces a number of changes in the tree structure.

1. Shifting from 20 bytes keys to 32 bytes
2. tree width from hexary to 256
3. vector commitments instead of hashes
4. merge of account and storage tries
5. gas changes

# ETH Verkle Explainer

![verkle_tree](thoughts/images/VerkleTree.jpg)

# Resources

- [Vitalik's explainer on Verkle Trees](https://vitalik.ca/general/2021/06/18/verkle.html)
- [verkle.dev](https://verkle.dev/docs/intro)
- [Verkle Tree EIP](https://notes.ethereum.org/@vbuterin/verkle_tree_eip)
- [Dankrad's Peep an EIP](https://www.youtube.com/watch?v=RGJOQHzg3UQ)
- [Verkle Trie reference implementation](https://github.com/ethereum/research/tree/master/verkle_trie_eip)
- [Verkle tree structure](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)
