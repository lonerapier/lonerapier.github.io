---
title: "Technical links on Internet that I don't want to forget"
date: 2025-01-01
tags:
- links
- exploring
- evergreen
---

## May '25
- [Ghostty Devlog 006 – Mitchell Hashimoto](https://mitchellh.com/writing/ghostty-devlog-006): Incredible introduction to SIMD, and how to actually benchmark a terminal emulator
- [LLVM is Smarter Than Me](https://blog.sulami.xyz/posts/llvm-is-smarter-than-me/): this blew my mind. What if there can be much more of these 

## Apr '25
- ["Let’s talk about AI and end-to-end encryption", Matthew Green](https://blog.cryptographyengineering.com/2025/01/17/lets-talk-about-ai-and-end-to-end-encryption/)
- ["A very casual introduction to Fully Homomorphic Encryption – A Few Thoughts on Cryptographic Engineering", Matthew Green](https://blog.cryptographyengineering.com/2012/01/02/very-casual-introduction-to-fully/)

## Mar'25
- ["websockets RFC"](https://datatracker.ietf.org/doc/html/rfc6455)
- ["axum docs"](docs.rs/axum)
- ["Decrusted: Axum"](https://youtu.be/Wnb_n5YktO8?si=HDecnRHr5dRMcxzE)
- ["Crust Of Rust: async/await", jonhoo]()
- ["The telemetry data platform: Breaking Down Operational Silos"](https://www.youtube.com/watch?v=HW_kit5A_Gc): Good review about current telemetry stack of enterprises, and the new needs with agents.


## Feb'25
- ["Hell Is Overconfident Developers Writing Encryption Code"](https://soatok.blog/2025/01/31/hell-is-overconfident-developers-writing-encryption-code/) By [Soatok](https://soatok.blog/author/soatok/)
- oauth2 [explainer](https://www.romaglushko.com/blog/whats-aouth2/)
- ["If A 'ZK'-Prover Network Asks For Your Data. Don’t Give It to Them.", Wyatt Benno](https://blog.icme.io/zk-prover-networks-want-your-data-dont-give-it-to-them-2/): Exactly my thoughts when reading newer projects and proof systems. CSP should be the ideal scenario, and it's not necessary to achieve this by running all the proof generation logic at client-side. Efficient delegation of proof composition where witnesses are not revealed to the computing party is a really neat way to offload computation, which is what these proof systems actually enable.
- ["Episode 346 - ZK in Review: Decoding 2024 & Predicting 2025"](https://www.youtube.com/watch?v=jvw-keefaeE): Things i want to get answer for is:
	- are there any applications of ZK outside it's property of succinctness? Most of the applications, currently condenses on ZK Rollups, co-processors and Web Proofs.
	- Obviously, near zero cost client-side-proving is the holy grail.
		> [!question] what application this enables? Assume, we already have zero-cost CSP.

## Jan'25

- ["When should I use String vs &str?", Steve Klabnik](https://steveklabnik.com/writing/when-should-i-use-string-vs-str)
- ["What's the difference between references and pointers in Rust?", nicole@web](https://ntietz.com/blog/rust-references-vs-pointers/)