---
title: "Finite Fields"
date: 2023-05-04T10:00:00-07:00
tags:
- math
- algebra
---

## Fields

Algebraic structure on which basic math can be performed.

### Properties

- Abelian group under addition
- Non-zero numbers form abelian group under multiplication
- multiplicative distribution over addition

## [Finite Fields](https://en.wikipedia.org/wiki/Finite_field) (Galois Fields)

Fields defined on a number and the result is in the set.

1. Closed
2. Associative: $a*(b*c) = (a*b)*c$
3. Identity: $a*1 = 1$
4. Inverse: $a*a^{-1} = 1$
5. Commutative

It has $p^m$ elements in it, where p = prime, and m is an integer.

$GF(p^m)$ are defined as the finite fields with notation:

1. m = 1: prime fields
2. m > 1: extension fields

![Image.jpeg](https://miro.medium.com/max/1400/0*lp3NrLwr0fMyrBZc)

> Note: $\mathbb{F}^*$ are defined as finite fields without 0 as it doesn't have an inverse.

**Prime fields** can be defined on any integer and include number from 0 till that number. All of the operations are done modulo that number.

Example: $\mathbb{F}_{5} = \left\{0, 1, 2, 3, 4\right\}$ is a field defined on prime number 5 and include these numbers.

**Extension fields** are polynomials and take the form: $\mathbb{F(m > 1)} = a_{m-1}X^{m-1} + \cdots + a_1X^1 + a_0$

Example: $GF(2^3)$'s elements are

```other
(a2, a1, a0)
(0, 0, 0) = 0
(0, 0, 1) = 1
(0, 1, 0) = x
(1, 0, 0) = x²
(0, 1, 1) = x+1
(1, 1, 0) = x²+x
(1, 0, 1) = x²+1
(1, 1, 1) = x²+x+1
```

### Properties

- Every element of a GF(q) are roots of the polynomial $x^q-x=0$. Generally, every element in GF(p^n) satisfies the polynomial equation $x^{p^{n}}-x=0$.
- every field has a **characteristic** $p$ which is p for which np=0 and is used to find identity of the field.
- Non-zero elements of a finite field form a **multiplicative cyclic subgroup**. This means, all non-zero elements can be expressed as powers of a single element. This element is called **primitive element**.
- All fields generated in GF(q) are isomorphic.

### Roots of Unity in Finite Fields

1. Every non-zero element of $\mathbb{F}_{q}$ is a root of unity.
2. Def: Primitive RoU: $x^{n}=1$, but $x^{m}\neq{1} \forall m<n$.
3. $\mathbb{F}_{q}$ has a nth primitive RoU iff n divides q-1.

### Quadratic Residue

If $a$ and $m$ are co-prime, then $a$ is called [*quadratic residue](https://en.wikipedia.org/wiki/Quadratic_residue) modulo m* if $x^{2}\equiv a \mod{m}$ has a solution. Vice Versa, $a$ is called quadratic non-residue if it does not have a solution.

> [!hint]- Find the quadratic residues mod 11.
> - $0^2$ mod 11 = 0
> - $1^2$ mod 11 = 1
> - $2^2$ mod 11 = 4
> - $3^2$ mod 11 = 9
> - $4^2$ mod 11 = 5
> - $5^2$ mod 11 = 3
> - $6^2$ mod 11 = 3
> - $7^2$ mod 11 = 5
> - $8^2$ mod 11 = 9
> - $9^2$ mod 11 = 4
> - $10^2$ mod 11 = 1
> 
> 0, 1, 3, 9, 5, 3 are quadratic residues.
> 
> 2, 6, 7, 8, 10 are quadratic non-residues modulo 11.

Total quadratic residues of a prime $p=(p-1)/2$, excluding 0, if p is odd, and $(p+1)/2$, if p is even.

> [!important]- Prove above statement.
> In a field, $x^2$ and $(p-x)^2$ is same. Thus, the square modulo are symmetric around $p/2$.

#### Legendre Symbol

Easier notation used to denote the relationship between $a$ and $n$. Can be easily encoded in a functional form to be used in cryptographic operations.

Let $a$ and $p$ be integers, and $p\neq 2$,

$$
\left(\frac{a}{p}\right)=
\begin{cases}
0 & \text{when $a$ divides $p$} \\
1 & \text{if $a$ is quadratic residue of $p$}\\
-1 & \text{if $a$ is quadratic non-residue of $p$}
\end{cases}
$$

### Extension Fields

### Adicity

Something which is referenced very often when creating various fields for proving systems is the [2-adicity](https://cryptologie.net/article/559/whats-two-adicity/) of the field.

Adicity refers to the largest size of the subgroup that can be formed in the field. All the other subgroups are smaller than the largest subgroup and thus, to create snarks that can prove large computation, it is required to take fields with high 2-adicity value.

## References

- [Learning Cryptography, Part 1: Finite Fields](https://medium.loopring.io/learning-cryptography-finite-fields-ced3574a53fe)
- [Finite Fields: Theory and Application](https://www.cantorsparadise.com/the-theory-and-applications-of-finite-fields-e78844896eaa)
- [Finite Fields - Wikipedia]()
- [Primitive nth root of unity](https://www.csd.uwo.ca/~mmorenom/CS874/Lectures/Newton2Hensel.html/node9.html)
- [Introduction to Finite Fields](https://web.stanford.edu/~marykw/classes/CS250_W19/readings/Forney_Introduction_to_Finite_Fields.pdf)
- [Finite field arithmetic](https://cryptojedi.org/peter/data/eccss-20130911a.pdf)
- [Scalar multiplication algorithms](https://cryptojedi.org/peter/data/eccss-20130911b.pdf)
- [field](https://research.swtch.com/field)
- [Galois field course](https://mathweb.ucsd.edu/~jmckerna/Teaching/16-17/Winter/200B/)
- [Finite Fields](https://kconrad.math.uconn.edu/blurbs/galoistheory/finitefields.pdf)
