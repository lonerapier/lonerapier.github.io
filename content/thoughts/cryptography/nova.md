---
title: "PCD & IVC"
date: "2024-03-21:12:00:00Z"
tags:
- zk
- cryptography
---

## Introduction

very introductory explanation on ivc is computation that can verify itself with constant overhead. In the paper, computation is defined as incremental steps that takes an input and a proof of previous step and can return proof of correct computation of the application and that the previous proof has been verified correctly.

IVC works on step based functions: $z_{n}=F^{(n)}(z_{0})$ for some steps $n$, initial input $z_{0}$ and output $z_{n}$.

![ivc-intro](https://i.imgur.com/nbepj2r.png)

nova realises incremental verifiability using a relaxed [[r1cs|R1CS]] instance. so each step is treated as an R1CS instance and that step proves that step was computed correctly and folds the R1CS instance of previous step and the current step to a new relaxed R1CS instance which is passed to next step.

> [!question] how does nova map R1CS computation into a step computation function?

![nova-folding-intro](https://i.imgur.com/sVISBKM.png)

## Preliminaries

**Section 3** explains all the preliminary definitions used to construct a complete, knowledge sound and zero knowledge IVC scheme.

completeness:

<!-- ![[nova-2021-370.pdf#page=11&rect=141,463,461,538&color=yellow|p.11]] -->

knowledge soundness:

<!-- ![[nova-2021-370.pdf#page=11&rect=136,331,481,432&color=yellow|p.11]] -->

## NIFS

In **section 4**, they propose a folding scheme for NP. they take R1CS as the NP-complete language for arithmetic circuit satisfiability. First attempt is the naive attempt where they just create random linear combination of $Z,w$ and witness matrix. But this doesn't create correct folding instance, as there are cross terms from multiplying $AZ$ and $BZ$. 

$$
\begin{align}
u\mathrm{} &\leftarrow \mathrm{u}_{1} + r\cdot\mathrm{u}_{2} \\
E &\leftarrow E_{1} + r\cdot(AZ_{1}\cdot BZ_{2}+AZ_{2}\cdot BZ_{1}-u_{1}\cdot CZ_{2}-u_{2}\cdot CZ_{1}) + r^{2} \cdot E_{2}
\end{align}
$$

Then, they introduce two terms $u, e$ in the form of relaxed R1CS structure. $e$ amounts for the cross error terms in AZ and BZ,  folds public instance and private witness into one.

$$
\begin{align}
\mathrm{x} &\leftarrow \mathrm{x}_{1} + r\cdot\mathrm{x}_{2} \\
W &\leftarrow W_{1} + r \cdot W_{2}
\end{align}
$$

![[nova-2021-370.pdf#page=14&rect=134,342,492,411&color=yellow|p.14]]

Above folding scheme is not zero-knowledge as prover sends witness $W_{1}, W_{2}$ to the verifier. To circumvent this, commitments are used. Thus, committed relaxed R1CS is used to verify the folded instance.  Let **CRRI** denotes *committed relaxed R1CS instance*: $(\overline{E}, u, \overline{W}, x)$, and $E, r_{E},W,r_{W}$ denote relaxed R1CS witness satisfying CRRI. V takes $CRRI_{1},CRRI_{2}$ outputs instance satisfying witness:

1. $\mathcal{P}$ sends commitment to $T=AZ_{1}\circ BZ_{2}+AZ_{2}\circ BZ_{1}-u_{1}\cdot CZ_{2}-u_{2}\cdot CZ_{1}$, $\overline{T}$ to $\mathcal{V}$
2. $\mathcal{V}$ sends $r$ to P.
3. V calculates **folded instance**: $\overline{W}, \overline{E}, u, x$ from $\overline{W_{1}},\overline{W_{2}},\overline{E_{1}},\overline{T},\overline{E_{2}},x_{1},x_{2},u_{1},u_{2}$
4. P outputs **folded witness** $(E,u,W,x)$ to V
5. V verifies that it satisfies.

Above folding scheme is rendered non-interactive in random-oracle model using Fiat-Shamir transformation. Constructing a non-interactive folding scheme: $\mathcal{G},\mathcal{K},\mathcal{P},\mathcal{V}$

- $\mathcal{G}(1^{\lambda})\rightarrow pp$
- $\mathcal{K}(pp,(A,B,C))\rightarrow (\mathsf{pk,vk})$
- $\mathcal{P}(\mathsf{pk},(u_{1},w_{1}),(u_{2},w_{2}))\rightarrow \left(E, W,\overline{T}\right)$
- $\mathcal{V}(\mathsf{vk},(\overline{T},\overline{W}),(u_{1},u_{2})) \rightarrow \left(\overline{E},\overline{W},u,x\right)$

![folding-scheme](https://i.imgur.com/DIoCRBh.png)

Let's understand efficiency of nova's NIFS:

- verifier needs to do 2 scalar mults: $\overline{E},\overline{W}$, 3 EC add: 2 for $\overline{E}$, 1 for $\overline{W}$
- communication: relaxed R1CS witness: $\mathbb{F}^m,\mathbb{F},\mathbb{F}^{m-l-1},\mathbb{F}$

## [NOVA][kst21] IVC

function $F$ is augmented to $F'$ takes two arguments $u_i,U_{i}$: computes $F(z_{i})$  and give $z_{i+1}$ and invokes verifier to fold $u_{i}$ and $U_{i}$ together to create $U_{i+1}$. IVC prover then creates a proof for $U_{i+1}$ that attests to $u_{i+1}$ being correct execution of steps $0..i$ while $u_{i+1}$ attest to correct computation of step i+1 of $F'$.

To construct an IVC from above folding scheme, let $\mathsf{NIFS = (G,K,P,V)}$ be non-interactive folding scheme for committed relaxed R1CS.

- $\mathcal{G}(1^{\lambda})\rightarrow pp$
- $\mathcal{K}(pp,F)\rightarrow (\mathsf{pk,vk})$: $\mathsf{pk_{fs},vk_{fs}}\leftarrow \mathsf{NIFS}.\mathcal{K}(pp,s_{F'})$ and $\mathsf{pk,vk}\leftarrow((F,\mathsf{pk_{fs}}),(F,\mathsf{vk_{fs}}))$
- $\mathcal{P}(pk,(i,z_{0},z_{i}),\omega_{i},\Pi_{i})\rightarrow\Pi_{i+1}$
- $\mathcal{V}(\mathsf{vk},(i,z_{0},z_{i}),\Pi_{i})\rightarrow\{0,1\}$

<!-- ![[nova-2021-370.pdf#page=19&rect=123,288,488,566&color=yellow|p.19]] -->

- Nova works on 2 R1CS constraint systems defined as $\textsf{R1CS}^{(1)}, \textsf{R1CS}^{(2)}$
- For each constraint system, relaxed R1CS instance consist of $(\mathbb{U}=(\bar{E},s,\bar{W},x),\mathbb{W}=(E,W))$.
- Prover derives new $\mathbb{W}$ after each iteration and verifier derives $\mathbb{U}$.
- Augmented circuit $F'$ consists of relations $\mathcal{R}_{1},\mathcal{R}_{2}$ that takes as input relaxed r1cs instance and relation witness pair: $\mathbb{u}_{i}=(\bar{E},s,\bar{W},x=(x_{0},x_{1}\in\mathbb{F}_{1})),\hat{w}_{i}=(i,z_{0},z_{i},z_{i+1}\leftarrow F(z_{i}),\mathbb{U}_{i}^{(2)},\mathbb{u}_{i}^{(2)},\bar{T}_{i}^{(2)}\in \mathbb{G}_{2})$. At each step:
	- folding verifier folds: $\mathbb{U}_{i+1}^{(2)}\leftarrow \textsf{Fold}_{\mathcal{V}}(vk,\mathbb{u}_{i}^{(2)},\mathbb{U}_{i}^{(2)},\bar{T}^{(2)})$
	- and generates new relaxed instance: $\mathbb{u}_{i+1}^{(1)}=(\mathbb{u}_{i}^{(2)}.x_{0},H_{1}(vk),(i+1),z_{0},z_{i+1},\mathbb{U}_{i+1}^{(2)})$
	- $\mathbb{U}_{i+1}^{(2)}$ gets transferred to next $\mathcal{R}_{1}$ step and $\mathbb{u}_{i+1}^{(1)}$ is passed as input to $\mathcal{R}_{2}$ step.
- ==determine why non-native field implementation is used in Nova?==
- IVC verifier: after the final iteration verifies following:
	- Input:
		- index and evaluations: $i, z_{0}^{(1)},z_{0}^{(2)},z_{i}^{(1)},z_{i}^{(2)}$
		- function $F_{1},F_{2}$ with auxiliary inputs: $\textsf{aux}_{i}^{(1)},\textsf{aux}_{i}^{(2)}$
		- Proof $\pi_{i}:=((\mathbb{u}_{i}^{(2)},\mathbb{w}_{i}^{(2)}),(\mathbb{U}_{i}^{(1)},\mathbb{W}_{i}^{(1)}),(\mathbb{U}_{i}^{(2)},\mathbb{W}_{i}^{(2)}))$
	- Verifies:
		- index > 0
		- $\mathbb{u}^{(2)}_{i}.x_{0}=H_{1}(vk,z_{0},z_{i},\mathbb{U}_{i}^{(2)})$
		- $\mathbb{u}_{i}^{(2)}.x_{1}=H_{2}(vk,z_{0},z_{i},\mathbb{U}_{i}^{(1)})$
		- $\mathbb{U}_{i}^{(1)},\mathbb{W}_{i}^{(1)}$ satisfies R1CS
		- $\mathbb{U}_{i}^{(2)},\mathbb{W}_{i}^{(2)}$ satisfies R1CS
		- $\mathbb{u}_{i}^{(2)},\mathbb{w}_{i}^{(2)}$ strictly satisfies $\textsf{R1CS}^{(2)}$
- IVC prover:
	- Input:
		- $F_{1},F_{2}$, converts this into augmented circuits relation $\textsf{R1CS}^{(1)},\textsf{R1CS}^{(2)}$
		- $z_{0}^{(1)},z_{0}^{(2)},z_{i}^{(1)},z_{i}^{(2)}$
		- proof $\pi_{i}:=((\mathbb{u}_{i}^{(2)},\mathbb{w}_{i}^{(2)}),(\mathbb{U}_{i}^{(1)},\mathbb{W}_{i}^{(1)}),(\mathbb{U}_{i}^{(2)},\mathbb{W}_{i}^{(2)}))$
	- Computes:
		- folds prior pairs: $(\bar{T}_{i}^{(1)},\mathbb{U}_{i+1}^{(2)},\mathbb{W}_{i+1}^{(2)}):=\textsf{Fold}_{\mathcal{P}}(pk,(\mathbb{u}_{i}^{(2)},\mathbb{w}_{i}^{(2)}),(\mathbb{U}_{i}^{(2)},\mathbb{W}_{i}^{(2)}))$
		- creates relation witness $\hat{w}_{i}^{(1)}$, runs augmented circuit to extend witness to $w_{i+1}^{(1)}$
		- commit to witness $\bar{w}_{i+1}^{(1)}$
		- define $\mathbb{u}_{i+1}^{(1)}=(\bar{0},1,\bar{w}_{i+1}^{(1)},x=(x_{0},x_{1})$ and $\mathbb{w}_{i+1}^{(1)}=(\vec{0}^{(1)},w_{i+1}^{(1)})$
		- similar for $\textsf{R1CS}^{(2)}$

Let's talk about costs:

- P's complexity:
	- $\mathcal{O}(m)\space\mathbb{F}$ operations: combining W, E
	- 1 MSM: $\overline{T}$
- V's complexity: $|F|+\mathcal{o}(2G+2H+R)$
	- $|F|$ constraints to encode computation
	- 2 MSM ($\overline{W},\overline{E})$
	- 2 Hash functions for $u_{i}.x,U_{i}.x$
	- 1 Random Oracle for $r$
- communication: 4 EC point $(u_{i}.\overline{W},u_{i}.\overline{E},U_{i}.\overline{W},U_{i}.\overline{W})$, 2 $\mathcal{O}(m)$ vectors: $w,W$

### Proof compression using SNARK

In the next step, to circumvent succinctness and zero-knowledge, nova attaches the IVC proof in a SNARK. Uses Spartan, but any SNARK for NP can be used. It uses following steps to compress the proofs:

- $\mathcal{G}(1^\lambda)\to pp$
- $\mathcal{K}(pp,F)\to \mathsf{(pk,vk)}$
	- $\mathsf{NIFS.K(pp,s_F)\to(pk_{NIFS},vk_{NIFS})}$
- $\mathcal{P}(pk,(i,z_{0},z_{i}),\Pi)\to \pi$
	- uses $\mathsf{NIFS.P}(\Pi)$ into $\mathsf{U',W'},\overline{T}$
	- take $\mathsf{SNARK.P(pk,U',W')}\rightarrow\pi_{U'}$
	- $\pi=(U,u,\overline{T},\pi_{U'})$
- $\mathcal{V}(vk,(i,z_{0},z_{i}),\pi)\to \{0,1\}$
	- uses $\mathsf{NIFS.V}(\mathsf{vk_{NIFS}},U,u,\overline{T})$ to get folded instance $U'$
	- uses $\mathsf{SNARK.V}(\mathsf{vk_{SNARK}},U',\pi_{U'})=1$

Another very interesting [paper](https://eprint.iacr.org/2023/969) identified a soundness bug in nova proving on a [cycle of curves](https://zcash.github.io/halo2/background/curves.html#cycles-of-curves). Why is a cycle of curves necessary? because output of one circuit is in scalar field while the input is in base field of the elliptic curve used for commitments.

![nova-prover](https://i.imgur.com/tYZBfuf.png)

So, you have to send the commitments to next curve layer, where it's accumulated and $x_0$ is verified and $x_1$ is sent to next layer.

### SNARK for committed relaxed R1CS

modifies spartan's equation for relaxed R1CS. performs 6 sumcheck protocol to get values of multilinear polynomials.

![[nova-2021-370.pdf#page=25&rect=118,457,492,672|nova-2021-370, p.25]]

Costs:

- Prover work: 4 sumcheck protocol where polynomial has degree at most $\mathcal{O}(\log m)$. Prover work is $\log m$ and 
- IOP communication complexity is also $\log m$
- V work:
	- calculate $eq(\tau,r_x)$ in $\mathcal{O}(\log m)$

converts a polynomial IOP into SNARK by using a PCS for multilinear polynomials.

> [!PDF|255, 208, 0] [[nova-2021-370.pdf#page=26&annotation=878R|nova-2021-370, p.26]]
> > Furthermore, there is a polynomial commitment scheme for log m-variate multilinear polynomials if there exists an argument protocol to prove an inner product computation between a committed vector and an m-sized public vector ((r1, 1 − r1) ⊗ … ⊗ (rlog m, 1 − rlog m)), where r ∈ F log m is an evaluation point
> 
> still don't understand this properly

## [Supernova][ks22]

supernova generalised nova's folding scheme to a list of functions, such that at any point of time, prover can fold execution of any function selected through a mux.

Let $F_{1},\dots,F_{l}$ be polynomial time computable functions, and a program counter $\varphi$. Goal of the prover is to take $\Pi_{i}$ for NIVC statement: $i,z_{0},z_{i}$ and generate proof $\Pi_{i+1}$ for statement: $i+1,z_{0},z_{i+1}$.

Augmented Function: $F'_{j}(i,z_{0},z_{i},w_{i},pc_{i},U_{i})\to (z_{i+1},U_{i+1},pc_{i+1})$
- Runs $F_{j}(i,z_{i},w_{i})\to z_{i+1}$
- runs folding verifier to fold $u_{i},U_{i}[pc_{i}]$ into $U_{i}[pc_{i}]$
- runs $\varphi(pc_{i},w_{i})\to pc_{i+1}$

Verifier $V((\mathbb{u}_{i},\mathbb{w}_{i}), (\mathbb{U}_{i},\mathbb{W}_{i}))$:
- $\mathbb{u}_{i}$ contains $pc_{i}$ in its public output, so use that to verify that $u_{i},w_{i}$ is satisfying constraints $F'_{pc_{i}}$
- for each $j\in\left\{0,\dots,l\right\}$, verify that $U_{i}[j],W_{i}[j]$ satisfies $F'_{j}$

Prover $\Pi_{i}\to \Pi_{i+1}$:
- $i=0$: base case
	- Initialise all running instances as empty, i.e. $U\to\perp$
	- run circuit for step 0
	- runs 
- else:
	- Parse $\Pi_{i}$ as $((u_{i},w_{i}),(U_{i},W_{i}),pc_{i})$
	- Runs NIFS.P to obtain: $U_{i+1},W_{i+1},\bar{T}_{i}$
	- runs $F'_{j}$ to get $z_{i+1},pc_{i+1},U_{i+1}$
	- compute $pc_{i+1}\leftarrow \varphi(z_{i},w_{i})$
	- compute $(u_{i+1},w_{i+1})\leftarrow \textsf{trace}(F'_{pc_{i+1}},(vk,U_{i},i,z_{0},z_{i},w_{i},\bar{T}))$

## [Cyclefold][ks23]

In Nova, a NIFS verifier has to run in augmented circuit on opposite curve. This, arguably adds ~10k mul gates on both circuits.

> [!PDF|255, 208, 0] [[cyclefold-2023-1192.pdf#page=1&annotation=795R|cyclefold-2023-1192, p.1]]
> > CycleFold’s starting point is the observation that folding-scheme-based recursive arguments can be efficiently instantiated without a cycle of elliptic curve
> 
> how?

Cyclefold improves the performance of IVC prover by reducing the size of the secondary circuit on another curve. Second curve is used to perform a single scalar multiplication (1000-1500 mul gates).

> [!PDF|255, 208, 0] [[cyclefold-2023-1192.pdf#page=1&annotation=798R|cyclefold-2023-1192, p.1]]
> > CycleFold then folds invocations of that tiny circuit on the first curve in the cycle.
> 
> didn't understand this. Why does it folds the circuit on first curve? don't we just run folding verifier to get new relaxed R1CS instance?

Use secondary circuit to perform curve operations for primary circuit, verifiability of which is delegated back to augmented circuit which runs a NIFS verifier.
- Run a folding scheme verifier that performs folding for a relation.
- scalar mult operations for folding is delegated to a secondary circuit which uses opposite curve for efficient computation.
- result of operation is verified and folded by a Nova NIFS.V and output used by primary folding scheme verifier.

> [!PDF|255, 208, 0] [[cyclefold-2023-1192.pdf#page=6&annotation=816R|cyclefold-2023-1192, p.6]]
> > Remark 3
> 
> did not understand this remark. authors are referring to higher degree constraints to encode $u_{\textsf{EC}}$ which would result in higher constraints.


## Sangria

TODO

## Hypernova

Prerequisite: [[ccs|CCS]]

similar to any proof system with two entities: $\mathcal{P},\mathcal{V}$ where prover is trying to prove 

## [Protostar][bc23]

TODO

## Protogalaxy

TODO

## Nebula

## MicroNova

## Twist & Shout

## Interesting questions:

> [!question] what's the difference between halo style recursion/accumulation vs nova style folding scheme?


## resources

- [Lurk Lab's Awesome Folding](https://github.com/lurk-lab/awesome-folding)
- [carlos' ccs](https://hackmd.io/@CPerezz/BkKWMagS2)
- [origami](https://hackmd.io/@aardvark/rkHqa3NZ2)
- [arnau's hypernova notes](https://github.com/arnaucube/math/blob/master/notes_hypernova.pdf)
- 

[kst21]: <https://eprint.iacr.org/2021/370>
[ks22]: <https://eprint.iacr.org/2022/1758>
[ks23]: <https://eprint.iacr.org/2023/1192>
[bc23]: <https://eprint.iacr.org/2023/620>
[arecibo]: <https://github.com/argumentcomputer/arecibo>
[sonobe]: <https://github.com/privacy-scaling-explorations/sonobe>