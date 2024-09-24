---
title: "Divisors"
date: 2022-10-03T10:00:00-07:00
tags:
- math
- algebra
---

Definition of [divisor](https://crypto.stanford.edu/pbc/notes/elliptic/divisor.html) of a [[rational-functions|rational function]] $z \in k(C)$:

![divisor definition](thoughts/images/divisors.png)

Degree of a divisor as $\deg{D} = \sum_{P \in \mathbb{C^{*}}} n_{p}$.

## Divisor of a Meromorphic Function

For a [[zeroes-and-poles#Meromorphic Functions|meromorphic function]] $f(z)$, we can define the **divisor** of $f$ as,

$$\text{div} f = \sum_{P \in \mathbb{C^*}} (ord_{P} f)(P)$$

It is also known that for any non-zero meromorphic function $f \in K(\mathbb{C^*})$, then $\deg \text{div} \space f = 0$.

> [!example] 
> Let the polynomial be $f(z) = z^2 + 1$. We have a zero at $i$ and $-i$. But since the domain is $\mathbb{C^*}$, we need to consider point at infinity. In this case, we have a pole at infinity with degree 2 as $f(1/z) = 0$ at $z = 0$. 
> So, the divisor of f is, $\text{div} f = (i) + (-i) - 2(\infty)$

## Divisors of Elliptic Curves

In the case of Riemann sphere, meromorphic functions are considered. In the case of [[elliptic-curves|Elliptic curves]], rational functions are considered. So, divisor $D$ on $E$ are denoted by multi-set of points on $E$, written as sum:

$$
D=\sum_{P \in E(\mathbb{\bar{F}}_{q})}n_{P}(P)
$$

> [!note] This is different than standard group law on curve, which is evident from the notation as the absence of $[\cdot]$ square brackets around $n_{P}$ and presence of $(\cdot)$ around $P$.

> [!example] 
> let $P,Q,R,S \in E(\mathbb{\bar{F}}_{q})$, $D_{1}=3(P)-2(Q)+1(S)$, and $D_{2}=(P)+3(Q)+2(S)$, so $\deg(D_{1})=3-2+1=2$ and $\deg(D_{2})=1+3+2=5$. Calculate $\deg(D_{1}+D_{2})$, $\text{supp}(D_{1}),\text{supp}(D_{2}),\text{supp}(D_{1}+D_{2})$.
> 
> Another example is taking a function, let's say a chord $l:\lambda x+\nu$ on $E:y^{3}=x^{3}+ax+b$ which gives zeroes on 3 points: $P,Q,-(P \oplus Q)$ with multiplicities $1,1,1$ respectively. Line $l$ also has a pole at curve $E$ at $\mathcal{O}$ with order $3$. Thus, divisor of function $f$, $(l):(P)+(Q)+(-(P+Q))-3(\mathcal{O})$. Degree of divisor: $\deg(l)=0$.

## Prerequisites

1. Riemann Sphere: Denoted as $\mathbb{C^*}$ and contains $C \bigcup \lbrace \infty \rbrace$

# Resources
- [Examples of divisor of a function](https://math.stackexchange.com/questions/1290619/example-of-a-divisor-of-a-function)
- [Divisor of a line function on EC](https://math.stackexchange.com/questions/2434900/let-f-be-the-divisor-of-a-function-on-an-elliptic-curve-why-does-degf)
- [Divisors and Pairings](https://klwu.co/knowledge/ec-basics-3-divisors/)
- [Riemann Sphere](https://mathimages.swarthmore.edu/index.php/Riemann_Sphere)
