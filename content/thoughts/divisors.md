---
title: "Divisors"
date: 2022-10-03T10:00:00-07:00
tags:
- math
- algebra
---

Definition of divisor of a rational function $z \in k(C)$:

![divisor definition](thoughts/images/divisors.png)

Degree of a divisor as $deg \space D = \sum_{P \in \mathbb{C^*}} n_p$

# Divisor of a Meromorphic Function

For a [[meromorphic-functions|meromorphic function]] $f(z)$, we can define the **divisor** of $f$ as,

$$div \space f = \sum_{P \in \mathbb{C^*}} (ord_{P} f)(P)$$

It is also known that for any non-zero meromorphic function $f \in K(\mathbb{C^*})$, then $deg \space div \space f = 0$.

## Example

Let the polynomial be $f(z) = z^2 + 1$. We have a zero at $i$ and $-i$. But since the domain is $\mathbb{C^*}$, we need to consider point at infinity. In this case, we have a pole at infinity with degree 2 as $f(1/z) = 0$ at $z = 0$.

So, the divisor of f is,

$$div \space f = (i) + (-i) - 2(\infty)$$

# Divisors of Elliptic Curves

In the case of Riemann sphere, meromorphic functions are considered. In the case of Elliptic curves, rational functions are considered.

## Prerequisites
1. Riemann Sphere: Denoted as $\mathbb{C^*}$ and contains $C \bigcup \lbrace \infty \rbrace$

# Resources
- [Examples of divisor of a function](https://math.stackexchange.com/questions/1290619/example-of-a-divisor-of-a-function)
- [Divisor of a line function on EC](https://math.stackexchange.com/questions/2434900/let-f-be-the-divisor-of-a-function-on-an-elliptic-curve-why-does-degf)
- [Divisors and Pairings](https://klwu.co/knowledge/ec-basics-3-divisors/)
- [Riemann Sphere](https://mathimages.swarthmore.edu/index.php/Riemann_Sphere)
