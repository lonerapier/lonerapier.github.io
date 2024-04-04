---
title: "Group Theory"
date: 2023-05-06T10:00:00-07:00
tags:
- math
- algebra
---

# Groups

Groups $G$ are algebraic structures which are set and has a binary operation $\bigoplus$ that combines two elements $a, b$ of the set to produce a third element $a\bigoplus b$ in the set. The operation is said to have following properties:

1. Closure
2. Associative: $(a\bigoplus b)\bigoplus c = a\bigoplus(b\bigoplus c)$
3. Existence of Identity element: $a\bigoplus 0 = 0\bigoplus a = a$
4. Existence of inverse element for every element of the set: $a\bigoplus b=0$

Groups which satisfy an additional property: *commutativity* on the set of elements are known as **Abelian groups**. One very obvious question that comes to mind is Why abelian varieties are so significant in cryptography ? I mean, first these structures provide perfect abstractions to instantiations of them like a group of integers $\mathbb{\mathbb{Z}}$, and due to this abstraction, we can prove theorems for these structures that won't be possible without introducing their properties like commutativity in abelian groups.[^1]

Other properties regarding groups are very significant in cryptography like unique identity element and unique inverse element.

Example: $\mathbb{Z}$ is an abelian group while $\mathbb{N}$ is not a group as it doesn't satisfy inverse element property.

Now, set underlying the group can have finite elements, namely [Finite Groups](https://en.wikipedia.org/wiki/Finite_group). For example: $\mathbb{Z}_{5}$, having elements ${0, 1, 2, 3, 4}$.

### Cyclic Groups

Finite groups that can be represented as $g,g\bigoplus g,\cdots$, i.e. a generator $g$, which can create the complete set with the group operation.

> [Lagrange's theorem](https://en.wikipedia.org/wiki/Lagrange%27s_theorem_(group_theory)): states that for any finite group $G$, order of every subgroup $H$ divides order of group $G$. Formally, for $H$ being subgroup of $G$, $|G|\mid|H|$

> [Cauchy's theorem](https://en.wikipedia.org/wiki/Cauchy%27s_theorem_(group_theory)): states that let $G$ be a finite group, and $p$ a prime dividing $|G|$, then $G$ contains a subgroup of order $p$.

Note: when the group is *abelian*, i.e. the group operation supports commutativity, the group operation is written mostly additively.

> **Fundamental theorem of finite cyclic groups**: if $\mathbb{G}$ is a finite cyclic group such that $|G|=n$, and $k:k|n$, then, $\mathbb{G}[k]$ refers to unique finite cyclic subgroup of $\mathbb{G}$ with order $k$.
> Proof of above theorem follows from Lagrange's theorem.

### Cofactor

It's the ratio of order of the curve group and order of the subgroup $hr = n$. Usually, cofactor should be very small in order to avoid subgroup attacks on discrete logarithms. But in pairing-based cryptography, the cofactors of $G_1$, $G_2$ and $G_{T}$ can be very large.

By multiplying by the cofactor, a point on the curve is mapped to the appropriate group known as **cofactor clearing**. Cofactors for $G_1$ and $G_2$ are as follows:

- $h_1=(\texttt{x}-1)^2/3$
- $h_2=$

[^1]: [link](https://math.stackexchange.com/questions/4053051/why-are-abelian-groups-of-interest-what-is-their-usefulness) contains beautiful answers about why these different varieties of a mathematical structure is needed.
