---
title: "Post Quantum Cryptography"
date: 2024-11-24
tags:
- cryptography
- post-quantum
- math
- lattices
---

Difference between Quantum Cryptography v/s Post-Quantum cryptography
- One is done completely over Quantum computers while other on classical computers
- Post-Quantum Cryptography is the means by which any entity can enjoy the same benefits of secrecy, integrity over an unsecured channel backed by an mind-numbingly fast quantum computer.
- Quantum cryptography refers to cryptosystems implemented using Quantum computers using quantum-mechanical phenomenon.

## PQ symmetric cryptography

- Grover gave an algorithm for exhaustive search in order of quadratic of the domain size.

> [!question] how lattice based cryptography gained popularity?

> [!question] How Shor's algorithm for factoring integers using quantum computers work?

> [!todo] add definitions from katz-lindell book, or boneh-shoup

## [[lwe]]
## [[lattices]]

# Cryptosystems
- LWE, or module-LWE
	- Crystals project: Kyber, Dilithium
	- SABER: Based on Module Learning with Rounding
		- LightSABER, SABER, FireSABER
- ring-LWE
	- NTRU: Nth degree Truncated polynomial Ring Unit
	- Falcon: Signature over NTRU
- GGH
- Hash-based:
	- SPHINCS+
	- Lamport Signatures
	- Merkle Signature
- Code-based:
	- McEliece
- Multivariate:
	- Rainbow

# Resources
- ["SoK: A Comprehensive Review of Post-Quantum Cryptography: Challenges and Advances", Seyed MohammadReza Hosseini, Hossein Pilaram](https://eprint.iacr.org/2024/1940)