---
title: "Homomorphic Encryption"
date: 2025-04-10
tags:
- cryptography
- he
- math
---

How to start:
- Learn about BFV, BGV scheme.
- implement them in rust
- Look at some small libraries, and how they implement it.

[The Beginner’s Textbook for Fully Homomorphic Encryption](https://arxiv.org/pdf/2503.05136)
[\[2205.03511v1\] Lattices, Homomorphic Encryption, and CKKS](https://arxiv.org/abs/2205.03511v1)
[\[2208.08125\] A Tutorial Introduction to Lattice-based Cryptography and Homomorphic Encryption](https://arxiv.org/abs/2208.08125)
[Homomorphic Encryption References](https://people.csail.mit.edu/vinodv/FHE/FHE-refs.html)
[FHE](https://cseweb.ucsd.edu/~daniele/LatticeLinks/FHE.html)
[A Guide to Fully Homomorphic Encryption](https://eprint.iacr.org/2015/1192)
[Survey on Fully Homomorphic Encryption, Theory, and Applications](https://eprint.iacr.org/2022/1602)
[he-chapter.pdf](https://shaih.github.io/pubs/he-chapter.pdf)
[Chen18.pdf](https://thomas-plantard.github.io/pdf/Chen18.pdf)
[Threshold (Fully) Homomorphic Encryption](https://eprint.iacr.org/2025/699)
[SoK: New Insights into Fully Homomorphic Encryption Libraries via Standardized Benchmarks](https://eprint.iacr.org/2022/425)

```mermaid
timeline
    title Fully Homomorphic Encryption (FHE) Research Timeline
    section Foundations
        1978 : RSA Cryptosystem : Rivest, Shamir, Adleman
        1978 : First mention of homomorphic encryption concept : Rivest, Adleman, Dertouzos
        2005 : Boneh-Goh-Nissim cryptosystem : First partially homomorphic encryption with one multiplication
    section Breakthrough Era
        2009 : First FHE scheme : Gentry's lattice-based construction
        2010 : Second-generation FHE : Gentry-Halevi implementation
        2011-2012 : BGV scheme : Brakerski-Gentry-Vaikuntanathan
        2012 : LWE-based FHE : Brakerski scheme
        2013 : GSW scheme : Gentry-Sahai-Waters
    section Optimization Era
        2014 : FHEW scheme : Ducas-Micciancio
        2016 : TFHE scheme : Chillotti et al.
        2016 : HElib library released : IBM
        2018 : CKKS scheme : Cheon-Kim-Kim-Song
        2018 : Microsoft SEAL library : Microsoft Research
    section Practical Applications
        2019 : Intel HE-Transformer : Integration with neural networks
        2020 : Google's Fully Homomorphic Encryption Transpiler
        2022 : HEIR project : Homomorphic Encryption for AI
        2023 : AWS & Duality Collaboration : Cloud-based FHE
        2024 : IBM Fully Homomorphic Encryption Toolkit for Linux
```

Libraries:
- SEAL
- HElib
- tfhe-rs

Start with:
- intense introdcution to cryptography lec 16-17

**Questions**:
- Why is CCA security not possible for FHE?

> [!info] PHE Definition
> Let $\mathcal{F}=\cup \mathcal{F}_{l}$ be a binary function family, where $f\in \mathcal{F}_{l}:\{ 0,1 \}^{l}\to \{ 0,1 \}$. An $\mathcal{F}-$homomorphic public-key encryption scheme is CPA secure

## BGV
FHE over integers

## BFV
FHE over integers

<https://github.com/AI-Tech-Research-Lab/Introduction-to-BFV-HE-ML/blob/main/BFV_theory/BFV_theory.ipynb>

## CKSS
FHE over real numbers

## FHEW/TFHE
FHE over boolean circuits

## HE-GPU
[\[2410.05934v1\] Chameleon: An Efficient FHE Scheme Switching Acceleration on GPUs](https://arxiv.org/abs/2410.05934v1)


## Resources
- ["Easy-FHE", Craig Gentry](https://crypto.stanford.edu/craig/easy-fhe.pdf)
- ["Fully homomorphic encryption using ideal lattices", Craig Gentry PhD Thesis](https://crypto.stanford.edu/craig/)
- 