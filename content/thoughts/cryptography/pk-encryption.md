---
title: "Public Key Encryption"
date: 2024-07-15:12:00:00
tags:
- cryptography
---

[[elgamal-pke]]
[[rsa]]

TODO:
- [ ] Probabilistic encryption
	- [ ] GM82
	- [ ] El-gamal
	- [ ] Pailier
- [ ] trapdoor permutation
- [ ] 

Public Key encryption scheme: $\textsf{Gen,Enc,Dec}$:
- $\textsf{Gen}(1^{n})\to (sk,pk)$: public key defines the message space $\mathcal{M}_{pk}$
- $\textsf{Enc}(sk,m)\to c$: takes secret key and message $m\in\mathcal{M}_{pk}$ and outputs a ciphertext $c$.
- $\textsf{Dec}(pk,c)\to m$

### CPA security

> [!info] eavesdropping indistinguishability experiment $\textsf{PubK}_{\mathcal{A},\Pi}^{\textsf{eav}}(n)$:
> - $\textsf{Gen}(1^{n})\to sk,pk$
> - $\mathcal{A}$ is given pk, outputs a pair of messages $m_{0},m_{1}$
> - uniform bit $b$ is chosen and challenge ciphertext $c\leftarrow \textsf{Enc}_{sk}(m_{b})$ is given to $\mathcal{A}$.
> - $\mathcal{A}$ outputs bit b'.
> - experiment succeeds if $b'=b$ and outputs 1.

$$\Pr[\textsf{PubK}_{\mathcal{A},\Pi}^{\textsf{eav}}=1]\leq \frac{1}{2}+\text{negl}(n)$$

> [!info] No Deterministic public-key encryption is CPA-secure.
> Proven in [GM82](https://doi.org/10.1016/0022-0000(84)90070-9), that any information that a adversary is able to gain about plaintext from ciphertext, it can gain that knowledge without ciphertext. Thus, any protocol designed on deterministic PK encryption is insecure. This includes, RSA without padding, block ciphers without IV. 
> 
> ==TODO==, read the paper in more detail. 

CPA security for multiple encryption:

Prove that any CPA secure PK encryption scheme is also secure for multiple encryptions (adversary is given access to LR oracle $\textsf{LR}_{pk,b}(\cdot,\cdot)$ that encrypts left or right message depending on the bit).

Informal proof using reduction approach:
- Create a new experiment $\textsf{LR-cpa2}$, that allows maximum 2 oracle queries.
- $\mathcal{A}$ selects two sets of message pairs: $m_{1,0},m_{1,1}$ and $m_{2,0},m_{2,1}$, and gets back ciphertext $c_{1},c_{2}$ that can be either equal to $m_{1,0},m_{2,0}$ or $m_{1,1},m_{2,1}$ from oracle, and need to differentiate between the two.
- Let $\overrightarrow{C}_{0}$ denote distribution of messages in first pair, and $\overrightarrow{C}_{1}$ denote second pair.
- Prove: $\Pr[\mathcal{A}(pk,m_{1,0},m_{2,0})=1]-\Pr[\mathcal{A}(pk,m_{2,0},m_{2,1})=1]\leq \text{negl}(n)$.
- Create a new adversary $\mathcal{A}'$ that simulates oracle for $\mathcal{A}$, but fixes first message, i.e. $\mathcal{A}$ receives either $m_{1,0},m_{2,0}$ or $m_{1,0},m_{2,1}$. Let this distribution be denoted as $\overrightarrow{C}_{01}$
- If $\mathcal{A}$ can distinguish between $\overrightarrow{C}_{0},\overrightarrow{C}_{01}$, then it can distinguish between $\overrightarrow{C}_{01},\overrightarrow{C}_{1}$. By simple linear algebra, it can distinguish between $\overrightarrow{C}_{0},\overrightarrow{C}_{1}$.
- Due to CPA security of $\Pi$, view of $\mathcal{A}$ running as a subroutine by $\mathcal{A}$ will be equal to that of $\textsf{PubK}_{\mathcal{A},\Pi}^{\textsf{LR-cpa}}$. So, if $\mathcal{A}'$ is able to distinguish between, $m_{2,0},m_{2,1}$ due to $\mathcal{A}$, then it will break CPA security. Since, this probability is negligible, $\mathcal{A}$ can't distinguish.

Formal proof using hybrid argument approach:
- TODO: need to read more about hybrid argument approach, but the experiment is again choosing an adversary $\mathcal{A}'$ that is able to break CPA security of $\Pi$ if $\mathcal{A}$ outputs correct bit.
- let $t$ be the maximum oracle queries $\mathcal{A}$ can make, and t is polynomially bounded.
- $\mathcal{A}'$ chooses a random index: $1\leq i\leq t$.
- For jth encrpytion:
	- if j<i, then send $c_{j}\leftarrow Enc(m_{j,0})$, else if $j>i\implies Enc(m_{j,1})$
	- if j=i, then output $m_{i,0},m_{i,1}$, receive challenge ciphertext $c$, send to $\mathcal{A}$
- $\mathcal{A}'$ outputs $b'$ by $\mathcal{A}$. experiment succeeds if $b'=b$.
- Now, using a hybrid argument prove that probability of $\Pr[\mathcal{A}'(\cdot)=1]=\frac{1}{2}\cdot\Pr[\mathcal{A}'(\cdot)=1|b=0]+\frac{1}{2}\cdot\Pr[\mathcal{A}'(\cdot)=1|b=1]$

### CCA security

analogous to CCA security for [[symmetric-cryptography#CCA security]], in PK encryption, adversary gets access to a decryption oracle and can query any ciphertext other than the challenge ciphertext. It can be proven that any PK encryption that's CCA secure for single encryption is CCA secure for multiple encryption as well.

Examples where CCA encryption is needed:
- In a private auction, where an adversary can look at other bids as ciphertext, and instead send ciphertext $c'=\text{Enc}(m+1)$. This property is known as *malleability*.
- modifying an encrypted message $c:=\text{Enc}(m)\to c'$. If it receives any error, or a response quoting $m'$, then $\mathcal{A}$ has now decrypted c'.

## KEM

set of algorithms:
- $Gen(1^{n})\to(pk,sk)$
- $\text{Encaps}_{pk}(1^{n})\to(c,k)$: gives a uniform key $\in \{ 0,1 \}^{n}$
- $\text{Decaps}_{sk}(c)\to k$

can be combined with a private key encryption to create a hybrid encryption scheme: $\Pi_{\textsf{hy}}:\Pi_{\textsf{KEM}},\Pi'$:
- $Gen(1^{n})\to(sk,pk)$
- $\text{Enc}'_{pk}(m)\to(c,c')$: $(c,k)\leftarrow\text{Encaps}_{pk}(1^{n})$, and $c'\leftarrow\text{Enc}_{k}(m)$
- $\text{Dec}'(c,c')\to m$: $\text{Decaps}_{sk}(c)\to k\enspace;\enspace \text{Dec}_{k}(c')\to m$.

security

> If KEM is CPA secure, and $\Pi$ is EAV-secure, then $\Pi'$ is CPA secure PK encryption scheme.

Proof: TODO

> If KEM is CCA secure, and $\Pi$ is CCA secure, then $\Pi'$ is CCA secure encryption scheme.

CCA security for KEM: $\Pr[\textsf{KEM}_{\mathcal{A},\Pi}^{\textsf{cca}}(n)]$:
- $\textsf{Gen}(1^{n})\to(pk,sk)\enspace;\enspace\textsf{Encaps}(1^{n})\to(c,k\in\{ 0,1 \}^{n})$
- $b\in\{ 0,1 \}$ is chosen, if $b=0\implies \hat{k}=k$ else $\hat{k}\in\{ 0,1 \}^{n}$
- $\mathcal{A}$ is given $(pk,c,\hat{k})$, and access to $\textsf{Decaps}_{sk}(\cdot)$ oracle, but can't query decaps for challenge ciphertext $c$ itself.
- $\mathcal{A}\to b'\in\{ 0,1 \}$, if $b=b$ output 1, else 0.

$$\Pr[\textsf{KEM}_{\mathcal{A},\Pi}^{\textsf{cca}}(n)=1]\leq \frac{1}{2}+\text{negl}(n)$$.

- If $\Pi'$ is not CCA secure then, adversary can just modify ciphertext c', as $c'\oplus m'$.
- For $\Pi_{KEM}$ to be CCA secure, give $\mathcal{A}$ access to decaps oracle which allows it to decapsulate any ciphertext and get key of its choice.

### ElGamal KEM

- $\textsf{Gen}(1^{n})\to(pk,sk)$: Choose $\mathbb{G},g,q$, then choose a uniform $x\in\mathbb{Z}_{q}$, set $h:=g^{x}$. Specify a function $H:\mathbb{G}\to \{ 0,1 \}^{l(n)}$. Outputs $pk=(\mathbb{G},g,q,h,H),sk=(\mathbb{G},g,q,x)$.
- $\textsf{Encaps}(pk)$: choose a $y\in\mathbb{Z}_{q}$, output $c=g^{y}$ and calculate $k=H(h^{y}))$
- $\textsf{Decaps}(sk,(c,k))$: compute key as $k:=H(c^{x})$.

Above model is CPA secure, if DDH problem is hard.

### [[diffie-hellman|CDH]] based KEM in [[random-oracle-model|ROM]]

If $H$ is modelled as a random oracle, then above KEM is CPA secure, if CDH problem is hard.

> CDH is a stronger security assumption that deals with *extractability*, i.e. adversary has to find out $h^{y}$.

### CCA security for Hybrid encryption

> [!info] Gap-CDH assumption
> For any adversary, it remains infeasible to compute $g^{xy}$ even when given access to a oracle $\mathcal{O}_{y}(U,V)$ that returns 1 only when $V=U^{y}$. Informally, CDH problems remains hard even when an oracle that solved DDH is given.

ElGamal KEM as stated above is CCA secure if the Gap-CDH assumption is hard.

Thus, to create a CCA secure hybrid encryption, one needs to use a CCA private-key encryption scheme. Alternatively, a CPA secure encryption scheme, and CPA secure MAC leads to a CCA secure PK scheme.

