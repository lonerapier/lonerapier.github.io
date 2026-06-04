---
title: "Symmetric Cryptography"
date: 2024-06-18:12:00:00
tags:
- cryptography
---



> [!abstract] Most of these notes are taken while reading Chapter 3 of Introduction to Modern Cryptography and you'll notice that terms, definitions and theorems are directly adapted from the source. It's advised to read the original source than these incomplete notes.

Computational Security: in contrast to *Perfect Secrecy*, computational security allows for **small probability** of leaking information and computational limits on the attacker (**efficient adversaries**).

A scheme is $(t,\epsilon)-$secure if an attacker can break the scheme in at most time $t$ with probability at most $\epsilon$.

**Asymptotic Approach**: rather than concrete-security approach, most cryptographic protocols' security are defined by security parameter $\lambda$, and running time of adversary, success probability are functions of security parameter, rather than concrete values.
- Efficient adversaries run in polynomial time $\lambda$
- $\text{negl}(\lambda)$: refers to the small success probabilities, less than inverse of $\lambda$.

PPT: probabilistic polynomial-time.
Secure scheme: If a PPT adversary succeeds in breaking the scheme with *negl* probability.

## Asymptotic approach

Two things to consider:

- **polynomial-time algorithms**: any function is polynomially bounded if for any constant $c$, $f(n)<n^{c}$ for all n. an algorithm runs in polynomial time, if for a polynomial $p$ and input $x\in \{ 0,1 \}^{*}$, it terminates in $p(|x|)$ steps.
- **negligible function**: a function $f$ is negligible if for every polynomial $p$, there exists $N$ such that for every $n>N$, $f(n)< \frac{1}{p(n)}$, or from the definition of polynomial function, for all constants $c$, there exists $N$ such that for every $n>N$, $f(n)<n^{-c}$.

Cryptographic algorithms are probabilistic (randomised), that's why attackers are allowed to be probabilistic as well. This gives attackers more powers and allows to model more practical attacks.

> [!info] *probabilistic (randomised)* algorithms are one that use randomness in their logic. Normally, randomness is used in the input.

TODO: explain some examples of negligible functions, and why some functions are preferred over other across different range of inputs.

Main importance of negligible functions is that they obey closure properties:
- $\text{negl}_{3}(n)=\text{negl}_{1}(n)+\text{negl}_{2}(n)$ is also negligible.
- $\text{negl}_{4}(n)=p(n)\cdot \text{negl}_{1}(n)$ is also negligible. This means that repeating an experiment that repeats a negligible event any number of times still succeeds with negligible probability.

> [!important] A scheme is *secure* if for every PPT adversary $\mathcal{A}$, and $\forall\space p \space \exists \space N$ such that for all $n>N$, the probability of attack's success is less than $\frac{1}{p(n)}$.

## Computationally Secure encryption

- Define encryption as $\textsf{Gen,Enc,Dec}$ and model an adversary $\mathcal{A}$ with additional power being *eavesdropping*, i.e. it can look at all the messages as an observer, and the adversary is *efficient* as explained in previous section.
- Define an indistinguishability experiment $\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}$ where $\Pi$ is a encryption scheme and $\mathcal{A}$ is a PPT adversary, in which adversary chooses messages $m_{0},m_{1}$ and receives encryption and has to output a bit $b'$. According to the definition, $\Pi$ is computationally secure if $\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}(n)=1]\leq \frac{1}{2} + \mathsf{negl}(n)$.
- Define *Semantic Security* as a slightly weaker notation of Perfect secrecy. Now, define that the notion of indistinguishability is similar to semantic security by two reductions:
	- probability of adversary $\mathcal{A}$ determining the $i$th bit of message $m$ from $\mathsf{Enc}(m)$ is less than $\frac{1}{2}+\mathsf{negl}(n)$, i.e. it's same as adversary randomly guessing the bit.
	- probability of adversary $\mathcal{A}$ determining the function $f$ on $m$, regardless of its distribution $\mathcal{D}$, from $\mathsf{Enc}(m)$ is equal to adversary $\mathcal{A}'$ computing $f(m)$ without knowledge of ciphertext.
- Define Semantic security as probability of determining $f(m)$ from $\mathsf{Enc}(m)$ and external knowledge $h(m)$, where $m$ is sampled from PPT algorithm $\textsf{Samp}$, equal to probability of adversary $\mathcal{A}'$ computing $f(m)$ from $h(m)$.
- Now, any encryption is EAV-secure iff it is semantically secure in presence of eavesdropper.

## Semantically secure encryption

- having defined semantic security, we're now interested in realising a encryption scheme
- for that we need randomisation and true random generators are difficult to model computationally, that's why in cryptography pseudorandom numbers are used.

- to construct an EAV-secure encryption scheme using [[prg,prf,prp#PRG|PRG]], we need help of reduction proofs.
- **Reduction Proofs**: To prove that problem X is hard, we reduce the notion of security in problem X to already hard problem X', and prove that if X is solved, this means X' is solved, this leads to contradiction.
	- Model adversary A for X which simulates attack for adversary A' on X' which A' succeed with probability $\epsilon(n)$, and outputs directly related to the output of X' with probability $\epsilon(n)/p(n)$.
	- Now, if $\epsilon(n)$ isn't negligible, neither is $\frac{\epsilon(n)}{p(n)}$, this means, A' can break X' if A breaks X. but according to our assumption $\epsilon(n)$ is negligible.
- encryption scheme using prg uses keystream as pad generated by PRG and encryption is done using XOR cipher. This is unconditionally secure if $k$ is truly random by one-time pads (OTP).
- To prove it's EAV-secure, we reduce the problem by introducing a distinguisher $D$ that simulates attack for adversary $\mathcal{A}$ on encryption scheme $\Pi$.
- D only succeeds when $\mathcal{A}$ succeeds, $\Pr[D(G(k))=1]=\Pr[\mathsf{PrivK}_{\mathcal{A},\Pi}^{\mathsf{eav}}=1]$
- using one time pad, we identify that if encryption is done on a uniform string using one time pad, probability is exactly equal to 1/2
- since, G is a PRG, there is a negligible probability of success in distinguishing pseudorandom string to uniform string, this equates to encryption $\Pi$ directly, and thus, it also has slightly higher probability than 1/2.
- define multiple encryption scheme, i.e. eavesdropper shouldn't be able to distinguish even when same message is encrypted by the scheme.

## Chosen plaintext attacks

- multiple encryption indistinguishability refers to probability of adversary to differ between two sets of ciphertexts generated using list of messages chosen by $\mathcal{A}$.
- It's not possible to have multiple encryption indistinguishability if encryption is stateless and deterministic.
- **Chosen Plaintext Attack (CPA) security**: only difference with EAV-security is key is derived before adversary chooses messages, and adversary has access to encryption oracle.
	- Encryption oracle $\textsf{Enc}_{k}(\cdot)$ can be used by adversary to get ciphertext for any message, and the adversary can interact with oracle as many times as it likes.
- **CPA indistinguishability experiment** $\textsf{PrivK}_{\mathcal{A},\Pi}^{cpa}(n)$:
	- key is chosen by running $\textsf{Gen}(1^{n})$
	- $\mathcal{A}$ is given oracle access to $\textsf{Enc}_{k}(\cdot)$ chooses messages $m_{0},m_{1}$
	- uniform bit $b\in \{ 0,1 \}$ is chosen and $c\leftarrow \textsf{Enc}_{k}(m_{b})$ is given to $\mathcal{A}$
	- adversary outputs bit $b'\in \{ 0,1 \}$, and succeeds if $b'=b$.
- **CPA security**: prob. of success is $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{cpa}}=1]\leq \frac{1}{2}+\textsf{negl}(n)$
- CPA security for **multiple encryption**: $\textsf{LR}_{k,b}(\cdot,\cdot)$ oracle access is given to $\mathcal{A}$, which on input two messages $m_{0},m_{1}$ sends encryption of $m_{b}$ where b is uniform bit chosen at the beginning of experiment
	- CPA-secure for multiple encryptions if $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{LR-cpa}}=1]\leq \frac{1}{2}+\textsf{negl}(n)$.
- CPA security for multiple encryption means CPA security for single Encryption
- In fact, encryption that are CPA secure are also CPA secure for multiple encryption. **Prove this.**
- Above is not true for EAV-security, i.e. encryption that are EAV-secure might not be EAV-secure for multiple encryption. Perfect example is one-time pads.

## CPA security from PRF

- A CPA-secure encryption function can be formed using any [[prg,prf,prp#Pseudorandom functions|PRF]] by just XORing the input message with output of PRF where seed for PRF is chosen uniformly. and is padded with encrypted output to form ciphertext, i.e. $c:= \langle r,F_{k}(r)\oplus m \rangle$, and decrypted by again XORing $m:=F_{k}(r)\oplus s$
- To prove this scheme is CPA secure, we need to prove that $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{cpa}}=1]\leq \frac{1}{2}+\textsf{negl}(n)$
- Common template used throughout proving encryption schemes secure, is to first consider hypothetical true-random variant of the scheme and prove using reduction proofs that adversary doesn't gain any advantage, and then add pseudorandomness to do probabilistic analysis.
- prove in two steps: first define a distinguisher $D$ that will simulate CPA for adversary $\mathcal{A}$, and use it's output to determine whether encryption oracle $\mathcal{O}$ is pseudorandom, i.e. $F_{k}$ or chosen uniformly from $\textsf{Func}_{n}$.
	- i.e. Prove $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{cpa}=1]-\Pr[\textsf{PrivK}_{\mathcal{A},\widetilde{\Pi}}^{cpa}=1]\leq \textsf{negl}(n)$
- Let's explain how $D$ works. $D$ has access to encryption oracle $\mathcal{O}$.
	- Setup $\mathcal{A}(1^{n})$. $\mathcal{A}$ queries $\mathcal{O}$ for message $m\in\{ 0,1 \}^{n}$. Choose a uniform $r\in \{ 0,1 \}^{n}$ and obtain $\langle r,y \oplus m \rangle$.
	- $\mathcal{A}$ chooses challenge messages $m_{0},m_{1}$. $D$ choose uniform bit $b\in \{ 0,1 \}$ and queries $\mathcal{O}(m_{b})$, returns the ciphertext to $\mathcal{A}$.
	- $\mathcal{A}$ continue asking encryption oracle queries until it outputs bit $b'$
- There can be two scenarios:
	- When $\mathcal{O}'s$ function is pseudorandom, $\mathcal{A}'s$ view as a subroutine in $D$ is identical to CPA experiment of a PRF. Thus, $\Pr[D^{F_{k}(\cdot)}(1^{n})=1]=\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{cpa}}(n)=1]$
	- When $\mathcal{O}'s$ function is random function $f$, then $A's$ view is identical to CPA experiment of random function. Thus, $\Pr[D^{f(\cdot)}(1^{n})=1]=\Pr[\textsf{PrivK}_{\mathcal{A},\widetilde{\Pi}}^{\textsf{cpa}}(n)=1]$
	- Thus, by assumption that $F$ is Pseudorandom, we establish that $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{cpa}=1]-\Pr[\textsf{PrivK}_{\mathcal{A},\widetilde{\Pi}}^{cpa}=1]\leq \textsf{negl}(n)$.
- Next step is to prove that $\Pr[\textsf{PrivK}_{\mathcal{A},\Pi}^{cpa}=1]\leq \frac{1}{2}+\frac{q(n)}{2^{n}}+\textsf{negl}(n)$.
	- Left as exercise for future me.

## Ciphers and Mode of Operation

Encrypt arbitrary long messages using symmetric encryption primitives. Two of them are:

- Stream Ciphers
- [[block-ciphers|Block Ciphers]]

### [[stream-ciphers|Stream Ciphers]]

- Instantiation of PRNGs using stream ciphers.
- Deterministic algorithms: $\textsf{Init(s,IV)}\to st,\textsf{Next(st)}\to(y,st')$
- support arbitrary length messages using $\textsf{GetBits}(st,1^{l})$
- a stream cipher without an IV is a PRG.
- stream cipher with an PRG is a PRF, such that $F_{s}^{l}(IV)\xlongequal{def}\textsf{GetBits}(\textsf{Init}(s,IV),1^{l})$
- converse can be also true, i.e. creating stream ciphers using PRF, by concatenating $IV$ with counters.
- Modes of Operation:
	- Synchronised mode: stateful mode, doesn't need an IV
	- Unsynchronised mode: stateless mode

## CCA security

Chosen-Ciphertext attack where the adversary makes the receiver decrypt a ciphertext of its own choice and in turn learns something original message m or key k. This is what is meant by *secrecy* in cryptographic land.

[[symmetric-cryptography#CPA security from PRF|CPA security]] and [[mac|Message authentication]] deal with message *integrity* where attacker isn't able to modify the ciphertext, and if it does, receiver will accept with only negligible probability.

Let's understand some attacks possible when adversary has access to decrypt a ciphertext of it's choice, and learns something about the original message, sometimes the complete message.
- [Padding oracle attack](https://en.wikipedia.org/wiki/Padding_oracle_attack): most of [[block-ciphers#Modes of Operation| block cipher mode of operation]] use [padding](https://en.wikipedia.org/wiki/Padding_(cryptography)) to turn plaintext into multiple of cipher's block size. Most common padding used is PKCS#7 which appends a byte equal to number of bytes required to turn plaintext into a multiple, that number of times. CBC mode is prone to padding oracle attack, where attacker can learn complete message.
- CAPTCHA: user can learn captcha's original image by using captcha server as oracle.

> [!info] **CCA indistinguishability experiment** $\textsf{PrivK}_{\mathcal{A},\Pi}^{\textsf{cca}}(n)$:
> - Key $K$ is generated by $\textsf{Gen}(1^{n})$
> - $\mathcal{A}$ has access to encryption $\text{Enc}(\cdot)$ and decryption oracle $\text{Dec}(\cdot)$.
> - $\mathcal{A}$ outputs pair of messages $m_{0},m_{1}$
> - uniform bit $b\in\{ 0,1 \}$ is chosen and challenge ciphertext $c\leftarrow \text{Enc}_{k}(m_{b})$ is computed and given to $\mathcal{A}$
> - $\mathcal{A}$ continues to submit encryption and decryption queries to the oracle, but can't submit queries to chosen messages, i.e. $m_{0},m_{1}$.
> - $\mathcal{A}$ outputs bit $b' \in \{ 0,1 \}$
> - experiment outputs 1 if $b'=b$, else 0

$$
\Pr[\textsf{PrivK}^{\textsf{cca}}_{\mathcal{A},\Pi}=1]\leq \frac{1}{2}+\text{negl}(n)
$$

As demonstrated in Padding oracle attack, that any encryption scheme that satisfies **CCA security** has to be **non-malleable**, i.e. any change in the ciphertext shouldn't directly correspond to change in the plaintext as this allows attacker to gain insights about original message.

[[owf]]

## References

- [Introduction To Mathematical Cryptography : Chapter 8.10](https://www.math.brown.edu/johsilve/MathCryptoHome.html)
- [Introduction to Modern Cryptography: Section 2](https://www.cs.umd.edu/~jkatz/imc.html)
- [CS276 Luca Trevisan's lecture notes](https://lucatrevisan.wordpress.com/2009/01/20/cs276-lecture-1-introduction/)

[GL89]:<https://dl.acm.org/doi/pdf/10.1145/73007.73010>
[BM82]:<https://pages.cs.wisc.edu/~cs812-1/blum.micali82.pdf>
[Yao82]: <https://www.di.ens.fr/users/phan/secuproofs/yao82.pdf>
[GGM86]: <https://dl.acm.org/doi/pdf/10.1145/6490.6503>