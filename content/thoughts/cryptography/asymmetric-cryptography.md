---
title: "Asymmetric cryptography"
date: 2024-07-15:12:00:00
tags:
- cryptography
---

[[diffie-hellman]]
[[pk-encryption|Public Key Encryption]]
[[signatures]]

## Assumption

- Integer Factorisation, mainly Prime factorisation.
- Trapdoor function

## [Rabin Cryptosystem](https://en.wikipedia.org/wiki/Rabin_cryptosystem)

Based on RSA trapdoor function.

- $\textsf{Gen}(1^{n}):(N,pq)$: Choose prime numbers $p,q$ as secret key, and $N=pq$ as public key.
- $\textsf{Enc}(pk,m)\to c$: compute $c\equiv m^{2}\mod{N}$.
- $\textsf{Dec}(sk,c)\to m$: Perform [[crt]] on ciphertext's 
	- compute $m_{p}=c^{\frac{p+1}{4}}\mod{p}\space;\space m_{q}=c^{\frac{q+1}{4}}\mod{q}$
	- compute X,Y such that $Xp+Yq=1$.
	- find $\pm x,\pm y$ as 4 square roots modulo N. $m$ is one of these 4, which can only be identified using additional data from sender.

- Rabin cryptosystem is deterministic as it's based on RSA trapdoor function, and thus, not CPA secure.

## GM cryptosystem

[GM82] introduced probabilistic encryption.