---
title: "Bilinear Pairings"
date: 2022-10-03T10:00:00-07:00
tags:
- cryptography
- math
---

[[elliptic-curves|Elliptic curves]] are used in cryptography mainly because of DLP i.e. it’s infeasible to calculate $x$ from $X = Gx$.

Pairing helps to compute certain complicated equations on EC points. Traditional EC math lets anyone check linear constraints on the number (eg. $P = Gp, Q = Gq, R = Gr,$ checking $5P + 7Q = 11R$), but pairing lets you check *quadratic* constraints ($e(P,Q) * e(G,G5) = 1$ *is checking* $p*q + 5 = 0$**).

> This makes DDH (Decision Diffie-Hellman) problem very easy to compute using pairings. Also DLog reduction becomes computably feasible if not done on extension fields of Finite Field as we want the target group to be sufficiently bigger so that it's not possible to do DLog reduction.

$e(P,Q)$ is a function defined on EC points. This is the *pairing.* Also known as bilinear map. It is called as bilinear because it satisfies following constraints:

- $e(P, Q+R) = e(P, Q) + e(P, R)$
- $e(P+S, Q) = e(P, Q) + e(S, Q)$

The pairing is linear in both constraints. So, EC Pairing is a function that takes a pair of points on an elliptic curve and returns an element of some other group, called the *target group*.

Example: $e(x,y) = 2^{xy}$, where $x = 3, y = 9$ -> $P = 3, Q = 4, R = 5$

Pairing needs to have another property, i.e. **Non-Degeneracy**. For generators $g1$, $g2$: $e(G_1, G_2) \neq 1$

> Note: $+$ and $\cdot$ can be any arbitrary operators. It doesn't matter what symbols are used in abstract mathematics as long as they obey the properties of associativity, commutativity and reflexivity.
> - $a + b = b + a$
> - $(a \cdot b) \cdot c = a \cdot (b \cdot c)$
> - $(a \cdot c) + (b \cdot c) = (a + b) \cdot c$

However, such simple pairings are not suitable for cryptography as its trivial to divide, compute logarithms and other computations. Simple integers can’t be used in a field having terms like public-private keys or one-way functions because anyone can go back to $y$ knowing $x$ and $e(x,y)$. Thus, we require numbers that can essentially function as “black boxes” or it's only possible to do simple arithmetic like addition, subtraction, multiplication and division on them and nothing else. That's where ECs and EC-points come in.

Pairing - $e: \mathbb{G_1} \times \mathbb{G_2} \rightarrow \mathbb{G_T}$

The reason why Bilinear map works?

First, we look into the concept of [[divisors|divisors]].

# Tate Pairings

# Miller's Algorithm

# MOV Attack

MOV attack refers to the transfer of DLP over EC to finite field $\mathbb{F_{p^k}}$ where it's much easier to solve. This is related to the [embedded degree](https://math.stackexchange.com/questions/824123/what-is-an-embedding-degree-of-elliptic-curve) of the EC.

> *Embedded Degree* of an EC refers to the minimum value of k for which $p^k \equiv 1 \pmod{n}$, where p = prime used for the field and n = order of the curve. This is actually called an attack because DLP shouldn't be solvable on ECs and thus for curves used throughout the cryptographic primitives, value of k is unreasonably large such that pairings are computably infeasible to compute.

# Complexities Assumptions on Bilinear Groups

- Discrete Log problem is still difficult if target group is sufficiently large.
- CDH (Computation Diffie-Hellman) is still hard as we can't find $g^{xy}$ if we know $g$, $g^x$, $g^y$.
- Bilinear Diffie-Hellman Problem: Given $P, aP, bP, cP \in G_1$, compute $e(P, P)^{abc}$
	![tripartite-key-exchange](thoughts/images/example-tripartite-key-exchange.jpeg)

# Prerequisites

1. Fermat's Little Theorem: for a prime p, and any positive integer a, $a^p \equiv a \space mod \space p$
2. Additive Group: set of numbers with operation defined on addition
3. Multiplicative group: set of numbers with operation defined on multiplication
4. Order of Multiplicative group

# Resources

- [Vitalik: Exploring Elliptic Curve Pairings](https://medium.com/@VitalikButerin/exploring-elliptic-curve-pairings-c73c1864e627)
- [Statebox’s Elliptic Curve Pairings](https://blog.statebox.org/elliptic-curve-pairings-213131769fac)
- [https://crypto.stanford.edu/pbc/thesis.pdf](https://crypto.stanford.edu/pbc/thesis.pdf)
- [https://people.csail.mit.edu/alinush/6.857-spring-2015/papers/bilinear-maps.pdf](https://people.csail.mit.edu/alinush/6.857-spring-2015/papers/bilinear-maps.pdf)
- [Fundamental Concepts Underlying Elliptic Curves (Level 2): Divisors and Pairings](https://klwu.co/knowledge/ec-basics-3-divisors/)
- [Why pairings are used?](https://crypto.stackexchange.com/questions/56400/why-pairings-on-elliptic-curve-are-used)
- [Basics of Pairings - Dan Boneh](https://www.youtube.com/watch?v=F4x2kQTKYFY)
- [Pairings for beginners](https://static1.squarespace.com/static/5fdbb09f31d71c1227082339/t/5ff394720493bd28278889c6/1609798774687/PairingsForBeginners.pdf)
- [Intro to Pairings](https://www.math.uwaterloo.ca/~ajmeneze/publications/pairings.pdf)
