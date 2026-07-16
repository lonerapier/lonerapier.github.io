---
title: Chinese Remainder Theorem
date: 2024-05-26
tags:
- cryptography
- algorithms
- number-theory
---

> [!quote] "In addition to being a theorem and an algorithm, we would suggest to the reader that the Chinese remainder theorem is also a state of mind." - "Introduction to Mathematical Cryptography" by Jeffrey Hoffstein, Jill Pipher, Joseph H. Silverman

[Problem](https://kconrad.math.uconn.edu/blurbs/ugradnumthy/crt.pdf): $x\equiv a \mod{m},x\equiv b \mod{n}$ where $\gcd(m,n)=1$, find $x$.

Proof that solution exists:

- write $x$ as $x= a+my \mod{m}$
- put into equation 2, $a+my\equiv b \mod{n}\implies my\equiv (b-a) \mod{n}$
- since $\gcd(m,n)=1$, then there must exists $mm'=1 \mod{n}$.
- multiplying by $m'$ on both sides, we get $y\equiv m'(b-a) \mod{n}$
- $y=m'(b-a)+nz$, putting into eq (1), x is of form: $a+mm'(b-a)+mnz$

Proof that solution is unique:

- In modulo arithmetic, if $c\equiv c' \mod{m}$, then $m|(c-c')$, then let $c\equiv c' \mod{m}\implies m|c-c'$ and $c\equiv c'\mod{n}\implies n|c-c'$
- then $mn|(c-c')$, thus $c\equiv c' \mod{mn}$. Thus, $c,c'$ are same modulo $mn$.

This can be easily generalised to arbitrary congruences with each pairwise modulo are co-prime, i.e. $\gcd(m_{i},m_{j})=1$. There's a very beautiful [general solution](https://homepages.math.uic.edu/~leon/mcs425-s08/handouts/chinese_remainder.pdf) to CRT.

Another approach to CRT is using group isomorphisms. Stating, let $N=pq$ where $p,q$ are co-prime, then $Z_{N} \simeq Z_{p}\times Z_{q}$ and $Z_{N}^{*}\simeq Z_{p}^{*}\times Z_{q}^{*}$. To prove this, take a function $f:Z_{N}\to(Z_{p},Z_{q})$ (similarly for multiplicative group) and prove it's a bijection.

To convert[^1] from $Z_{p}\times Z_{q}\to Z_{N}$:
- To convert $(a,b)\to c$, note that $(a,b)$ can be written as $a\cdot(1,0)+b\cdot(0,1)$ mod N.
- Now, find $(1,0)\to{1}_{p}$ and $(0,1)\to 1_{q}$.
- prerequisite: $\gcd(p,q)=1$, then using extended euclidean algorithm find $pX+qY=1$.
- Note that $pX\equiv1\mod{q},qY\equiv1\mod{p}$.
- $c=a\cdot 1_{p}+b\cdot 1_{q} \mod{N}$

[^1]: [Introduction to Modern Cryptography: Chapter 9](https://www.cs.umd.edu/~jkatz/imc.html)