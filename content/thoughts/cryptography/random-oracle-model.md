---
title: Random Oracle Model
date: 2024-06-09
tags:
- cryptography
- theoretical
- foundations
---

- What even is a *model*?
	- A model consists of some standard rules that any scheme satisfying the model has to follow. When proving any cryptographic protocol, these rules are assumed and thus, scheme's security is proven secure in that environment.
- Why create a new model for hash functions?
	- When proving any protocol that uses multiple cryptographic schemes, security has to be analysed with every case in the schemes, thus this creates a rigorous proof that is harder to formulate and understand.
	- Also, for example: schemes using hash functions cannot be proven secure based solely on the assumption of hash being collision resistant.
	- That's why **idealised/standard models** are created to formulate proofs that might not exhibit all practical properties but still has enough to achieve some level of confidence on the soundness of the scheme from a proof in the standard model.
- What's random oracle Model?
	- A black box that emulates a uniform function, i.e. on input, gives a totally random independent output. Schemes that require any kind of randomness is theoretically proven secure in the ROM and then, during real-world scenario, a Hash function $H$ is used.
- Are there schemes that are secure in ROM but unsecure when instantiated with Hash?
	- there surely are. TODO: find such schemes.
	- Schemes that are proven secure in ROM give confidence that there are no inherent design flaws in the scheme but since, deterministic turing machine can never simulate a truly random function, real-world instantiation can't be proven secure.
- How does the oracle behave?
	- Oracle sits as a black box, i.e. internal structure is unknown to every entity involved in the scheme.
	- Any entity can query the oracle by giving a x-bit input and receiving y-bit output.
	- Queries can be private/public depending on the requirement of the scheme.
	- Oracle is consistent, i.e. $x\to y$ is always true.
- How the oracle's function is instantiated?
	- $\text{one-shot}$: where all the input-output pairs are matched in one go when defining the function.
	- $\text{on-the-fly}$: when $f$ on getting input $x$, checks all previous inputs and if no repeated entry is found, assigns a new uniform $y\in \{ 0,1 \}^{l}$ from the range and assigned to $x$.
- What's the difference between function in random oracle and truly random generator used during PRGs?
	- PRGs are instantiated with secret keys and outputs numbers that look like outputs from pseudorandom distributions and thus, pseudorandomness comes from the key while uniform output of random oracle needs to be public for adversaries as well.
	- Thus, to an observer, a PRG's output looks like from that of a uniform string when $x$ is unknown, but for random oracle, even though $x$ is known, output of oracle is still totally random.

> [!info] Extractability and Programmability
> - *Extractability*: when in a reduction proof a party runs $\mathcal{A}$ as a subroutine and simulates random oracle for $\mathcal{A}$, i.e. when $\mathcal{A}$ queries $x$ to $\mathcal{O}$, reduction can see this query.
> - *Programmability*: when $\mathcal{A}$ queries $\mathcal{O}(x)$, then reduction can set a value to $\mathcal{O}(x)$, only condition as output being uniform.

- PRG: output of random oracle should be indistinguishable from uniform string of length $l_{out}(n)$ to the adversary $\mathcal{A}$.
- Hash function
- PRF

Problems in ROM:
- scheme proved secure in ROM can't be proven secure in real-world scenario when used with a hash function. This is due **lack of formal definition** how any scheme should behave when used in place of random oracle.
- No hash function can ever act as a truly random function, as any adversary knowing all the inputs can easily determine all the outputs.
- Due to the deterministic nature of hash function, **Extractability doesn't hold** in real-world where reduction has knowledge of query input made by $\mathcal{A}$, because $\mathcal{A}$ can directly query hash itself.
- **Programmability** is totally **useless**, because reduction can't choose output of an input on-the-fly, and output is already determined for a hash function.

Benefits:
- Allows creation of more-efficient schemes which are proven sound in ROM.
- Proves in ROM is better than having no proof in standard model.
- Most of the attacks that are possible when a scheme proven sound in ROM is used in real-world would be due to the security of inner hash function, and if a secure enough hash function is used, then security of the scheme won't be affected.
- There are no shortfalls of secure hash functions, and when security of hash function is affected, can be easily replaced with another.

## References

- [Intro to Modern Cryptography: Chapter 6](https://www.cs.umd.edu/~jkatz/imc.html)