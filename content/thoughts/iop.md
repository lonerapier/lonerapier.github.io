---
title: "Interactive Oracle Proofs"
date: "2024-04-02:00:00:00Z"
tags:
- zk
- math
- cryptography
---

IOP defines as interactive oracle proofs are denoted by a system $S = (P,V)$ of interactive randomised algorithms where interaction happens between entities involved in the system: $P = \textsf{Prover}, V = \textsf{Verifier}$. Verifier is given oracle access to the message sent by prover to the verifier in any round.

Properties of an IOP system:

- Round complexity, $r(N)$:  number of rounds of interaction between $\mathcal{P}$ and $\mathcal{V}$
- Proof length, $l(N)$: sum of length of all messages sent by $\mathcal{P} \rightarrow \mathcal{V}$
- Proof complexity, $q(N)$: number of entries read by $\mathcal{V}$ from the various prover messages

## References

- [FRI #1.1.1 IOP](https://drops.dagstuhl.de/storage/00lipics/lipics-vol107-icalp2018/LIPIcs.ICALP.2018.14/LIPIcs.ICALP.2018.14.pdf#page=3.74)