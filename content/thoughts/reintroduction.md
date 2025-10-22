---
title: Reintroduction
date: 2024-09-16:12:00:00Z
tags:
  - math
---

I haven't taken any formal education in mathematics and with more experience, I've come to realise, it's the best thing you can do for your brain. Math is beautiful.

Initially, want to complete at least undergraduate level courses.

## Questions
- Through calculus describe, what a continuous function is?
	- a function $f$ is said to be continuous at a point $x_{0}$, if $\forall\ \epsilon>0, \exists\ \delta >0$, such that if $|x-x_0| < \delta \implies |f(x)-f(x_{0})| < \epsilon$.
- Fundamental theorem of Calculus: $F(b)-F(a)=\int^{b}_{a} F'(x) \, dx$ where $F(x)$ has a continuous derivative.
	- But sometimes we need a weaker condition to prove the theorem, so we assume a simpler condition, and give it a name to *"make the proof work"*.
	> [!quote] "If we don’t know how to prove the theorem we want to, we’ll often ask, “What extra condition could we assume that would make it possible to prove this theorem?” And then we assume that condition holds, and often give it a name like “tame” or “well-behaved.” The conditions aren’t special or elegant–but they work." - [Where do axioms come from](https://infinityplusonemath.wordpress.com/2017/06/21/where-do-axioms-come-from)
- How did Riemann come up with the definition of shapes, and manifolds?[^1]
- 

## Improvement
- Write my own notation OR explain concepts formally on my own
- Solve more problems without looking at notes.
- Start making [small hypothesis](https://www.azimuth.org.uk/how-learning-really-happens-unlocking-the-power-of-cognitive-science-in-the-classroom/) about next chapters/subtopics inside the chapters.
- Active learning than writing notes. Less and less notes from now on.

## TODOs
- learn about matrix algebra, tensor algebra
- eigenvector, eigenspace
- Abstract algebra from dummit and foote
- Solving mathematical problems
- How to write proofs
- Then it's either Calculus, or real analysis
- Cauchy sequences
- Mathematical logic
	- <https://web2.qatar.cmu.edu/cs/15317/>
- Algebraic geometry
	- abstract algebra
	- number theory
	- algebraic topology
- Geometric algebra: prerequisites
	- Geometry
	- Topology
	- algebraic topology
	- [Index—The Stacks project](https://stacks.math.columbia.edu/)
- Analysis
	- Real
	- Complex
		- [Complex Analysis](https://complex-analysis.com/)
		- [What exactly is i? (And other weird questions about complex numbers)](https://artofproblemsolving.com/community/c2532359h3059148_what_exactly_is_i__and_other_weird_questions_about_complex_numbers)
	- Functional
	- Differential equations
	- Measure theory
	- Numerical analysis
- Probability and Statistics and Distributions and Random processes
	- [Probability and Statistics for Data Science](https://www.ps4ds.net/)
- 
- what are continuous functions?
- MATH 202A Introduction to Topology and Analysis
- MATH 202B Introduction to Topology and Analysis
- MATH 214 Differential Topology
- MATH 240 Riemannian Geometry
- MATH 250A Groups, Rings, and Fields
- MATH 250B Commutative Algebra
- MATH C218A/STAT C205A Probability Theory
- STAT 210B Theoretical Statistics
- CS 229A Information Theory and Coding
- EE 227BT Convex Optimization

# Linear Algebra
**Vector spaces**
- start: 
- definition and properties
- Subspaces
	- Algebraic relation with calculus is really interesting. Example: All continuous real valued functions are subspace of $\mathbf{R}^{\mathbf{R}}$. Similarly, all differentiable real-valued functions are also subspace of $\mathbf{R}^{\mathbf{R}}$.
	- What are the operations possible on subspaces? Can I add them?
	- How to find out all possible subspaces of a vector space?
	- I've seen math's obsession with subsets of a current structure. How are these utilized in real-world applications. I mean, are there examples where a subspace of a vector space is needed to solve a problem? or can you model real world problems into mathematical ones for these subsets?
	- Linear dependence lemma
- complete: 31-05-25
Finite-dimensional vector spaces:
- started: 31-05-25
- Bases: vectors $v_{i}$ in a base of a vector space $V$ are linearly independent. Are all the elements derived using linear combination of the base **unique**?
- dimension
- extend LI vector to basis, extend spanning list to basis
- analogy between sets and vector spaces:
	- $\#s \leftrightarrow dim V$
	- $S_{1} \cup S_{2} \leftrightarrow V_{1}+V_{2}$
	- $\#(S_{1}\cup S_{2})\leftrightarrow \dim(V_{1}+V_{2})=\dim{V_{1}}+\dim{V_{2}}-\dim(V_{1} \cap V_{2})$
- Is it possible to find out how many LI vectors exists in a n dim VS?
**Linear Maps:**
- start: 01-07-25
- linear map lemma
- To prove that any vector space is finite dimensional, can be proved by taking a basis, and proving that any arbitrary element is represented using finite basis.
- fundamental theorem of linear maps: dim V = dim null T + dim range  T
- Ex3B:
	- 21: I can't figure out how to prove the dimension of $U \cap \text{range}\ T$. It was really straightforward, since I just had to represent that every element in the subspace lies in the intersection of U, and range T.
	- 22: create a linear map from null S to V, and use that to prove that dim null ST <= dim null T (obvious) + dim null S
	- 23: same as above, create a map from range S -> W, and prove dimension will be less for both of right hand side. then, the final answer is just stronger limit. can prove that weaker limit, i.e. max of both is not possible.
	- 24: seems like a rubbish question.
	- 25,26: use same strategy as 23, try to create a map, and prove both sides.
	- 27: interesting problem. I forgot what was the relation for direct sum.
	- 29: how do i approach this problem? if i have to prove existence of a polynomial. Claude says you need to take a poly q, and solve for arbitrary poly p. get a relation between coefficients of q and p. and solve the relation to get the coefficients.
	- 32: understanding what maps I need to create that will help me form the contradiction or successful proof is being difficult for me.
Matrices, Invertibility, isomorphism:
- Linear map T:U -> V is denoted by a matrix of size `m x n`, $M(T)=A_{j,k}v_{j}$ where $v_{k}$ is the basis of V.
**Invertibility:**
- Prove a LM is invertible iff injective and surjective.
- For maps on same dimension spaces, injectivity, surjectivity, invertibility is same, i.e. they are **isomorphic**.
- Linear maps act like Matrix multiplication: M(Tv) = M(T)M(v)
- How do you define $M(Tv_k)$?
Products and Quotient space:
- Product of vector space: V x W
- $V/U={v+U:v\in V}$, where U is a subspace of V.
- Quotient Map: $\pi(v)=v+U$
- $\widetilde{T}(v+\text{null} \ T)=Tv$
- Ex 3E:
	- 2. proving it using dim of product space = sum of individual space is wrong because it's proven when individual spaces are assumed as finite dim VS.
	- 3. very interesting question because the vector spaces we're dealing with are maps. So we have to create a map $\Phi$ that takes an element in the first VS and map it to an element in second space. To prove isomorphism, prove the map is indeed a LM, is injective and surjective. The main insight is $\Phi(T)=(T_{1},\dots,T_{m})$ where $T_{i}(v_{i})=T(0, 0, \dots,v_{i},\dots, 0)$. To prove that the map is surjective is a little tricky.
	- 5. similar to 3, selecting the map is the main problem.
	- 10. main thing is you already know what the other subspace for $A_{1}\cap A_{2}$ is. You just have to prove that the elements belonging to both $A_1$ and $A_2$ also lie in that subspace.
	- 14. I forgot to prove that to prove that a list is a basis, I have to prove linear independence too, and only proved span.
	- 17. I found out a flaw in my understanding of quotient spaces. $V/U$ is actually a vector space of cosets of $U$. So the elements of $V/U=v+U$ are not individual vector spaces, but a whole set.
**Dual Space and dual maps:**
- Is this where I get information overload lol? the description is getting too complicated.
- linear functional: way to measure a vector space
- dual space: set of all measures of a vector space
- dual map: takes a measure back to V from W for a map T: V->W
- annihilator
	- prove: $\dim U^{0}=\dim V-\dim U$
	- how does annihilator relate to the subspace and the parent space? i.e. if annihilator is nil, 
	- if annihilator exists, then double annihilator should exist as well. $(U^{0})^{0}$
- relation between dimension of dual map and map and domain and codomain
- QUES: can you prove in two distinct ways why column rank of $F^{m,n}$ is equal to row rank of matrix?
- Ex 3F:
	- 7: same as ex 3E.5,6.
	- 16: T=0 => T' = 0 looks straightforward. other way round is my problem. $\varphi\cdot T(v)=0\implies \varphi(w)=0\ ,\forall \enspace \varphi \in W' \implies w=0$. can be proven using contradiction by selecting a map that takes w to 1.
	- 17: What does inverse of T' mean? $T'(\varphi)=(\varphi\cdot T)\in\mathcal{L}(W',V')$, then $(T')^{-1}(\psi)=(\psi \cdot S)\in\mathcal{L}(V',W')$. This means if T is invertible, then S(w) exists for each w in W. Then just show composition of dual maps returns same map. converse can be proven using bijectivity of dual maps.
	- 24: $\Gamma$ TODO
	- 26: interesting framing of the annihilator.
- Things I struggled at in this chapter:
	- Proving a map is surjective. Injectivity can be proven is straightforward way, i.e. Tu = Tv => u = v, or null T = {0}. But surjectivity need to be proven for arbitrary vector in the range of T.
	- Concept of Matrix of linear map is still not completely clear to me. M(T) allowed us to represent linear maps as matrix, which is pivotal for computation.
	- what are the most prominent examples and use case i can think of quotient maps and dual maps?
	- QUES: what are the proof techniques that I know of right now? contradiction, induction, counterexample, equality by subset, iff, at least logic, 
**Polynomials**
- PROVE: polynomial division: p=sq+r with dim r <= dim q.
> [!note] Trigonometry primer
> - trigonometric interpretation of complex numbers = $r(\cos \theta+i\sin \theta)$
> - geometric interpretation/polar representation is interpreted as vector of magnitude r with angle $\theta$ from origin.
> - euler form: $e^{i\theta}=\cos \theta+i\sin \theta$. 
> 	- TODO: Prove this. has implications in fourier transform.
> - multiplication of complex number in polar form: $wz=rs(\cos(\alpha+\beta)+i\sin(\alpha +\beta))$
> 	- To prove this: use formula of $\cos(\alpha+\beta),\sin(\alpha+\beta)$
- de moivre's theorem: $z^{n}=r^{n}\cos(n\theta)+i\sin(n\theta)$. Can be trivially proved using induction.
- TODO: come back to fundamental theorem of linear algebra proof. the current proof uses analysis (Extreme Value theorem precisely), to assume a complex-coefficient polynomial that attains minimum at certain $\zeta$.
- Factorization of a polynomial over C exists and is unique with at most m roots.
	- What are the subresults that need to be proven in order to prove above?
	- Every polynomial can be written as p(z) = (z-a)q(z), with q being deg m-1 poly.
	- Prove that any deg m polynomial has at most m roots.
	- Prove polynomial in P(C) has a root in C.
	- Prove polynomial can be written as p(z) = c(z-a1)(z-a2)…(z-am)
	- prove a1..am is unique.
- Ex 4:
	- 9: prove using induction.
	- 11: define $\bar{p(\bar{z})}$
	- 14: I would have taken slightly more time if the steps (a), (b) were not explicitly provided.
		- Show T is a LM.
		- Injective: T(r1,s1)=T(r2,s2) => r1=r2, s1=s2.
		- Surjective: TODO
		- rp+sq=1 is proven trivially from (a,b)
**Eigenvalue and Eigenvectors**
- START: 04-10
- operator
- Invariant subspace
- QUES: what examples other than {0}, V, can you provide for invariant subspaces? differentiation, null T, range T, all scalar multiples (1-dim subspace)
- eigenvalue: all 1-dim subspace corresponding to a LM T is formed using a scalar (eigenvalue).
- eigenvector: all vector associated with an eigenvalue.
- QUES: what's the upper bound for number of eigenvalues for a T?
- QUES: What effect a polynomial $p$ can have on an operator $T$: $p(T)$? and why only operator, and not other LM?
- QUES: can you represent an eigenvalue in matrix form? i.e. $Av=\lambda v$?
- QUES: if eigenvectors are objects that remain unchanged in form after a map, then can this apply to objects beyond vector spaces? functions (differentiation, integral)?
	- Answer is yes, and that exactly what we call *eigenfunction*.
- QUES: Geometrically, what would the eigenvector of a rotation be?
- Ex 5A:
	- 1, 2, 3: trivial problems on proving why the said subspace is invariant under T.
	- 6: eigenvalue = 1, eigenvector = (x, x)
	- 9: $e^{kx}$, with k as eigenvalue.
	- 10: $x^{a}$ as $p$
	- 13: 
	- 15: define eigenvalue of T'. use $T-\lambda I$ to prove T'->T direction.
	- 16: 
	- 17:
	- 18:
	- 19:
	- 20:
	- 21: Use T.T^-1 = I identity to prove 
	- 23: if T has eigenvalue $\lambda_{1}$ and S has $\lambda_{2}$, then the problem is solved. My question is, it is possible to have following identity: $T(v)=\lambda_{1}u, S(u)=\lambda_{2}v\implies ST(v)=\lambda_{1}\lambda_{2}v$ and $T(u)=\lambda_{3}v,S(v)=\lambda_{4}u\implies TS(v)=\lambda_{3}\lambda_{4}v$. Won't that lead to different eigenvalues? TODO
	- 26, 27: can be proven using $T-\lambda I$
	- 28: T has atmost dim V eigenvalues from 5.12. rank-nullity implies dim null T + dim range T >= # eigenvalues. TODO
	- 32: Take a polynomial that satisfies the invariant. use fundamental theorem of algebra to factorise it into individual factors. Use the fact that T has no eigenvalues to discard first two solutions.
	- 33: a) T^m injective => T injective direction: can be proven using induction. Take T^2 as first step, prove using contradiction that if T^2 is injective implies T is injective. Scaled to T^m. b) T^m surjective => T surjective. can also be proven similarly using contradiction. Assume T is not surjective, that means there exists v in V such that v is not in range T. 
	- 35: couldn't have done this without the hint. Proving $\lambda_{1},\dots,\lambda_n$ is eigenvalues, and $e^{\lambda_{i}x}$ are the eigenvectors of D. Using 5.12 you prove eigenvectors corresponding to distinct eigenvalues are LI.
	- 
- existence and uniqueness of Minimal polynomial
- roots of minimal polynomial equals eigenvalue of the operator
- eigenvalues on odd dimensional real vector spaces
- exercise 5B:
	- 6: again find the minimal polynomial using matrix of T.
	- 8: critical step: what's the matrix of T? then find the minimal polynomial from the matrix.
	- 13: 
	- 14: My first hunch was to find the matrix of T using minimal polynomial, take it's transpose, and then find the minimal polynomial of T^-1. But that turned ugly really quickly. The trick was to just invert the polynomial's invariant, i.e. calculate T(1/z) and then make it monic.

> LLM prompt for further investigation into a topic:
> can you give me a rabbit hole related to `x` that can allow me to explore something much deeper than it?

Resources:
- [Napkin Math - Evan Chen](https://venhance.github.io/napkin/Napkin.pdf)
- [Mathematics for the adventurous self-learner](https://www.neilwithdata.com/mathematics-self-learner)
- [How to Become a Pure Mathematician (or Statistician)](https://hbpms.blogspot.com/)
- [Mathacademy](https://mathacademy.com/courses)
- [Art of Problem solving](https://artofproblemsolving.com/wiki/index.php/Math_books)
- [Math notes](https://holdenlee.github.io/Math%20notes.html)
- [OSSU math](https://github.com/ossu/math)
- [MIT syllabus](https://catalog.mit.edu/schools/science/mathematics/mathematics.pdf)
	- [MIT catalog](https://catalog.mit.edu/subjects/18/)
	- [MIT roadmap](https://math.mit.edu/academics/undergrad/roadmaps.php)
- [Caltech syllabus](https://pma.caltech.edu/courses/undergrad/department/Ma/2021-22)
	- [Caltech catalog](https://catalog.caltech.edu/current/2023-24/department/Ma/)
- [Oxford mathematics hub](https://courses.maths.ox.ac.uk/)
- [UCL maths modules](https://www.ucl.ac.uk/maths/current-students/current-undergraduates/module-information-undergraduates)
- [Yale Mathematics major](https://math.yale.edu/undergraduate/mathematics-major)
- [How to Learn Math and Physics - John Baez](https://math.ucr.edu/home/baez/books.html#math)
- [rossant](https://github.com/rossant)/[awesome-math](https://github.com/rossant/awesome-math)
- [Paul's online math notes](https://tutorial.math.lamar.edu/)
- [Darij Grinberg: Mathematical Problem Solving (Math 235), Fall 2020](https://www.cip.ifi.lmu.de/~grinberg/t/20f/): Initial undergraduate course on problem solving with amazing putnam problem and notes
- [Math Major Guide \| Warning: Nonstandard advice. - YouTube](https://www.youtube.com/watch?v=EE7KpcReYw4)
- [Algebra, Topology, Differential Calculus, and Optimization Theory for Computer Science and Machine Learning​](https://www.cis.upenn.edu/~jean/math-deep.pdf)
- [Course categories \| Mathematical Institute](https://courses.maths.ox.ac.uk/course/index.php)

![syllabus](https://i.imgur.com/am4fVnh.png)

[^1]: <https://infinityplusonemath.wordpress.com/2017/02/18/asteroids-on-a-donut/>