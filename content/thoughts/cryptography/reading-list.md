---
title: "Cryptography Reading List"
date: 2024-10-31:12:00:00Z
tags:
- cryptography
- reading
---

# TODOs

## Signatures
- Ring
- blind
- threshold

## ZK

- IOPs
	- [ ] HyperPlonk
	- [ ] Spartan memory-checking PCS
	- [ ] SuperSpartan
	- [ ] [binius](https://eprint.iacr.org/2023/1784)
		- [ ] [binius-basefold](https://eprint.iacr.org/2024/504)
		- [ ] [Understanding Binius, Part II](https://hackmd.io/@l2iterative/binius2)
	- [ ] [Polymath: Groth16 Is Not The Limit](https://eprint.iacr.org/2024/916)
	- [ ] [Scribe: Low-memory SNARKs via Read-Write Streaming](https://eprint.iacr.org/2024/1970)
	- [ ] [Field-Agnostic SNARKs from Expand-Accumulate Codes](https://eprint.iacr.org/2024/1871)
	- [ ] [Blaze: Fast SNARKs from Interleaved RAA Codes](https://eprint.iacr.org/2024/1609)
- folding
	- [ ] [mangrove](https://eprint.iacr.org/2024/416)
	- [ ] [mova](https://eprint.iacr.org/2024/1220)
	- [ ] [lova](https://eprint.iacr.org/2024/1964)
	- [ ] HyperNova
	- [ ] [Protostar](https://eprint.iacr.org/2023/620)
	- [ ] [Protogalaxy](https://eprint.iacr.org/2023/1106)
	- [ ] NeutronNova
	- [ ] [MicroNova: Folding-based arguments with efficient (on-chain) verification](https://eprint.iacr.org/2024/2099)
	- [ ] [Twist and Shout: Faster memory checking arguments via one-hot addressing and increments](https://eprint.iacr.org/2025/105)
	- [ ] 
	- [ ] Nebula
	- [ ] [stackproofs](https://eprint.iacr.org/2024/1281)
	- [ ] [Albert Garreta and Ignacio Manzur, "FLI: Folding Lookup Instances"](https://eprint.iacr.org/2024/1531)
	- [ ] [KiloNova: Non-Uniform PCD with Zero-Knowledge Property from Generic Folding Schemes](https://eprint.iacr.org/2023/1579)
	- [ ] [LatticeFold: A Lattice-based Folding Scheme and its Applications to Succinct Proof Systems](https://eprint.iacr.org/2024/257)
	- [ ] [Proof-Carrying Data from Multi-folding Schemes](https://eprint.iacr.org/2023/1282)
	- [ ] [One-Shot Native Proofs of Non-Native Operations in Incrementally Verifiable Computations](https://eprint.iacr.org/2024/1651)
	- [ ] [Proof-Carrying Data without Succinct Arguments](https://eprint.iacr.org/2020/1618)
- lookups
	- [ ] logUp
	- [ ] Lasso
	- [ ] [Lookup Arguments: Improvements, Extensions and Applications to Zero-Knowledge Decision Trees](https://eprint.iacr.org/2023/1518)
	- [ ] [Efficient KZG-based Univariate Sum-check and Lookup Argument](https://eprint.iacr.org/2024/618)
	- [ ] [Natively Compatible Super-Efficient Lookup Arguments and How to Apply Them](https://eprint.iacr.org/2024/1058)
	- [ ] [FLIP-and-prove R1CS](https://eprint.iacr.org/2024/1364)
- [ ] accumulation
	- [ ] Proofs for Deep Thought: Accumulation for large memories and deterministic computations
	- [ ] [Accumulation without Homomorphism](https://eprint.iacr.org/2024/474)
- [ ] zkVMs
	- [ ] Jolt
		- [ ] [https://www.youtube.com/watch?v=aEiHLORcDq4](https://www.youtube.com/watch?v=aEiHLORcDq4)
		- [ ] [https://www.youtube.com/watch?v=iDcXj9Vx3zY](https://www.youtube.com/watch?v=iDcXj9Vx3zY)
	- [Proving CPU Executions in Small Space](https://eprint.iacr.org/2025/611): twist&shout with Jolt good + square root pcs is enough and simpler to implement + sumcheck can be streaming prove to prevent recursion (harder to reason with security and implementation)
	- [Cairo – a Turing-complete STARK-friendly CPU architecture](https://eprint.iacr.org/2021/1063)
- [ ] STARK/FRI
	- [ ] FRI
	- [ ] STIR
	- [ ] WHIR
	- [ ] [Circle Starks](https://eprint.iacr.org/2024/278)
	- [ ] [DEEP Commitments and Their Applications](https://eprint.iacr.org/2024/1752)
- [ ] binius
	- [ ] binius-FRI, binius-basefold
	- [ ] [Polylogarithmic Proofs for Multilinears over Binary Towers](https://eprint.iacr.org/2024/504)
	- [ ] [Proximity Testing with Logarithmic Randomness](https://eprint.iacr.org/2023/630)
	- [ ] 
- Sumcheck
	- [ ] [More Optimizations to Sum-Check Proving](https://eprint.iacr.org/2024/1210)
	- [ ] [The Sum-Check Protocol over Fields of Small Characteristic](https://eprint.iacr.org/2024/1046)
	- [ ] [Constraint-Packing and the Sum-Check Protocol over Binary Tower Fields](https://eprint.iacr.org/2024/1038)
	- [ ] [Time-Optimal Interactive Proofs for Circuit Evaluation](https://link.springer.com/content/pdf/10.1007/978-3-642-40084-1_5.pdf)
	- [ ] [Some Improvements for the PIOP for ZeroCheck](https://eprint.iacr.org/2024/108)
	- [ ] [A Note on Efficient Computation of the Multilinear Extension](https://eprint.iacr.org/2024/1103)
- Hashing
	- [ ] [Skyscraper: Fast Hashing on Big Primes](https://eprint.iacr.org/2025/058)
- Misc
	- [ ] [Khatam: Reducing the Communication Complexity of Code-Based SNARKs](https://eprint.iacr.org/2024/1843)
	- [ ] ==[How to Prove False Statements: Practical Attacks on Fiat-Shamir](https://eprint.iacr.org/2025/118)==
	- [ ] [Zombie: Middleboxes that Don’t Snoop](https://eprint.iacr.org/2023/1022)
		- [ ] [Zero-Knowledge Middleboxes](https://eprint.iacr.org/2021/1022)
	- [ ] [Reef: Fast Succinct Non-Interactive Zero-Knowledge Regex Proofs](https://eprint.iacr.org/2023/1886)
		- [ ] [Practical Proofs of Parsing for Context-free Grammars](https://eprint.iacr.org/2024/562): also deliver competitive performance. In the non-interactive setting, proving the correct parsing of a ≈1KB string takes 24 seconds, even for grammars with 210 production rules. In the interactive setting the same proof takes just 1.6 seconds.

### PCS
- [ ] Zeromorph
- [ ] Basefold
- [ ] HyperKZG
- [ ] [Arc](https://eprint.iacr.org/2024/1731)
- [ ] [DewTwo](https://eprint.iacr.org/2025/129)
- [ ] [KZH-Fold: Accountable Voting from Sublinear Accumulation](https://eprint.iacr.org/2025/144)
- [ ] [DeepFold: Efficient Multilinear Polynomial Commitment from Reed-Solomon Code and Its Application to Zero-knowledge Proofs](https://eprint.iacr.org/2024/1595)

#### Lattices
- [ ] [Polynomial Commitments from Lattices: Post-Quantum Security, Fast Verification and Transparent Setup](https://eprint.iacr.org/2024/281)
- [ ] [SLAP: Succinct Lattice-Based Polynomial Commitments from Standard Assumptions](https://eprint.iacr.org/2023/1469)
- [ ] [Concretely Efficient Lattice-based Polynomial Commitment from Standard Assumptions](https://eprint.iacr.org/2024/306)
- [ ] [Greyhound: Fast Polynomial Commitments from Lattices](https://eprint.iacr.org/2024/1293)
- [ ] 

## Lattice
- [ ] [RoK, Paper, SISsors – Toolkit for Lattice-based Succinct Arguments](https://eprint.iacr.org/2024/1972)
- [ ] [The LaZer Library: Lattice-Based Zero Knowledge and Succinct Proofs for Quantum-Safe Privacy](https://eprint.iacr.org/2024/1846)
- [ ] [A Survey of Polynomial Multiplications for Lattice-Based Cryptosystems](https://eprint.iacr.org/2023/1962)
- [ ] 

## MPC
- [Awesome MPC](https://github.com/rdragos/awesome-mpc)
- [Jamie-Cui](https://github.com/Jamie-Cui)/[awesome-secure-computation](https://github.com/Jamie-Cui/awesome-secure-computation/blob/master/mpc.md)
- [Large-Scale MPC: Scaling Private Iris Code Uniqueness Checks to Millions of Users](https://eprint.iacr.org/2024/705)
- [OLE](https://eprint.iacr.org/2020/635)
- [https://pascholl.github.io/download/BIU22-vole-1.pdf](https://pascholl.github.io/download/BIU22-vole-1.pdf)
- [QuietOT: Lightweight Oblivious Transfer with a Public-Key Setup](https://eprint.iacr.org/2024/1079)
- - read about [OPRF](https://eprint.iacr.org/2022/302.pdf) and how it relates to:
	- PAKE
	- PSI
	- PIR
	- Keyword search
	- 

## [[he|FHE]]

## PETs
- [Awesome PETs](https://github.com/secretflow/secretflow/blob/main/docs/awesome-pets/awesome-pets.md)

## PIR/PSI

## Function Encryption/Witness encryption
- [A Witness Encryption Construction over KZG-Committed Data](https://hackmd.io/@vladfdp/BJcQDpbrJl)
- [Witness Encryption and its Applications](https://eprint.iacr.org/2013/258)
- [Notes on Extractable Witness Encryption for KZG Commitments and Efficient Laconic OT](https://hackmd.io/@letargicus/Hk3rpPnK0)
- 

## iO
- ["Can We Obfuscate Programs?", Boaz Barak](https://www.boazbarak.org/papers/obf_informal)
- ["Theory and Practice of Program Obfuscation"](https://cdn.intechopen.com/pdfs/10967/InTech-Theory_and_practice_of_program_obfuscation.pdf)

## PQC
- read about quantum algorithms: start with Grover's and Shor's algorithm

## Quantum Cryptography

## Signatures
- [ ] lamport signatures
- Ring signatures
- Threshold signatures

---

- [ ] key derivation
    - [ ] [https://en.wikipedia.org/wiki/Argon2](https://en.wikipedia.org/wiki/Argon2)
    - password based key derivation
- [ ] public key cryptosystem
    - [ ] micali-goldwasser
- TLSN
- MPC
  - MPZ
  - SFE
  - Threshold cryptography
  - BMR protocol
  - BGW SFE
  - 2pc ecdsa
- LPN problem
- more secure random number generator
- prime number generator
- [https://github.com/kimwalisch/primesieve/blob/master/doc/ALGORITHMS.md](https://github.com/kimwalisch/primesieve/blob/master/doc/ALGORITHMS.md)

## Books/Courses

- [PAZK](https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.pdf)
- ["Building Cryptographic Proofs from Hash Functions"](https://snargsbook.org/), [Alessandro Chiesa](https://ic-people.epfl.ch/~achiesa/) and [Eylon Yogev](https://eylonyogev.github.io/)
- [Summer School: Foundations and Frontiers of Probabilistic Proofs (Course A)](https://www.youtube.com/playlist?list=PLGkwtcB-DfpyjJfxPUdwWpg_ygk2OIp9-)
- [Summer School: Foundations and Frontiers of Probabilistic Proofs (Course B)](https://www.youtube.com/playlist?list=PLGkwtcB-Dfpyqf_fV6S8PiwVdRN695yh4)
- [Spring 2019 - Probabilistically Checkable and Interactive Proof Systems (Alessandro Chiesa)](https://www.youtube.com/playlist?list=PLkFD6_40KJIyWWtxCPBHwGsrutjvwM5_U)