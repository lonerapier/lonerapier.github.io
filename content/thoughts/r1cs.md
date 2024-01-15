---
title: "Rank-1 Constraint System"
date: 2023-11-13T00:00:00Z
tags:
- cryptography
- zk
---

R1CS is a notation to describe a computation's circuit into three matrices, $A, B,$ and $C$ which follows following rule:

$$
Aw.Bw = Cw
$$

where $w$ is the witness vector.

$w$ represents **witness vector** and is usually denoted as $[1\space out\space x\space \ldots\space]$, comprising of all unique constrains after flattening the computation in R1CS form. R1CS notation can include computation of form $a*b+c=d$ and each matrix is of size $g*w$, where $g$ denotes number of gates (unique multiplications) and $w$ denotes size of witness vector.

> **Note**: $w$ isn't necessary for R1CS calculation.

## Computation to QAP

Converting any computation to QAP follows four steps:

1. Flattening
2. R1CS
3. Witness
4. QAP

Let's first take an example, a slightly complex than taken by Vitalik in [this](https://medium.com/@VitalikButerin/quadratic-arithmetic-programs-from-zero-to-hero-f6d558cea649) amazing explanation:

$$
out = 3x^{2}y+5xy-x-2y+3
$$

Flattening the computation:

1. $v_1=3xx$
2. $v_2=v_1y$
3. $-v_{2}+x+2y-3+out=5xy$

This means, number of gates, $g=3$, and number of unique constraints, $w=5$. Witness vector will be of the form: $W=[1\space out\space x\space y\space v_{1}\space v_{2}]$.

R1CS matrices looks like:

$$
\begin{array}{A}
A &=
&\begin{bmatrix}
1 &out &x &y &v1 &v2 \ 
0 &0 &3 &0 &0 &0 \
0 &0 &3 &0 &0 &1 \
0 &0 &5 &0 &0 &0 \
\end{bmatrix} \

B &=
&\begin{bmatrix}
0 &0 &1 &0 &0 &0 \
0 &0 &0 &1 &0 &0 \
0 &0 &0 &1 &0 &0 \
\end{bmatrix} \

C &=
&\begin{bmatrix}
0 &0 &3 &0 &1 &0 \
0 &0 &0 &0 &0 &1 \
-3 &1 &1 &2 &0 &-1 \
\end{bmatrix} \
\end{array}
$$

These matrices can be used to form a zero-knowledge proof themselves, by converting these into elliptic curve points, and bilinear pairings. But it's quite unoptimised, and then comes to rescue, our god and saviour, **polynomials**.

R1CS vectors are converted into polynomials for each constraint. Each column vector is interpolated to form a polynomial. Thus, $w$ polynomials are formed of degree $g-1$, each for $A,B,and\space C$.

## QAP

Polynomial under addition and multiplication form an [[ring-theory|algebraic ring]]. Polynomials can be proven succinctly using Schwartz-Zippel lemma.

$$
\sum_{i=0}^{w}a_{i}u_{i}(x) \sum_{i=0}^{w}a_{i}v_{i}(x) = \sum_{i=0}^{w}a_{i}w_{i}(x) + h(x)t(x)
$$

These polys, then can be evaluated at a random point $\tau$. $u_i(x)$ is a polynomial interpolated from $i^{th}$ constraint from matrix $A$.

$$
\begin{array}{C}
\sum_{i=0}^{w}a_{i}u_{i}(\tau) \sum_{i=0}^{w}a_{i}v_{i}(\tau) &= &\sum_{i=0}^{w}a_{i}w_{i}(\tau) + h(\tau)t(\tau) \\
\sum^{w}_{i=0}a_{i}[u_i(\tau)]_{1}&=&\sum^{w}_{i=0}a_i\sum^{g-1}_{j=0}u_{i,j}[\tau^{j}G]_{1} \\
\sum^{w}_{i=0}a_{i}[v_i(\tau)]_{2}&=&\sum^{w}_{i=0}a_i\sum^{g-1}_{j=0}v_{i,j}[\tau^{j}G]_{2} \\
\sum^{w}_{i=0}a_{i}[w_i(\tau)]_{1}&=&\sum^{w}_{i=0}a_i\sum^{g-1}_{j=0}w_{i,j}[\tau^{j}G]_{1} \\
h(\tau)t(\tau)&=&\sum^{deg(h)}_{i=0}h_{i}[\tau^{i}t(\tau)G]_1
\end{array}
$$

and verified by verifier using following relation:

$$
\begin{array}{A}
e([A]_1,[B]_{2})=e([C]_1,[G]_{2})\\
\end{array}
$$

Problem is, prover knows $A,B,C,w,t$ and can invent values which satisfy above relation. Groth16 designed a protocol that is more efficient for both prover and verifier that this.

## Groth16

TODO

### completeness, soundness, zero knowledge

TODO

## Questions

- can't understand how [linear combinations](https://twitter.com/recmo/status/1573748456111439872) are free in R1CS?

## Resources

- [](https://www.zeroknowledgeblog.com/index.php/the-pinocchio-protocol/r1cs)
- [](https://learn.0xparc.org/materials/circom/additional-learning-resources/r1cs%20explainer/)
- [](https://tlu.tarilabs.com/cryptography/rank-1)
- [](https://crypto.stackexchange.com/questions/67857/what-is-a-rank-1-constraint-system)
- [])
- [vitalik article's sage mode](https://risencrypto.github.io/R1CSQAP/)
- [](https://github.com/thogiti/thogiti.github.io/blob/master/_posts/2023-08-14-Mastering-Rank-One-Constraint-System-R1CS-with-Circom-Examples.md)
- [](https://risencrypto.github.io/zkSnarks/)
- [](https://www.ingonyama.com/ingopedia/arithmzk)
- [](https://www.reddit.com/r/crypto/comments/10w2e1g/r1cs_and_qap_zksnarks_from_zero_to_hero_with/)
- [](https://blog.lambdaclass.com/arithmetization-schemes-for-zk-snarks/)
- [](https://observablehq.com/@dalaillaama/r1cs-circuit-visualiser/2)
- [](https://coders-errand.com/constraint-systems-for-zk-snarks/)
- [](https://www.numencyber.com/introduction-to-zero-knowledge-proof-part-3/)
- [](https://www.cs.utexas.edu/users/moore/acl2/manuals/current/manual/index-seo.php/R1CS____R1CS)
- [](https://jtriley.substack.com/p/constructing-zk-snark-circuits)
- [](https://consensys.io/diligence/blog/2023/07/endeavors-into-the-zero-knowledge-halo2-proving-system/)
- [](https://www.di.ens.fr/~nitulesc/files/Survey-SNARKs.pdf)
- [can there be a better way of defining polys in qap](https://twitter.com/a_kirillo/status/1628217418148646913)
- [ZK IAP Lecture 7: Arithmetizations](https://assets.super.so/9c1ce0ba-bad4-4680-8c65-3a46532bf44a/files/e11309fb-7356-42ad-9c78-565341abd80d.pdf)
- [](https://crypto.stackexchange.com/questions/88466/construction-of-r1cs-vs-qap)
- [](https://crypto.stackexchange.com/questions/105586/how-to-compare-two-field-elements-in-arithmetic-circuit?rq=1)
- [shumochu's thread about R1CS vs plonkish arithmetization](https://twitter.com/shumochu/status/1653119272418156550)
