---
title: "Multi-Party Computation"
date: 2024-07-16:12:00:00
tags:
- cryptography
- mpc
---


Best example as explained [here](https://eprint.iacr.org/2020/300), is a secure auction with private bids. Requirements include:
- *privacy*: any player shouldn't be able to know about bids of other player.
- *correctness*: player with highest bid wins.
- *Independence of Inputs*: input by any player is independent of any other inputs. This prevents adversary always winning with the highest bid.
- *fairness*: any player shouldn't be able to cancel a round, if he doesn't win.

Problem is these properties need to affiliated with each application (auction, election, etc.) independently. A better approach is to define the adversarial behaviour, execution setting, security guarantees.

Adversarial behaviour:
- *Semi-Honest*: doesn't deviate from protocol's rules but inspects transcript to learn more
- *Malicious*: breaks rules and perform arbitrarily
- *Covert*: follows any strategy, but averse to being caught, i.e. probabilistic behaviour that adversary who attempts an attack may get caught, can be tuned according to the application.

Corruption Strategy:
- *Static*: number of parties in control of adversary are fixed
- *Adaptive*: adversary has the ability to gain control of more parties during of the computation. Adversary can decide who and when to corrupt arbitrarily.
- *Proactive*: adversary gains control of parties during computation, but loses some of them as well. It means honest parties may become malicious but Malicious can become honest as well.

Protocol Setting: **Modular Composition** was introduced in [RC99], which proved that a secure MPC is essentially a trusted party running the computation by itself, and thus, several sub-protocols can be modularised and analysed individually.

- *Sequential*: when computation by multiple parties is achieved in a standalone setting, i.e. no other computation is being run in parallel. Any messages exchanged between parties are done before/after the computation has finished.
- *Concurrent*: **Universal Composability**

World Model:
- Ideal: When a trusted third party is used for computation such that model remains secure even if corresponding parties in the MPC are semi-honest. Participating parties can simply send their input to TTP, and receive result of the computation.
- real: models the real world behaviour of the computation, and is used to reason security of any protocol. Any party that can do exactly same hard as it would have done the same in an *Ideal* world model, then the corresponding *real* model is considered an emulator for the *Ideal* world model.
	- A simple example is computing XOR of two inputs $x,y$, where Alice has $x$, and Bob has $y$. Even in a ideal world, it's impossible to not know the other input after receiving output $x \oplus y$ from TTP. Thus, the real world model which exposes private input to other party is secure.

Simulator model: Any real-world model is clearly distinguishable from ideal world model as there's no communication between the two parties in real world. This can be formulated using a simulator $\textsf{Sim}(1^{n},r)$ that simulates the real world communication, i.e. Bob has no knowledge of TTP or Alice, and only interacts with simulator, analogous to Alice in real world.

Simulator is treated as a PPT algorithm, and is as powerful as its semi-honest adversary. Any real world protocol for the 2-party computation of functionality $F(x,y)$ is secure, if for each party, there exists a PPT algorithm $\textsf{Sim}_{i}(1^{n},r)$ such that simulated ideal world protocol is computationally indistinguishable from real world protocol.

![sim-2pc](/Excalidraw/2pc-sim.svg)

**Secure 2PC**: Any 2 party protocol for computation of a PPT function $F(x,y)$ is secure if there exists a PPT algorithm $\textsf{Sim}_{i}(1^{k},r)$ for $i\in\{ 0,1 \}$ such that the ideal world 2PC protocol and original real-world protocol is computationally indistinguishable in the view of ith party.

> [!info] **View**: defined as tuple $T,x,R$, where $T$ is the transcript of the communication, $x$ is input by $P$, and $R$ is randomness used by P, if any.

$$
\exists \textsf{Sim}_{i}(1^{r},r)\enspace\text{s.t}\enspace\text{View}_{\widehat{P}_{\text{Real}}} \approx \text{View}_{\widehat{P}_{\text{Ideal}}}
$$

Taking an example of [[ot|OT]]:

```mermaid
flowchart LR
Alice-..->Sim["Simulator"]
Sim-..->Alice
Alice-.(x0,x1).->Sim
Sim--(sk0,sk1)-->F_OT
Sim--(Enc(x0),Enc(x1))-->F_OT
F_OT--(x_b)-->Bob
```

## Applications

- [[sfe|SFE]]
- [[ot|OT]]
- [[gc|GC]]
- [[pir|PIR]]
- [[mpcith|MPCiTH]]
- [[psi|PSI]]
- [[vole|VOLE]]

## References

- [Secure Multiparty Computation (MPC)](https://eprint.iacr.org/2020/300)
- [Secure Function Evaluation](https://www.cs.purdue.edu/homes/hmaji/teaching/Fall%202015/lectures/13.pdf)
- [Yehuda Lindell and Benny Pinkas: An Efficient Protocol for Secure Two-Party Computation in the Presence of Malicious Adversaries](https://eprint.iacr.org/2008/049)