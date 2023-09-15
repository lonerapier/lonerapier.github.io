---
title: "Hash functions"
date: 2023-08-29T00:00:00Z
tags:
- math
- cryptography
---

# Properties

Following are the desired properties of a strong hash function: $f$

1. Pre-image resistant: given $f(m)=h$, it is difficult to find the pre-image $m$ of the hash $h$.
2. Second pre-image resistance: given message $m_1$, it is difficult to find another message $m_2\neq m_{1}$ such that $f(m_1)=f(m_2)$.
3. Collision resistance: It is difficult to find two distinct messages $m_1$ and $m_2$ such that $f(m_1)=f(m_2)$.

> collision resistance implies second pre-image resistance.[^1]

# ZK Friendly hash functions

It's natural to put cryptographic hash functions on protocols that boasts ZK properties like SNARKs or STARKs.

# Resources

- [ZK friendly hash functions](https://www.zellic.io/blog/zk-friendly-hash-functions)
- [Ingonyama's ZK friendly hash functions](https://github.com/ingonyama-zk/papers/blob/main/sok_zk_friendly_hashes.pdf)

[^1]: [Second pre-image resistance vs Collision resistance](https://crypto.stackexchange.com/questions/20997/second-pre-image-resistance-vs-collision-resistance)
