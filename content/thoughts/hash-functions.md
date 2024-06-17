---
title: "Hash functions"
date: 2023-08-29T00:00:00Z
tags:
- math
- cryptography
---

## Properties

Following are the desired properties of a strong hash function: $f$

1. Pre-image resistant: given $f(m)=h$, it is difficult to find the pre-image $m$ of the hash $h$.
2. Second pre-image resistance: given message $m_1$, it is difficult to find another message $m_2\neq m_{1}$ such that $f(m_1)=f(m_2)$.
3. Collision resistance: It is difficult to find two distinct messages $m_1$ and $m_2$ such that $f(m_1)=f(m_2)$.

> collision resistance implies second pre-image resistance.[^1]

According to literature, a hash function with output size $n$ has $\mathcal{O}(2^{n})$ pre-image resistance, and second pre-image resistance and $\mathcal{O}(\sqrt{ 2^{n} })$ collision resistance due to birthday attack.

Putting commonly occurring 512 and 256 bits output size in the above statement: [^2]

- 512 bits output gives $512$ bits of pre-image resistance and $256$ bits of collision resistance
- 256 bits output gives $256$ bits of pre, and 128 bits of col.

## Merkle-Damgård Constructions

Used in MD5, SHA1, SHA2.

TODO

## Sponge constructions

Used in SHA3 (Keccak).

## HAIFA construction

Used in Blake2.

## Birthday attack

TODO

## ZK Friendly hash functions

It's natural to put cryptographic hash functions on protocols that boasts ZK properties like SNARKs or STARKs.

## Resources

- [ZK friendly hash functions](https://www.zellic.io/blog/zk-friendly-hash-functions)
- [Ingonyama's ZK friendly hash functions](https://github.com/ingonyama-zk/papers/blob/main/sok_zk_friendly_hashes.pdf)

[^1]: [Second pre-image resistance vs Collision resistance](https://crypto.stackexchange.com/questions/20997/second-pre-image-resistance-vs-collision-resistance)
[^2]: [512 bits vs 256 bits](https://crypto.stackexchange.com/questions/83199/is-512-bits-a-more-secure-hashing-than-256-bits?rq=1)