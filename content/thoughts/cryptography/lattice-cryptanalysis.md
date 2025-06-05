---
title: Lattice Cryptanalysis
date: 2025-01-15
tags:
- math
- post-quantum
- lattices
- cryptography
---

# LLL Algorithm:

```
1. Let B ← SizeReduce(B)
2. Check each b_i in B. If Lovász condition doesn't hold:
   2.1 Swap b_i and b_{i+1} and go to (1)
   2.2 else output B
```

### Function `SizeReduce(B) → B`:
1. Compute Gram-Schmidt orthogonalization vectors: $\tilde{B} ← B$
2. For $j = 2...n$, do:
   - for $i = j-1...1$, do:
   - Let $b_j' ← b_j - \lfloor\mu_{i,j}\rceil \cdot b_i$

After every iteration: $B = B_0W$, where W is a uni-triangular matrix with just one non-zero off-diagonal entry at $i,j: -\mu_{i,j}$. 

> Also, $B' = \tilde{B}U'$ with $\mu_{ij}' \in [-\frac{1}{2}, \frac{1}{2}]$

Proof: TODO

To prove: LLL terminates in $\text{poly}(n,|B|)$
- Each intermediate basis must get closer to the final result in order to prove above statement
- Thus, "potential argument" is assigned to each basis
- These statements to prove:
  a) potential of starting basis: $2^N = max$
  b) potential of intermediate basis: $min = 1$
  c) Each iteration reduces potential by $\alpha > 1 : \sqrt{4/3}$ (actual)
  - Final time becomes $\log_{4/3}2^N = poly(n,|B|) = O(N)$

**Potential Function**: $\phi(B) = \prod_{i=1}^n (d(B_i))$ where $B_i = (b_1,...,b_i)$ $\forall i\in\{1,n\}$

$\hat{\phi}(B) = \prod_{i=1}^n \|\tilde{b}_i\|^{n-i+1}$

> **Claim**: Initial input basis has at most $2^N$ potential $[N = poly(n,|B|)]$
Each intermediate lattice has potential at least 1.

**Proof:** Second statement is trivial. Notes states every intermediate lattice basis is integral, so $det(L_i^*) \geq 1$. thus $\phi(B_i) \geq 1$

> **Claim**: If $b_i$, $b_{i+1}$ is swapped, then the orthogonalization vector for the new basis $B'$ is such that $\tilde{b}_j' = \tilde{b}_j$ for $j\notin\{i,i+1\}$ and $\tilde{b}_i' = \mu_{i,i+1}\tilde{b}_i + \tilde{b}_{i+1}$

**Proof:** 
- because $b_j' = b_j$ for $j < i$ because these are the orthogonal components of $\text{span}(b_1,...,b_{j-1}) = \text{span}(b_1',...,b_{j-1}')$
- for $j > i+1$, $(b_1,...,b_{j-1})$ are same with $b_i$, $b_{i+1}$ in reverse order.
- for $i^{th}$ component $\tilde{b}_i', b_i' = b_{i+1}$ which is orthogonal to $span(b_1,...,b_{i-1}) = span(b_1...b_i)$, which is equal to $\mu_{i,i+1}\tilde{b}_i + \tilde{b}_{i+1}$

> **Lemma**: If $b_i$, $b_{i+1}$ is swapped, then for resulting basis $B'$: $\frac{\phi(B')}{\phi(B)} \leq \sqrt{\frac{3}{4}}$

Proof: Exercise for future me.

Above lemma proves LLL terminates and number of iterations = O(N). Although each iteration length depends on bit length of current basis.

Next thing to prove: sizes of all intermediate basis are fixed polynomial in size of original basis.

> Another thing to note is that $\frac{3}{4}$ in Lovász just trade-offs approximation factor and number of steps.

# Coppersmith's Theorem: Polynomial-time algorithm to factor polynomial over composite N

### Three Important Remarks:
1. Efficient polynomial-time algorithms exist for factoring polynomials when N is prime (prime field) or when factoring over integers. Thus, Coppersmith's claim to factor composite N is substantial.
2. For composite N, number of roots are exponential in the bit length of N, i.e., $\omega^k$ proof if N = products of k primes. Thus, Coppersmith only finds "short" or small roots.
3. Algorithm isn't a solution to factoring. For example: knowing 2 square roots of a square residue modulo N reveals a non-trivial factor of N. Although it is proven that only one factor < $N^{1/2}$ exists and thus, not all roots can be found.

> Theorem: There is a polynomial-time algorithm that given any d-monic integer polynomial $f(x) \in \mathbb{Z}[x]$ and integer N, outputs all integers $x_0$ s.t. $|x_0| \leq B = N^{1/d}$ and $f(x_0) = 0 \mod N$.

**Proof**:
- Part 1 starts with weaker assumption $B = N^{3/(d+1)}$
- Strategy is to find polynomial h(x) s.t.:
  - every root of f(x) mod N is a root of h(x)
  - polynomial h(Bx) is "short" i.e. $|h_iB^i| < N/\deg(h)+1$ $\forall i$

Steps: 
> Q1: How do we find out if h($x_0$) = 0 over integers?  
> Ans: $|h_ix_0^i| \leq |h_iB^i| < N/\deg(h)+1$  

summing over all $h(x_0) < N → h(x) = 0$
1. Idea is to add multiples of polynomial $g_i(x) = Nx^i \in \mathbb{Z}[x]$ to $f(x)$.
   Adding multiples of N shouldn't change the roots of $f(x)$.
2. Construct a lattice basis of degree d+1 with basis vectors corresponding to coefficients of polynomial $g_i(Bx)$ and $f(Bx)$.

$$
B = \begin{pmatrix}
N & & & \\
BN & & & \\
B^2N & & & \\
\vdots & & & \\
B^{d-1}N & & & \\
& B^d & &
\end{pmatrix}
$$

> Q2: why $g_i(Bx)$ and f(Bx)? why a Bx inside?
> Idea is to find short lattice vector of this basis and interpret as h(Bx).

3. $\det(B) = B^{d\cdot d+1/2} = N^d$. By running LLL, obtain a vector v ∈ L(B) for which
   $\|v\| \leq 2^{n-1/2} \cdot d_1(L(B)) = 2^{d/2} \cdot B^{d/2} \cdot N^{d/d+1}$ from LLL upper bound
4. Define h(Bx) as the polynomial with coefficients given by v,
   $h(x) = v_0 + v_1/B x + v_2/B^2 x^2 + ... + v_d/B^d x^d$
5. Note: $h(x) \in ℤ[x]$ as $v_i$ is divided by $B^i$. Question: Why?
6. All roots of $f(x)$ are also roots of $h(x)$ by lattice construction. Why?
7. $|h_iB^i| = |v_i| \leq \|v\| < N/\deg(h)+1$. Why?
8. If we take $(2B)^{1/2} < N^{1/d+1}/d+1 = B < N^{2/d\cdot(d+1)}/2(d+1)^{1/2}$
   Q: How does the first inequality arise?

### Full Coppersmith Theorem:
Equating $B ≈ N^{1/d}$ in previous part came from creating a basis by adding multiples of $Nx^i$ to $f(x)$ to preserve the roots.

To remove $1/d$ bound on $N$, we will take higher powers of $h(x)$, i.e. $\deg(h) = n = d\cdot(m+1)$ for some predetermined $m$ such that:
a) root of $f \mod N$ is a root of $h \mod N^m$
b) $h(Bx)$ is "short" i.e. $|h_iB^i| < N^m/n+1$

Write a lattice with basis = coefficient of polynomial $g_{υ,ν}(Bx)$ where
$g_{υ,ν}(x) = N^{m-ν} \cdot x^υ \cdot f(x)^ν$, $∀ υ ∈ \{0,...,d-1\}$, $ν ∈ \{0,...,m\}$

- $\deg(g_{υ,ν}) = υ + νd$ and has leading coefficient $N^{m-ν}$
- $f(x_0) = 0 \mod N \Rightarrow g_{υ,ν}(x_0) = 0 \mod N^m$

$\det(B) = B^{(n\cdot n-1)/2} \cdot N^{dm(m+1)/2}$
Running LLL: $\|v\| \leq 2^{(n-1)/2}(B^{n\cdot n-1} \cdot N^{dm(m+1)})^{1/n} \leq (2B)^{n/2} \cdot N^{m/2}$
Setting $B < N^{1/d} \Rightarrow 2B^{n/2} < N^{m/2}/n+1 \Rightarrow \|v\| < N^m/n+1$ ("short")

I'll convert these handwritten notes about RSA, Coppersmith's method, and subset-sum cryptography into properly formatted Markdown with LaTeX. Let me break this down section by section:

## RSA & Coppersmith's Method

Define $h(8x)$ as the polynomial with coefficients given by $v$.

**Theorem:** Let $N$ have bit length $n$, let $e = 3$, let $m = 2^{n/2}$ be padding length. Given two encryptions $C_1, C_2$ of message $M$, with distinct pads $k_1, k_2 \in \{0,...,m-1\}$, one can efficiently recover $M$.

**Proof:**
- Let $M_1 = 2^m \cdot M + k_1$
- Let $M_2 = 2^m \cdot M + k_2$

Define two bi-variate polynomials $g_1, g_2 (x,y) \in \mathbb{Z}_N[x]$ s.t.:
- $g_1(x,y) = x^e - C_1$
- $g_2(x,y) = (x+y)^e - C_2$

Define resultant of two polynomials which is product of difference of all roots:
$res_x(p(x),q(x)) = \prod_{p(x_0)=q(x_1)=0} (x_0 - x_1)$

Note: For $g_1, g_2$, consider them a polynomial $g_x$ with coefficients in $y$. So, $res_x(g_1,g_2)$ is a polynomial in $y$.

**3 Important Remarks:**
1. $h(y) = 0$ if $h,g$ have common root
2. $res_x(p,q) = det(S_{p,q})$ where $S$ = square $(deg(p) + deg(q)$ dimension) matrix with entries as shifts of coefficients vectors of $p$ and $q$
3. $deg(g_1(x))$ in $y = 0$ and $deg(g_2(x))$ in $y = e$. According to matrix $S$:
   $deg(res_x(g_1,g_2)) = e^2$ in $y$

**Attack:**
- Note: $\Delta = k_2 - k_1 \neq 0$ is a root of $h(y)$. $|\Delta| \leq 2^m < N^{1/e^2}$
- Run Coppersmith on $h(y)$ to obtain a list of "short" vectors, one of which must be $\Delta$
- Set function $\ell(M) = M - \Delta$. See that $M_1 = \ell(M_2)$. Find the messages $M_1, M_2$ as $gcd(g_1', g_2')$ where:
  - $g_1' = \ell(x)^e - C_1$
  - $g_2' = x^e - C_2$

**Other attacks:**
- Small decryption exponent $d$
- Partial secret key exposure
- Larger powers of prime factors: when $N = p^k q$
- ECDSA, EDDSA biased on non-uniform nonces

# Subset-Sum Problem / Knapsack Cryptography

**Subset-sum:** Given integer weights $a \in \{a_1,...,a_n\}$ and $x = \{0,1\}^n$. Given $S = \langle a,x \rangle$. Find $X$.

- Used to encrypt message 'x' such that $S$ = ciphertext
- To decrypt easily, a secret "trapdoor" in the weights are added that converts the unknown subset-sum to an easily solvable instance

**Take:**
- Super-increasing sequence $b = (b_1,...,b_n)$ s.t. $b_i > \sum_{j<i} b_j \forall i$
- Choose some modulus $m > \sum b_i$, a uniformly sampled random multiplier $w \in \mathbb{Z}_m^*$ and uniformly random permutation $\pi$ on $\{1,...,n\}$
- Encryption of message $x \in \{0,1\}^n$: $S = E_{nc}(0,1) = w \cdot \sum a_i x$ where $a_i = w \cdot b_{\pi(i)} \mod m$
- Trapdoor: $(w,m,\pi)$
- Decryption: $w^{-1}S = \sum b_{\pi(i)}x_i \mod m$

Solve subset-sum for $\sum b_{\pi(i)}x_i$ since $m > \sum a_i$ [true subset-sum]

# Lattice Attacks

**Density of subset-sum instance:** $n/\max \log a_i$

**L083:** Efficient algorithm that, given uniformly random $a = (a_1,...,a_n)$ $\in {1,...,X}$ where $X \geq 2^{n^2(1/2 + \epsilon)}$ for some $\epsilon > 0$ and $S = \langle a,x \rangle$ for some arbitrary $x \in {0,1}^n$, outputs $X$ with probability $1-2^{-n^2(\epsilon-o(1))}$ over the choice of $a_i$.

**Proof:**
- TL;DR: Form a lattice with vectors parallel to scaled up $a_i$ vectors
- Prove that $h(?)$ is the only "short" vector possible to find from lattice reduction
- Fix a $\begin{pmatrix} Z \\ 0 \end{pmatrix} \in \mathbb{Z}^{n+1}$ and estimate probability that this vector not being a multiple of $\begin{pmatrix} x \\ -1 \end{pmatrix}$ satisfies subset-sum
- Prove that probability is negligible

The density analysis shows why certain parameters make the system vulnerable to lattice-based attacks. The L083 algorithm demonstrates an efficient method to break subset-sum instances when the parameters fall within specific bounds.

Some key insights from this section:
1. The security depends heavily on the density of the subset-sum instance
2. Lattice reduction techniques can be used to find short vectors that reveal the solution
3. The probability of finding incorrect solutions that satisfy the subset-sum constraint is negligible under certain conditions

# References
- ["Factoring polynomials with rational coefficients", A. K. Lenstra, H. W. Lenstra Jr., and L. Lovǎsz.](https://www.math.leidenuniv.nl/~lenstrahw/PUBLICATIONS/1982f/art.pdf)
- ["Finding a small root of a bivariate integer equation; factoring with high bits known", D. Coppersmith.](https://link.springer.com/content/pdf/10.1007/3-540-68339-9_16.pdf)
