---
title: "KS23: Hypernova"
date: "2024-05-01:12:00:00"
tags:
- cryptography
---

Extension of [[nova|Nova]].

Hypernova allows folding of different NP relations that share a compatible structure. Utilizes [[ccs|CCS]] structure to escape the bounds of quadratic constraints in R1CS and realizes a multi folding scheme, modifies CCS into linearised committed CCS.

> [!PDF|255, 208, 0] [[hypernova-2023-573.pdf#page=1&annotation=776R|hypernova-2023-573, p.1]]
> > A distinguishing aspect of HyperNova is that the prover’s cost at each step is dominated by a single multi-scalar multiplication (MSM) of size equal to the number of variables in the constraint system, which is optimal when using an MSM-based commitment scheme.
> 
> Explain prover cost of Nova. Prover does 3 scalar mults for $\overline{T},\overline{E},\overline{W}$.

> [!PDF|255, 208, 0] [[hypernova-2023-573.pdf#page=2&annotation=779R|hypernova-2023-573, p.2]]
> > Nova’s prover incurs only two MSMs of size proportional to the size of the circuit proven. 
> 
> mentioned in paper that Nova's prover incur only 2 MSMs. Revisit this.

Multi-folding schemes refer to combining two different relations $\mathcal{R}_{1},\mathcal{R}_{2}$ with structure $\mathcal{s}_{1},\mathcal{s}_{2}$ into a single instance $\mathcal{R}_{1}$ with structure $s_{1}$ as long as $s_{1},s_{2}$ satisfy a given **predicate**.

> [!question] What predicate means here?

---

Things to remember:
1. Do you remember CCS, CCCS, LCCCS?
2. Spartan? because hypernova nizk is an early stopping version of spartan where it doesn't perform the last sumcheck for proving evaluation argument.
3. Why is multi-folding needed?
	1. for higher degree constraints, and prover work independent of degree of constraints.
- Spartan IOP
- Sumcheck: cost profile
- PCS: KZG + HyperKZG (Gemini)
- definition of folding schemes, MFS, IVC
- Nova's folding scheme:
	- IVC proof: $\pi_{i}=(u_{i},U_{i},w_{i},W_{i})$
	- augmented circuit with NIFS verifier
- NIVC
- Understand HN theorem 1, 2 cost profile

---

## Introduction

IVC on a cycle of curves approach started with [BCTV14](https://eprint.iacr.org/2014/595),[BGH19](),[BCMS20](),[BDFG21](),[BCL+21](), but they utilized zkSNARKs to prove each incremental step. how do they utilize snark for proving each step? is it like using plonk to prove each step and then combine proof of that step onto next step, then verify previous snark proof and also new computation correctness?

Nova took a new approach and shifted the overhead of combining two computations at circuit level, i.e. it combine two R1CS equations into one and then proved the validity of new equation. All other approaches like Split Accumulation [BCL+21]() although removes succinct arguments overhead but is limited to R1CS and can't be extended to Plonkish circuits without prover incurring $\mathcal{O}(n\cdot d)$ cost. Similarly, Sangria extended Nova's Relaxed R1CS approach to Plonkish circuits but high-degree $d$ custom gates meant having cross terms and MSM of same length.

Introduces a multi folding scheme that can fold a CCS instance with prover work linear in field operations, and **skipping** commitments to cross terms, while the verifier work is logarithmic in field operations. Furthermore, using linearized instances, folding can be extended to n-to-1 instances where multiple instances of CCS instances with structure $s$ can be folded into one.

NIVC computation before Hypernova deployed a *universal circuit* which consisted of a giant combination of all other circuits in the program. Unfortunately, cost of proving a recursive step is in order of the size of universal circuit while program state can consists of many instructions. Hypernova introduces *"a-la-carte" cost profile*, where cost of proving a program is proportional to the size of the instruction and not of the entire universal circuit. 

Nova uses cycle of curves because proving an IVC proof requires folding verifier to be employed as a circuit. To prevent, more non-native computation proof on curve $E_{1}$ needs to be proven by defining a circuit on curve $E_{2}$ and vice-versa. Since, Nova uses half-pairing cycle like *BN254/Grumpkin*, $E_{1}$ curve's circuit on $E_{2}$ can be proven using a compressed proof with KZG (Gemini's HyperKZG) commitment scheme, but $E_{2}$ curve's circuit also needs to be proven using a SNARK on $E_{1}$ which is really **expensive**.

Constructing IVC by using Nova as a black box by representing CCS circuit multifolding verifier as step circuit.

## [[ccs|CCS]]

CCS structure: $m,n,N,t,q,d,l$

- $\widetilde{M}_{1},\dots,\widetilde{M}_{t}$: sparse multilinear polynomials in $s+s'$ variables where $s=\log m$ and $s'=\log n$
- $N:\Upomega(m)$: maximum values at which $\widetilde{M}_{1},\dots,\widetilde{M}_{t}$ evaluates to non-zero
- $t$: number of matrices $M_{i}\in \mathbb{F}^{m\times n}$
- $q$: number of multisets $S_{i}$
- $d$: maximum cardinality of each multiset
- $c_{i}\in\mathbb{F}$: sequence of constants
- $\mathsf{x}\in \mathbb{F}^{l}$ is the public IO vector
- $\tilde{w}$ is a multilinear polynomial in $s'-1$ variables
- $z:(w,1,x)$

We say $(s,\mathsf{x},w)\in \mathcal{R}_{CCS}$ if

$$
\begin{equation}
\sum^{q-1}_{i=0} c_{i} \cdot \Bigg( \prod_{j\in S_{i}} \Big(\sum_{y\in \{ 0,1 \}^{s'}}\widetilde{M}_{j}(x,y) \cdot \widetilde{z}(y)\Big) \Bigg) \boldsymbol{= 0}
\end{equation}
$$

### LCCS

Linearized CCS only consists of linear checks of CCS. HN folds a CCS instance into LCCS instance to produce a new LCCS instance.

- structure: $m,n,N,l,t,q,d\in \mathbb{N}$
- relation: $(s,(u,m,\mathsf{x},r,v_{1},\dots,v_{t}))\in \mathcal{R}_{\textsf{LCCS}}$ if

$$\begin{equation}
v_{i}=\sum_{y\in\{ 0,1 \}^{s'}}\widetilde{M}_{i}(r,y)\cdot \widetilde{z}(y)
\end{equation}$$

where $\widetilde{z}=\widetilde{(w,u,\mathsf{x})}$ is a multilinear polynomial in $s'$ variables.

### Committed Relation

$\textsf{com}=(\textsf{Gen,Commit})$ is a commitment scheme over witness space: $W$ such that

$$
\mathcal{R}(\textsf{com})=
\Bigg\{ 
\bigg(pp_{com},s,(C,u),(w,r)\bigg) 
\Bigg| 
\begin{align*}
(s,u,w)\in \mathcal{R} \\
C=\textsf{Commit}(\textsf{pp}_{\textsf{com}},w,r) \\
\end{align*} 
\Bigg\}
$$

- CCCS: commitment to $C=\textsf{com}(w,r)$. Relation: $C,\textsf{x},r$
- LCCCS: $C,u,\mathsf{x},r,v_{1},\dots,v_{t}$

## Hypernova multi folding scheme

> [!question] What's a multi-folding scheme?
> Reduce task of proving $\mu$ instances of relations $\mathcal{R}_{1}$ and $\nu$ instances of $\mathcal{R}_{2}$ with structure $s_{2}$ into task of checking a single instance of $\mathcal{R}_{1}$.

- Creates multi-folding scheme for CCS.
- CCS's SNARK used SuperSpartan IOP that transformed the satisfiability of CCS instance to checking that a multivariate polynomial is equal to zero using sumcheck done by Spartan.
- hypernova's MFS folds running LCCS into the folded CCS instance. Only possible when structure of LCCS and CCS instance are similar. 

> [!info] *Theorem 1*: Cost profile for HN multi-folding scheme
> - prover time: $O(N+t\cdot m+q\cdot m\cdot d\cdot \log^{2}d)$ finite field operations and $O(1)$ group operations
> - verifier time: $O(d\cdot \log m)$ finite field operations and $O(1)$ group operations
> - communication complexity: $O(d\cdot \log m)$ finite field operations.



## Hypernova NIVC

NIVC-compatible folding schemes: Relation $\mathcal{R}_{1}$ and committed relation $\mathcal{R}_{2}$ over relation $\mathcal{R}_{2}'$. $(\mathcal{R}_{1},\mathcal{R}_{2},\textsf{compat},1,1)$ is NIVC compatible if:
- *NP-completeness*: can encode a polynomial-time function $F$ as statements and prove correct execution.
- *partial functions*: strucutres and instances can be encoded separately to witness, i.e. $(s_{1},s_{2})\leftarrow\textsf{enc}_{str}(F)$ and $u\leftarrow\textsf{enc}_{inst}(x,y)$.
- *monotonicity*: any function encoded as statement preserves it's size, i.e. $|\textsf{enc}_{str}(F)|\leq|\textsf{enc}_{str}(G)|$ if $|F|\leq|G|$.
- *default instances*: relation $R_{1}$ has default instances: $(pp,s,u_{\perp},w_{\perp})\in\mathcal{R}_{1}$

Then, the hypernova NIVC almost follows same step as Supernova NIVC with just one caveat that $\mathcal{R}_{2}$ has a committed instance, i.e. $u=(C,u')$ with $C$ as the commitment to witness, and $u'=\textsf{enc}_{inst}(\textsf{hash}(vk,i,z_{0},z_{i},U_{i},pc_{i}))$



Two approaches:

### Direct approach

Similar approach as Nova IVC but step circuit is represented as $\mathcal{R}_{\text{CCCS}}$

### Simple approach: Use Nova as black box

Gist is to encode hypernova's NIMFS.V in nova's step circuit, so that when verifier is run during IVC proving step, step circuit along with new output value also folds the LCCCS and CCCS instance together.

step function: expressed in R1CS, folds $\mathcal{R}_{CCCS}$ structure.
- check public input $u_{i}.x=(in, out)$
- check $in=z_{i}$
- fold instance using $U_{i+1}\leftarrow NIFS.V(vk,u_{i},U_{i},\pi)$
- output: $vk,U_{i+1},out$

$F$: represented as $\mathcal{R}_{CCCS}$ structure

$\mathcal{(G, K, P, V)}$:
- $\mathcal{K}(pp_{\mathsf{NIFS}},pp_{\mathsf{IVC}},F)\to(pk,vk)=((F,pk_{\mathsf{NIFS}},vk_{\mathsf{NIFS}},pk_{\mathsf{IVC}}),(step,vk_{\mathsf{NIFS}},vk_{\mathsf{IVC}}))$
	- $(pk_{\mathsf{NIFS}},vk_{\mathsf{NIFS}})\leftarrow \text{NIFS.K}(pp_{\mathsf{NIFS}},F)$
	- $(pk_{\mathsf{IVC}},vk_{\mathsf{IVC}})\leftarrow \text{IVC.K}(pp_{\mathsf{IVC}},\mathsf{step})$
- $\mathcal{P}\left( pk,(i,z_{0},z_{i}),\Pi_{i} \right)\to\Pi_{i+1}$
	- parse $\Pi_{i}=(\Pi',U_{i},W_{i})$
	- $u_{i},w_{i}\leftarrow \text{trace}(F,(z_{i},w_{i}))$
	- $U_{i+1},W_{i+1},\pi_{i+1}\leftarrow \text{NIFS.P}(pk_{\mathsf{NIFS}},(U_{i},W_{i}),(u_{i},w_{i}))$
	- $\Pi'_{i+1}\leftarrow \text{IVC.P}(pk_{\mathsf{IVC}},i,(z_{0}),(z_{i}),\Pi'_{i})$
- $\mathcal{V}(vk,(i,z_{0},z_{i}),\Pi_{i})\to \left\{0,1\right\}$

## Cyclefold

Main observation is that having a separate circuit that gets folded and proved for every iteration is too expensive to be proven. Also, with a half-pairing curve cycle, using KZG-style commitment is not possible, hence, the SNARK becomes too expensive for both prover and verifier. Cyclefold, optimises the folding verifier on secondary curve by only computing few scalar multiplications (2 for Nova, and 1 for HN) inside the circuit and folding that on the first curve.

> [!info] Hypernova with Cyclefold cost profile:
> TODO

## ZK without zkSNARKs
Multi-folding NIVC verifier takes all running instances, and Witnesses, along with current instance and witness with respect to $pc$, and check that they satisfy. 

A simple solution is to use a zkSNARK, but it's prohibitively expensive for Spartan based snark. Now, you may ask why?
- Spartan verifier runs 2 sumchecks to verify that the argument matches ($G_A,G_B,G_C$), and another to verify that the value of the argument given by verifier is correct ($v_a,v_b,v_c$).
- To make spartan a zksnark, we have to transform sumcheck to be zero-knowledge by using homomorphic commitments, and then using schnorr based proofs to convince verifier that openings are correct.
- Verifier, then need to perform group scalar operations to open the commitment, and verify. Elliptic curve operations are expensive than field operations, and harder to perform on a blockchain.

To add ZK to IVC proofs, instead of using a zkSNARK, HN re-randomises the folded component of the proof after the last step: $U_{i},W_{i}$, by folding a random instance and running verifier checks for checking the folded instance inside the circuit, effectively proving in zero knowledge that prover folded the correct *randomized instance* without ever revealing the random instance.

Steps followed:
- Folds $(u,w)$ into $(U[\textsf{pc}], W[\textsf{pc}])$.
	- To hide $\textsf{pc}$ from verifier
- Fold randomised instances $(U_{r,i},W_{r,i})$ into each of $(U_i,W_i)$ to produce new randomised instances $(U',W')$
	- This reveals nothing about the witness $W$ to the verifier. $U',W'$ can be directly checked instead of original instance-witness pairs.
	- Prover produces a proof $\pi_{r}$ containing $(U',W')$ and proof of folding.
	> [!question]- What does proof of folding consists of? Why is it needed?
	> Needed because prover needs to convince verifier that folding of randomised instances were done correctly.
- 

## Lookup arguments for Nova

TODO