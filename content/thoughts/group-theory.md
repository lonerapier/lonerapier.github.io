---
title: "Group Theory"
date: 2023-05-06T10:00:00-07:00
tags:
- math
- algebra
---

## Groups

Groups $G$ are algebraic structures which are set and has a binary operation $\bigoplus$ that combines two elements $a, b$ of the set to produce a third element $a\bigoplus b$ in the set. The operation is said to have following properties:

1. Closure
2. Assosciative: $(a\bigoplus b)\bigoplus c = a\bigoplus(b\bigoplus c)$
3. Existence of Identity element: $a\bigoplus 0 = 0\bigoplus a = a$
4. Existence of inverse element for every element of the set: $a\bigoplus b=0$

Groups which satisfy an additional property: *commutativity* on the set of elements are known as **Abelian groups**. Other properties regarding groups are very significant in cryptography like unique identity element and unique inverse element.

Example: $\mathbb{Z}$ is an abelian group while $\mathbb{N}$ is not a group as it doesn't satisfy inverse element property.

### Cyclic Groups

Finite groups that can be represented as $g,g\bigoplus g,\cdots$
