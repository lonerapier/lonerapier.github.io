---
title: "CCS: Customisable Constraint Systems"
date: "2024-04-29:00:00:00Z"
tags:
- cryptography
---

CCS generalises popular constraint systems designed for arithmetic circuit satisfiability like [[r1cs|R1CS]], [[snark|Plonkish]] and AIR incurring no overheads. Combining with [[spartan-notes|Spartan]], CCS creates a family of SNARKs referring as SuperSpartan. Supports high degree constraints which doesn't scale prover cost with degree of constraints. Also provides faster prover for AIR constraints than current STARKs.

## Section 1: Introduction

Plonkish/RAPs:

- Supports high degree custom constraint gates
- Can represent circuits more succinctly
- But prover incurs cost for high degree gates

[[hyperplonk|Hyperplonk]]:

- Replaces univariate gadgets of zero, product and permutation check of PLONK with multilinear variants.
- Multilinear gadgets are based on [[sumcheck-and-gkr|sumcheck protocol]], has a unique prover profile such that it can be implemented in linear time prover.

SNARKs for CCS:

- SNARKS for R1CS (Marlin, Spartan) can be easily extended to CCS without overheads.
- SNARKs for Plonkish (PLONK, HyperPlonk) can't be extended without asymptotic overheads.
- Introduces SuperSpartan and SuperMarlin, generalised variants of corresponding proof systems: Marlin and Spartan.
-  In contrast, 2 both Spartan and Marlin have machinery (via a so-called sparse polynomial commitment scheme, see, e.g., [ Tha20, Sections 10.3.2 and 16.2]() for an exposition) to handle general linear constraints.
- SuperSpartan provides *free addition gates* when applied to uniform instances of CCS.

> [!question] define uniform instances of CCS?

> [!question] what are these sparse PCS?

> [!note] Spartan's and SuperSpartan's polynomial IOP is *interactive oracle protocols*, differing from [[iop|polynomial IOPs]] (Interactive Oracle Proofs).
> In Interactive Oracle Protocols:
> - $\mathcal{V}$ has access to certain oracles from the $\mathcal{P}$ in terms of functions or polynomials.
> - $\mathcal{P}, \mathcal{V}$ engage in an interactive proof.
> - No oracle is sent during interaction.

SNARKS for uniform CCS:

SuperSpartan can prove any *uniform* CCS instance with succinct verifier without requiring any preprocessing. This is done by verifier evaluating certain multilinear polynomials that represent wiring of the circuit in question. This allows SNARKs for CCS for AIR instances can be proven in lograithmic time verifier without any *preprocessing*.

- SNARK with Orion PCS enables polylogarithmic verifier and linear time prover.
- SNARKs with Brakedown PCS obtains field agnostic SNARK with linear time prover but proof size is $\mathcal{O}(\sqrt{ |\mathsf{w}| })$.

## Section 2: CCS

R1CS structure $S_{R1CS}$:

- $m$: number of constraints
- $n$: number of public and private inputs
- $N$: number of non-zeroes entries
- $l$: number of public inputs
- $x$: vector of public inputs
- $w$: vector of private inputs
- $z$: $(w, 1, x) \in \mathbb{F}^{n}$

CCS structure $S_{CCS}$ consists of:

- $m, n, N, l, t, q, d$
- $t$: number of matrices $M_{i}\in \mathbb{F}^{m\times n}$
- $q$: number of multisets $S_{i}$
- $d$: maximum cardinality of each multiset
- $c_{i}\in\mathbb{F}$: sequence of constants

$$
\begin{equation}
\sum^{q-1}_{i=0} c_{i} \cdot \bigcirc_{j\in S_{i}} M_{j} \cdot z \boldsymbol{= 0}
\end{equation}
$$

Refer: [CPerez's CCS article]()

### 2.1 R1CS

### 2.2 PLONK

### 2.3 AIR 

AIR: 
- structure $S_{AIR}=\left(m,t,q,d,g\right)$
- public input and output instance, $X_{AIR}=x\in\mathbb{F}^{t}$
- witness, $w_{AIR}=w\in\mathbb{F}^{(m-1)\cdot t/2}$
- $z=\left( x[..t/2],w,x\left[ t/2+1.. \right] \right)\in(\mathbb{F}^{t/2})^{m+1}$
- $g$ multivariate polynomial in $t$ variables of $q$ monomials each of max $\deg d$.

AIR constraint:

$$
\begin{equation}
\forall i\in[1,m],\space g\left( z\left( (i-1)\cdot \frac{t}{2}+1 \right),\dots,z\left( i\cdot \frac{t}{2} \right),z\left( i\cdot \frac{t}{2}+1 \right),\dots,z\left( (i+1)\cdot \frac{t}{2} \right)  \right) = 0
\end{equation}
$$

Conceptually, execution trace can be defined as $\frac{t}{2}$ columns representing registers for $m$ cycles where first and last cycle represent input and output respectively. Above relation represent constraint polynomial for iteration $i-1$ and $i$ and it should evaluate to zero for all cycles.

CCS: structure $S_{CCS}$, instance $x$. $w$ satisfies $(S_{CCS},x)$ iff $w$ satisfies $S_{AIR},x$.

AIR-CCS transformation: $l=\frac{t}{2}$, $n=m\cdot \frac{t}{2}$

deriving $M_{i}\in\mathbb{F}^{m\times n}$:

- for $i\in\{0,\dots,m-1\}$:
- for $j\in\{0,1,\dots,t-1\}$, let $k_{j}=i\cdot \frac{t}{2}+j$:
- $i=0, j<\frac{t}{2}$: $M_{j}[i][j+|w_{AIR}|]=1$
	- This means, for public input set second last $\frac{t}{2}$ columns. This is due to in $z_{CCS}=(w,x,1)$ public input comes after witness while in $z_{AIR}$ first half comes before $w$.
- $i=m-1,j\ge \frac{t}{2}$: $M_{j}[i]\left[ j+|w_{AIR|}+\frac{t}{2} \right]=1$
	- for public outputs, set last $\frac{t}{2}$ columns.
- Otherwise, $M_{j}[i][k_{j}]=1$
	- sets $M_{j}$ for $i^{th}$ constraint polynomial
- end for
- end for

deriving $S_{i},c_{i}\forall i\in[0,q-1]$:
- $c_{i}$ equals coefficient of $ith$ monomial
- $M_{j}$ is added to $S_{i}$ if $i^{th}$ monomial contains $j^{th}$ variable.

## SuperSpartan IOP

Generalisation of [[spartan-notes|Spartan]] proof system for CCS.

$$
\begin{equation}
\boldsymbol{0 =} \sum_{a\in\{0,1\}^{\log m}}\widetilde{eq}(\tau,a)\sum_{i=0}^{q-1}c_{i}\prod_{j\in S_{i}}\left(\sum_{y\in\{0,1\}^{\log n}}\widetilde{M}_{j}(a,y)\widetilde{Z}(y)\right)
\end{equation}
$$

MLE of Z:

$$
\begin{equation}
\widetilde{Z}(X_{0},\dots,X_{\log n-1})=(1-X_{0})\widetilde{W}(X_{1},\ldots,X_{\log n-1})+X_{0}\widetilde{(1,x)}(X_{1},\dots,X_{\log n-1})
\end{equation}
$$

If size of $(1,x)$ is not equal to $W$, then pad $(1,x)$ with zeroes.

> [!question] why is it necessary to make $(1,x)$ equal to $W$?

Apply sumcheck over equation:

$$
\begin{equation}
g(a) := \widetilde{eq}(\tau,a)\sum_{i=0}^{q-1}c_{i}\prod_{j\in S_{i}}\left(\sum_{y\in\{0,1\}^{\log n}}\widetilde{M}_{j}(a,y)\widetilde{Z}(y)\right)
\end{equation}
$$

Verifier evaluates right hand side at $r_{a}$. Verifier needs evaluations of following quantities to compute $g(r_{a})$, $\sum_{y\in\{0,1\}^{\log n}}\widetilde{M}_{j}(r_{a},y)\widetilde{Z}(y)$. Can start other $t$ parallel sumchecks to evaluate the terms on $r_{y}$.

To confirm that the values are correct, Verifier evaluates terms on $r_{y}$ to get $v_{i}$ and check if the value equals by having oracle access to $\widetilde{M_{i}}$.

## SuperSpartan PCS

Can make use of any multilinear commitment scheme to create a SNARK with IOP defined above.


| Scheme/Cost |     |
| ----------- | --- |
| Brakedown   |     |
| Orion       |     |
| Hyrax       |     |
| Zeromorph   |     |           
