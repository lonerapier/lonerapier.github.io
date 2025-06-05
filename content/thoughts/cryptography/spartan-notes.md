---
title: "Spartan: Efficient and general-purpose zkSNARKs without trusted setup"
date: "2024-02-15T00:00:00Z"
annotation-target: "private/resources/Spartan-2019-550.pdf"
tags:
- math
- zk
- cryptography
---

First understand that all of the SNARKs are *arguments to an NP statement*. it means they'll help anyone to prove knowledge arguments on an NP statement.

Spartan, SNARK for R1CS circuit satisfiability which is a NP-complete language that generalises arithmetic satisfiability.

Properties:

- transparent
- can operate on any field
- time-optimal prover?
- sub-linear verification cost

Precursors to Spartan:

- Bulletproofs
- Hyrax
- fractal
- Supersonic
- Aurora
- STARK

What Spartan introduces:

- computational commitment: succinct commitment to description of a computation.
- SPARK: compiler to convert any **extractable** PCS for multilinear polys to *sparse* multilinear polys.
- encoding of R1CS instance to a low degree poly.

How spartan uses all these three to create a sub-linear cost verifier for a SNARK?

Spartan is based on R1CS frontend for arithmetic circuits, i.e. it wants to prove arbitrary R1CS circuits. Now, instead of taking the approach of Groth16, which is pairing based, it takes the route of PCS. It introduces a succinct variation of the sumcheck protocol which forms it's first layer of proof system.

> "Our argument makes a black box use of an extractable polynomial commitment scheme in conjunction with an information-theoretic protocol, so its soundness holds under the assumptions needed by the polynomial commitment scheme (there exist many polynomial commitment schemes that can be instantiated under standard cryptographic assumptions)." - Spartan paper: page 3

## Computational commitment

creating succinct commitment to description of NP statements are needed because otherwise verifier would have to process the NP statement being proven before verifying the proof.


## Section 4: Encoding R1CS as LDP

section 4 describes a compact encoding of R1CS instances as degree-3 multivariate polynomial.

$$
\begin{equation}
\widetilde{F}_{io}(x)= 
\Biggl(\sum_{y\in\{0,1\}^s}\widetilde{A}(x,y)\cdot \widetilde{Z}(y) \Biggr)
\cdot
\Biggl(\sum_{y\in\{0,1\}^s}\widetilde{B}(x,y)\cdot \widetilde{Z}(y) \Biggr)-
\sum_{y\in\{0,1\}^s}\widetilde{C}(x,y)\cdot \widetilde{Z}(y)
\end{equation}
$$

This function $F_{io}(x)=0\iff \textit{Sat}_{R1CS}(\mathbb{x},w)=1$. To prove this, note that $\sum_{x \in \{0,1\}^{s}}\widetilde{F}_{io}(x)=0$ but this is not enough as verifer has to verify each term individually. For this, we can create another poly $Q_{io}(t)$.

$$
Q_{io}(t) = \sum_{s \in \{0,1\}^s}\widetilde{F}_{io}(x)\cdot \tilde{eq}(t,x)
$$

where $\tilde{eq}$ is multilinear eq-polynomial. Note that, $Q_{io}(\cdot)$ is a zero polynomial as it evaluates to 0 at all points in the domain because $F_{io}(\cdot)$ evaluates to zero.

## Section 5: 

creates NIZK for R1CS:

$$
\begin{align}
F_{io}(r_x) &= A(r_x) · B(r_x) − C(r_x), \\
A(r_{x})&=\sum_{y\in\{0,1\}^s}\tilde{A}(r_{x},y)\cdot \tilde{Z}(y) \\
B(r_{x})&=\sum_{y\in\{0,1\}^s}\tilde{B}(r_{x},y)\cdot \tilde{Z}(y)  \\
C(r_{x})&=\sum_{y\in\{0,1\}^s}\tilde{C}(x,y)\cdot \tilde{Z}(y) 
\end{align}
$$

P makes three claims about evaluations of $A(r_x)=\mathcal{v}_{a},B(r_{x})=\mathcal{v_{b}},C(r_{x})=\mathcal{v_{c}}$ such that $\mathcal{G}_{io,\tau}(r_{x})=(\mathcal{v_{a}}\cdot \mathcal{v_{b}}-\mathcal{v_{c}})\cdot \widetilde{eq}(r_{x},\tau)$. P can summarise all three separate checks about values of A, B, C in one check:

![[Spartan-2019-550.pdf#page=19&rect=134,286,479,457|Spartan-2019-550, p.19]]

Now, Prover just have to invoke sumcheck on $M_{r_{x}}(y)$, $\mathcal{V}$ evaluates: 

$$M_{r_{x}}(r_{y})=r_{A}\widetilde{A}(r_{x},r_{y})\cdot \widetilde{Z}(r_{y})+r_{B}\widetilde{B}(r_{x},r_{y})\cdot \widetilde{Z}(r_{y}),r_{C}\widetilde{C}(r_{x},r_{y})\cdot \widetilde{Z}(r_{y})$$

Note that: prover only needs to send $\widetilde{Z}(r_{y})$ since all other things can be calculated by prover using $\mathbb{x}=\{\mathbb{F},A,B,C,io,1,m,n\}$ in $\mathcal{O}(n)$ time. But, simply sending evaluations of $\widetilde{Z}$ at $r_{y}$ requires $\mathcal{O}(|\textrm{w}|)$ time. To prevent this, Prover uses extractible PCS to commit to $\mathrm{w}$:

$$
\widetilde{Z}(r_{y}) = (1 − r_{y}[0]) · \widetilde{w}(r_{y}[1..]) + r_{y}[0] · \widetilde{(io, 1)}(r_{y}[1..])
$$

Invokes following NIZK:

![[Spartan-2019-550.pdf#page=20&rect=130,140,482,470|Spartan-2019-550, p.20]]

- P costs:
	- 2 sumcheck instances: $O(n)$
	- 1 Pc.commit, PC.eval for logm multilinear polynomial
- V costs:
	- 2 sumcheck instance verification: $O(\log m)$
	- evaluate $\widetilde{A}(\cdot),\widetilde{B}(\cdot),\widetilde{C}(\cdot)$: $O(n)$
- communication:
	- sumcheck: $\log m$
	- size of commitment for $\widetilde{\mathrm{w}}(\cdot)$
	- evaluation of commitment

> [!PDF|255, 208, 0] [[Spartan-2019-550.pdf#page=22&annotation=1176R|Spartan-2019-550, p.22]]
> > his is because the verifier incurs costs linear in the size of the R1CS instance to evaluate eA, eB, eC at (rx, ry).
> 
> I don't think i understand this completely. How is this cost linear in circuit size?

This is not a snark because verifier costs are not sublinear in n, convert this to sublinear by making prover commit to multilinear polynomials $\widetilde{A}(\cdot),\widetilde{B}(\cdot),\widetilde{C}(\cdot)$ and evaluating at random point $r_{x},r_{y}$.

![[Spartan-2019-550.pdf#page=22&rect=142,155,465,245|Spartan-2019-550, p.22]]

But the caveat is, current PC are even worse because PC.eval of all three PCS described in paper are $\mathcal{O}(m^2)$.

## Section 7: SPARK

Read from [here](https://twitter.com/moodlezoup/status/1691457840966504448).
OR [here](https://georgwiese.github.io/crypto-summaries/Concepts/Polynomial-Commitment-Schemes/Spark)


## Offline Memory Checking

Offline memory checking is a method that enables a prover to demonstrate to a verifier that a read/write memory was used correctly. In such a memory system, values $v$ can be written to addresses $a$ and subsequently retrieved. This technique allows the verifier to efficiently confirm that the prover adhered to the memory's rules (i.e., that the value returned by any read operation is indeed the most recent value that was written to that memory cell). 

Jolt utilizes offline memory checking in the Bytecode prover, Lookup prover (for VM instruction execution), and RAM prover. The RAM prover must support a read-write memory. The Bytecode prover and Lookup prover need only support read-only memories.  In the case of the Bytecode prover, the memory is initialized to contain the Bytecode of the RISC-V program, and the memory is never modified (it's read-only). And the lookup tables used for VM instruction execution are determined entirely by the RISC-V instruction set.

(The term "offline memory checking" refers to techniques that check the correctness of all read operations "all at once", after the reads have all occurred--or in SNARK settings, after the purported values returned by the reads have been committed. Off-line checking techniques do not determine as *a read happens* whether or not it was correct. They only ascertain, when all the reads are checked at once, whether or not all of the reads were correct. 

This is in contrast to "online memory checking" techniques like Merkle hashing that immediately confirm that a memory read was done correctly by insisting that each read includes an authentication path. Merkle hashing is much more expensive on a per-read basis for SNARK provers, and offline memory checking suffices for SNARK design. This is why Lasso and Jolt use offline memory checking techniques rather than online). 

### Initialization Algorithm
#### `TODO`: 
- Initialize four timestamp counters
- Implicitly assume a read operation before each write

### Multiset Check
Define $read$ and $write$ as subsets, and $init$ and $final$ as subsets:
$$
read, write \subseteq \{(a_i, v_i, t_i) \,|\, i \in [0, m]\}
$$
$$
init, final \subseteq \{(a_i, v_i, t_i) \,|\, i \in [0, M]\}
$$
Here, $a_i$, $v_i$, and $t_i$ represent the address, value, and timestamp respectively, with $m$ being the total number of memory operations and $M$ the size of the RAM.

The verifier checks that the combination of $read$ and $final$ matches $write$ and $init$, disregarding the sequence of elements, known as a permutation check:
$$
read \cup final = write \cup init
$$
Jolt conducts this check using a homomorphic hash function applied to each set:
$$
H(read) = \prod_{(a_i, v_i, t_i) \in read} h(a_i, v_i, t_i)
$$
$$
H(write) = \prod_{(a_i, v_i, t_i) \in write} h(a_i, v_i, t_i)
$$
$$
H(init) = \prod_{(a_j, v_j, t_j) \in init} h(a_j, v_j, t_j)
$$
$$
H(final) = \prod_{(a_j, v_j, t_j) \in final} h(a_j, v_j, t_j)
$$
The hash function $h$ is defined as:
$$
h_{\gamma, \tau}(a, v, t) = a \cdot \gamma^2 + v \cdot \gamma + t - \tau
$$

This multiset hashing process is represented by a binary tree of multiplication gates and is computed using an [optimized GKR protocol](https://eprint.iacr.org/2013/351.pdf).

## Lasso

- Threads
	- [gregor's](https://twitter.com/mitschabaude/status/1690984484865294336)
	- [Justin](https://twitter.com/SuccinctJT/status/1689657797385027585)
	- [George](https://georgwiese.github.io/crypto-summaries/Concepts/Protocols/Lookup-Arguments/Lasso)

## References
- [Original BEGKN paper on offline memory checking, forming the technical underpinnings of Lasso](https://www.researchgate.net/publication/226386605_Checking_the_correctness_of_memories/link/0c960526fe9ab32634000000/download?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6InB1YmxpY2F0aW9uIiwicGFnZSI6InB1YmxpY2F0aW9uIn19)
- [Spice Protocol for read-write memories (see Fig. 2)](https://eprint.iacr.org/2018/907.pdf)
- [Spartan Protocol](https://eprint.iacr.org/2019/550.pdf)
- [Lasso Protocol for read-only memories a.k.a. lookups](https://eprint.iacr.org/2023/1216.pdf)
- [Thaler13 Grand Product Protocol (see Prop. 2)](https://eprint.iacr.org/2013/351.pdf)
- [Quarks Grand Product Protocol (see Section 6)](https://eprint.iacr.org/2020/1275.pdf)
- [george's notes](https://georgwiese.github.io/crypto-summaries/Concepts/Protocols/Offline-Memory-Checking)
