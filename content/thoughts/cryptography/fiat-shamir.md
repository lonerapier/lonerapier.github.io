---
title: "Fiat-Shamir Heuristic"
date: 2024-06-25:12:00:00
tags:
- cryptography
---

![Feige-Fiat-Shamir.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/7C67DBCA-3360-4109-833A-03B26CCD00D7_2/dQqjhDktmjoMAfrbxT4zZkhqEjbfxapng3dGPIobNL0z/Feige-Fiat-Shamir.png)

Method to convert interactive protocols into non-interactive system such that public verifiability is feasible and both prover and verifier doesn’t need to be online at all times.

Let *prover* prove to *verifier* that it possess $s_{1}\cdots s_{k}$ secrets co-prime to $N$, without revealing any of the number to verifier. Takes advantage of difficulty of calculating modular square roots as verifier can’t derive $s1$ from $v1$

Take any public coin interactive argument: $\Pi=(\textsf{Setup},\mathcal{P},\mathcal{V})$ with transcript of the form $a_{1},c_{1},\dots,a_{r},c_{r},a_{r+1}$, then strong FS transformation is used to convert Interactive Argument to a Non-interactive argument, where $\mathcal{P}(\textsf{pp,x,w})$ uses a random oracle instantiated at the beginning of the protocol to generate uniform challenges, $c_{i}\leftarrow H(\textsf{pp},x,a_{1},\dots ,a_{i})$.

**Soundness** of FS can be proven using [[forking-lemma]] which is used to prove that if an [[interactive-proofs|interactive protocol]] is sound, then it's non-interactive version compiled using FS is sound.

Soundness of an interactive protocol depends on an efficient extractor $E$ that with the help of an adversary $\mathcal{A}^{*}$, who convinces a verifier $V$, is able to extract witness $w\in\{ 0,1 \}^{*}$. Here's the definition of Knowledge-soundness:

$$
\forall x'\in \mathcal{L},\Pr[\textsf{out}_{V}(\langle \mathcal{A}^{*}(x')\leftrightarrow V(x') \rangle )=1 \implies \mathcal{R_{L}}(x',E^{\mathcal{A}^{*}}(\cdot))=1]\geq \text{noti}(n)
$$

Let's model, an interactive protocol with $E$ and $\mathcal{A}^{*}$ in experiment:[^1]
- $E$ simulates $V$ for $\mathcal{A}^{*}$, runs $\mathcal{A}^{*}$ and obtains transcript $T_{1}$.
- $E$ rewinds $\mathcal{A}^{*}$ to a point where it commits to something.
- Again runs $\mathcal{A}^{*}$ with new randomness, now obtaining transcript $T_{2}$.

Now, language $\mathcal{L}$ is structured in such a way that $E$ is able to extract witness from two valid transcripts.

ZK for FS is a little complicated, if underlying interactive protocol exhibits HVZK, then FS compiled non-interactive protocol is also HVZK, and it was proven by [GSV98](https://dl.acm.org/doi/pdf/10.1145/276698.276852) that any protocol that satisfies HVZK also satisfies statistical zero-knowledge.

## [Weak Fiat Shamir][weak-fs] attacks

There are many practical examples already present where fiat-shamir when applied to a interactive protocol, completely broke the soundness in non-interactive protocol.
- Schnorr's protocol[^2]
- Chaum-Pedersen ZK protocol[^2]
- Initial versions of Bulletproofs and Plonk[^3]

Weak Fiat Shamir attacks happen when only arguments are used to derive the challenges from random oracle, i.e. $c_{i}\leftarrow H(a_{1},\dots,a_{i})$.

### Spartan

attack on spartan is also similar, they forge the final check by making the public input value equal to the verifier check which cancels everything out.

Spartan runs 2 sumchecks to prove correct evaluation of circuit or prove knowledge of witness.

first sumcheck is used to prove r1cs relation, after that, prover calculates evaluations of A,B,C on random value sent by verifier during the sumcheck. At the end of sumcheck, prover receives value which is evaluation of all three on random value.

now, to prove that evaluations are correct, another sumcheck instance is used, where prover sends evaluations to individual polynomials. Receives 3 random values from verifier and batch all 3 instances into one big sumcheck. at the end left with three values which are evaluations of A,B,C=va,vb,vc at rx,ry (two random values for each sumcheck).

![spartan-wfs](https://i.imgur.com/amFjFu1.png)
<center>Spartan Weak FS from https://eprint.iacr.org/2023/691</center>

Prove final evaluation.

But the twist is last evaluation checks the ([ra.va+rb.vb+rc.vc](http://ra.va+rb.vb+rc.vc)).vz(evalaution of witness and public inputs at r_y)=ey (evaluation sent by prover in last sumcheck). and prover can calculate PI such that it cancel everything out.

### VDF

> We note one significant departure of our syntax from the syntax of previous works: we allow the time delay T to be an input to the Eval algorithm, instead of T being determined ahead of time as a parameter to Setup.

> isn’t this bad for the attacker. I mean it’s eaasier for attacker to know for how much time will the function run?

lol this is actually the cause of the attack in VDF’s soundness. since $T$ wasn’t hashed for calculating $l$, any other $l$ can be sampled before the commitment to $g^{2^T}$, and it can be calculated by finding a small $t$ such that $2^t\equiv 2^T \mod l$,

- y = g^2^t
- $\pi=g^{\lfloor{{2^t}/l}\rfloor}$
- send $T,g,y,\pi$ to V
- v verifies by checking $y=g^{T \mod l}\cdot\pi$

although, there aren’t any practical attacks possible on implementations because T has to be very large $\simeq 256$ in order to find a smaller power of 2 equal to a uniform number.

### How to mitigate and use strong FS

How easily detectable attacks described above are?

- attacks on different implementations and systems depend on the context of public inputs. In case of BP, public inputs were hiding commitments, that’s why attacks was possible. In VDF, since attacks isn’t practically possible, attack is easily detectable.

How to mitigate?

- include all public inputs and prover’s outputs in transcript
- do not create a new transcript for each subprotocol as might be case in spartan’s sumcheck
- include all public parameters like group order, generator, any prime (in RSA), R1CS matrices, etc.

## References

- [Fiat-Shamir transformation](https://www.zkdocs.com/docs/zkdocs/protocol-primitives/fiat-shamir/)
- [The Fiat-Shamir Transform - Ron Rothblum](https://www.youtube.com/watch?v=9cagVtYstyY)
- [The magic of Fiat-Shamir](https://akonring.github.io/cryptography/zk/2022/06/06/fiat-shamir.html)
- [Lecture 1: Honest Verifier ZK and Fiat-Shamir](https://www.cs.jhu.edu/~susan/600.641/scribes/lecture11.pdf)

[weak-fs]:<https://eprint.iacr.org/2023/691>

[^1]: Experiment borrowed from [here](https://crypto.stackexchange.com/a/66078)
[^2]: <https://eprint.iacr.org/2016/771>
[^3]: <https://eprint.iacr.org/2023/691>