---
Title: "My journey into Cryptographic unknowns"
date: 2024-07-07:12:00:00
tags:
- cryptography
- exploring
---

Started learning cryptography end of 2023 rigorously, i.e. getting deeper into core of how and why things work, the way they work. This is a compilation of my thoughts, challenges, resources, notes, everything that I know about cryptography.

> [!note] I'm not an expert in any way, still learning, and breaking things. Most of the implementations that I've done are broken and were done for toy purposes, and still yet to write production grade cryptographic software.

First of all, learning cryptography hasn't been easy. It's a paradigm of information theory that has been in use since the information age began, and it's the only technology I know of, that has gone through countless failures to get to a point where it powers literally all of internet, and will power [verifiable computing](https://0xparc.org/blog/programmable-cryptography-1) age in the coming decade.

## Why Cryptography

- Open
- Control shift
- [Standard-based](https://andrewkelley.me/post/why-we-cant-have-nice-software.html)

## Struggle

I hope you do not relate with this section, but if you're struggling, this might help :)

### Things I struggled with

- Basic primitives: Perfect Secrecy, [[symmetric-cryptography|One-time PAD]], [[hash-functions]]
	- Read history of why it was needed or invented. How it was broken.
- Problem assumptions: [[factorisation|Integer Factorisation]], Discrete Logarithm, [[owf]], [[diffie-hellman]], 
- Difference between instantiations: like difference between SHA2, SHA3, Blake2, etc. Or encryption algorithms like DES, AES, RC4, RSA, ElGamal, etc.
	- Leave everything and implement it.
- Reading formal proofs
	- Most of the time you're just missing primitive knowledge required to understand the proof.
- [[seminal-papers|History]]: I kinda tried skipping this when started initially, but reading these works are inevitable. I know how amazing I felt when I read the 2-page long Adi Shamir's [[secret-sharing]] [paper](https://web.mit.edu/6.857/OldStuff/Fall03/ref/Shamir-HowToShareASecret.pdf).

### Things I currently struggle with

- Writing Formal proofs
- Reading papers quickly (although my speed has improved tremendously)
- Auditing implementations
- Implementation pitfalls

### Things that helped

- Writing Concisely
- Depicting pictorially
- Using more formal language for beginner level explanations like those found in wikipedia.
- Writing proofs by myself, re-reading them when not able to recall

## Syllabus

- Number theory
- Applied Cryptography
- [[intro-to-mathematical-crypto|Mathematical Cryptography]]
- Abstract algebra
- Coding Theory
- Complexity Theory
- Post-Quantum Cryptography
- Zero Knowledge
- MPC
- FHE

## Resources

These are the resources that I used to understand basic applied cryptography and advanced mathematical cryptography:

### Basic

- [Mike Rosulek's PhD advice](https://web.engr.oregonstate.edu/~rosulekm/advising.html): This list is goated. Apart from a basic cryptography syllabus, It contains advice that is universal to any topic. Please go through this if you're starting cryptography.
- Wikipedia: helped a lot when trying to understand how any algorithm, used references section extensively.
- [CS255](https://crypto.stanford.edu/~dabo/cs255/syllabus.html): very nice introduction
- [Luca Trevisan's notes](https://lucatrevisan.github.io/books/crypto.pdf): follows CS255 closely, and contain good theoretical explanations
- [CIS 5560](https://pratyushmishra.com/classes/cis-5560-s24/)
- [Mike Rosulek's JoC]: awesome book for a beginner, with really detailed examples and comprehensible explanations.
- [Understanding Cryptography](https://link.springer.com/book/10.1007/978-3-642-04101-3): exercises are good for any beginner.
- [Handbook of Applied Cryptography by Alfred J. Menezes, Paul C. van Oorschot, Scott A. Vanstone](https://cacr.uwaterloo.ca/hac/)
- [Cryptopals](https://www.cryptopals.com/): Best applied crypto exercises

### Intermediate

- [CS355](https://crypto.stanford.edu/cs355/24sp/schedule/)
- [Introduction to Mathematical cryptography](https://link.springer.com/book/10.1007/978-1-4939-1711-2): Loved the beginner friendly introduction to mathematical proofs for protocols.
- [Introduction to Modern Cryptography](https://www.cs.umd.edu/~jkatz/imc.html): First cryptography book that I completed and loved every minute of it. Please don't skip the exercises (I made the mistake of skipping them, only to go back and do them diligently).
- [An Intensive Introduction to Cryptography](https://intensecrypto.org/public/)
- [Mathematics of Public Key Cryptography](https://www.cambridge.org/core/books/mathematics-of-public-key-cryptography/DDDFA3874A53C4E6846EB3AB06161E43): Content beyond undergraduate level.

### advanced

- [eprint archive](eprint.iacr.org)
- [A Graduate Course in cryptography](toc.cryptobook.us): Don't need anything else if you complete this one, but currently in draft mode. Still worth it to go through the exercises. Have only used it as reference when not able to understand from primary resource.
- [Proofs, Arguments and Zero Knowledge by Justin Thaler](https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.html): Following it to learn anything about Interactive Proofs.
- [A pragmatic introduction to MPC](https://securecomputation.org/)
- [Bar-Ilan winter schools](https://www.youtube.com/@thebiuresearchcenteronappl8783/playlists)

### Miscellaneous

Resources that I love consuming periodically:

- [_FiloSottile's_ blog](https://filippo.io/)
- [crypto stackexchange](https://crypto.stackexchange.com/): Not everyday you get explanations from Yehdua Lindell in a concise form.
