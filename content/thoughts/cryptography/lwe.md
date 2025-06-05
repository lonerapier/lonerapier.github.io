---
title: Learning With Errors
date: 2025-01-01
tags:
  - cryptography
  - post-quantum
  - math
---

# Learning without Errors

- Consider a vector $\vec{a} = (a_1, …, a_n)$
- Given $m$ such vectors $a \in \mathbb{F}_q^n$
- Find $s$ such that $a \cdot s = b$ where: $b_1 = \langle a_1, s \rangle$, $b_2 = \langle a_2, s \rangle$, $b_m = \langle a_m, s \rangle$
 
This can be solved using Gaussian Elimination. Find $U \in \mathbb{F}_q^{m×m}$ such that $UA = I$ (where $A$ is the original matrix) 
$$
UAs = 
\begin{pmatrix}
s_{1} \\
\vdots \\
s_{n} \\
0
\end{pmatrix}
= Ub
$$

Elementary Matrix Operations Required:
1. Row swap
2. Multiplying row by scalar
3. Adding a multiple of one row to another row

After applying these operations, obtain $U = U_1U_2…U_k$

## Gaussian Elimination Process
For $k$ from $n \rightarrow 1$:

1. Find an index $i \leq k$ such that $a_{i,k}$ is invertible
2. Multiply row by $d$ (inverse of $a_{i,k}$)
3. Swap rows $k$ and $i$
4. Make all other elements in index $k$ (column) 0 by multiplying: $R_j = a_{j,k}R_k$

To turn this into a hard problem, we add an error term $e_{i}$ and transform the problem from solving direct linear equations to solving approximations.

$$b_i = \langle a_i, s \rangle + [e_i]$$

# Distribution of Error Term

> [!info] can be skipped as this just lays out the distribution from which the error term is sampled. We lay out probability of any integer sampled from a gaussian distribution.

> [!note] TODO: understand and write this better.

> [!question] Why is Gaussian distribution needed and why can't uniform distribution be used?

Earlier security proofs of LWE required error distribution to be gaussian. This allowed the average to worst case reduction proofs which showed that an average LWE problem is as hard as worst cases of some lattice problems. In later work [[MP13](https://eprint.iacr.org/2013/069)] it was proven that problem retains it's hardness when errors as small (uniformly random in $\{ 0,1 \}$).

## Gaussian Distribution

Generally, rounded Gaussian distribution is used, though others can be used. For equivalence class $[a]$: $P_r[e_i = [a]] \space \forall [a] \in \mathbb{Z}_q$

To understand Gaussian distribution, let's recall the Probability Density Function (pdf):  A function $f: \mathbb{R} \rightarrow \mathbb{R}_{\geq 0}$ such that $\int_{\mathbb{R}}f(x)dx = 1$
- For probability of $X \geq z$: $P_r[X \geq z] = \int_z^{\infty} f(x)d(x)$

Gaussian distribution function is: $e^{-x^{2}} \implies \int e^{-x^2}dx = \sqrt{\pi}$

For Gaussian Distribution (GD) with parameters $\mu, \sigma$: $g_{\mu,\sigma}: x \mapsto \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$

Where:

- $\int_{\mathbb{R}} g_{\mu,\sigma}(x)dx = 1$
- Mean: $\int_{\mathbb{R}} x \cdot g_{\mu,\sigma}(x)dx = \mu$
- Standard deviation: $\int_{\mathbb{R}} (x-\mu)^2 g_{\mu,\sigma}(x)dx = \sigma^2$ 

To round the distribution such that its values fall under modulus distribution (integers). If $\chi$ is Gaussian, define:  $\chi_{\mathbb{Z}}=\underbrace{\lceil \chi\rfloor}_{\text{rounding}}$.

Probability that $X$ sampled from Gaussian distribution equals $N$: $\Pr[X_{\mathbb{Z}} = N] = \Pr[X \in [N-\frac{1}{2}, N+\frac{1}{2})] = \int_{N-\frac{1}{2}}^{N+\frac{1}{2}} g_{\mu,\sigma}(x)dx$

**Reduction of** $\chi_{\mathbb{Z}} \mod{q}$: 
$\Pr(\chi_{\mathbb{Z}_{q}}=[a])≈\Pr(\chi_{\mathbb{Z}}=a+kq)$ for some $k\in Z$. Summing over all possible $k$, i.e. 

$$\begin{align}
\sum_{k \in \mathbb{Z}}\Pr[\chi_{\mathbb{Z}}=a+kq]&= \sum_{k\in\mathbb{Z}} \int_{a+kq-\frac{1}{2}}^{a+kq+\frac{1}{2}} g_{\mu,\sigma}(x)dx \\
&=\int _{a-\frac{1}{2}}^{a+1/2}f_{\sigma,q}(x) \, dx 
\end{align}$$

This completes the distribution analysis.

Now, we know how to take a guassian distribution and turn it into a distribution over a modulus.

# Learning with Errors

- Let $\chi$ be rounded Gaussian mod $q$ and $e_i \leftarrow \chi$
- $q > 0$ is modulus, $m,n$ are integers $> 0$
- Given $m$ samples: $\langle a_i, s \rangle + e_i$ where $a_i$ uniform at random in $\mathbb{Z}_q^n$ and $e_i \leftarrow \chi$
- Find $[s_i]_{i=1}^n \in \mathbb{Z}_q$

## Secret-key Encryption from LWE

Fix: $n > 0$, $q > 0$, $X_\sigma$ with $Pr[|e| \leq q/4]$ is high

Encryption of $\mu \in {0,1}$:

1. Sample $a \in \mathbb{Z}_q^n$ uniformly at random
2. Sample $e \leftarrow \chi_{\mathbb{Z}_q}$
3. $c = (a, \langle a,s \rangle + e + \mu \cdot \lceil q/2 \rfloor)$

Decryption: $c \leftarrow \langle a,s \rangle$

- $e + \mu \cdot \lfloor q/2 \rfloor$ where:
    - $\geq q/2$ implies $\mu = 1$
    - $< q/2$ implies $\mu = 0$

## Public Key and Ciphertext size trade-offs
- use [SHAKE XOF](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf) instead of storing complete $A$
- $pk<-As+e$ can't be compressed, thus total size of public key: $256+m\log q$ bits
- ciphertext $(u,v) \in \mathbb{Z}_{q}^{m}\times \mathbb{Z}_{q}$ is $(m+1) \log q$ bits
	- for a concrete instantiation: $m \approx700$ and $q \approx 2^{13}$. This makes ciphertext too long to be used practically.
- Modify, public key to remove storing $u$ specifically.

General framework looks like:
- let size of plaintext to be encrypted is $k\cdot l$. Arrange it into matrix of size $\{ 0,1 \}^{k\times l}$.
- sample $S\leftarrow \chi^{m\times l},\ pk:(A\leftarrow \mathbb{Z}_{q}^{n\times m}, T=AS+E)$, where $E\leftarrow \chi^{m\times l}$
- sample $r,e_1 \leftarrow \chi^{k\times m},\ e_{2}\leftarrow \chi^{k\times l}$, and compute ciphertext.
- decryption follow same procedure.
This gives more freedom on how to vary public key v/s ciphertext size by varying $k,l$. Higher $l$ leads to more public key size while higher $k$ leads to higher ciphertext size.

Security follows from LWE argument since $A'=[A|T]$ looks uniformly random, and ciphertext $c$'s non-message component is distributed as a LWE vector. Thus, pk-ciphertext pair is computationally indistinguishable from uniformly random one.

## Optimisations [VL24]
- Reduce ciphertext size by removing low-order part
	- reduce bits of $v$ component by sending bits from set $S=\{\lfloor i\cdot \frac{q}{2^{\mathcal{K}}} \rceil:i\in[2^{\mathcal{K}}]\}$.
	- Let $\textsf{HIGH}_{S}(v)$ to be the element closest to $v$ in the set. Instead of transmitting $V\in \mathbb{Z}_q^{k\times l}$, just send $V'\in S^{k\times l}=\textsf{HIGH}_{S}(v)$.
	- Add an error term $e'=v-\textsf{HIGH}_S(v)$ to decryption $v-us$ such $v=v'+e'$
- modulus switching: move elements from $\mathbb{Z}_{q}\to \mathbb{Z}_{p}$ using map $x\to \lfloor \frac{x\cdot p}{q} \rceil$. It can be proven that the result that compresses elements and then decompress them back isn't far from the original result.
- Learning with Rounding:
	- observe that $t=As+e$ can rounded off by removing $e$ term, i.e. $\textsf{HIGH}_{S}(As+e)=\textsf{HIGH}_{As}$ with probability $\left( 1-\frac{\beta|S|}{2q} \right)^{n}$ whenever $q\gg|S|,q$.
		- $[\beta]$ is the distribution from where $s,e$ are sampled.
	- This allows to remove $e_2$ from $v$ as we're already adding an $e'$ to randomise $v$.
- pack message $m\in \set{0,1}^{N}$ as $M\in \set{0,1,...,2^{b-1}}^{k/\sqrt{ b }\times l/\sqrt{ b }}$. 
	- This means for encryption and decryption to work. Replace term $\frac{q}{2}M\to \frac{q}{2^{ b}}M$.
	- Remaining error terms then need to be under $q/2^{b+1}$ rather than $q/4$
	- For decryption to work again, i.e. estimating where result is in $[0,q/4]$ range will work only when $q$ is scaled by $2^{b-1}$ because then, $\frac{q\cdot 2^{b-1}}{2^{b}}=\frac{q}{2}$ fraction will return back to previous range.
	- But, then $\beta$ or $m$ need to be scaled to prevent security degradation, because security decreases when $\beta/q$ ratio decreases.
- Non-square public key: to make public key or ciphertext truly random, i.e. not needing the LWE assumption to fix indistinguishablity, $(2\beta'+1)^{m}>>q^{m}$.
	- This means that the set from which $s$ is chosen need to be bigger than the size of image $As$. Due to Leftover hash lemma, this is proven to be statistically close to distribution $(A,u)\in \mathbb{Z}_q^{n\times m} \times \mathbb{Z}_q^n$.
	> *Exercise*: Changes required to make ciphertext truly uniform?
- use different distribution for error and secret term
	- TODO

> Exercise: Prove that error term in ciphertext: $re+e_2-se_1\leq \frac{q}{4}$. Alternatively, prove *correctness* of the above encryption scheme.

Soundness follows from $\text{decision-LWE}_{n,q,m+1,\chi}$ argument. Applying a reduction on above encryption, allows one to solve decision-LWE problem.

# Key Exchange

> **Derive** a Non-Interactive key exchange using LWE similar to Shamir's Key exchange on Dlog problem.

# Public-key Encryption

Combining Ciphertexts:
- Combine two ciphertexts: $c_1, c_2 = (a_1+a_2, \langle a_1+a_2, s \rangle + e_1+e_2)$
- Extend to $m$ encryptions: $a_i \in \mathbb{Z}_q^n$, $e_i \leftarrow X_\sigma$, $b_i = \langle a_i,s \rangle + e_i$
- 'A' matrix with rows $(a_i)_{i \leq m}$

New Encryption of 0:
1. Sample $x \in {0,1}^m$
2. $(x \cdot A, \langle x, b \rangle) = (a, \langle a,s \rangle + \langle x,e \rangle)$
3. Encryption of 1: $(a, \langle a,s \rangle + \langle x,e \rangle) + (0,\lceil q/2 \rfloor)$

## Polynomial Rings: $(\mathbb{Z}[X],+,\times)$

with indeterminate $X$, consisting of elements $f(x)=\sum_{i=0}^{\infty}a_{i}X^{i}$, for $a_i\in\mathbb{Z}$. What we are interested is modular polynomials, i.e. $R_f: R[X] \mod f$. Addition can be seen as adding two vectors of size $d$. Multiplication of two polynomials means normal multiplication.

> Prove existence and uniqueness of $ab$, where $a,b \in R[X]$

## Modular Polynomials

**Congruence Relation**
- Let $R$ be a ring, $B \in R[x]$ be monic
- For $A_1, A_2 \in R[x]$, $A_1 \equiv A_2 \mod B$ if $\exists q \in R[x]$ such that $A_1 = qB + A_2$, where $\deg(A_2) < \deg(B)$
- Denoted by $R[x]/B$ ← congruence class

**Multiplication by $x^k$**
- $[P] \in Z_q[x]/x^n + 1 \mapsto [x^k] \times [P]$
- i.e., multiply $x^k$ by $x^j$:
    - If $j < n \Rightarrow x^{k+j}$
    - If $j \geq n \Rightarrow -x^{k+j-n}$
- Can be represented as matrix with each column as polynomial coefficients multiplied by $X^i$.
- $M_{A}=\begin{bmatrix}V_{a} & V_{aX \mod f} & \dots & V_{aX^{d-1} \mod f}\end{bmatrix}$, where $V_a$ is the polynomial coefficients.

$$M_A = 
\begin{bmatrix} 
a_0 & -a_{n-1} & -a_{n-2} & \cdots & -a_1 \\ 
a_1 & a_0 & -a_{n-1} & \cdots & -a_2 \\
\vdots & \vdots & \vdots & \ddots & \vdots 
\\ a_{n-1} & a_{n-2} & a_{n-3} & \cdots & a_0
\end{bmatrix}$$

> [!question] Why do we use $X^{k}\pm 1$ as the modulus for congruence class?
> Because it results in the minimum coefficient blowup, i.e. $\|M_{A}\|_{\infty}=\|V_{a}\|_{\infty}$. This means that maximum coefficient for $M_A$ equals maximum coefficient for $V_a$.

When $A, b$ is sampled from polynomial ring, i.e $A\in \mathcal{R}^{n\times m}_{f}$ and $b\in \mathbb{R}_{f}^{m}$, the corresponding matrix and vector looks like:

$$
\begin{gather}
\mathcal{V}_{a}=\begin{bmatrix}
V_{a_{1}} \\
V_{a_{2}} \\
\vdots \\
V_{a_{n}}
\end{bmatrix} \in \mathbb{Z}^{dn} \\
\mathcal{M}_{A}=\begin{bmatrix}
M_{a_{1,1}} & \dots & M_{a_{1,m}} \\
\vdots & \ddots & \vdots \\
M_{a_{n,1}} & \dots & M_{a_{n, m}}
\end{bmatrix} \in \mathbb{Z}^{dn\times dm} \\
\\
M_{A}\cdot V_{b}=V_{Ab} \in \mathbb{Z}^{dn}
\end{gather}
$$

## Cyclotomic Rings

> [!todo] complete this



# Module-LWE

- Defined similarly to LWE except:
    - $a_i \leftarrow (Z_q[x]/x^n + 1)^k$
    - $e_i \leftarrow (Z_q[x]/x^n + 1)^k$
- When $n = 0$, falls back to traditional LWE
- When $k = 1$, Ring-LWE problem
- Difficulty of the problem is adjusted with $n$ or $k$ and 'i'

**Solving Module-LWE with Lattices (Euclidean)**
- One can solve module LWE problem if it knows shortest vector of a Euclidean lattice
- Short vector:
    - $As + e = b \Rightarrow As - b = -e$
    - $\begin{pmatrix} A & b \\ 0 & t \end{pmatrix} \begin{pmatrix} s \\ -1 \end{pmatrix} = \begin{pmatrix} -e \\ -t \end{pmatrix}$

**Gaussian Elimination to Simplify AU**

$$\begin{pmatrix} A & b \\ 0 & t \end{pmatrix} \begin{pmatrix} s \\ -1 \end{pmatrix} = \begin{pmatrix} A & b \\ 0 & t \end{pmatrix} \begin{pmatrix} U & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} U^{-1} & 0 \\ 0 & 1 \end{pmatrix} \begin{pmatrix} s \\ -1 \end{pmatrix} = \begin{pmatrix} I_n & b' \\ 0 & t \end{pmatrix} \begin{pmatrix} s' \\ -1 \end{pmatrix}$$

## Module LWE Encryption

1. Keygen:
    - $A \leftarrow R_{q,f}^{n \times n}$
    - $s, e \leftarrow \chi^n$
    - $pk \leftarrow As + e$
    - $sk \leftarrow s$
2. Enc$(m, pk)$:
    - $m \in {0,1}^n$ written as $m_0 + m_1x + ... + m_{n-1}x^{n-1}$
    - $r \leftarrow \chi^n$, $e_1 \leftarrow \chi$, $e_2 \leftarrow \chi$
    - $u \leftarrow A^tr + e_1$
    - $v \leftarrow r(As + e) + e_2 + \lfloor q/2 \rfloor \cdot m$
    - $c \leftarrow (u,v)$
3. Dec$(c, sk, pk) \rightarrow m$:
    - $v - us = r \cdot e + e_2 - se_1 + \lfloor q/2 \rfloor \cdot m$
    - If $i$th coefficient of $v-us < q/4$ then $m_i = 0$ else $1$

## Simple KEM 
1. Encaps:
	- $m \in \{0,1\}^n$
	- $\hat{K} = H(pk||m)$
	- $C \leftarrow Enc(m,pk)$
	- $K = H(\hat{K}||C)$
2. Decaps:
	- $m\leftarrow \text{Dec}(c,pk)$
	- $\hat{K}\leftarrow H(Pk \| m)$
	- $K\leftarrow H(\hat{K} \| c)$

## Optimisations (NTT)

Motivation: Polynomial ring multiplication in $\mathcal{O}(d\log d)$ operations.

> [!todo] Isomorphism from $\mathcal{R}_{f,q}\to T_{f',q}$. Explain this more.

- Special case of FFT performed over $\mathbb{Z}_q^*$.
- Most computationally intensive operation in encryption scheme is the multiplication of polynomials in $\mathcal{R}_{q,f}$ that is $\mathcal{O}(n^2)$, where $n$ is the degree of the polynomial. NTT allows to perform this in $\mathcal{O}(n\log n)$.
- Polynomial: $\mathbb{Z}_q[X]/(X^d+\alpha)$, where $d=2^k$ and $-\alpha$ is perfect square of $d\in\mathbb{Z}_q$
  - $X^d+\alpha\equiv(X^{d/2}-r)(X^{d/2}+r)\mod q$
- Using, Chinese Remainder Theorem, $ab\in\mathbb{Z}_q/(X^d+\alpha)$ can be written as $ab \mod (X^{d/2}+r),\ ab \mod (X^{d/2}-r)$, and can be converted back to $\mod (X^d+\alpha)$.
- Multiplication in $X^{d/2}\pm r$ takes $2A,M$ operations, where $A$ represents addition, and $M$ represents multiplication.
- Recursion Operation then turns out to be: $T(d)=2T(d/2)+2d\cdot A+d\cdot M$.
- if $d$ is power of 2, and $-\alpha$ is a dth root of unity in $\mathbb{Z}_{q}$, then doing this recursively, asymptotic complexity of the algorithm turns out to be $d\log d$.
- Such a RoU exists, when $q\equiv1\mod{2d}$

- calculate it's asymptotic complexity
- number of additions/multiplications required to compute e2e
- 

## Kyber KEM

Parameters:
- $q=3329$
- $f=X^{256}+1$
- $k,\eta_{1},\eta_{2},d_{u},d_{v}\in \mathbb{Z}^{+}$
- $\psi_{\eta_{1}},\psi_{\eta_{2}}2$ are binomial distributions (not uniform distribution) because it is easy to sample from them, and have been proven that security doesn't depend on the distribution.

First, let's write out the CPA-secure encryption scheme underlying KEM:
1. $\text{KeyGen}\to(sk,pk)$:
	- $A\leftarrow \mathcal{R}^{k\times k}_{3329,X^{256}+1}$
	- $(s,e)\leftarrow \psi_{\eta_{1}}^{k}\times \psi_{\eta_{1}}^{k}$
	- $t:=As+e$
	- $pk=(A,t),\ sk=s$
2. $\text{Enc}(pk,m)\to c$ :
	- $(r,e_{1},e_{2})\to \eta_{1}^{k}\times \eta_{2}^{k}\times \eta_{2}$
	- $u^{T}:= \lfloor r^{T}A+e_{1}^{T} \rceil_{q\to2^{d_{u}}}$
	- $v:=\lfloor r^{T}t+e_{2}+\frac{q-1}{2}m \rceil_{q\to 2^{d_{v}}}$
	- $c=(u,v)$
3. $\text{Dec}(sk,c)\to m$:
	- $u'=\lfloor u \rceil_{2^{d_{u}}\to q}$
	- $v'=\lfloor v \rceil_{2^{d_{v}}\to q}$
	- $m=\lfloor v'-u'^{T}s \rceil_{q\to_{2}}$

### Security

#### Encryption and Decryption error

> [!todo] explain better

### Optimisations
- Use SHAKE-128 to extend sample $rho$ and derive $A$
- instead of sampling polynomial comprising of matrix $A$ in coefficient form, sample directly in evaluation form, or NTT representation
	- NTT representation: $\hat{a}=(a\mod X^{256/128}-r_{1},a \mod X^{2}-r_{2},\dots,a \mod X^{2}-r_{128})$
- Keep public key $A,t$ in NTT representation itself, which prevents any inverse NTT operation during $r^{T}A,r^{T}t$ operation in Encryption.
- Can't sample $s,e,r,e_1,e_{2}$ directly in NTT, because distribution is not uniform. Can't perform compression operation in NTT representation as well.

### KEM

1. $\text{Encaps}(pk)\to (m, K, c)$
	- $m\leftarrow\{ 0,1 \}^{256}\in \mathcal{R}_{X^{256}+1}$
	- $(K,\rho):=H(m,pk)\in \{0,1\}^{512}$
	- $c:=\text{Enc}(pk,m,\rho)$
2. $\text{Decaps}(sk,c,H)\to K$
	- $m' = \text{Dec}(sk, c)$
	- $K',\rho':=H(m',pk)$
	- $c':=\text{Enc}(pk,m',\rho')$
	- if $c'\neq c$, then $K':=\perp$

## Resources


[VL24]: https://eprint.iacr.org/2024/1287
[KyberSlash]: https://eprint.iacr.org/2024/1049