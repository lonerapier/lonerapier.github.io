---
title: "Secret Sharing"
date: 2024-06-02:12:00:00
tags:
- cryptography
- mpc
---

Secret sharing is a method by which a secret is split among a group, and requires certain threshold to meet where the members combine their respective shares for the secret to be reconstructed again.

Moreover, when a dealer distributes shares to $n$ players in such a way that at least $t\space(\text{threshold})$ contributions are required to reconstruct the secret back, such a protocol is known as Threshold Secret Sharing $(t,n)$

Any secret sharing protocol has two methods: $(\text{Share, Reconstruct})$, where:
- $\text{Share}$: dealer splits the secret and distributes individual shares to each member.
- $\text{Reconstruct}$: members combine their shares to reconstruct the secret back.

Properties as explained [here](https://decentralizedthoughts.github.io/2020-07-17-polynomial-secret-sharing-and-the-lagrange-basis/):

- **Binding**: once *share* is completed honestly, then there exists a value $r$ such that output of *reconstruct* is equal to $r$.
- **Validity**: if dealer distributes secret $s$ and perform *share* honestly, then value of *reconstruct* is equal to $s$.
- **Hiding**: if dealer is honest and no party hash begun *reconstruct*, then adversary can't gain any information about $s$.

## Secure vs insecure secret sharing

When amount of work required to reconstruct the share isn't affected by having knowledge of $0-k$ amount of shares, where $k<t$, then the scheme is deemed as secure.

Let's take an example of *insecure sharing scheme*: let the secret consists of 10 bit key, and dealer distributes it to 5 members, each having 2 bits. Any external member with no knowledge will need $2^{10}$ guesses to get the key, while any 1 member will need $2^{8}$ and any member with k shares will only require $2^{10-2k}$ guesses.

Now, let's define *secure secret sharing*. Let the secret be $s$ and suppose dealer hash to distribute this secret to $N$ members. Dealer samples $s_{i}\forall i\in [1,N-1]$ uniformly such that $s_{N}=s \oplus\bigoplus_{i=1}^{N-1}s_{i}$, and distribute these shares to $N$ members. To reconstruct $s$ back, all $N$ shares are needed such that $s=\bigoplus_{i=1}^{N}s_{i}$.

## $(t,n)$ TSS

[Shamir Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_secret_sharing) is a type of (t, n) threshold secret sharing where a degree $t-1$ polynomial is created and it's evaluation on n points are shared with the members. Dealer has a secret $s$ which it wants to secretly share, it samples $t-1$ uniform elements $a_{1},a_{2},\dots,a_t\in\mathbb{F}$ such that $f(X)=s+\sum_{i=1}^{t-1}a_{i}X^{i}$, such that $f(0)=s$. To reconstruct the share back, any $t$ users can pool their shares, and use [Lagrange polynomial interpolation](https://en.wikipedia.org/wiki/Lagrange_polynomial) to create the polynomial, evaluating it at $x=0$, will give the original share.

> [!info] Note that using integer domain here, compromises security of SSS, as then the adversary start gaining knowledge about the secret with each new share. That's why we use finite field with $|\mathbb{F}|\gg t$. 

Things to prove:
1. existence and uniqueness of lagrange polynomial such that $f(x)=\sum_{i=1}^{n}\mathcal{L}_{i}y_{i}$, where $\mathcal{L}_{i}$ is the $i^{th}$ lagrange polynomial.
2. prove that map proven above, $\phi(p_{0},\dots,p_{f})=(p(z_{1}),p(z_{2}),\dots,p(z_{f+1}))$ for $Z=\{z_{1},\dots z_{f+1}\}$ is a bijection of set of degree $f$ polynomials to their evaluations at the points in $Z$.
3. prove binding, validity of SSS.
4. prove hiding of SSS.

I am going to explain again the hiding property of SSS, but has a more formal description [here](https://decentralizedthoughts.github.io/2020-07-17-polynomial-secret-sharing-and-the-lagrange-basis/), because it's really interesting to define.

- Let's take an adversary $\mathcal{A}$ that passively control parties $b_{1},\dots,b_{f}$. This means adversary have access to their shares, i.e. $p(z_{1}),\dots,p(z_{f})$.
- our claim is that $\phi$ maps the uniform distribution of $p_{0},\dots,p_{f}$ to $(p(z_{1}),\dots,p(z_{f+1}))$.
- Since, we know that honest dealer samples $p_{1},\dots,p_{f}$ uniformly, then probability of $p_{0},\dots ,p_{f}=w_{0},\dots ,w_{f}$, $w_{i}$ being any elements, is equal to $\left(\frac{1}{|\mathbb{F}|}\right)^{f+1}$.
- we need to show $Pr[(p(z_{0})),p(z_{1}),\dots,p(z_{f})=(y_{0},y_{1},\dots,y_{f})]=\left(\frac{1}{|\mathbb{F|}}\right)^{f+1}$
- this can be shown using $\phi$ which is a bijection from $\mathbb{F}^{f+1}\to \mathbb{F}^{f+1}$. Thus, distribution also follows from that.
- Now, since adversary doesn't have knowledge of $p_{0}$ which is $p(0)=s$, distribution of adversary doesn't change on the value of the secret. This means, whatever knowledge adversary gains from control of the $f$ members, it's distribution isn't affected by the secret value.

## References

- [Adi Shamir: How to share a Secret](https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf)
- [Introduction to Modern Cryptography by Jonathan Katz and Yehua Lindell: Section 15.3]()
- [Joy Of Cryptography: Chapter 3]()
- [A graduate course in applied cryptography by Dan Boneh and Victor Shoup: Chapter 22]()
- [Polynomial Secret Sharing and the Lagrange Basis](https://decentralizedthoughts.github.io/2020-07-17-polynomial-secret-sharing-and-the-lagrange-basis/)
- [zkDocs: SSS](https://www.zkdocs.com/docs/zkdocs/protocol-primitives/shamir/)