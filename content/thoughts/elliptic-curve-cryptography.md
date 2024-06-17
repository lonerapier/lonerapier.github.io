---
title: "Elliptic Curve Cryptography"
date: "2024-03-02T00:00:00Z"
tags:
- math
- cryptography
- elliptic-curves
---

## Elliptic Curve Cryptography

[$secp256k1$](https://river.com/learn/terms/s/secp256k1/): used by Bitcoin and Ethereum to implement public key cryptography. Elliptic curve over a field $z_p$ where $p$ is a 256-bit prime.

ECDSA: Elliptic Curve Digital Signature Algorithm

Public key cryptography uses this method to calculate public keys which is a point on ECC curve.

$$ K = (k * G) \% p $$

- $K$ = 512-bit public key
- $k$ = 256-bit randomly generated private key
- $G$ = base point on the curve
- $p$ = prime number

Take a [base point](https://medium.com/asecuritysite-when-bob-met-alice/picking-a-base-point-in-ecc-8d7b852b88a6) $G$, add it $n$ (private key) times to make $nG (\% p)$ (public key).

> **Note**: addition here means addition in elliptic curve and not addition in field of integers mod p.

[Order](https://medium.com/asecuritysite-when-bob-met-alice/whats-the-order-in-ecc-ac8a8d5439e8) of a base point is when keys generated using this point starts to form a cycle. Max number of points on the curve.

Thus, choosing a good base point is necessary in any public key generation curves.

secp256k1:

```other
x = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
y = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
p = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
```

The order is:

```other
N = FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
```

Ethereum public keys are serialisation of 130 hex characters

```other
04 + x-coord (64) + y-coord (64)
```

> 04 is prefixed as it is used to define uncompressed point on the ECC.

Ethereum addresses are hexadecimal numbers, identifiers derived from the last 20 bytes of the Keccak256 hash of the public key.

### Why Discrete Logarithm?

ECC is significant because solving $k * G$ is trivial but obtaining $k$ from product $k * G$ is not.

$k*G$ can be obtained using Fast-Exponentiation algorithm but solving for $k$ requires computing discrete logarithms.

## Security

Big-O Notation of discrete logarithm problem is $O(\sqrt{n})$.

Base point $G$, is chosen to be closer to $2^{256}$ and thus is in the order of `256`.

So, $\sqrt{256} = 128$ bits level of security is provided by curves like $secp256k1$.

## [secp256k1 v/s secp256r1](https://dappworks.com/why-did-satoshi-decide-to-use-secp256k1-instead-of-secp256r1/)

[$secp256k1$](https://www.johndcook.com/blog/2018/08/21/a-tale-of-two-elliptic-curves/) is a Koblitz curve defined in a characteristic 2 finite field while $secp256r1$ is a prime field curve.

Not going into details as to what a characteristic 2 finite field is, we can specify $secp256r1$ as a pseudo-randomised curve and $secp256k1$ as completely random curve which can’t be solved using discrete logarithm problem **yet**.

## [Pairing Friendly Curves](https://www.ietf.org/archive/id/draft-irtf-cfrg-pairing-friendly-curves-11.html)

Pairing-based cryptography is a new cryptographic primitive that has been developed in recent times, enabling new applications like short digital signatures that are aggregatable, identity-based cryptography, MPC, efficient [[polynomial-commitments|polynomial commitments]].

They have a favourable embedding degree, and a large prime-order subgroup.

### BLS12-381

> [!note] Most of these notes are taken from this amazing [post](https://hackmd.io/@benjaminion/bls12-381) by Ben

This was first introduced by Sean Bowe from ZCash in 2017 and has been used in various things from then. Now for the naming,

- BLS stands for Barreto, Lynn, Scott.
- 12 stands for embedding degree of the curve
- 381 stands for the order of the prime used for the field $2^{381}$, i.e. number of bits used to represent coordinates on the curve. **Why 381?** because 48 bytes per field element and remaining 3 bytes for flags or arithmetic optimisations.

Equation: $y^{2}=x^{3}+4 \pmod{q}$

Key parameters of the curve are derived from a single parameter $\texttt{x}$ = `-0xd201000000010000`

- Field modulus, $q: \frac{1}{3}({\texttt{x}}-1)^2({\texttt{x}}^4-{\texttt{x}}^2+1)+{\texttt{x}}$
- Subgroup size or the number of points on the curve, $r: ({\texttt{x}}^4-{\texttt{x}}^2+1)$

Reason for such x:

- low hamming weight, allows for efficient pairing operation
- field modulus in 381 bits, efficient curve operation in 64 bit machines
- subgroup size of 256 bits
- curve security of 128 bits
- nth root of unity for FFT

#### Field Extensions

The two curves used in BLS12-381 are defined on $\mathbb{F}$ and $\mathbb{F}_{q^{12}}$. This power raised is known as an extension field of field $\mathbb{F}_q$.

Let's construct $F_{q^{2}}$, quadratic extension of $F_q$. element representation $F_{q^{2}}:a_{0}+a_{1}x$ also written as $(a_{0},a_1)$.

- addition: $(a,b)+(c,d)=(a+c,b+d)$
- multiplication: $(ac-bd, ad+bc)$

Understanding multiplication is a tricky thing and it takes time to get accustomed to field arithmetic. Basically, the original multiplication has a $x^2$ term which doesn't make any sense in the $\mathbb{F}_{q^2}$ field, so we need a mechanism to remove this term. This is where reduction of polynomial terms is used. Certain rules are used to reduce the polynomials having degree greater than 2. Rule in this case is $x^2+1=0$

There are only 2 rules about this rule:

1. the polynomial we're reducing must be a $k$ degree polynomial, where $k$ is the extension degree.
2. It must be irreducible in the field it is getting extended.

BLS12-381 consists of two curves: $\mathbb{G}_1$ and $\mathbb{G}_2$. $\mathbb{G}_1$ is a fairly simple curve defined over finite field $\mathbb{F}_q$. We can call this curve $E(\mathbb{F}_q)$. Curve equation for $\mathbb{G}_1$ is $y^2=x^3+4$.

The other curve is defined over an extension of $\mathbb{F}$ to $\mathbb{F}_{q^{12}}$. Since arithmetic on $\mathbb{F}_{q^{12}}$ is fairly complex, it is reduced to $\mathbb{F}_{q^{2}}$. So, we'll call this curve $E'(\mathbb{F}_{q^2})$. Curve equation is slightly modified to be $y^2=x^3+4(1+i)$.

#### Subgroups

BLS12-381 is popular because it's a pairing friendly curve. For pairings, we need two points from **distinct** groups, each of order $r$. The first curve only has one subgroup of order $r$, and thus we can't just use that one curve. That's why we require a second different curve which has a distinct subgroup of same order. Fortunately, this is exhibited by the curve defined over the extension field and one of these groups only contains points having a trace of zero. This is where $k=12$, embedding degree comes in. Thus, we have group $\mathbb{G}_1$ of order $r$ in $E(\mathbb{F}_{q})$, and a distinct group $G_2$ of same order in $E(\mathbb{F}_{q^{12}})$. This enables pairings.

> Note: `Trace of Zero`

#### Twists

As explained earlier, that arithmetic on field $\mathbb{F}_{q^12}$ is fairly complex and inefficient. And all the curve operations like `add`, `sub`, `mul`, etc. requires a lot of arithmetic. Thus, we need to transform the $E(\mathbb{F}_{q^{12}})$ curve into a curve defined over a lower degree field that still has an order $r$ subgroup. Why we didn't take this lower order field in the first place? Because we require subgroup having trace of zero points.

> [!quote] [Quoting section 3](https://eprint.iacr.org/2005/133.pdf):
> 
> The basic idea for point compression is not only to restrict the first pairing argument to $E(\mathbb{F}_{p})$, but also to take the second argument $Q \in E(\mathbb{F}_{p^{12}})$ as the image $\psi(Q')$ of a point on a sextic twist $E'(\mathbb{F}_{p^2})$, where $\psi : E'(\mathbb{F}_{p^2}) \rightarrow E(\mathbb{F}_{p^{12}})$ is an injective group homomorphism. This way one would work only with $E(\mathbb{F}_{p})$ and $E'(\mathbb{F}_{p^2})$ for non-pairing operations like key generation, and map from $E'(\mathbb{F}_{p^2})$ to $E(\mathbb{F}_{p^{12}})$ only when actually computing pairing values.

BLS12-381 uses a **sextic twist**. This means reducing the extension field degree by a factor of `6`. We find a $u$ such that $u^{6}=(1+i)^{-1}$, then we define a twisting transformation as $(x,y) \rightarrow (\frac{x}{u^2},\frac{y}{u^3})$. This transforms the original curve from $E:y^2=x^3+4$ to $E':y^2=x^3+4/u^6$. $E$ and $E'$ looks different but actually are same objected with coefficients in different base fields.

This twist gives curve $E'$ that has a subgroup of order $r$ that maps to our $G_2$ group. So, we can work over more efficient $E'(\mathbb{F}_{q^2})$ and map $G_2$ back to $E(\mathbb{F}_{q^{12}})$, when required.

Now, we have two groups:

- $G_{1} \subset E(F_q)$ where $E:y^2=x^3+4$
- $G_{2} \subset E'(F_{q^2})$ where $E':y^2=x^3+4(1+i)$

Since, point in $G_2$ are complex numbers, it takes twice the amount of storage and are more expensive to perform arithmetic operations.

#### Embedding Degree

Smallest $k$ with respect to $r$, where $r$ is a factor of the order $n$ of the curve, such that $q^{k} \equiv 1 \pmod{r}$. Embedding Degree, $k(r)$ is the smallest positive integer required to extend the field to satisfy conditions required for pairings.

1. $F_{q^k}$ contains more than one subgroup of order $r$ for constructing $G_{2}$.
2. $F_{q^k}$ contains all the $r^{th}$ roots of unity for constructing $G_{T}$.

Embedding Degree should be chosen such that it doesn't compromise security and efficiency. Basically, a higher embedding degree makes it harder to to solve DLP in $G_T$. But a higher embedding degree also make it harder to operations in higher field like $F_{q^{12}}$. Maximum available twist is degree six, so best we can do is reduce the field extension degree by six.

### Full Torsion Groups

Torsion group is a group where each element has finite order. $r$-torsion group of an Elliptic curve $E(\mathbb{F})[r]$, where $\mathbb{F}$ is the finite field, $n$ is curve order, and $r$ is factor of $n$, is defined as set:

$$
E(\mathbb{F}[r]):=\lbrace{P\in E(\mathbb{F})\space|\space[r]P=\mathcal{O} \rbrace}
$$

A simple example of $r$-torsion subgroups are the cyclic subgroups generated on each factor $r$ of curve order $n$.

Now, for an elliptic curve with defined on extension field $p^m$, the **full $r$-torsion group** is defined as:

$$
E[r]:=E(\mathbb{F}_{p^{k(r)}})[r]
$$

An interesting observation is, $r$-torsion group $E(\mathbb{F}_{p^m})[r]$ of a curve extension is equal to $E(\mathbb{F})_{p}[r]$ if power $m$ is less than the embedding degree of $E(\mathbb{F_{p}})$. Full $r$-torsion groups contain $r^{2}$ many elements and $r+1$ subgroups, one of which is $E(\mathbb{F}_{p})[r]$. These subgroups are used during finding appropriate subgroups for pairings.

> [!question] Prove why full r-torsion group contain $r^2$ elements and $r+1$ subgroups?

$$
\begin{align}
E(\mathbb{F}_{p})&\subset E(\mathbb{F}_{p^2})&\cdots&\subset &E(\mathbb{F}_{p^{k(r)}})&\subset &E(\mathbb{F}_{p^{k(r)+1}})&\subset &\cdots \\
E(\mathbb{F}_{p})[r]&= E(\mathbb{F}_{p^{2}})[r]&\cdots&\subset&E(\mathbb{F}_{p^{k(r)}})[r]&=&E(\mathbb{F}_{p^{k(r)+1}})&=\cdots\\
\end{align}
$$

### Cofactor

It's the ratio of order of the curve group and order of the subgroup $hr = n$. Usually, cofactor should be very small in order to avoid subgroup attacks on discrete logarithms. But in pairing-based cryptography, the cofactors of $G_1$, $G_2$ and $G_{T}$ can be very large.

By multiplying by the cofactor, a point on the curve is mapped to the appropriate group known as **cofactor clearing**. Cofactors for $G_1$ and $G_2$ are as follows:

- $h_1=(\texttt{x}-1)^2/3$
- $h_2=$

### Roots Of Unity

[Roots of Unity](https://brilliant.org/wiki/roots-of-unity/) are complex solutions to the equation: $x^n=1$. Every nonzero element of a finite field is a root of unity, as $x^{q-1} = 1$ for every nonzero element of $\mathbb{F}_{q}$.[^3]

*Primitive root of unity* is when a number is solution to $x^n=1$ but not for $x^m=1$ for any positive integer $m<n$. So, if $a$ is a $n$th primitive root of unity in a field $\mathbb{F}$, then $\mathbb{F}$ contains all the roots of unity, $1, a, a^{2}, \ldots, a^{n-1}$.

Effect of the pairing is to map a point from $G_1$ and $G_2$ onto an $r$th root of unity in $F_{q^{12}}$. These $r$th roots of unity form a subgroup in $F_{q^{12}}$ of order $r$, which is the group $G_T$.

### Extension Towers

For BLS12-381, $F_{q^{12}}$ is constructed as a 2-3-2 extension tower, i.e. quadratic extension -> cubic extension -> quadratic extension.

1. $F_{q^{2}}:F_{q}(u)/(u^2-\beta)$ where $\beta=-1$.
   Point in $F_{q^{2}}$ looks like $a_0+a_1u$ where $a_{j} \in F_{q}$.
   Reduction rule is $u^{2}+1=0$ which is irreducible in $F_{q}$.
2. $F_{q^{6}}:F_{q^{2}}(v)/v^3-\xi$ where $\xi=u+1$.
   Point in $F_{q^{6}}$ looks like $b_0+b_{1}v+b_{2}v^{2}$ where $b_{j} \in F_{q^{2}}$.
   Reduction rule: $v^3-(u+1)=0$ which is irreducible in $F_{q^2}$.
3. $F_{q^{12}}:F_{q^{6}}(w)/(w^2-\gamma)$ where $\gamma=v$.
   Point in $F_{q^{12}}$ looks like $c_0+c_{1}w$ where $c_{j} \in F_{q^{6}}$.
   Reduction rule: $w^2-v=0$ which is irreducible in $F_{q^{6}}$.

## BLS Signatures
