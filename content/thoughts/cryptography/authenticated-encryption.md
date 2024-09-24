---
title: "Authenticated Encryption"
date: 2024-07-06:12:00:00
tags:
- cryptography
---

Authenticated encryption aims to satisfy both *secrecy (encryption)* and *integrity (authentication)* simultaneously. Let's define the experiment:

> [!info] unforgeable encryption experiment $\text{Enc-Forge}_{\mathcal{A},\Pi}(n)$:
> - key $K$ is generated
> - adversary $\mathcal{A}$ is given access to encryption oracle $\text{Enc}_{k}(\cdot)$.
> - $\mathcal{A}$ outputs $c$. Let $m\leftarrow \text{Dec}_{k}(c)$, then
> - $\mathcal{A}$ succeeds if $m\neq \perp$ and $m\not\in\mathcal{Q}$.

$$
\Pr[\text{Enc-Forge}_{\mathcal{A},\Pi}(n)=1]\leq \text{negl}(n)
$$

A private key encryption is AE scheme if it satisfies both CCA security and unforgeability. Let's define two oracles: 
- $\textsf{Enc}_{k}^{0}(\cdot)$: sends encryption of $0^{|m|}$ for any message $m$
- $\textsf{Dec}_{\perp}(\cdot)$: sends decryption error $\perp$ for any ciphertext $c$

Our goal is to not let adversary distinguish between correct oracle response and above two oracles. This guarantees that adversary can't distinguish between encryption of $0^{|m|}$ and valid message $m$, ensures secrecy and also can't decrypt any valid ciphertext, ensures integrity.

> [!info] AE experiment $\text{PrivK}_{\mathcal{A},\Pi}^{\textsf{ae}}(n)$:
> - key $K$ is generated
> - uniform bit $b\in\{ 0,1 \}$ is chosen
> - adversary is given access to oracles:
> 	- if $b=0$, $\textsf{Enc}_{k}(\cdot),\textsf{Dec}_{k}(\cdot)$
> 	- if $b=1$, $\textsf{Enc}_{k}^{0}(\cdot),\textsf{Dec}_{\perp}(\cdot)$
> - $\mathcal{A}$ outputs bit $b'$
> - $\mathcal{A}$ succeeds if $b=b'$.

$$\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{ae}}(n)=1]\leq \frac{1}{2}+\text{negl}(n)$$

- AE with AD (associated data) is possible when some data is public is needed to be sent with integrity only.
- CCA security and AE are separate notions, with an encryption that is CCA secure, we want secrecy but not integrity, AE targets both.
- with any encryption that is CCA secure and MAC that is strongly secure, AE scheme can be constructed.

Three constructions are possible when designing an AE:

- encrypt and authenticate: $c\leftarrow\text{Enc}_{K_{e}}(m)$ and $t\leftarrow\text{Mac}_{K_{m}}(m)$
	- TODO: prove this is not AE secure
- authenticate then encrypt: $t\leftarrow\text{Mac}_{K_{m}}(m)$ and $c\leftarrow\text{Enc}_{K_{e}}(m\lVert t)$
	- TODO: prove this is not AE secure
- encrypt then authenticate: $c\leftarrow\text{Enc}_{K_{e}}(m)$ and $t\leftarrow\text{Mac}_{K_{m}}(c)$
	- to forge a mac, adversary needs pair $\langle c,t' \rangle$ for original $c$, but strong security of MAC, makes this negligible, thus decryption oracle for AE scheme is useless and CCA security of AE reduces to CPA security of $\Pi_{E}$.

> [!info] AE construction:
> - $\textsf{Gen'}(1^{n})\to(K_{m},K_{e})$: outputs two keys $K_{m},K_{e}$
> - $\textsf{Enc}'(m)$: outputs $\langle c,t \rangle$ where, $c\leftarrow \text{Enc}_{K_{e}}(m)$ and $t\leftarrow \text{Mac}_{K_{m}}(c)$
> - $\textsf{Dec}'(c,t)$: verifies $t \xlongequal{?} \text{Vrfy}(c)$, and outputs $m\leftarrow \text{Dec}_{K_{m}}(c)$.

Prove that if $\Pi_{e}$ is CPA secure ENC scheme and $\Pi_{m}$ is strongly secure MAC scheme, then above construction is AE scheme.
- you begin by first proving that if $\Pi_{m}$ is a strongly secure MAC, then probability of forgeability is negligible, i.e. probability of event that any new, valid pair $\langle c,t \rangle$ is accepted is negligible.
	- This renders the decryption oracle useless, as only error will be sent to the adversary for any other pair for which it hasn't already queried the encryption oracle.
	- This turns the CCA security of encryption scheme to CPA security.
	- denote this by $\Pr[\textsf{ValidQuery}]\leq \text{negl}(n)$
	- create adversary $\mathcal{A}_{m}$ which is running $\text{Mac-sforge}$ experiment by attacking $\Pi_{m}$ and runs $\mathcal{A}$ as subroutine
	- Now, our goal is to prove that $\Pr[\text{Mac-sforge}_{\mathcal{A_{m}},\Pi_{m}}=1]\leq \Pr[\textsf{ValidQuery}]$, i.e. if $\mathcal{A}$ is successful in outputting a new, valid $\langle c,t \rangle$, then $\mathcal{A}_{m}$ will be able to succeed in sforge experiment.
- Now, since $\Pr[\textsf{ValidQuery}]$ is negligible, then we prove that $\Pi$ is CCA-secure (CPA security), i.e. $\Pr[\text{PrivK}_{\mathcal{A},\Pi}^{\textsf{cca}}=1]\leq \Pr[\textsf{ValidQuery}]+\Pr[\textsf{PrivK}^{cca}_{\mathcal{A},\Pi} \wedge \overline{\textsf{ValidQuery}}]$
	- again run CPA experiment with adversary $\mathcal{A}_{e}$ running $\mathcal{A}$ as subroutine, answering encryption oracle queries and outputting errors for decryption oracle queries.
	- when $\mathcal{A}_{e}$ outputs $m_{0},m_{1}$ then, $\mathcal{A}$ outputs exactly those message, get the challenge ciphertext $c$, and calculate $t\leftarrow \text{Mac}_{K_{m}}(c)$.
	- $\mathcal{A}$ output the same bit $b'$ as output by $\mathcal{A}$.
	- then $\Pr[\textsf{PrivK}^{\textsf{cpa}}_{\mathcal{A}_{e},\Pi_{e}}=1]\geq  \Pr[\textsf{PrivK}^{cca}_{\mathcal{A},\Pi} \wedge \overline{\textsf{ValidQuery}}]$

## AEADs

### AES-GCM

### ChaChaPoly1305

## References

- [Introduction to Modern Cryptography: Chapter 5](https://www.cs.umd.edu/~jkatz/imc.html)
- [A graduate course in applied cryptography: Chapter 9](https://toc.cryptobook.us/)