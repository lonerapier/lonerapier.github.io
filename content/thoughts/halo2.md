---
title: Halo2
tags:
- seed
- tech
- cryptography
date: 2023-09-12T00:00:00Z
---

started reading about Halo2 which is used in zk-email for creating RSA, sha and regex verification chips.

Main architecture is UltraPLONK which is PLONK + custom gates (TurboPLONK) + Lookup arguments (Plookup) but simpler than original plookup.

- **Arithmetization** (encode computation in form of provable circuits, interpolated as polynomial)
- **Polynomial** Commitment (create commitment to polynomials)
- **Accumulation** (efficiently combine opening proofs)

Then went ahead and gained some context on what [Lookup tables](https://en.wikipedia.org/wiki/Lookup_table) are and how they are used in current programming paradigm. Good optimisation for compute heavy task and quite old technique.

So, here is the summary of my understanding of Halo2 as of now:

# Arithmetization

- circuit represented in terms of matrix.
- Rows and columns
	- Columns of three types: fixed, advice, instance
		- fixed: general circuit representation based on wires (fixed wires)
		- advice: witness used in circuit
		- instance: public inputs
		- More columns, require new commitment, scalar mult increases, **proof size** increases.
	- Rows: ~~arithmetic gates~~ domain at which columns are evaluated. More rows, FFT increases, **proving time** increases
- Divides the circuit in chips and gadgets.
- A circuit is divided into disjoint related cells as **regions**. Relative constrains are set in regions only. **Floor planner** is used to decide where to each region.
- High level APIs are made accessible using already validated **gadgets**. For example: creating halo2 circuit for verifying a hash function would require many several independent chips, which can be integrated as gadgets and directly used, instead of making another implementation.
- relative constrains reduce the number of columns required, and thus reduces proof size. If not for relative constraints, you would have to prove each output of a gate, and thus would increase the proof size of, let’s say a custom gate, much higher.
- Chips also define lookup tables, and if more than one lookup argument is used, then tag column is used to specify which table to use. don’t understand this as of the moment. will look back on it.

# Commitment

Uses Inner Product Argument as commitment scheme to prove polynomials. Requires no trusted setup.

- roots of unity are chosen as the evaluation domain. the polynomial constructed should vanish, i.e. evaluate to 0 at evaluation domain.
- single point opening or multi point opening.
- single point opening: let's say: column $A_0,A_1$ is being proven at $x$.
- multi point opening: column $A_2,A_3$ are being proven at $x,\omega x$.
- group columns by their set of query points.
- accumulate polynomials in $q_i$ according to their set.
	- $q_{1}(X)=A_0(X)+x_{1}A_1(X)$
	- $q_{2}(X)=A_2(X)+x_{2}A_3(X)$
- evaluate at the points in the set at $x,\omega x$, to get $q_{1}(x),q_{2}(x),q_{2}(\omega x)$.

# References

- [Halo2 book](https://zcash.github.io/halo2/index.html)
