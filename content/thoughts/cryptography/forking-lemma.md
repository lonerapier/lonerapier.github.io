---
title: Forking Lemma
date: 2024-07-10
tags:
- cryptography
- foundations
- theoretical
---

states that If a PPT adversary with a random tape and a random oracle $\mathcal{O}$, is able to produce a forgery/break a scheme with non-negligible probability, then it can break the scheme again with same random tape and different random oracle with non-negligible probability.

- What input and output does A take?
	- $\mathcal{A}:\langle x,(h_{1},\dots,h_{q});r\rangle\to(i,y)$ where $x$ is the input to the scheme, $h_{1},\dots,h_{q}$ denotes oracle queries, and $r$ is the random tape that is used to generate randomness for $\mathcal{A}$.
	- A outputs index $i$ and forgery $y$.
- What does the index $i$ represents?
	- When $i\geq 1$, it means that $\mathcal{A}$ was able to successfully produce a forgery for a scheme.
- Does the input to A gets changed?
- What does the random tape do? Why is it same in both scenarios?

Let $\mathcal{A}:\langle x,(h_{1},\dots,h_{q});r\rangle\to(i,y)$ where $x$ is the input to the scheme, $h_{1},\dots,h_{q}$ denotes oracle queries, and $r$ is the random tape that is used to generate randomness for $\mathcal{A}$, and outputs $(i,y)$. Let $acc$ be the probability that $\mathcal{A}$ is able to output $i\geq 1$.[^1]

Let's define Forking algorithm $F_{A}$:
- Pick a random tape $r$ for $\mathcal{A}$.
- Pick $h_{1},\dots,h_{q} \xleftarrow{\$}H$.
- Run adversary on inputs to get outputs $i,y$.
- If $i=0$, output $(0,0,0)$, halt. This means adversary was not able to break the scheme.
- Pick $h'_{i},\dots,h'_{q} \xleftarrow{\$}H$
- Run $\mathcal{A}:(x,(h_{1},\dots,h_{i-1},h'_{i},\dots,h'_{q});r)\to\left( i',y' \right)$.
- If $i'=i$ and $y'\neq y$, then output $1,y,y'$. This means if $\mathcal{A}$ was able to break the scheme at same index, with a different forgery, then output the two forgeries.

Let $\text{frk}$ denote probability that $F_{A}$ will output $(1,\cdot,\cdot)$, then $\text{frk}=acc\cdot\left( \frac{acc}{q}-\frac{1}{h} \right)$.

The index $i$ can be thought as a fork in the algorithm, where probability that some of initial inputs and $i^{th}$ query remains same is denoted by $acc$, then adversary re-generates the inputs after the branching point, but are generated from some random oracle.

More intuitively, $\mathcal{A}$ can be thought as probabilistic algorithm that uses adversary $\mathcal{B}$ to create forgery for a signature algorithm. Now, on input $x=m$, $\mathcal{A}$ simulates random oracle $RO$ for $\mathcal{B}$, and answers its queries the first time honestly, sampling $h_{1},\dots,h_{q}$ uniformly from set $H$. $\mathcal{B}$ is able to output a forged signature for input.  Now, $\mathcal{A}$ rewinds $\mathcal{B}$ to $i^{th}$ index, and simulate a random oracle $RO'$ for the rest of the run. If $\mathcal{B}$ outputs another forged signature $y'$, then $\mathcal{A}$ is successful.

## References

- [Chelsea Komlo: A Note on Various Forking Lemmas](https://www.chelseakomlo.com/assets/content/notes/Forking-Lemma-Variants.pdf)
- [BN05: General Forking Lemma](https://soc1024.ece.illinois.edu/teaching/ece498ac/fall2019/forkinglemma.pdf)

[^1]: Definition borrowed from wikipedia [article](https://en.wikipedia.org/wiki/Forking_lemma).