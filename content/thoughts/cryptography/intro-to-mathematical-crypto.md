---
title: "Intro to Mathematical Cryptography"
date: 2024-05-26:12:00:00
tags:
- cryptography
- math
---

## Chapter 1: Modular arithmetic

- euclidean algorithm: find $\gcd(a,b)$.
- extended euclidean: find $p,q$ such that $ap+bq=\gcd(a,b)$
- euler's totient function: $\phi(m)=\#\left( Z/mZ\right)^{*}=\#\left\{0\leq a<m:\gcd(a,m)=1\right\}$

## Chapter 2

[[diffie-hellman]]

[[elgamal-pke]]

### Hardness of DLP

A very important thing to note is hardness of DLP depends heavily on the [[group-theory|groups]] used. For example: DLP for an additive group in $\mathbb{F}_{p}$ can be solved in $\mathcal{O}(\log p)$ using Extended-Euclidean algorithm while the best known solution for DLP in $\mathbb{F}_{p}^{*}$ has sub-exponential time algorithm. Elliptic curves has DLP solution computable in $\mathcal{O}(\sqrt{ p })$ which is exponential time.

### Shanks Babystep-Giantstep

Can solve DLP in a multiplicative group in $\mathcal{O}(\sqrt{ N }\log N)$.
- let $n=1+\sqrt{ N }$. 
- create two lists:
	- L1: $e,g,\dots,g^{n}$
	- L2: $h,h\cdot g^{-n},h\cdot g^{-2n},\dots,h\cdot g^{-n^{2}}$
- find match between two lists, let $g^{i}=h\cdot g^{-jn}$
- $x=i+jn$ solves $g^{x}=h$

### CRT

[[crt]]

### Pohlig-Hellman Algorithm

In a group $G$, suppose that you have an algorithm to solve discrete logarithm $g^{x}=h$ in a group of prime power order, i.e. $q^{e}$ in $\mathcal{O}(S_{q^{e}})$ steps, then it's possible to solve discrete logarithm in a group with order $N=q_{1}^{e_{1}}\cdot q_{2}^{e_{2}}\dots q_{t}^{e_{t}}$ in $\mathcal{O}\left( \sum_{i\in[0,t]} S_{q_{i}^{e^{i}}} +\log(N)\right)$ steps.

Basic steps are to divide the algorithm for each prime power factor and find discrete logarithm and then use CRT to solve for $x$ in $N$:

- let $N_{i}=\frac{N}{q_{i}^{e_{i}}}$. Note that, each $N_{i}$ is pairwise co-prime. Now, let $g_{i}=g^{N_{i}}$ and $h_{i}=h^{N_{i}}$
- for any prime power $i$, let $x=y_{i}+q_{i}^{e_{i}}z_{i}$
- taking it to multiplicative group $g$: 
$$
\begin{align}
(g^{x})^{N/q_{i}^{e_{i}}}&=(g^{y_{i}+q_{i}^{e_{i}}z_{i}})^{N/q_{i}^{e_{i}}} \\
&=(g^{y_{i}N/q_{i}^{e_{i}}})\cdot g^{Nz_{i}} \\
&=g_{i}^{y_{i}} \\
&=h_{i}=h^{N/q_{i}^{e_{i}}}
\end{align} 
$$
- each of the previous step takes $\mathcal{O}(S_{q_{i}^{e_{i}}})$ steps.
- now use CRT, to solve for $x$ in each $N_{i}$ in $\log(N)$ steps.

### Polynomial Rings

$\mathbb{F}[X]:a_{0}+a_{1}x+a_{2}x^{2}\dots$, where $a_{i}\in\mathbb{F}$ form a ring with $(+,\cdot)$.

- write $a$ as $a=b\cdot k+r$ where $\deg(b)>\deg(r)$ and $b \neq 0$ and $b,k,r \in \mathbb{F}[X]$
- arithmetic on polynomial rings
- $\gcd(a.m)=a\cdot u+m\cdot v=d$, then there is a common divisor $d$ of $a,b$.
	- extended euclidean algorithm to compute $u,v$.
- every element of ring can be factored into monic irreducible polys.

**Quotient ring**: let $m\in\mathbb{F}[X]$ be an irreducible poly, then every congruence class has representation $\bar{a}\in\mathbb{F}[X]/(m)$ such that $a=m\cdot k+r$.
- unit in a quotient ring: $\bar{a}$ exists iff $\gcd(a,m)=1$
	- go in both direction, let $\bar{a}$ exists and then prove that gcd(a,m)=1
	- let $\gcd(a,m)=1$, then $\bar{a}$ exists.
- every element in the field created by quotient ring has a multiplicative inverse.
	- take help of $\gcd(a,m)$, if gcd=1, then unit exists
	- if gcd=d, then d divides m, but m is irreducible and monic, then d = m, and d divides a, so m divides a. if m divides a then $\bar{a}=0$.

> [!question] prove that there exists an irreducible polynomial $m\in\mathbb{F}_{p}[X]$ of degree $d>1$.

### Exercises

- prove lagrange's theorem, i.e. $G$ has subgroup of $d$ such that $d|k$, if $|G|=k$ and $G$ is a finite group.
- 2.11-2.15: how do I prove if a group is commutative? and if a group is commutative, does $g_{1}*g_{2}$ lie inside group? prove?
- 2.14: how to prove if a map is group homomorphism?
	- prove map holds for $\phi(a+b)=\phi(a)+\phi(b)$
	- identity element is preserved
- 2.22: show a map is homomorphism of rings. 
	- shown by representing an element in quotient ring as a+my and then mapping to product of rings and checking ring operations (+,*).
- 2.25: if you know the square root solution, how to use it to factorise $n=pq$?
- 2.29: prove a ring with non-zero element is a field. use the map to map element from a -> a.b. prove that map is 1-1. then for $a \in R: a.b = 1$. thus inverse exists.
- 2.40: couldn't find the starting point to compose the proofs. i + (1+…+1) = j + (1+…+1)

## Chapter 3: Integer factorisation and RSA

- diffie-hellman and el-gamal cryptosystem is based on hardness of DLP, i.e. $a^{x}\equiv b \mod{p}$, where a, b and p are public values and x is the secret.
- in RSA cryptosystem, $x^{e}\equiv c \mod{N}$, where e, c, and N are public values. In short, RSA is based on hardness of finding eth roots modulo N.
- theorem: let $p,q$ be distinct primes, and $g=\gcd(p-1,q-1)$, then $a^{((p-1)(q-1))/g}\equiv1\mod{pq}$
	- proof is using Fermat's Little Theorem, as $a^{p-1}\equiv1\mod{p}\implies a^{p-1}\equiv1\mod{pq}$

> [!check] let $p$ be a prime and let $e\geq 1$ be an integer satisfying $\gcd(e,p-1)\equiv1$, then $de\equiv1\mod{p-1}$
> $de-1=(p-1)c \implies de-(p-1)c=1 \implies \gcd(e,p-1)=1$
> $\gcd(e,p-1)=1\implies ed+(p-1)c=1 \quad\text{(using extended euclidean)}\implies ed=1\mod{p-1}$

- let $p$ be a prime, and $e\geq1$ such that $\gcd(e,p-1)=1$, then there exists $d$ such that $de=1 \mod{p-1}$. Now, let $x^{e}\equiv c \mod{p}$, then unique solution to congruence is $x\equiv c^{d}\mod{p}$
	- prove existence and uniqueness of solution.
- let $p, q$ be distinct primes, and such that $\gcd(e,(p-1)(q-1))=1$, then $ed=1\mod{(p-1)(q-1)}$. Now, let $x^{e}\equiv c \mod{pq}$, then unique solution to congruence is $x\equiv c^{d}\mod{pq}$.
	- prove existence and uniqueness of solution.

### RSA encryption

- let Alice and Bob be two participants.
- Bob chooses two distinct primes $p,q$ and calculates $N=pq$. 
	- choose public encryption key $e$ such that $\gcd(e,(p-1)(q-1))=1$, send $N,e$ to Alice.
- Alice chooses the message m and encrypt as $c=m^{e} \mod{pq}$. Send ciphertext $c$ to Bob.
- Bob knowing p and q, finds $d$ such that $de\equiv1\mod{(p-1)(q-1)}$, decrypts ciphertext as $c^{d}\mod{pq}$
- security of RSA doesn't depend on adversary Eve knowing private key $d$, but, it depends on hardness of finding solution to $de\equiv1\mod{(p-1)(q-1)}$. Thus, even if Eve knows $p+q$, it's easier to find solution.
- Also, bob has two choices, either make encryption key larger and decryption key smaller, or vice versa. making decryption key smaller is usually insecure.
- **Man in the middle attack**: these are attacks that are not directly related to cryptosystem's problem hardness but on other factors like communication between parties involved.
- For example: in RSA, attacker Eve can intercept Alice's ciphetext $c=m^{e} \mod{pq}$ and send $c'=c.k^{e}\mod{pq}$ to Bob.
- Bob, then decrypts $m'=c'^{d}=(c.k^{e})^{d}=m.k \mod{pq}$ and send $m'$ to Eve which she can decrypt easily knowing $k$.
- similarly, using **multiple encrpytion keys** is also **not secure**, as Eve can find $e_{1}\cdot u+e_{2}\cdot v=\gcd(e_{1},e_{2})$, $e_{1},e_{2}$ being two encryption keys, and $c_{1},c_{2}$ being ciphertexts sent by Alice to Bob. Eve can compute, $c_{1}^{u}\cdot c_{2}^{v}=c^{e_{1}u}\cdot c^{e_{2}\cdot v}=c^{e_{1}u+e_{2}v}=c^{\gcd(e_{1},e_{2})}$. if, $\gcd(e_{1},e_{2})=1$, then Eve has ciphertext.

### Primality testing

- Fermat's little theorem can be used to prove **compositeness** of a number, but can't prove primality of it. i.e. if $a^{n}\equiv a$
- Carmichael numbers: that are composite but exhibit FLT.
- **Miller-Rabin test**: checks whether a number is composite or not, and gives *Miller-Rabin witness* for a number $n$
	- get a test subject : $n$, a witness suspect $a$:
	- check whether $n$ is even, or $1<\gcd(a,n)<n$, return Composite
	- factorise $n-1=2^{k}q$, with $q$ as odd number.
	- write $a=a^{q}\mod{n}$
	- if $a\equiv1\mod{n}$, then return failure (i.e. not sure if prime)
	- loop: $i=\{ 0,\dots,k-1 \}$:
		- if $a\equiv-1\mod{n}$, return failure
		- set $a=a^{2}\mod{n}$
	- return composite
- Proof of Miller-Rabin test: for an odd prime: if $p-1=2^{k}q$, then either $a^{q}=1$, or $a^{q},a^{2q},\dots,a^{2^{k-1}q}\equiv-1\mod{p}$ must hold.

### Distribution of primes

- **distribution of primes**: very interesting mathematical results that check how prime numbers are distributed across ranges.
- **prime number theorem**: $\lim_{X\to \infty} \frac{\pi(X)}{X/\ln(X)}=1$, where $\pi(X)$ represents number of primes between $\{ 2,\dots,X \}$.
- TODO: read proof of prime number theorem
- using prime number theorem, one can estimate the probability of finding a prime number in a range, and can use miller-rabin test to be confident that the chosen number is prime.
- riemann hypothesis: is used to explain distribution of prime numbers
- riemann zeta function: $\zeta(s)=\sum_{n=1}^{\infty} \frac{1}{n^{s}}$, is also equal to the product: $\prod_{\text{p prime}}\left( 1- \frac{1}{p^{s}}\right)^{-1}$, and thus, incorporates information about set of prime numbers.
- using generalised riemann hypothesis, every composite number $n$ has a miller-rabin witness $a$ for its compositeness satisfying $a\leq 2(\ln n)^{2}$. but even Riemann hypothesis hasn't been proven let alone it's generalised version.
- Ask primality test: proposed an unconditional polynomial time algorithm for checking primality based on the relation $(x-a)^{n}\equiv x^{n}-a \mod{n}$

### Pollard's $p-1$ factorisation

- main logic to break RSA lies in the factorisation of either $pq$ or $(p-1)(q-1)$. pollard's $p-1$ factorisation gives factors of $pq$ using $p-1$.
- it's concept lies in the fact that if we find a number $L$ such that $p-1\mid L$ and $q-1\nmid L$ implies for a number $a$, $a^{L}-1\equiv0 \mod{p}$ and $a^{L}-1\not\equiv 0\mod{q}$.
- then $\gcd(a^{L}-1,N)=p$, hence we can find $p$, if we have a number $L$.
- **Pollard's observation**: $n!$ is the number that $p-1$ divides, if p is product of small primes.
> [!question] how small should the primes be?
- **pollard's $p-1$ factorisation algorithm**: Integer $N$ to be factored
	- set $a=2$ (can be any a)
	- loop: $i=\{ 2,3,\dots\}$
		- set $a=a^{j}\mod{N}$
		- find $d=\gcd(a-1,N)$
		- if $1<d<N$, then success, return $d$
		- else loop for next $i$
- thus, to save such attacks in RSA, user has to choose $p,q$ such that neither is product of small primes.
- **$\mathbf{B-}$smooth number** refers to a number $n$ such that all prime factors of $n$ are less than or equal to $B$.
- conversely, a number $n$ is $B-$smooth number if all its prime factors are less than or equal to $B$.

### factorisation via squares

- to factorise N, find $a,b$ such that $a^{2}\equiv b^{2}\mod{N}\implies a^{2}\equiv b^{2}+kN\implies kN=(a-b)(a+b)$, then it's highly probable that N factors into $(a-b)$ or $(a+b)$, so you can find factors of N from $\gcd(N,a+b)$ or $\gcd(N,a-b)$.
> [!question] a square number is always 0 (if even) or 1 (if odd) modulo 4. Why?

- a method to find correct $a^{2},b^{2}$:
	- find $a_{i}'s$ such that relation $c_{i}\equiv a_{i}^{2}\mod{N}$ factors into small primes (2,3,5,7,11)
	- take $c_{i}'s$ such that product $c_{i_{1}},c_{i_{2}},\dots,c_{i_{s}}$ form a square (i.e. power of every prime in product is even) $c_{i_{1}}c_{i_{2}}\dots c_{i_{s}}=b^{2}\mod{N}$
	- compute $d=\gcd(N,a-b)$, then $d$ can be nontrivial factor of $N$.
- 

