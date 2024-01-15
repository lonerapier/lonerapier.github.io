---
title: "Intro To Cryptography"
date: 2022-10-03T10:00:00-07:00
tags:
- cryptography
---

This, by no means, is a thorough post covering all the topics. This is just my notes that I like to make while learning any new topic. I have tried attaching any good resource I found along the way.

## ECC

- [ECDSA: Elliptic Curve Signatures - Practical Cryptography for Developers](https://cryptobook.nakov.com/digital-signatures/ecdsa-sign-verify-messages)
- [Elliptic Curve Cryptography: a gentle introduction](https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/ "Elliptic Curve Cryptography: a gentle introduction")

nonce: $r$

temp key: $R = r*G$

Signature in ECDSA: $s = k^{-1} * (h + r*x) (mod n)$

## EdDSA Algorithm

Used to sign arbitrary messages with private keys

- Public key, $PK: xG$
- Create temp key $R$ from random nonce, $r$: $R = rG$
- $e = Hash(R||m)$
- $s = r + ex$

Public key is known, then send $m, R, s$ to other party

## EdDSA Verification

Known: PK, m, r, s

$$s.G = r.G + ex.G = R + e.PK$$

Other party calculates $e, s.G$ If $LHS = RHS$, then signature is correct

## ECDH (Elliptic Curve Diffie-Hellman)

Ways for two parties to exchange information without revealing their private keys

Let there be two parties Alex and Alice,

- Alex has $pk$: $x$, Alice has $pk$: $y$
- Generate public keys: $P_{alex} = xG$, $P_{alice} = yG$
- Send each other public keys
- Calculate new public key $P_{s} = P_{alex} * y$ OR $P_{alice} * x$

## Threshold Signature Schemes

Contrary to multi-sigs, these signature employ MPCs to create signatures using interactive multiple parties, thus not giving ownership of the asset to only one party while not blowing up computation needs.

## Shamir Secret Sharing

- [Shamir's Secret Sharing Algorithm | Cryptography - GeeksforGeeks](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)
- [Shamir's Secret Sharing Scheme](https://www.zkdocs.com/docs/zkdocs/protocol-primitives/shamir/)

Secret $S$ is divided into $n$ *pieces* or *shares* $s_{1} + s_{2} + \cdots + s_{n}$ such than any combination of any $k$ pieces is enough to recover the secret, but any $k-1$ pieces cannot recover $S$.

This is based upon polynomials such that any $k-degree$ polynomial can be uniquely identified using $k+1$ distinct points.

### Splitting $S$

- Generating polynomial $f(x)$ of degree $k-1$ over a finite field $\mathbb{F}_{p}$
- generating distinct shares: $s_{i} = x_{i}, f(x_i)$

Polynomial is of the form:

$$f(x) = S + r_{1}x+\cdots+r_{k-1}x^{k-1}$$

These $r_i$ coefficients are randomly sampled and the points are generated which are the shares.

### Recovering $S$

$S$ is recovered using Lagrange polynomial.

![math4.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/doc/70038E5D-C6DE-4FC6-9A42-D6D734E55270/6EE820CD-DA8D-43F9-A472-7C5B9B18A23A_2/YRLa7DIbI5gyAIkWykkHWsTRbs6fkOFNdqt2yOvXfi4z/math4.png)

Putting $x = 0$, gives us $f(0) = S$

### Pitfalls

- **Zero-share**: Common pitfalls occur during share generation as any shareholder who gets $x_{i} = 0$ has its share as $0, S$, thus revealing the secret.
- **Non-unique shares:** when generating secret back, the protocol needs to evaluate $\frac{x_m}{x_m-x_j}$ , and if $x_m = x_{j} \space (mod \space q)$, then $x_{m}-x_{j}$ doesn't exist and protocol fails.

## Schnorr Identification Protocol

[Schnorr identification protocol](https://ebrary.net/134583/computer_science/schnorr_identification_protocol)

[Schnorr Identification Scheme - GeeksforGeeks](https://www.geeksforgeeks.org/schnorr-identification-scheme/)

[Ring Signatures (Part 1): Schnorr Identity Protocol](https://medium.com/@jkendzicky16/ring-signatures-part-1-schnorr-identity-protocol-320bd0fe7bf0)

[Schnorr's identification protocol](https://www.zkdocs.com/docs/zkdocs/zero-knowledge-protocols/schnorr/)

Identification protocol is different than signature scheme as identification protocol is used to identify that prover holds the private while signature scheme is used to verify that the holder indeed used the private key to sign the message and generate the signature.

Steps followed in schnorr identification protocol:

Let there be two parties $Alex (Prover)$ and $Alice (Verifier)$,

1. Alex has private key $x$, public key = $Gx (mod N)$
2. Generates random value, $Y = Gy (mod N)$
3. $Y$ is sent to Alice
4. Alice generates random challenge $c$, and send to Alex
5. Alex sends back: $z = y + xc$
6. Alice verifies: $z.G = y.G + c.x.G = Y + c.PK$

Not feasible, requires interaction from *verifier*. Also not publicly verifiable as both parties have to be involved.

Non-Interactive protocols like Fiat-Shamir which transforms any interactive to non-interactive.

## Schnorr Digital Signature

- [Introduction to Schnorr Signatures](https://tlu.tarilabs.com/cryptography/introduction-schnorr-signatures)
- [Schnorr Digital Signature - GeeksforGeeks](https://www.geeksforgeeks.org/schnorr-digital-signature/)
- [How Schnorr signatures may improve Bitcoin](https://medium.com/@snigirev.stepan/how-schnorr-signatures-may-improve-bitcoin-91655bcb4744)

Used to implement “*Proof of Knowledge*”. Used in cryptography to prove to verifier that prover knows something $x$. Verifier gets convinced that they are communicating with the prover without verifier’s knowledge of private key and prover is in fact, right about his private key.

Features:

1. faster than ECDSA as doesn’t have to calculate $1/s$
2. linear

But this also proposes other disadvantages that this signature scheme can’t be used for aggregation and multi-sigs due to its linearity.

> Non-interactive Schnorr identification protocol also exists using Fiat-Shamir transformation where challenge $c$ is not generated by verifier but $c = Hash(g, q, h, u)$ where g: generator, q: prime number, h: public key, u: public key of random nonce

## Fiat-Shamir Heuristic

- [Feige-Fiat-Shamir and Zero Knowledge Proof](https://medium.com/asecuritysite-when-bob-met-alice/feige-fiat-shamir-and-zero-knowledge-proof-cdd2a972237c)
- [Non-Interactive Zero Knowledge Proof - GeeksforGeeks](https://www.geeksforgeeks.org/non-interactive-zero-knowledge-proof/)
- [Ring Signatures (Part 1): Schnorr Identity Protocol](https://medium.com/@jkendzicky16/ring-signatures-part-1-schnorr-identity-protocol-320bd0fe7bf0)
- [Fiat-Shamir transformation](https://www.zkdocs.com/docs/zkdocs/protocol-primitives/fiat-shamir/)

![Feige-Fiat-Shamir.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/7C67DBCA-3360-4109-833A-03B26CCD00D7_2/dQqjhDktmjoMAfrbxT4zZkhqEjbfxapng3dGPIobNL0z/Feige-Fiat-Shamir.png)

Method to convert interactive ZKP system into non-interactive system such that public verifiability is feasible and both prover and verifier doesn’t need to be online at all times.

Let *prover* prove to *verifier* that it possess $s1 \cdots sk $secrets co-prime to $N$, without revealing any of the number to verifier. Takes advantage of difficulty of calculating modular square roots as verifier can’t derive $s1$ from $v1$

## BLS Signatures

- [Math & Engineering](https://xn--2-umb.com/22/bls-signatures/)
- [BLS signatures: better than Schnorr](https://medium.com/@snigirev.stepan/bls-signatures-better-than-schnorr-5a7fe30ea716)
- [BLS12-381](https://hackmd.io/@benjaminion/bls12-381)

Comes under elliptic curve pairing based schemes which makes aggregation easier than other signature schemes like ECDSA, schnorr.

Two main things used in BLS signatures are:

### Hash to Curve

For BLS signature to work, message hashing has to be on the curve i.e. $H(m)$ has to be a point on the curve.

To do this, the method is to concatenate message incrementally with counter to try to find a point.

![BLS_hashing_to_curve.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/85F2FC7E-BC19-4024-9381-CBE498DB7A0F_2/xD1oFGhTuMLUHyu3gpZ5IoTdUo4x1qcfVtjbiXxZrwIz/BLS_hashing_to_curve.png)

## Pairings

Signature/Proof of possession: $S_X = x.H_{G_1}(X)$

$$e(S_X, G_2) = e(H’_{G_1}(X), X)$$

## Commitment Schemes

Prover commits to a message and later opens it to reveal the content of the message without revealing it beforehand.

## Zero Knowledge Proof System

- Completeness/Liveness: If *prover* is correct, it will eventually convince *verifier*
- Soundness/Safety: *prover* can only convince *verifier* if it’s correct
- Zero Knowledge

### Proving Schnorr Signatures Are Zero-knowledge

Proving **completeness** is the easiest part in protocol, i.e. if the prover performs protocol honestly, verifier is able to verify it by just substituting g in schnorr signatures.

**Soundness** is done through another algorithm called ***extractor*** which is able to extract secret of the prover by tricking it. Note: it doesn’t actually reveal the secret but only proving that extractor can extract the secret by duping prover. Done through *replay attack* on schnorr protocol.

**Zero-Knowledgness** is proven through a *simulator* which has no knowledge of the the secret and yet it is able to convince every verifier into believing that the statement is true. This has an **assumption** that *verifier* is **honest.** Done through rewinding a verifier so that prover knows challenge $$c$$

 and forging false signature on the basis of it.

## References

- [CS-355: Topics in Cryptography; Lecture 5: Proofs of Knowledge, Schnorr’s Protocol, NIZK](https://crypto.stanford.edu/cs355/19sp/lec5.pdf)
- [GitHub - jlogelin/fiat-shamir: Zero Knowledge Proofs with Fiat-Shamir Heuristic in Solidity](https://github.com/jlogelin/fiat-shamir)
- Lecture 1: Honest Verifier ZK and Fiat-Shamir: [https://www.cs.jhu.edu/~susan/600.641/scribes/lecture11.pdf](https://www.cs.jhu.edu/~susan/600.641/scribes/lecture11.pdf)
- [0xPARC ZK Learning Group](https://0xparc.notion.site/ZK-Learning-Group-Topics-f53933eecc2f41438c6c2bdd5b42ee2d)
- [eth-research ZK learning starter pack](https://ethresear.ch/t/zero-knowledge-proofs-starter-pack/4519)
- [Road to ZK](https://plum-lightning-36c.notion.site/Road-to-ZK-2e85993b316b4c7c831bcdc866005e1b)
