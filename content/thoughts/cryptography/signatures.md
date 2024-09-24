---
title: "Signatures"
date: 2024-06-01:12:00:00
tags:
- cryptography
---

Used to bring *authenticity* in [[pk-encryption]] setting.

Properties:
- publicly verifiable
- transferable
- non-repudiation

Definition: Digital signature scheme consists of three PPT algorithms:
- $\textsf{Gen}(1^{n})\to(pk,sk)$
- $\textsf{Sign}(sk,m)\to \sigma$
- $\textsf{Vrfy}(pk,\sigma)\to b\in\{ 0,1 \}$

> [!info] Signature experiment: $\textsf{Sig-forge}_{\mathcal{A},\Pi}(n)$:
> - $\textsf{Gen}(1^{n})$ is run to obtain $pk,sk$
> - $\mathcal{A}$ has access to $\textsf{Sign}_{sk}(\cdot)$ oracle, and outputs $m,\sigma$. Let $\mathcal{Q}$ be set of all queries by $\mathcal{A}$.
> - $\mathcal{A}$ succeeds if $\textsf{Vrfy}_{pk}(\cdot)=1$ and $m \not\in\mathcal{Q}$.

$$\Pr[\textsf{Sig-forge}_{\mathcal{A},\Pi}(n)=1]\leq \text{negl}(n)$$

Hash-and-Sign paradigm: use a hash when a signature scheme of length $l$ is available, and messages are of longer length to create a digest of length $l$ as $H_{s}(m)$ where $s=\textsf{Gen}_{H}(1^{n})$.

## [[rsa]] signatures

TODO

## PKI

**Digital Certificate**: just a notion of public key signature binding the identity of a public entity to that public key.

$$\textsf{cert}_{C\to B}\xlongequal{def}\textsf{Sign}_{sk_{C}}(\text{Bob's key is pk}_{B})$$

Party $C$ signature should be trustworthy to be considered a certificate, and is generally known as Certificate authority (CA). Certificate can be used to build trust between two strange parties using a trusted party that notarises that $P_{1}$ indeed is the owner of the key.

- Can build a web of trust using single CA, but susceptible to attacks and single point of failure.
- Multiple CAs are usually configured on every browser, network devices which helps to decentralise the power a CA has.
- Certificate Chain is employed where any **root** authority with a certificate gives power to the party to issue certificates as a **proxy**.
- PGP: complete cypherpunk approach to ***web of trust***. Anyone can issue a certificate for anyone else, and recipient has to choose whether to believe the authority issuing the certificate.
- Revocation of certificates: using expiration or Certificate expiration list broadcasted by CA at periodic time.









