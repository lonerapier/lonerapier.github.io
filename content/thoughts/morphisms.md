---
title: "Morphism in Abstract Algebra"
date: 2024-05-18:12:00:00
tags:
- math
---

## Homomorphism

an operation is called homomorphic if it follows: $\psi(a \oplus b)=\psi(a)\oplus \psi(b)$

### Endomorphism

An **endomorphism** is a homomorphism from an algebraic structure to itself. In other words, it is a map that preserves the structure's operations and maps elements within the same structure.

#### Definition

Let $(G, \cdot)$ be a group. An endomorphism of $G$ is a function $\phi: G \to G$ such that for all $a, b \in G,\phi(a \cdot b) = \phi(a) \cdot \phi(b)$.

Similarly, for a ring $(R, +, \cdot)$ an endomorphism is a function $\psi: R \to R$ such that for all $a, b \in R,\psi(a + b) = \psi(a) + \psi(b) \quad \text{and} \quad \psi(a \cdot b) = \psi(a) \cdot \psi(b)$.

In the context of vector spaces, an endomorphism is a linear transformation from a vector space to itself.

#### Examples

1. **Identity Map**: The identity map $\text{id}_G: G \to G$ defined by $\text{id}_G(x) = x \space\forall\space x \in G$ is an endomorphism.

2. **Matrix Multiplication**: For the ring of $n \times n$ matrices $M_n(\mathbb{R})$, the map $\phi: M_n(\mathbb{R}) \to M_n(\mathbb{R})$ defined by $\phi(A) = B A$ for a fixed matrix $B$ is an endomorphism.

### Isomorphism

An **isomorphism** is a bijective homomorphism. It is a map between two algebraic structures that preserves operations and has an inverse that is also a homomorphism.

#### Definition

Let $(G, \cdot)$ and $(H, *)$ be groups. An isomorphism from $G \to H$ is a bijective function $\phi: G \to H$ such that $\forall \space a, b \in G, \phi(a \cdot b) = \phi(a) * \phi(b)$

Similarly, for rings $(R, +, \cdot)$ and $(S, \oplus, \otimes)$, an isomorphism is a bijective function $\psi: R \to S$ such that for all $a, b \in R, \psi(a + b) = \psi(a) \oplus \psi(b) \quad \text{and} \quad \psi(a \cdot b) = \psi(a) \otimes \psi(b)$

In the context of vector spaces, an isomorphism is a bijective linear transformation.

#### Examples

1. **Vector Spaces**: The map $\phi: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $\phi(x, y) = (x+y, x-y)$ is an isomorphism between the vector spaces $\mathbb{R}^2$ and itself.

2. **Groups**: The map $\phi: \mathbb{Z} \to 2\mathbb{Z}$ defined by $\phi(n) = 2n$ is an isomorphism between the group of integers under addition $\mathbb{Z}$ and the group of even integers under addition $2\mathbb{Z}$.

### Properties of Isomorphisms

1. **Bijectivity**: An isomorphism is both injective (one-to-one) and surjective (onto).
2. **Preservation of Structure**: Isomorphisms preserve the algebraic operations, meaning that the structure of the original algebraic system is retained in the image.
3. **Inverse Map**: The inverse of an isomorphism is also an isomorphism. If $\phi: G \to H$ is an isomorphism, then there exists a map $\phi^{-1}: H \to G$ such that $\phi^{-1} \circ \phi = \text{id}_G$ and $\phi \circ \phi^{-1} = \text{id}_H$.

### Relation Between Endomorphisms and Isomorphisms

- **Endomorphism**: A map from a structure to itself that preserves the operations. Not necessarily bijective.
- **Isomorphism**: A bijective homomorphism between two structures that preserves the operations. An isomorphism between a structure and itself is called an **automorphism**.

### Automorphisms

An **automorphism** is a special case of an isomorphism where the domain and codomain are the same.

#### Definition

An automorphism of a group $G$ is an isomorphism from $G$ to itself. Formally, $\phi: G \to G$ is an automorphism if it is a bijective homomorphism.

#### Examples

1. **Identity Map**: The identity map $\text{id}_G$ is an automorphism of any group $G$.
2. **Complex Conjugation**: The map $\phi: \mathbb{C} \to \mathbb{C}$ defined by $\phi(z) = \overline{z}$ (complex conjugation) is an automorphism of the field of complex numbers.

Automorphisms form a group under composition, known as the **automorphism group** of the structure.