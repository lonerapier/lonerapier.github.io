---
title: Isogeny
date: 2024-02-12
tags:
  - math
---

understanding what are [isogenies](https://math.stackexchange.com/questions/36724/what-is-isogeny) in elliptic curve: so, isogenies are **group homomorphism** from one curve to another. they’re not an isomorphism because map doesn’t imply an inverse map. [Isogeny](https://www.johndcook.com/blog/2019/04/21/what-is-an-isogeny/) have a characteristic called _degree of isogeny_.

rational maps are used to map two curves. but elliptic curves are different because they have a notion of point at infinity.

isogeny between two EC maps infinity point of domain to codomain, and because rational maps are either constant or surjective, an isogeny either maps all of E1 onto O, or is surjective onto E2. in latter case, then it must be a finite map.

in broader sense, isogeny is a map between abelian varieties.

definition of isogeny from wikipedia: isogeny is a morphism of algebraic groups that is surjective and has a finite kernel.

> kernel refers to subset of $G$ that maps onto identity element of $H$ through the map.
> $\ker f = \{g\in G:f(g)=e_{H}\}$

