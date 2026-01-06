---
title: "Technical links on Internet that I don't want to forget"
date: 2025-01-01
tags:
- links
- exploring
- evergreen
---

## Nov '25
- [Myths Programmers Believe about CPU Caches – Software the Hard way](https://software.rajivprab.com/2018/04/29/myths-programmers-believe-about-cpu-caches/)
	- I also want to read "What every programmer should know about Memory". But this is a good short read.
- ["Inside Rust's std and parking\_lot mutexes - who wins?", Cuong Lee](https://blog.cuongle.dev/p/inside-rusts-std-and-parking-lot-mutexes-who-win)

## Oct '25
- [Why is everything so scalable? - Stavros' Stuff](https://www.stavros.io/posts/why-is-everything-so-scalable/)
	- [Not Just Scale - Marc's Blog](https://brooker.co.za/blog/2024/06/04/scale.html): Kind of a rebuttal to above post.
	- Every post like these can be summarised into one sentence. Say no to overengineering. Measure and scale.
- [Zero-dependency random number generation in Rust - Orhun's Blog](https://blog.orhun.dev/zero-deps-random-in-rust/): using `RandomState` to generate seeds is a nice trick!

## Sep '25
- ["Accurate mental model for Rust’s reference types", dtolnay](https://docs.rs/dtolnay/latest/dtolnay/macro._02__reference_types.html)
- [Switching from Docker to Podman](https://codesmash.dev/why-i-ditched-docker-for-podman-and-you-should-too)
- [My Own DNS Server At Home - Part 1: IPv4 - Jan Wildeboer’s Blog](https://jan.wildeboer.net/2025/08/My-DNS-Part-1/)
- [Hashed sorting is typically faster than hash tables](https://reiner.org/hashed-sorting): this is the bitter lesson of all of software. Hybrid algorithms, like the one explained in this blog, works surprisingly well.
	- Memory is the bottleneck, that means fetching values from memory takes significantly more time than computing on the value, branchless code allows the compiler to add optimisations easily, simd is underrated.

## Aug '25
- ["Koalas vs. Crows: An Evolutionary Theory of Software", Alex Moon](https://ajmoon.com/posts/koalas-vs-crows-an-evolutionary-theory-of-software): Koala:Utility:::Crow:Abstraction.
	- Crow is needed to create innovative businesses.
	- Koala is needed to sustain those businesses.
- [We'd be Better Off with 9-bit Bytes](https://pavpanchekha.com/blog/9bit.html): some HN posts are funny.
- [How I use Tailscale · Chameth.com](https://chameth.com/how-i-use-tailscale/): TODO for when i'll set up my own homelab infra.

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
- ["Crust Of Rust: async/await", jonhoo](https://www.youtube.com/watch?v=ThjvMReOXYM)
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