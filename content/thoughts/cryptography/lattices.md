---
title: Lattice Based Cryptography
date: 2024-12-23
tags:
- cryptography
- post-quantum
- math
- lattices
---

# TODO
- [ ] Add Proofs
- [ ] Add more references to each result
- [ ] Diagrams
- [ ] Example
- [ ] Sage script snippets

# Prerequisites

- [[finite-fields|Field]]
- Vector Space: set of elements that satisfy vector axioms: vector addition $+:V \times V \to V$, scalar multiplication $\cdot: k \times V\to V$.
	- Vector Space over a field: Elements modeled from $K^{n}$ obey the properties of *field*.
- Span: linear combination of all the elements of a vector space. $\text{Span}(S)=\{ v=\lambda_{1}v_{1}+\lambda_{2}v_{2}+\dots+|\text{for} \space \lambda_{i}\in K,v_{i}\in V \}$.
- Basis of Vector Space: Minimal generating set of a $K-$Vector Space.
- Matrix: 2D arrays of elements. form vector space. some are invertible.
- Signature of Permutation: -1 if odd number of orderings, otherwise even.
- determinant of a matrix using signature: $\sum_{\sigma\in S_{n}}\textsf{sgn}(\sigma)\prod_{i=1}^{n}a_{i,\sigma(i)}$, where $S_{n}=\{ 1,\dots,n \}$
- cofactor of a matrix: $(-1)^{i+j}A_{ij}$, where $A_{ij}$ is determinant of matrix after removing ith row and jth column
- Laplace expansion: determinant using cofactors
- Inverse of a matrix: $\frac{1}{\det(A)}\cdot C^{T}$, where $C$ is the cofactor matrix.
- Basis matrix change for vector spaces: 
- Linear maps: $f:V\to W$ is a map if $v_{1},v_{2}\in V$ and $\lambda \in K$, then $f(\lambda v_{1}+v_{2})=\lambda f(v_{1})+f(v_{2})$
- Matrix of linear map: $\{ v_{1},v_{2},\dots \}= \mathcal{B}_{1}$ and $\{ w_{1},w_{2},\dots, \}=\mathcal{B}_{2}$ are basis vectors for $V,W$. And $f:V\to W$, so $f(v_{i})=\sum_{j\in [n]}a_{ij}w_{j}$.
	- $v=\sum_{j}x_{j}v_{j}$, $f(v)=\sum_{j}y_{j}w_{j}$, then $y=Ax$, where $A=(a_{ij})$
- Triangle inequality: $a,b,c$ being lengths of a triangle, inequality states $c\leq a+b$. In Euclidean geometry (important to this note), $\| a+b \|\leq\|a\|+\|b\|$.
- Cauchy-Schwartz inequality: for vector $u,v$ of an inner product space, $\lvert \langle u,v \rangle \rvert^{2}\leq \langle u,u \rangle\cdot \langle v,v \rangle$. Can also be written as $\lvert \langle u,v \rangle \rvert\leq\|u\|\|v\|$.
- [[pq-crypto#Gaussian Distribution]]

---

# History

Can be found in [Chris Peikert's Lec1](https://github.com/cpeikert/LatticesInCryptography/blob/main/lec01.pdf)

# Introduction

![lattices](https://i.imgur.com/Rw6PouE.png)

Lattices are simply evenly-spaced points on a grid stretched infinitely from the origin. Vectors are name for a point on the grid. More formally, n-dimensional lattice $\mathcal{L}$ is a discrete subgroup of $\mathbb{R}^{n}$, because points in lattice follow group axioms, and points are discrete, i.e. difference between any two points > 0.

Examples:
- Singleton $\left\{0\right\}$ is a lattice
- $\mathbb{Z}$ forms a 1-dimensional lattice. $\mathbb{Z}^{n}$ forms n-dimensional integer point lattice.
- odd integer set: $2\mathbb{Z}+1$ doesn't form a lattice. Why?
- rationals: $\mathbb{Q}$ doesn't form a lattice. Why?

Lattice Bases $\mathcal{B}$: set of linearly independent vectors $b_{1},\dots,b_{n}\subset R^{n}$ that generates the whole lattice.

$$\mathcal{L(B)}=\sum_{i \in n}\left\{z\in \mathbb{Z}| z_{i}b_{i}\right\}$$

Can be represented as $\mathbb{R}^{n\times n}$ whose columns are bases vectors $b_{i}$: $\mathcal{L}=\mathcal{B}z$

> Lemma: $B_{1},B_{2}$ generate same lattice $\mathcal{L}$ if there exists unimodular matrix $U$ such that $B_{1}=B_{2}U$.
> > Unimodular: $\det(U)=\pm1$ and integer matrix.

**Fundamental Domain**: Is set $D_0 = \{y \in \mathbb{R}^n \mid  y = M_Bx \text{ where } x \in [0,1)^m\}$

**Volume of Lattice**: (Area of the fundamental parallelepiped in 2D): $\sqrt{\det(M_B^TM_B)}$

# Interesting Lattices

## Dual Lattice
dual of a lattice is represented as $\hat{\mathcal{L}}$, which is the set of all vectors $x \in \text{span}(\mathcal{L})$ such that $\langle x,y \rangle\in \mathbb{Z} \ \forall y\in\mathcal{L}$. Definition of Dual is analogous to dual for vector spaces, i.e. dual of a lattice is a linear function $\phi: V \to \mathbb{Z}$, where $V$ is represented as vectors in $\text{span}(\mathcal{L})$.

### Geometry of Dual lattices
TODO

> Theorem: dual of a lattice with basis $B$ is lattice with basis $D=B(B^{T}B)^{-1}$

**Proof**: Let's first prove for non-singular square matrix special case. Then $D=B^{-T}$. Any vector $v\in \mathbb{R}^n$ is a dual vector if $B^TV\in\mathbb{Z}^{n}$.
To prove for arbitrary case:
- take any vector in $\mathcal{L}(D)$ and prove it exists in $\hat{\mathcal{L}}(B)$ and vice versa.

## q-ary Lattice

Cryptographers don't like work with infinite sets. So, we use quotient $\mathbb{Z}^m / q \mathbb{Z}$. 

For a number $q∈\mathbb{Z}$, call lattice *q-ary* if $q\mathbb{Z}^n\subseteq L \subseteq  \mathbb{Z}^n$. Represented as $\mathcal{L}^{\perp}_{q}(A)=\{ v\in\mathbb{Z}^{n}:Av\equiv0 \mod q \}$. This representation is also called *parity-check* representation, where the term is borrowed from coding theory.

$q\mathbb{Z}^n \subseteq L$  is periodic $\mod  q$.

Let's look at two more q-ary lattices:

$$
\begin{align*}
L_q(A) &= \{ y \in \mathbb{Z}^m : y = A^T x \text{ for some } x \in \mathbb{Z}^n \} \subseteq \mathbb{Z}^m \\ 
L_q^{\perp}(A) &= \{ y \in \mathbb{Z}^m : Ay = 0 \mod q \} \subseteq \mathbb{Z}^m
\end{align*}
$$

> Claim: $L_q(A)$ and $L_q^{\perp}(A)$ are dual of each other, i.e., $L_q(A) = \frac{1}{q} L_q^{\perp}(A)$

TODO. Prove vice-versa as well.

## Other representations

Another interesting representation is $\mathcal{L}_{q}^{\perp}([A|I_{n}])$ that encodes vectors $v_1,v_2$ such that $Av_1+v_2 \equiv 0 \mod q$. It's easy to observe that any vector $v_1\in \mathcal{L}_{q}^{\perp}(A)$ also satisfies $[A|I_{n}]\begin{bmatrix}v_{1}\\0\end{bmatrix} \equiv 0 \mod q$ and conversely, vector $v_1,v_2 \in \mathcal{L}_q^{\perp}([A|I_n])$ satisfies $Av_1 \equiv 0 \mod q$.

$$L_q^{\perp}([A|I_n])=\mathcal{L}\Bigg(\begin{bmatrix}-I_{m} & 0 \\ A & qI_{n}\end{bmatrix}\Bigg)$$

i.e. if $Av_1+v_2 \equiv 0 \mod q$, then there exists a vector $r$ such that $Av_1+v_2 = qr$.

# Important Result

## Brichtfeld's Theorem
Let $\mathcal{L} = \mathbb{Z}^n_{≤m}$ and $S \subseteq \text{span}_{\mathbb{R}}(v_1,…,v_n)$. If $\text{Vol}(S) > \text{Vol}(D_0)$, then $\exists z_1,z_2 \in S$ s.t. $z_1 - z_2 \in \mathcal{L}$

Proof:
- $D_0$: fundamental parallelpiped
- translating a parallelpiped across the lattice can encompass the whole lattice, i.e.
	- $v + D_0$ partition $\text{span}_{\mathbb{R}}(v_1,…,v_m)D_0$
- set of all intersections with translated parallelpiped: $S_v = S \cap (v + D_0)$
- $S = \bigcup_{v\in\mathcal{L}} S_v$
- $\text{Vol}(S) = \sum_{v\in\mathcal{L}} \text{Vol}(S_v) = \sum_{v\in\mathcal{L}} \text{Vol}(S_v - v)$
- Now observe that $S_v - v \subseteq D_0$
- Let's assume $S_v - v$ is disjoint, $\bigcup_{v\in\mathcal{L}} S_v - v \subseteq D_{0}\implies\text{Vol}(D_0) = \text{Vol}(\mathcal{L}) \geq \text{Vol}(S)$
- But assumption: $Vol(S) > Vol(D_0)$. Thus, $\exists v,w \in \mathcal{L}$, $S_v - v \cap S_w - w \neq \{\}$
- Let $z=S_{v}-v \cap S_{w}-w \in \mathcal{L}$ and $z_{1}=z+v\in S_{v}\subseteq S\enspace; \enspace z_{2}=z+w\in S_{w} \subseteq S$
- $v-w=z_{1}-z_{2}\in \mathcal{L}$

## Minkowski's Convex Body Theorem

> [!info] Preliminaries
> a) Symmetric Body: $x \in S \Rightarrow -x \in S$
> b) Convex body: $x,y \in S \Rightarrow \alpha x + (1-\alpha)y \in S$ $\forall \alpha \in [0,1]$
> c) Central body: centered around origin

Let $\mathcal{L} \subset \mathbb{R}^n$ be a lattice. Any convex, symmetrically central body $S \subset \mathbb{R}^n$ of $\text{Vol}(S) > 2^n \cdot \text{Vol}(\mathcal{L})$ contains a non-zero lattice point i.e. $S \cap \mathcal{L} \neq \{0\}$

### Proof
Take $S/2 := \{x \in \mathbb{R}^n | 2x \in S\}$, $\text{Vol}(S/2) = \frac{1}{2^n}\text{Vol}(S) > \text{Vol}(\mathcal{L})$

By Brichtfeld's theorem, $\exists z_1,z_2 \in S/2$, $z_1 - z_2 \in \mathcal{L}$
$\Rightarrow 2z_1, 2z_2 \in S$
$\Rightarrow$ By convexity: $2z_1 - 2z_2 \in S \Rightarrow \frac{2z_1 - 2z_2}{2} \in S$

### Minkowski First Theorem
Using Minkowski Theorem, aim is to get upper bound on $\lambda_{1}(\mathcal{L})$
> Let $\mathcal{L}$ be a lattice of dimension $m=n$. Then $\exists v \in \mathcal{L}/\{0\}$ s.t. $\|v\|_{\infty} \leq \text{Vol}(\mathcal{L})^{1/n}$  and $\|v\| \leq \sqrt{n} \cdot \text{Vol}(\mathcal{L})^{1/n}$

Proof: 
First step is to understand that second statement follows from first statement naturally. 

Let $\ell = \min\{\|v\|_{\infty} | v \in \mathcal{L} \setminus \{0\}\}$

Assume $\ell > \text{Vol}(\mathcal{L})^{1/n}$ and $C = \{x \in \mathbb{R}^n | x \leq \ell\}$
- $\text{Vol}(C) = (2\ell)^n < 2^n \cdot \text{Vol}(\mathcal{L}) \Rightarrow \exists v \in C \cap(\mathcal{L}/\{0\})$ (from Minkowski)
- $\|v\|_{\infty} < \ell \Rightarrow$ But $\ell$ was minimum of all $\|v\|_{\infty}$ in lattice.
- This contradicts our assumption and thus, $\|v\|_{\infty} < \text{Vol}(\mathcal{L})^{1/n} \Rightarrow \|v\| \leq \sqrt{n} \cdot \text{Vol}(\mathcal{L})^{1/n}$

# Gram-Schmidt Orthogonalization

> [!info] Preliminaries:
> a) Inner Product over Vector space $B$ map $\langle \cdot, \cdot \rangle: V×V \rightarrow \mathbb{R}$ satisfying:
> - Linearity
> - Symmetry
> - Positive-definiteness
> 
> b) Euclidean norm: $\langle \cdot, \cdot \rangle: V×V \rightarrow \mathbb{R}$, then $|x| = \sqrt{\langle x,x \rangle}$
> c) Euclidean distance: $d: V×V \rightarrow \mathbb{R}_+$ defined as $d(x,y) = |x-y| = \sqrt{\langle x-y,x-y \rangle}$

Orthonormal Bases:
- Let $v_1,…,v_n$ be basis for R-vector space V
- Then $v_1…v_n$ are orthogonal if $\langle v_i, v_j \rangle = 0, i \neq j$
- And orthonormal basis if $|v_j| = 1$
- Orthogonal Projection: Let $v_1',…,v_n'$ be orthonormal basis of $V' \subseteq V$, then: $P_{V'}(x) = \sum_i \langle v_i', x \rangle v_i'$
- Orthogonal Complement: If $V' \subseteq V$, $V'^\perp = {x \in V | \forall v' \in V', \langle x,v' \rangle = 0}$ Property: $V = V' \oplus V'^\perp$ $\forall x \in V$ and $x = P_{V'}(x) + P_{V'^\perp}(x)$

## Gram-Schmidt Process:

For a basis $(v_i)_{i \in [n]}$, find orthonormal basis $(v_i')_{i \in [n]}$ s.t. $\text{span}(v_1,…,v_n) = \text{span}(v_1',…,v_n')$

Process: Let $(v_i')_{i \leq k}$ be orthonormal basis of $V_k = \text{span}(v_1,…,v_k)$, then find $v_{k+1}'$ s.t. $(v_i')_{i \leq k+1}$ is orthonormal basis of $V_{k+1} = \text{span}(v_1,…,v_{k+1})$.

Formulas:
$$\begin{align}
v_1' &= \frac{v_{1}}{|v_{1}|}\\
v_2' &= \frac{P_{V_1^\perp}(v_2)}{|P_{V_1^\perp}(v_2)|}\\
v_{k+1}' &= \frac{v_{k+1} - P_{V_k}(v_{k+1})}{|v_{k+1} - P_{V_k}(v_{k+1})|}\\
\end{align}$$

## Gram-Schmidt in Matrix Form

$$
B = 
\begin{pmatrix} 
	\bigg | & \bigg | & & \bigg | \\ 
	b_1 & b_2 & \cdots & b_n \\ 
	\bigg | & \bigg | & & \bigg | 
\end{pmatrix}
$$

and $\tilde{b_j} = b_j - \sum_{i<j} \mu_{i,j} \cdot \tilde{b_i}$ where $\mu_{i,j} = \frac{\langle b_j, \tilde{b_i}\rangle}{\langle \tilde{b_i}, \tilde{b_i}\rangle}$. Thus, $B$ can be written as:

$$B = \underbrace{\begin{pmatrix} \bigg | & \bigg | & & \bigg | \\ \tilde{b}_1 & \tilde{b}_2 & \cdots & \tilde{b}_n \\ \bigg | & \bigg | & & \bigg | \end{pmatrix}}_{\tilde{B}} \cdot \underbrace{\begin{pmatrix} 1 & \mu_{1,2} & \cdots & \mu_{1,n} \\ & 1 & \cdots & \mu_{2,n} \\ & & \ddots & \vdots \\ & & & 1 \end{pmatrix}}_{U}$$

$\tilde{B}$ not a basis because $U$ is not unimodular. Take $|\tilde{b}_{i}|$ out as common factor. $B = Q \cdot D \cdot U$, where Q is orthogonal matrix ($Q^TQ = I$)

$$D = \begin{pmatrix} \frac{\tilde{b_1}}{|\tilde{b_1}|} & 0 & \cdots & 0 \\ 0 & \frac{\tilde{b_2}}{|\tilde{b_2}|} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \frac{\tilde{b_n}}{|\tilde{b_n}|} \end{pmatrix}$$

**Note:** Q can be mostly substituted as $I$ because it's just scale change for the latter and that doesn't affect direction, volume etc. of the lattice.

# Shortest Vector Problem (SVP)

Three types of problems:

1. Decision
2. Calculation
3. Search

**Key Relations:**

- Calculation ≥ Decision (i.e., Decision is reducible to Calculation)
- Decision ≥ Calculation also holds by binary search
- For search to be reducible, all values possible of $d_1$ has to be bounded by $2^{\text{poly}(|B|)}$ where $|B|$ = bit length of basis, which is true due to Minkowski theorem.

## Approximation SVP

$\gamma = \gamma(n) \geq 1$ is a function of dimension $n$:

1. Decision (GapSVP)
2. Estimation (EstSVP)
3. Search (SVP$_\gamma$)

#### Properties and Proofs
1. Prove that for any lattice $\mathcal{L}$, $\det(\mathcal{L}) = \prod_{i=1}^n |\tilde{b_i}|$
2. Prove that the body $P(\tilde{B}) = \tilde{B} \cdot [-\frac{1}{2}, \frac{1}{2}]^n$ is a fundamental region of $\mathcal{L}$

Any region $\mathcal{F}$ is a fundamental region if for all $z \in \mathbb{Z}$, $v + \mathcal{F}$ partition $\mathcal{L}$

For any $x \in \mathbb{R}^n$:
- $x \in v + B \cdot F$
- $x \in B \cdot z + B \cdot F$
- $B^{-1}x \in z + F$
- $\tilde{B}^{-1}U^{-1}x \in z + F$ (only one such x exists. Hence true)

> [!info] Claim: Gram-Schmidt vectors provide a lower bound on $d_1(L(B)) \geq \min_i(|\tilde{b_i}|)$

**Proof:** Let's take any $v \in L = Bz = DUz$ for some $z \in \mathbb{Z}^n$, 
$$= D \begin{pmatrix} * \\ * \\ \vdots \\ z_{i} \\ 0 \\ \vdots \\ 0 \end{pmatrix} = z^i |\tilde{b_i}|$$

- Let $z^i$ be the last non-zero lattice point entry in $z$. $|v| \geq z^i|\tilde{b_i}| \geq \min_i(|\tilde{b_i}|) [\because z^i \geq 1]$
- Putting this with upper bound from Minkowski: $\min_i(|\tilde{b_i}|) \leq d_1(\Sigma(B)) \leq \sqrt{n}(\prod_{i=1}^n |\tilde{b_i}|)^{\frac{1}{n}} = \sqrt{n}GM(|\tilde{b_i}|)$

LLL algorithm gives polynomial time algorithm for Search-SVP$_\gamma$ with $\gamma = 2^{(n-1)/2}$ where $n$ is $\dim(L)$.

**Q: Why exponential approximate is not a problem?**

Two conditions: 
- Size reduced: $|\mu_{i,j}| \leq \frac{1}{2}$ $\forall i < j$ 
- Lovász condition: $\frac{3}{4}|\tilde{b_i}|^2 \leq |\mu_{i,i+1}\tilde{b_i} + \tilde{b_{i+1}}|^2$

> **Lemma**: In an LLL-reduced basis, $\|\tilde{b}_{i+1}\|^2 \geq \frac{1}{2}\|\tilde{b}_i\|^2$

**Proof:** 
- From Lovász condition: $\frac{3}{4}\|\tilde{b}_i\|^2 \leq \|\mu_{i,i+1}\tilde{b}_i + \tilde{b}_{i+1}\|^2$. 
- Since $\tilde{b}_i$, $\tilde{b}_{i+1}$ are orthogonal, from Pythagorean theorem: $(a+b)^2 = a^2 + b^2$. 
- Rest left as an exercise for future me.

> **Corollary**: For an LLL-reduced basis: $\|b_1\| \leq 2^{\frac{n-1}{2}}d_1(L(B))$

## [[lattice-cryptanalysis|Lattice Cryptanalysis]]

# Algorithms for SVP, CVP

### Definitions

**SVP:** Given a basis $B$ of $\mathcal{L} \subset \mathbb{R}^n$, find some non-zero $v$ s.t. $\|v\| \leq \sigma(n)$, where $\sigma(v(\mathcal{L}))$

**CVP:** Given a basis $B$ and a point $t$ in $\mathbb{R}^n$, find some non-zero $v$ s.t. $\|v-t\| \leq \text{dist}(t,\mathcal{L}) \cdot \sigma(n)$, where $\sigma(n)$ is a poly-time approximation function $\geq 1$, $\text{dist}(t,\mathcal{L}) = \min_{l \in \mathcal{L}} \|l\| - d(t+\mathcal{L})$ i.e. smallest vector in coset $t+\mathcal{L}$ having norm at most $\sigma(n)\cdot d(t+\mathcal{L})$

**Proof:** $SVP_\sigma \leq CVP_\sigma$ for any $\sigma > 1$

**Arg:** Given a lattice basis $B = (b_1,...,b_n)$ and CVP oracle 'O':
- For each $i \in \{1,...,n\}$, let $B_i' = \{b_1,...,2b_i,...,b_n\}$
- Let $v_i = O(B_i', b_i')$
- Output $\min_{i \in [n]} \|v_i\|$

**Claims:**
1. Claim that $v_i$ output by above algorithm solves SVP i.e. $\|v\| \leq d(\mathcal{L})$
2. Observe that $\mathcal{L}(B_i')$ contain even vectors coordinates at $b_i$ while cost-lattice has all coordinates as odd
3. It means that $O \notin b_i' + \mathcal{L}_i'$. Then, one of the vector $v_i$ having length smallest in $\mathcal{L}_i' + b_i'$ must be smallest in $\mathcal{L}$
4. Because, one of the vector in $\mathcal{L}_i+b_i'$ shortest vector in $\mathcal{L}$ must have one odd coordinate implies that for one $i$, $d(\mathcal{L}_i' + b_i') = d(\mathcal{L})$
5. Assuming oracle O outputs $d(\mathcal{L}_i' + b_i')$, then $\|v_i\| = d(\mathcal{L})$

Claim: Similar argument for GapSVP$_\sigma$

## Micciancio-Voulgaris Algorithm for CVP: $O(2^n)$ time and space

> [!info] Voronoi cell
> represented as $\bar{V}$ and denotes all vectors $x \in \mathbb{R}^n$ such that: $\bar{V}(\mathcal{L}) = \{x \in \mathbb{R}^n | \|x\| \leq \|x-v\| \forall v \in \mathcal{L} \setminus \{0\}\}$

> [!info] Halfspace: for any non-zero lattice vector 
> $v$, $H_v = \{x: \|x\| \leq \|x-v\|\}$
> $= \{x: \langle x,v \rangle \leq \langle v,v \rangle/2\}$

Notice that $\bar{V}$ is intersection of $\mathcal{L} \cap H_v$. However, not all vectors are needed to get the correct $\bar{V}$.

$\min_{v \in \mathcal{L}} \cap_{v \in V} H_v = \bar{V}$ represents 'minimal relevant vectors'

> **Fact:** $v \in \mathcal{L}$ is a relevant vector if $\pm v$ are the only shortest vectors in $v + 2\mathcal{L}$

**Proof:**
Q: What is $v + 2\mathcal{L}$ coset?
A: It's shifted version of even vectors in lattice $\mathcal{L}$

Q: What if there are other shortest vectors in the coset?
A: Let's say 'x' is another shortest vector in the coset, then $b = \frac{x-v}{2} \in \mathcal{L}$ such that $H_b$ will contain all the vectors in $H_v$, thus $v$ is not a relevant vector

> **Corollary:** n-dimensional lattice contains at most $2(2^n-1)$ relevant vectors

### MV Algorithm Gist:

1. Compute $\bar{V}(\mathcal{L})$ of a lattice in pre-processing phase and total number of vectors inside $\bar{V} = 2^{n+1}$ which is the reason for exponential time for the algorithm

2. Start a "walk" from 't' and add vectors to 't' in the coset $t + \mathcal{L}$. This walk terminates at the vector which is the solution to CVP. This vector is the element of $t + \mathcal{L} \cap \bar{V}(\mathcal{L})$

3. Walk happens in phase where each phase starts with a $t_k \in (t + \mathcal{L}) \cap 2^{k-1}\bar{V}$. Each walk outputs a $t_{k-1} \in (t + \mathcal{L}) \cap 2^{k-2}\bar{V}$. Each walk takes $2^{O(n)}$ time and initial point 't' starts with $2^{O(n)}\bar{V}$. So, total number of phases is $O(n)$

## MV Walk

Given $\mathcal{L}$, $t$ (target): To show that the walk works, it suffices to show from scaling argument that finding a relevant vectors in the last step i.e. $(t + \mathcal{L}) \cap \bar{V}$. 

Adding vectors to t gives us $t_1 \in (t + \mathcal{L}) \cap \bar{V}$ and this step completes in $2^{O(n)}$ time and since total cosets are $< 2^{n+1}$, then MV completes in $2^{O(n)}$.

> **Q:** Why does the walk step work with higher scaled $t_i$'s?
> **A:** Because initial target point $t_k \in (t + \mathcal{L}) \cap 2^k\bar{V}$ can be deduced using LLL. Then, prior phase can be performed similarly as last step:

$2^k\bar{V}(\mathcal{L}) = 2\cdot\bar{V}(2^{k-1}\mathcal{L})$

Thus, this is same as last step where $2^{k-1}\mathcal{L}$ is just scaled $\mathcal{L}$ and relevant vectors will also be scaled.

### Walk:
1. Check current target $t_{cur} \in \bar{V}$, by checking $t_{cur} \in H_v$ $\forall v \in V$
   - Q: Where does V come from? How to check $t_{cur} \in H_v$?
2. If yes, terminate and output $t_{cur}$
3. If no, subtract an appropriately chosen vector $v \in V$ and loop
4. Logic for finding t includes finding an appropriate vector. Note that if $t \notin \bar{V}(\mathcal{L})$, then t lies outside of Halfspace of $H_v$, i.e. it violates $2\langle t,v \rangle \leq \langle v,v \rangle$ inequality
5. Algorithm greedily chooses a vector v that minimizes the ratio $\alpha = \frac{2\langle t,v \rangle}{\langle v,v \rangle}$
6. Then $\alpha$ is the smallest scaling factor for the Voronoi cell $\bar{V}(\mathcal{L})$

### Key Lemmas:

> **Lemma 1:** Step from $(t + \mathcal{L}) \cap 2\bar{V} \rightarrow (t + \mathcal{L}) \cap \bar{V}$ terminates in at most $2^n$ iterations.

> **Claim 1:** For any $t \notin \bar{V}$, if $v \in \mathcal{L}$ is a relevant vector maximizing $\alpha$, then $t - v \in \alpha\bar{V}$ and $\|t-v\| < \|t\|$

**Proof**: TODO

> **Claim 2:** For any t, let $U_t = (t + \mathcal{L}) \cap 2\bar{V}(\mathcal{L})$, then $|\{u\|u \in U_t\}| \leq 2^n$

**Proof:** Total cosets of $\mathcal{L}$ from $2\mathcal{L} = 2^n$ implies total cosets of $t + \mathcal{L}$ from $2\mathcal{L} = 2^n$

For any $t' \in \mathbb{R}^n$, $(t + 2\mathcal{L}) \cap 2\bar{V}(\mathcal{L})$ has the shortest length vector, and thus, all have same length.

Total distinct length vector in $(t + 2\mathcal{L}) \cap 2\bar{V}(\mathcal{L}) = 1$
For $2^n$ distinct cosets, max distinct length vector possible $= 2^n$

Using claim 1 → we proved that each intermediate step reduces the length of t and claim 2 → proved that at most step possible is $2^n$.

Thus, step from $(t + \mathcal{L}) \cap 2\bar{V} \rightarrow (t + \mathcal{L}) \cap \bar{V}(\mathcal{L})$ takes at most $2^n$ iterations.

---

# Distances in lattice

For an $m-$dimensional lattice 
> [!todo] complete this

# Cryptographic Problems based on Lattices

- SIS
- [[pq-crypto#LWE]]
- rLWE
- NTRU

## Hard Problems

Any cryptographic problem, more or less, follows the same pattern for deciding its hardness.

Two class of hardness:
- Average case: problem is hard for randomly drawn instance in the domain
- Worst case: problem is hard for some exclusive hard instances.

**Worst case to average case hardness** for Lattices: Show that a certain short vector problem $A$ is hard to solve on a random lattice as long as related short vector problem $W$ is hard to solve for the worst case, i.e. there exists a "reduction" that solves $W$ using a hypothetical oracle that solves problem $A$.

## SIS Problem

Denoted as the problem of finding short vector in a random lattice. We'll reduce the average instance of this problem to solving some hard problems in all lattices. Represented as $\textsf{SIS}_{n,q,m,\beta}$.

**Average Case Problem**:

- $A = (a_1, ..., a_m) \in \mathbb{Z}_q^{n \times m}$ where $a_i \in \mathbb{Z}_q^n$ such that for a $z \in \mathbb{Z}_q^n$, $Az = 0$ has solution such that $\|z\| \leq \beta$.
- $\beta \geq q$ otherwise trivial solution. Generally $\beta \geq \sqrt{m}$ and $m > n\log q$

### Translating SIS to other problems:

1. Approximate-SVP problem: Solve SVP for lattice $\mathcal{L}^{\perp}(A)$ where $A \in \mathbb{Z}_q^n$
   - $\mathcal{L}^{\perp} \subseteq \mathbb{Z}^m \Rightarrow$ discrete and subgroup of $\mathbb{Z}^m$
   - $\mathcal{L}^{\perp}(A)$ is also $q$-ary in the sense that $q\mathbb{Z}^m \subseteq \mathcal{L}^{\perp}(A)$
   - Solving SIS, i.e. finding non-zero $z \in \mathbb{Z}\mathcal{L}^{\perp}(A)$ solves SVP
2. Subset-sum: Finding $x \in \{0,1\}^m$ such that $S = \sum_{i \in m} a_i^?x_i$ for $a_i^? \in \mathbb{Z}$. Generalize $\mathbb{Z}$ to $\mathbb{Z}_q^m$ and it turns into SIS.

## Worst-case Lattice Problem:

### SIVP:

For an approximate $\gamma = \gamma(n)$, $\gamma$-approximate SIVP is defined as: given a basis $B$ of $n$-dimensional lattice $\mathcal{L}(B)$, output $n$ independent vectors $V = \{v_1, ..., v_n\} \subset \mathcal{L}$, $\|V\| := \max_i\|v_i\| \leq \gamma \cdot \lambda_n(\mathcal{L})$

**Theorem**: For $m = poly(n)$ and any $q \geq 4\beta\sqrt{n}$, there is a poly-time reduction from SIVP on $n$-dimensional lattices to SIS$_{q,n,\beta,\gamma}$ where $\gamma = \tilde{\mathcal{O}}(\beta\sqrt{n})$

#### Core Step:
- Sample $m$ independent gaussian vectors $x_1, ..., x_m \in \mathbb{R}^n$ with $s = \frac{\|B\|}{4\beta\sqrt{n}}$
- Let $c_i' = \lfloor Bx_{i} \rceil \in\mathbb{Z}^n$ be the coefficient vector of $x_i$ relative to $B$
- Rounded off: let $v_i' = Bc_i' \in \mathcal{L}$ and $a_i' = c_i' \bmod q$
	> **Note**: $a_i'$ corresponds to coset $\mathcal{L}/q\mathcal{L} \cong Bc_i'$, i.e. $a_i' + kq = c_i'$. So, $a_i'$ is the coefficient vector corresponding to $Ba_i'$ in coset $\mathcal{L}/q\mathcal{L}$
- Call SIS on $a = (a_1, ..., a_m)$ and generate a $z = (z_1, ..., z_m)$ such that $\sum a_i'z_i = 0 \bmod q$
- Compute new output vector as $v = q^{-1} \sum v_i'z_i$

#### Lemmas to prove core steps:

1. If $z$ is a solution to generated SIS, then $v \in \mathcal{L}$. (Step $3 \rightarrow 4$)
2. If $\|z\| \leq \beta$, then $\|v\| \leq \|B\|/2$ with high probability
3. If $\| b_1 \| \geq \gamma B / \sqrt{m} \cdot \log^{m/2} (d \cdot |L|)$, then $A = (a_1, \dots, a_m)$ is $n^{- \omega(1)}$ close to a uniformly random SIS instance and hence oracle $\mathcal{O}$ must output a solution.
	1. This lemma deals with the question that if the core step stops working, then the final vector $z$ is the solution to the SIS problem $v_i$ and the current basis is approximate $\text{SIVP}$ solution.
	2. **TODO**: Read Fourier analysis and smoothing parameter lecture.
4. Skipped

#### Additional Properties:

- Basis gets shorter by a factor of 2 at each step
- Final basis can't get any shorter and is a solution

The complete reduction demonstrates that if we can solve SIS in the average case, we can solve SIVP in the worst case, establishing the hardness relationship between these lattice problems.

#### Mathematical Details:
For a lattice $\mathcal{L}$:
- $\lambda_1(\mathcal{L})$ denotes the length of shortest non-zero vector
- $\lambda_n(\mathcal{L})$ denotes the minimum $r$ such that $\mathcal{L}$ has $n$ linearly independent vectors of length at most $r$

The reduction maintains the following invariants:
1. Each iteration reduces basis length: $\|B_{new}\| \leq \|B_{old}\|/2$
2. Generated vectors remain in lattice: $v \in \mathcal{L}$
3. Solution quality: $\|v\| \leq \gamma \cdot \lambda_n(\mathcal{L})$ with high probability

This establishes that:
1. The reduction must terminate (basis can't get infinitely short)
2. When it terminates, we have a valid solution to SIVP
3. The solution meets the approximation factor $\gamma$

## Properties of SIS Lattices

$$L_q^{\perp}(A) := \{ z \in \mathbb{Z}^m : Az = 0 \}$$

- $A$ is called parity check matrix for lattice $L_q^{\perp}(A)$.
- $L_q^{\perp}(A)$ are q-ary lattices. Vectors' membership can be checked modulo $q$.
- Cosets $x′$ belong to an element $x \in \mathbb{Z}^m$ such that $Ax = y$. Then define, $L_q^{\perp}(A) = \{ x' \in \mathbb{Z}^m : Ax' = y \}$
	- Thus, $L_q^{\perp}(A) = x' + L_q^{\perp}(A)$
- Determinant: $\det(L_q^{\perp}(A)) = \frac{|\mathbb{Z}^m|}{|L_q^{\perp}(A)|} = | \text{Image}(A) | \leq q^n$
- Minimum Distance: $d_1 (L_q^{\perp}(A)) \leq \sqrt{m} \det(L_q^{\perp}(A))^{1/m} \leq \sqrt{m} q^{n/m}$

> Lemma: Let $H$ be $\mathbb{Z}_q^{n \times n}$ invertible, then $L_q^{\perp}(H \cdot A) = L_q^{\perp}(A)$

- Canonical Basis Matrix: $A$ can be written as $A = [H \mid A']$, where $H$ is invertible $n \times n$ matrix and $A'$ is permuted columns.
	- Using the above lemma: $A = [ I_n \mid \hat{A} ]$, where $\hat{A} = H^{-1} A' \in \mathbb{Z}_q^{n \times (m-n)}$
	- This is called **Hermite normal form**. We can write basis for lattice

$$
\begin{gather*}
L_q^{\perp} \left( \begin{bmatrix} I_n \mid \hat{A} \end{bmatrix} \right) \subseteq \mathbb{Z}^m \\
B = \begin{bmatrix} qI_n \\ -\hat{A} \\ 0 \end{bmatrix} \in \mathbb{Z}^{m \times m}
\end{gather*}
$$

## Proof
- $B$ is indeed a basis of $\mathcal{L}$.
- Columns are linearly independent. Why?
- $\det = q^n$
- Every column vector of $B \in \mathcal{L}$ because $[ I_n \mid \hat{A} ] \cdot B = 0$

## LWE Lattices

In terms of lattice, LWE is a tuple $(A,t=As+e)$, where $A\leftarrow \mathbb{Z}_{q}^{n\times m},\ s\leftarrow [\beta ]^{m},\ e\leftarrow[\beta]^{n}$. This is same as outputting a lattice $\mathcal{L}_{q}^{\perp}([A|I_{n}])$ for a random $A$ and a coset $t$ in $\mathbb{Z}_{q}^{m}/\mathcal{L_{q}^{\perp}}$ such that $\text{dist}_{\infty}^{C}(t,\mathcal{L}_{q}^{\perp})\leq \beta$. On the other hand, outputting $(A,u)$, where both $A,u$ are randomly drawn, is similar to outputting a lattice $\mathcal{L}_{q}^{\perp}$, and a random coset of $\mathbb{Z}^{m}/\mathcal{L}_{q}^{\perp}$.

Can be formulated as a problem of differentiating between cosets that are close and far from lattice.

### Reducing LWE to SIS

Here, we prove a reduction from LWE to SIS

TODO

## NTRU

LWE problem's security is defined on the decision version, i.e. $\text{decision}-\textsf{LWE}_{m,n,q,\beta}$ being hard. Similarly, it can be defined on the search problem, i.e. finding $e$ when given $a, as+e$ where $a\leftarrow \mathcal{R}_{q,f}$, and $s,e \leftarrow [\beta]$.

NTRU problem:
- $a$ isn't chosen at random, but is the product of $p=2\beta+1$ and polynomials $g_1,g_2^{-1}$ conditioned on $g_2$ being invertible, where $g_i \leftarrow [\beta]$.
	- $a=pg_1g_2^{-1}$
- $p$ is co-prime to $q$
- NTRU problem relies on the security of $\mathcal{R}_{q,f}-\textsf{LWE}_{n,m,\beta}$, but $a$ is not random, rather product of $pg_1g_2^{-1}$

### Trapdoor function family based on NTRU

Let's build a encryption based on the trapdoor function with NTRU:
- Choose $\beta$. Compute $p=2\beta+1$
- Choose $g_1,g_2\leftarrow [\beta]$ with $g_2$ being invertible in $\mathcal{R}_{q,f}$ and $\mathcal{R}_{p,f}$
- $pk=a=pg_1g_2^{-1},\ sk=g_{2}$
- One way function mapping: $b=as+e\in \mathcal{R}_{q,f}$.
	- Observe that $b$ is in $\mathcal{R}_{q,f}$
- To recover $e,s$ from $b$, taking it with $\mod p$ is enough because $e,s \leftarrow [\beta]$ and $p>\beta$, so all numbers should have 1-1 mapping.
- $g_{2}b\mod p=pg_{1}s+g_{2}e \mod p = g_{2}e \mod p$
	- Question: Why does the equality $\mod p$ holds when $b\in \mathcal{R}_{q,f}$?
	- Maybe because $g_i,s,e \in [\beta]$ are small relative to $q$, thus $g_2b=pg_1s+g_2e$ equality holds over $\mathbb{R}_f$ as well.
- $(g_{2}b \mod p)g_{2}^{-1} \mod p = e$

**Security**: translates to finding short vector in lattice $\mathcal{L}_{q}^{\perp}([M_{a}|V_{b}|I_{d}])$

> [!question] why $V_b$ in above lattice?


# Questions
- concept of coset, and determinant relation with coset.
- q-ary lattice, and short vectors in random and q-ary lattice
- how LWE, SIS parameters need to be chosen for security? how are they related?
- happy but sad $a-b+c+\frac{a}{b}-\sum_{q}^{2d\not|a}$

# References
- [Lattice Based Cryptography: University of Southern Florida](https://www.youtube.com/watch?v=HwRl7UIcR14&list=PLasTV9KvJPBukwWUGoLJHCNG9IPJUA5Sg)
- ["A Decade of Lattice Cryptography", Chris Peikert](https://eprint.iacr.org/2015/939)
- [Simons Institute: Lattices: Algorithms, Complexity, and Cryptography](https://simons.berkeley.edu/programs/lattices-algorithms-complexity-cryptography/workshops#simons-tabs)
- ["Lattice Based Cryptography for Beginners", Dong Pyo Chi, Jeong Woon Choi, Jeong San Kim, and Taewan Kim](https://eprint.iacr.org/2015/938)
- ["CRYSTALS -- Kyber: a CCA-secure module-lattice-based KEM", Joppe Bos, Léo Ducas, Eike Kiltz, Tancrède Lepoint, Vadim Lyubashevsky, John M. Schanck, Peter Schwabe, Gregor Seiler, and Damien Stehlé](https://eprint.iacr.org/2017/634)
- ["Cryptobook"](https://cryptohack.gitbook.io/cryptobook/lattices/)
- ["6.876J Advanced Topics in Cryptography Fall 2018: Learning with Errors and Post-Quantum Cryptography"](https://people.csail.mit.edu/vinodv/6876-Fall2018/index.html), [Vinod Vaikuntanathan](http://people.csail.mit.edu/vinodv)
- [CS 294-168 Lattices, Learning with Errors and Post-Quantum Cryptography](https://people.csail.mit.edu/vinodv/CS294/)
- [thelatticeclub: Reference repository on Lattice-based Cryptography](https://thelatticeclub.com/)
- ["Basic Lattice Cryptography", Vadim Lyubashevsky](https://eprint.iacr.org/2024/1287)
	- [Lattice Tutorial](https://github.com/VadimLyubash/LatticeTutorial/blob/main/tutorial.pdf)
- ["Intense Crypto: Lecture 11 - Lattice Based Cryptography", Boaz Barak](https://files.boazbarak.org/crypto/lec_12_lattices.pdf)
- ["Lattice Based Cryptography", Daniele Micciancio, Oded Regev](https://cims.nyu.edu/~regev/papers/pqc.pdf)
- [A Comprehensive Review of Post-Quantum Cryptography: Challenges and Advances](https://eprint.iacr.org/2024/1940)
- [Lattices by Thomas Rothvoss](https://sites.math.washington.edu/~rothvoss/599-winter-2023/599-winter-2023.html)
- [Lattices and Lattice-based Cryptography by Huijia (Rachel) Lin](https://courses.cs.washington.edu/courses/cse599s/22sp/)
- [Lattices Algorithms and Applications by Daniele Micciancio](https://cseweb.ucsd.edu/classes/sp14/cse206A-a/index.html)
- [Topics in Lattice-Based Cryptography by Leo Fan.](https://leofanxiong.github.io/teaching/lbc_f22)

## Important Results
- [Ajtai, Miklós. "Generating hard instances of lattice problems." Proceedings of the twenty-eighth annual ACM symposium on Theory of computing. 1996.](https://dl.acm.org/doi/pdf/10.1145/237814.237838)
- [Jeffrey Hoffstein, Jill Pipher, and Joseph H. Silverman. NTRU: A ring-based public key cryptosystem](https://www.ntru.org/f/hps98.pdf)
- ["On lattices, learning with errors, random linear codes, and cryptography", Oded Regev](https://dl.acm.org/doi/abs/10.1145/1568318.1568324)
- ["Trapdoors for hard lattices and new cryptographic constructions", C. Gentry, C. Peikert, and V. Vaikuntanathan.](https://eprint.iacr.org/2007/432)