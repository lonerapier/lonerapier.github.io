---
title: Interactive Proofs
date: 2024-02-06
tags:
- cryptography
- zk
---

Notes from [Lecture 4](https://www.youtube.com/watch?v=4018OYyoAf8) of ZKP MOOC.

Interactive Proofs:

- complete
- statistical soundness: prover is computationally unbounded

> arguments vs proofs: in arguments, as in SNARKs, prover is computationally bounded, specifically polynomial time while in proofs, prover is unbounded.

> Another comparison in circuit satisfiability $C(x, w) = 0$ problem is difference between soundness and knowledge soundness. where, *soundness* means, prover is trying to prove existence of a valid $X$ which satisfies the circuit whereas in *knowledge soundness*, prover knows $x$. 
> There can be cases where one make sense over the other. For example: soundness is needed when $V$ sends $C$ along with input to check whether input satisfies.
> Knowledge soundness is needed when Prover has a secret $w$ along with computation, like proving knowledge of private key to a wallet.

Creating SNARK from Interactive proof:

- simply sending the input $x$ to the verifier with circuit C to check the computation, not a SNARK as proof size too large and verification time too much.
- sending $w$ to $V$, and sending an IP to verify $w$ satisfies $C$. Proof size might still be too big.

Prerequisites:

- [[polynomial-commitments|Polynomial Commitments]]
- [[sz-lemma|Schwartz-Zippel Lemma]]
- [[poly-extensions|Polynomial Extensions]]

## Sumcheck Protocol


