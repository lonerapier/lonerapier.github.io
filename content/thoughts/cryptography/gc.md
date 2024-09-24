---
title: "Garbled Circuit"
date: 2024-07-27:12:00:00
tags:
- cryptography
- mpc
---

Please read this [blog](https://vitalik.eth.limo/general/2020/03/21/garbled.html), if you've never heard of GC.

Originally proposed by [Yao82][Yao82] for Secure general [[mpc|2PC]] for arbitrary polynomial [[sfe|functions]].

![gc-and](/Excalidraw/gc-and.svg)

| a   | b   | AND |
| --- | --- | ------ |
| 0   | 0   | 0      |
| 0   | 1   | 0      |
| 1   | 0   | 0      |
| 1   | 1   | 1      |

AND gate: Two parties involved are **Garbler/Evaluator**: $A/B$ with individual inputs: $a,b$
- Fix an encryption function $\Pi:(\textsf{Gen,Enc,Dec})$, where $\textsf{Enc}:\mathcal{K\times M\to C},\textsf{Dec}:\mathcal{K\times C\to M}$.
- $A$ creates two key pairs $(K_{L}^{0},K_{R}^{0}),(K_{L}^{1},K_{R}^{1})$
- Create garbled table:
  
  | a           | b           | and                           |
  | ----------- | ----------- | ----------------------------- |
  | $K_{L}^{0}$ | $K_{R}^{0}$ | $c_{1}=E(K_{L}^{0},E(K_{R}^{0},0))$ |
  | $K_{L}^{0}$ | $K_{R}^{1}$ | $c_{2}=E(K_{L}^{0},E(K_{R}^{1},0))$ |
  | $K_{L}^{1}$ | $K_{R}^{0}$ | $c_{3}=E(K_{L}^{1},E(K_{R}^{0},0))$ |
  | $K_{L}^{1}$ | $K_{R}^{1}$ | $c_{4}=E(K_{L}^{1},E(K_{R}^{1},1))$ |
- Send $c_{1},c_{2},c_{3},c_{4}$ and $K^{b}_{L}$ to $B$
- $A,B$ perform 1-2 [[ot|OT]] for $K_{R}^{b'}$ for bit $b'$ of $B$.
- $B$ performs decryption of all ciphertexts, but only one of them is valid.
- Performs $a \land b$ and return output to $A$.

Security against:
- Semi-honest sender: sender only obtains output of OT and final $a\land b$. If OT is secure against malicious sender, then sender can only obtain information about a's input which can be inferred from output $a\land b$.
- Semi-honest receiver: obtains $c_{i}, K_{L}^{b},K_{R}^{b'}$ from $A$. for CPA secure encryption, all ciphertext are indistinguishable to each other. $K_{L}^b,K_{R}^{b'}$ is chosen uniformly, thus, receiver can't gain any information from input about $A's$ bit.

## General [[mpc|2PC]]

Above protocol can be used to perform general computation on boolean circuits. For each input wire, create Key pairs, and a garbled table for each gate as follows:

| a           | b           | AND                                           |
| ----------- | ----------- | --------------------------------------------- |
| $K_{L}^{0}$ | $K_{R}^{0}$ | $c_{1}=E(K_{L}^{0},E(K_{R}^{0},K_{out}^{0}))$ |
| $K_{L}^{0}$ | $K_{R}^{1}$ | $c_{2}=E(K_{L}^{0},E(K_{R}^{1},K_{out}^{0}))$ |
| $K_{L}^{1}$ | $K_{R}^{0}$ | $c_{3}=E(K_{L}^{1},E(K_{R}^{0},K_{out}^{0}))$ |
| $K_{L}^{1}$ | $K_{R}^{1}$ | $c_{4}=E(K_{L}^{1},E(K_{R}^{1},K_{out}^{1}))$ |

With ciphertexts and two decryption keys, one can decrypt to obtain key for the next intermediate gate. Final output wire decrypts to $0/1$. 

- Compute: function $f:\{ 0,1 \}^{n}\times \{ 0,1 \}^{n}\to \{ 0,1 \}^{*}$, with inputs $x,y$ with each party.
- Sender computes $4.n$ key pairs for $2n$ input wires.
- Garbles each gate and obtains $4.|G|$ ciphertexts, where $|G|$ denotes number of gates in the function.
- Sends $K_{1}^{x_{1}},\dots,K_{n}^{x_{n}}$ to $B$.
- Perform n $1-2$ OT to obtain $K_{1}^{y_{1}},\dots,K_{n}^{y_{n}}$.
- $B$ decrypts each gate to obtains keys for subsequent intermediate gate.
- $B$ learns final output $f(x,y)$ and sends it to $A$.

Refer to above protocol as $\Pi(C,x,y)$ with $C,x$ as sender's private input, and $y$ as evaluator's input. Round complexity of above protocol is same as complexity of underlying OT. Using a 2-round OT, one can securely compute any function where the circuit itself is private input to the evaluator.

More generally, a Garbling scheme $\mathcal{G}$ can be denoted using $(\textsf{Gb,En,ev,Ev,De})$:
- $\textsf{Gb}(1^{n},f)\to(C,e,d)$: circuit $C$, encoding information $e$, decoding information $d$.
- $\textsf{ev}$: plaintext circuit evaluator $ev(C,x)=f(x)$
- $\textsf{En}(e,x)\to X$: on input encoding information $e:(K_{i}^{0},K_{i}^{1})_{i\in[1,n]}$ and input $x\in\{ 0,1 \}^{n}$ gives garbled input $X$.
- $\textsf{Ev}(F,X)\to Z'$: garbled evaluator that on input takes garbled circuit and inputs, and gives garbled output.
- $\textsf{De}(d,Z')\to z$: takes the decoding information and gives plaintext output.

## Security

Against semi-honest adversary:

$$\Pr[\mathcal{D}(1^{n},\Pi(C,x,y),y,\mathcal{A})=1]-\Pr[\mathcal{D}(1^{n},S(C(x,y),y),\mathcal{A})=1]\leq \text{negl}(n)$$

For any given function $f:\{ 0,1 \}^{n}\times \{ 0,1 \}^{n}\to \{ 0,1 \}$ implemented by a boolean circuit $C$, multi-Encryption CPA secure $\text{Enc}$ function, protocol $\Pi$ is secure if $\forall x,y\in\{ 0,1 \}^{n}$, PPT adversary $\mathcal{A}$, there exists a PPT simulator $S$ such that no PPT distinguisher $\mathcal{D}$ can distinguish between real world and simulated protocol.

> Informally, there should exists a simulator which can output the transcript of real world protocol from a circuit output $z=C(x,y)$, and evaluator's input $y$.

First prove for a single gate, then since $\Pi$ can be used to build protocol for any polynomial function, the following proof holds.

$\Pi_{\mathcal{S}}$ algorithm:
- Run $\textsf{Gen}$ of Enc to derive $k_{1},\dots ,k_{5}$, where $k_{5}=k_{z}$ is the output key.
- Run $\mathcal{S}_{OT}$ on key $k_{3}$ to derive $y$ from the transcript.
- Garble the table as follows, and send permuted table.
	
	| AND                           |
	| ----------------------------- |
	| $E(k_{1},E(k_{3},k_{z}))$     |
	| $E(k_{1},E(k_{4}),00\dots00)$ |
	| $E(k_{2},E(k_{3},00\dots0))$  |
	| $E(k_{2},E(k_{4},00\dots0))$  |
- send output map as $\phi=(k_{z}:z, k_{r}:1-r)$, garbled table, and $k_{1}$ to $\mathcal{A}$.

Run 4 hybrid arguments and prove each's probability is negligible:
- Substitute OT in $\Pi$ to $\mathcal{S}_{OT}$ that on input $y$ from evaluator outputs $k_{b,y}$, i.e. the output of ideal OT.
	- This is secure due to security of OT protocol.
- Substitute one of the three remaining inputs to $00\dots0$, i.e. $E(k_{1},E(k_{4},00\dots0))$, but the rest of the ciphertexts remain same, $E(k_{i},E(k_{i+2},k_{c}^{0/1}))$
- Substitute next two ciphertexts.
	- Above hybrid proofs are secure, and can be proven using reduction proof. Adversary $\mathcal{A}'$ breaks Enc if distinguisher $\mathcal{D}^{*}$ is able to output correct bit.[^1]

Security against malicious adversary:

$$\Pr[\textsf{De}(d,\mathcal{A}(F,X))\not\in \{f(x),\perp\}]\leq \text{negl}(n)$$

*Authenticity*: any PPT adversary on input garbled circuit $F$ and garbled input $X$ can only output correct plaintext output or aborts. This implies that even an actively corrupted adversary cannot cheat.

- Actively corrupted evaluator: Evaluator performs OT after receiving garbled circuit $F$, i.e. it has access to ciphertexts corresponding to each wire, and wiring information. It can then change the inputs in such a way to receive keys for ciphertexts of its choice, and then aborts the protocol, getting to know about x's input during this phase.
	- How to prevent this? Change the order of ciphertext and OT, i.e perform OT before ciphertext communication.
- Actively corrupted garbler: Garbler can choose circuit $f$ such that it either outputs correct information or aborts (revealing partial information about Evaluator's inputs).
	- Can be handled by randomly evaluating multiple encryptions of circuit by garbler, i.e. let $C_{1},\dots,C_{k}$ be k different encryptions of same circuit. Evaluator chooses either all but one approach, or majority cut-and-choose approach to check if the circuit is same or not.
	- Can abort OT such that $\textsf{Ev}$ fails for a wrong key, and garbler learns partial information about Evaluator's input.

## Optimisations

- [Point-and-permute][BMR90]: prevent decryption of 4 ciphertext, and pass additional data in keys so that evaluator determines which ciphertext to decrypt.
	- Choose a select bit $p\in\{ 0,1 \}$ and set $p$ as LSB of keys: $K^{0}_{0}=K^{0}_{0}\lVert p,K_{0}^{1}=K^{1}_{0}\lVert (1\oplus p)$, similarly for $K_{1}^{\{ 0,1 \}}$.
	- Encrypt as $H(K_{i}^{\{ 0,1 \}},K_{j}^{\{ 0,1 \}})\oplus K_{k}^{\{ 0,1 \}}$.
	- Permute the table canonically by select bits: $\textsf{LSB}(K_{i}^{\{ 0,1 \}}),\textsf{LSB}(K_{j}^{\{ 0,1 \}})$.
	- Evaluator on receiving ciphertexts and key, checks LSB of key and choose the respective ciphertext from the table.
- [Free-XOR][KS08]: select a random difference delta $\Delta$, and create keys as $K^{0}=k,K^{1}=\Delta \oplus k$. Using this, XOR gates can be evaluated independently as $K_{L}^{0}\oplus K_{R}^{0}=K_{L}^{1}\oplus K_{R}^{1},K_{L}^{0}\oplus K_{R}^{1}=K_{L}^{1}\oplus K_{R}^{0}$.
	- For Free-XOR to be compatible with Point-and-permute (only when no extra select bit is chosen) $\textsf{LSB}(\Delta)=1$. 
- [Garbled Row-reduction 3][NPS99]: Eliminate one ciphertext by picking one key such that ciphertext for that key is 0. 
	- Suppose from Free-XOR, first key is $c_{0}=H(K_{L}^{1},K_{R}^{0})=H(K_{L}\oplus \Delta,K_{R})$. Set this ciphertext to 0, and xor all other ciphertext with $c_{0}$.
	- Evaluator can directly compute the key, if select bits evaluate to 0.
- [Garbled Row-Reduction 2][PSSW09]: Use polynomial interpolation instead of one-time decryption to get output keys.
	- For odd gates (OR, AND): ciphertexts corresponding to output bit 0 can be used to form a quadratic polynomial $P$. y-intercept of this polynomial gives $P(0)=c_{0}$. And extrapolating the polynomial to get 2 more points $P(5),P(6)$. Form a new polynomial $Q=(K_{1},P(5),P(6))$, y-intercept of this polynomial $Q(0)=c_{1}$.
	- For even gates (XOR, NXOR): create a linear polynomial $P$ using $(1,K_{1}),(4,K_{4})$. Set $K_{3}^{0}=P(0)$, set $P(5)$ in garbled table as per select permutation bit. Similarly, create polynomial $Q$ as $(2,K_{2}),(3,K_{3})$. Set $K_{3}^{1}=Q(0)$. set $Q(5)$ in remaining garbled table row.
- [Fle-XOR][KMR14]: have more [offset](https://crypto.stackexchange.com/a/35281) instead of one like Free-XOR. Using this, one can make a xor gate more flexible by converting offset on the fly. For a unary gate, let $A,A\oplus \Delta_{1}$ be the input. To convert this to $A^{*},A^{*}\oplus \Delta_{2}$, set as $A^{*}=E_{A}^{-1}(0^{n})$ and send $E_{A\oplus \Delta_{1}}(A^{*}\oplus \Delta_{2})$ as ciphertext. Evaluator on getting key using OT, can generate the key accordingly.
	- This can be generalised to binary gate using $\{ 0,1,2 \}$ ciphertexts depending on whether differences of key pairs $(A,A\oplus \Delta_{A}),(B,B\oplus \Delta_{B}),(C,C\oplus \Delta_{C})$ match. If none match, then $2$ ciphertexts need to be sent for XOR.
- [Half gate][ZRE15]: 
- [Garbled Gadgets][BMR16]:
- 

## References

- [CS355: Lecture 6](https://crypto.stanford.edu/cs355/18sp/lec6.pdf)
- [CS498: Lecture 22](https://courses.grainger.illinois.edu/cs498ac3/fa2020/Files/Lecture_22_Scribe.pdf)
- [Secure Computation Lecture Series](https://www.youtube.com/watch?v=idxotQw27RU&list=PLgMDNELGJ1Ca3l-xioOzN86BIZ2a0N8Ds&index=49)
- [Rafail's Lecture notes: 14](https://web.cs.ucla.edu/~rafail/PUBLIC/OstrovskyDraftLecNotes2010.pdf)
- [Orlandi's CryCom: Lecture 5](https://users-cs.au.dk/orlandi/crycom/5-GarbledCircuits.pdf)
- [A Gentle Introduction to Yao’s Garbled Circuits](https://web.mit.edu/sonka89/www/papers/2017ygc.pdf)
- [Ben Lynn notes: Yao's SFE](https://crypto.stanford.edu/pbc/notes/crypto/yao.html)
- [Mina Book: Garbled Circuits](https://o1-labs.github.io/proof-systems/fundamentals/zkbook_2pc/gc.html)
- [Mike Rosulek's talk on GC optimisations](https://web.engr.oregonstate.edu/~rosulekm/pubs/gc-survey-talk.pdf)

[BHR12]: <https://eprint.iacr.org/2012/265.pdf>
[LP06]: <https://eprint.iacr.org/2004/175.pdf>
[BMR90]: <https://dl.acm.org/doi/pdf/10.1145/100216.100287>
[KS08]: <https://download.hrz.tu-darmstadt.de/pub/FB20/Dekanat/Publikationen/TRUST/KS08XOR.pdf>
[NPS99]: <https://dl.acm.org/doi/pdf/10.1145/336992.337028>
[PSSW09]: <https://eprint.iacr.org/2009/314.pdf>
[KMR14]: <https://eprint.iacr.org/2014/460.pdf>
[ZRE15]: <https://eprint.iacr.org/2014/756.pdf>
[BMR16]: <https://dl.acm.org/doi/pdf/10.1145/2976749.2978410>

[^1]: <https://courses.grainger.illinois.edu/cs498ac3/fa2020/Files/Lecture_23_Scribe.pdf>