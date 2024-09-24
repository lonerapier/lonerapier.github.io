---
titile: "Block Ciphers"
date: 2024-06-18:12:00:00
tags:
- cryptography
---

alternative to [[stream-ciphers|Stream Ciphers]], used in [[symmetric-cryptography|Symmetric Encryption]], pseudorandom generators.


- Block ciphers are another name for Pseudorandom permutation.
- can create stream ciphers with IV from block ciphers

### Modes of Operation

- ECB:
	- deterministic, so not CPA-secure. Not even EAV-secure. Try **proving** this, if you forgot.
	- can be parallelised easily.
- CBC: cipher block chaining
	- IV chosen uniformly and $c_{0}=IV$, then $c_{i}=F_{k}(c_{i-1} \oplus m_{i})$
	- sequential in nature, although decryption can be parallelised as inputs to block cipher's encryption is just the ciphertext
	- If $F$ is PRP, then CBC is CPA-secure. Can be proven by equating $F$ with a PRF and a similar proof that was done in CPA-[[symmetric-cryptography#CPA security from PRF|secure encryption from PRF]].
	- chained CBC, where ciphertext is chained for subsequent encryptions.
		- But it's not CPA secure, as attacker can distinguish between PRF and uniform random function by choosing appropriate text in second encryption.
- OFB: output feedback
	- IV is chosen uniformly and $y_{0}:=IV$, then $y_{i}=F_{k}(y_{i-1})$ and $c_{i}=y_{i} \oplus m_{i}$.
	- this allows $F_{k}$ to not be invertible, and can be simply a PRF.
	- Due to this, OFB can be used to encrypt plaintext of arbitrary lengths and not have to be multiple of block length.
	- pseudorandom stream can be preprocessed and then encryption can be really fast.
	- it's stateful variant can be used to instantiate stream cipher's synchronised mode of operation and is secure.
- CTR: counter mode
	- can be viewed as unsynchronised stream cipher mode, where $y_{i}=F_{k}(\langle IV \parallel i\rangle)$ for binary string $i = 1,2,\dots,$ and $c_{i}=y_{i}\oplus m_{i}$.
	- this again allows $F_{k}$ to not be invertible and can be instantiated with a PRF.
	- can be fully parallelised.
	- can be proven CPA secure if $F$ is PRF. TODO.
		```mermaid
		flowchart TB
		IV1[IV]---->IV2[IV]
		IV3["IV||1"]-->Fk1[F_k]-->xor1["⨁"]-->c1
		m1-->xor1
		IV4["IV||2"]-->Fk2[F_k]-->xor2["⨁"]-->c2
		m2-->xor2
		```
- GCM mode: Galois counter mode
	- also used to create [[mac|MAC]]
	- 
### Block cipher considerations

- CBC, OFB, CTR modes need uniform IV in order to be CPA secure, otherwise adversary can learn information about messages.
- IV needs to be large enough to encrypt multiple messages. For example, in CTR mode with $\frac{3n}{4}$ length IV, probability of repeating IV for $n=64$ is $2^{24}$ (Not that large with today's standards).
- CTR assumes $F$ to be PRF, but most block ciphers' block functions are PRPs which are proven to be indistinguishable from PRF with large block length, but invoking PRP each time incurs a security loss. TODO, prove this.
- IV repetitions break OFB and CTR mode trivially.
- if IV is not uniform, i.e. IV predictions happen, then CBC mode breaks, although CTR mode is secure.

## Nonce-Based encryption

- uses non-repetitive nonce during encryption and decryption to prevent against 
- can be instantiated from CTR mode by using non-repetitive nonce instead of IV
- CPA security is assumed from CPA security of encryption based on PRF by defining a modified oracle $LR(\cdot,\cdot,\cdot)$ that takes a nonce, and two messages, and returns $\operatorname{Enc}_{k}(\textsf{nonce},m_{b})$

## References

- [A graduate course in applied cryptography: Chapter 4](https://toc.cryptobook.us/)
- [Handbook of applied cryptography: Chapter 7](https://cacr.uwaterloo.ca/hac/)
- [Joy of Cryptography: Chapter 8](https://joyofcryptography.com/)
- [Introduction to Cryptography by Mihir Rogway: Chapter 3](https://cseweb.ucsd.edu/~mihir/papers/br-book.pdf)
- [block ciphers](https://upf-cryptography.github.io/block-ciphers.html)
- [Mode of operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)
- [AEGIS](https://eprint.iacr.org/2013/695)
	- [IETF tracker](https://datatracker.ietf.org/doc/draft-irtf-cfrg-aegis-aead/)
- [Understanding Cryptography by Cristof Paar & Jan Pelzl & Tim Güneysu: Chapter 3, 4](https://www.cryptography-textbook.com/)
