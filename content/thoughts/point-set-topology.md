---
title: Point-Set Topology
date: 01-05-2026
tags:
  - mathematics
  - topology
  - notes
---

These are the notes about point-set topology from Munkres.

# Set Theory
Sets
- Sets: Elements, objects, Subsets, proper subsets, Union, intersection, disjoint, empty set.
- Contrapositive, Converse and Negation
- Complement of a set relative to other set: $A-B$
- DeMorgan's Law: $A-(B \cup C),\quad A-(B\cap C)$
- For a collection of set S, Arbitrary Union $\bigcup_{s \in S}s$ and Intersection $\bigcap_{s \in S}s$
- Cartesian Product of Sets: $A\times B$
Functions
- **Def**: A function: $f:X\to Y$ is a subset of $X\times Y$ with each $x \in X$ appearing exactly once as the first coordinate of an ordered pair in this subset.
	- Ex: $f:\mathbb{R}\to \mathbb{R}$ defined as $x\mapsto x^{2}+1$. Then the subset $(x,x^{2}+1)\in \mathbb{R}\times \mathbb{R}$. A different function $f_{2}:\mathbb{R}\to \mathbb{R}_{+},x \mapsto x^{2}+1$
- Restriction of $f:A\to B$ to subset $A'$ is defined as $f|_{A'}:A'\to B$.
- Composite Function $f\circ g$
- Injectivity, Surjectivity and Bijectivity
- Image, Pre-image of a set
- **Example**: $f(x)=3x^{2}+1$.
Relation
- **Def**: A relation on a set A is a subset $C\subset A\times A$
- **Def**: Equivalence relation $\sim$ has three properties:
	- Reflexivity, Symmetry, Transitivity
- **Def**: Equivalence class, subset $E=\{ y|y\sim x \}$
	- Equivalence classes of set A form a partition (disjoint nonempty subsets whose union is A).
	- Given partition D of A, there is exactly one equivalence relation on A from which it is derived.
		- Prove existence and uniqueness of equivalence relation from partition D.
- **Def**: Order Relation $\leq\  \subset A\times A$ is a relation satisfying
	- Comparability: if $x\neq y$, Either $x\leq y$ or $y\leq x$
	- Non-reflexivity: $x\leq y$ and $y\leq x$ implies $x=y$
	- Transitivity: $x\leq y\leq z\implies x\leq z$
- **Def**: Order Type
- **Def**: Dictionary order relation
Integers and $\mathbb{R}$
- **Def**: Field, ordered field, linear continuum
- Least upper bound property and archimedes principle is one of the most important properties of $\mathbb{R}$
- Inductive set: If $x\in\mathbb{R}$ and $1\in\mathbb{R}$, then $x+1 \in\mathbb{R}$, where $+$ is the binary operation for the *field*.
- 

# Resources
- Munkres, Topology (2nd Edition)
- Counterexamples of Topology
- John M. Lee, Introduction to Topological Manifolds (2nd Edition)
- [MTG 4302/5316, Introduction to Topology I, Fall 2023 – Henry Adams](https://people.clas.ufl.edu/henry-adams/mtg4302-5316-f2023/)
- ICTP - Bruno Zimmerman