---
title: "Real Analysis"
date: 2026-01-01
tags:
- mathematics
- analysis
---

Notes and selected problem solutions from Real Mathematical Analysis. Supplementing it with [Analysis - Mathematics LibreTexts](https://math.libretexts.org/Bookshelves/Analysis).

# 1. Real Numbers

## Sets and Logic

red
- Preliminaries:
	- Sets, subsets, singleton set
	- Class, equivalence class ($\sim$)
- Language:
	- Quantifiers: $\forall,\exists,\not\exists,\in,\not\in$
	- Assertions: $<,>,\leq,\geq,=,\neq$
	- Rules:
		- quantifiers before assertions
- Logic:
	- implication: $\implies$
	- negation: $\neg$
	- conjunction: $\land,\lor$

## Cuts

Our goal is to define $\mathbb{R}$ entirely from $\mathbb{Q}$, and the tool that we use to define real numbers is **Dedekind cuts**.

- Why does $\mathbb{Q}$ has gaps?
- Define what is a cut, A|B.
- **Least upper bound property for ℝ**. Why is LUB property needed for ℝ?
- Why set ℝ is *complete*?
- Arithmetic on cuts: $x+y, x-y, x*y$
	- Define $x*y$ using positive and negative cuts.
	- Lay out the properties like associativity, distributive over addition of $x*y$ using cuts.
- what is a **Field**?
- Why ℝ is an ordered field?
- why $\mathbb{Q}$ is an ordered subfield of ℝ?
- uniqueness of ℝ.
- supremum and infimum of a nonempty subset S of ℝ.

**Sequences**
- Convergent sequence
- Nested Intervals Theorem: Let $I_{n}$ be non-empty closed intervals such that $I_{n+1}\subseteq I_{n}$ for all $N\in \mathbb{N}$. Then, $\bigcap_{n=1}^{\infty} I_{n} \neq \emptyset$ and If length of intervals converge to zero, then $\bigcap_{n=1}^{\infty}I_{n}$ consists of a single point.
- Bolzano-Weierstrass Theorem: Every bounded sequence $\{a_{n}\}$ has a convergent subsequence.

**Cauchy Sequences**

Converging sequences can help us to prove again why ℝ is complete.
- Define Cauchy sequences
	- another way of writing the above sequence relation: $\lim_{ n \to \infty }a_{n}=b$
- Cauchy condition

> [!theorem]- Prove why $\mathbb{R}$ is complete if it obeys Cauchy condition.
> I'll write proof sketch and explain the reason behind each step. Leaving the formal proof to future me :)

What helped to understand the **difference** between Dedekind completeness and Cauchy completeness, is that they both represent different paths to reach to completeness. Dedekind cuts says that "If I cut a line, and define the order between the cuts, can I get an upper bound of the cut?", and Cauchy convergence says "If I keep zooming in on a swarm of points, can I get the maximum point?".

Dedekind cuts defines upper bound using order between the elements of the set while Cauchy measure the distance between the elements. Order is not always defined, but metric is defined for some more spaces.

**Why does Cauchy sequences help to prove completeness?** Because to prove completeness, we need to prove that no holes exist, and converging sequences always approach a limit. If we prove that limit exists in the set, then there is no hole.

**Proof.**
1. The condition that we're trying to prove is R is complete with respect to cauchy sequence iff it obeys Cauchy condition.
2. ℝ is complete => obeys Cauchy condition is straightforward as if the numbers in sequence are arbitrarily close to the limit b, they must be close to each other as well.
3. We'll mainly focus on proving the converse, i.e. if a sequence obeys cauchy condition then it converges to a limit in ℝ.
4. Prove why the sequence is *bounded* because if the sequence is unbounded like $\mathbb{N}$, it will never converge to a limit.
5. If the sequence is bounded, there must be a subset X in the sequence with infinitely many elements, and using ℝ's l.u.b property, it has a bound.
6. Now, our proof boils down to proving the claim that $\lim_{ n \to \infty }a_{n}=b$ or $\exists\ N\in\mathbb{N}\space\text{s.t}\space n\geq N\implies|a_{n}-b|<\epsilon$
7. We use cauchy condition to fix a limit $\frac{\epsilon}{2}$ for some $N\in \mathbb{N}$ around the LUB. Now, our goal is to find an element from our subset X such that $|a_{n}-b|<\epsilon$.
8. We first figure out that there are infinitely many $a_{n}$ around the pipe $b-\frac{\epsilon}{2},b+\frac{\epsilon}{2}$, and take any single $a_{n_{0}}$.
9. Then, using triangle inequality, we can prove our relation.

- Every interval in ℝ has infinitely many rational and irrational numbers.
- Archimedean property
- ε-principle

## Euclidean Space

- Cauchy-Schwarz inequality
- Why unit ball is a Convex set?

## Cardinality

- Cardinality of a set
- Bijection means equal cardinality
- Denumerable: $S\sim\mathbb{N}$ and Uncountable
- Why ℝ is *uncountable*?
- Prove the following for denumerable sets:
	- Each infinite set contains a denumerable subset
	- subset of denumerable set is denumerable
	- $\mathbb{N}\times \mathbb{N}$ is denumerable
	- cartesian product of denumerable set is denumerable
	- union of denumerable sets is denumerable
	- $\mathbb{Q}^{m}$ is denumerable
- Prove the following for countable sets:
	- subset and cartesian product and union of countable set is countable
	- countable set that contains a denumerable subset is denumerable

> [!theorem] *Schroeder-Bernstein Theorem*: If A,B are sets and f: A->B and g: B->A are injections, then there exists a bijection h: A->B.

## Continuous Functions

- definition of real-valued continuous function, $f: [a,b] \to \mathbb{R}$

```tikz
\usepackage{pgfplots}
\begin{document}
  \begin{tikzpicture}
    \begin{axis}[
        width=12cm,
        height=8cm,
        axis lines=none,
        grid=both,
        grid style={line width=.1pt, draw=gray!20},
        xmin=-0.5, xmax=10.5,
        ymin=-0.5, ymax=5,
        xtick={0,1,...,10},
        ytick={0,1,...,5},
        xticklabels={},
        yticklabels={},
        clip=false,
      ]

      % Parameters for the plot
      \def\x{4}
      \def\deltax{0.8}
      \def\a{1.5}
      \def\b{9}
      \def\fx{1.8}
      \def\eps{0.7}

      % Horizontal reference lines (dotted)
      \addplot[dotted, thick, domain=-0.5:10.5] {\fx+\eps};
      \addplot[dotted, thick, domain=-0.5:10.5] {\fx};
      \addplot[dotted, thick, domain=-0.5:10.5] {\fx-\eps};
      \addplot[dotted, thick, domain=-0.5:10.5] {0}; % x-axis

      % Vertical reference lines (dotted)
      \draw[dotted, thick] (axis cs:0, -0.5) -- (axis cs:0, 4.5); % y-axis at 0
      \draw[dotted, thick] (axis cs:\a, -0.5) -- (axis cs:\a, 3.5);
      \draw[dotted, thick] (axis cs:\x-\deltax, -0.5) -- (axis cs:\x-\deltax, 4.5);
      \draw[dotted, thick] (axis cs:\x, -0.5) -- (axis cs:\x, 4.5);
      \draw[dotted, thick] (axis cs:\x+\deltax, -0.5) -- (axis cs:\x+\deltax, 4.5);
      \draw[dotted, thick] (axis cs:\b, -0.5) -- (axis cs:\b, 3.5);

      % Y-axis Labels
      \node[left] at (axis cs:-0.5, \fx+\eps) {$f(x)+\varepsilon$};
      \node[left] at (axis cs:-0.5, \fx) {$f(x)$};
      \node[left] at (axis cs:-0.5, \fx-\eps) {$f(x)-\varepsilon$};

      % X-axis Labels
      \node[below left] at (axis cs:0, 0) {$0$};
      \node[below left] at (axis cs:\a, 0) {$a$};
      \node[below] at (axis cs:\x-\deltax, 0) {$x-\delta$};
      \node[below] at (axis cs:\x, 0) {$x$};
      \node[below] at (axis cs:\x+\deltax, 0) {$x+\delta$};
      \node[below right] at (axis cs:\b, 0) {$b$};

      % Dots on axes
      \fill (axis cs:0, \fx) circle (2pt);
      \fill (axis cs:0, 0) circle (2pt);
      \fill (axis cs:\a, 0) circle (2pt);
      \fill (axis cs:\x, 0) circle (2pt);
      \fill (axis cs:\b, 0) circle (2pt);

      % The curve f (manually styled to match Figure 19)
      \addplot[thick, smooth, tension=0.7] coordinates {
          (\a, 2.0)
          (2.5, 3.8)
          (3.4, 2.2) % enters epsilon band
          (\x, \fx)
          (4.5, 1.3) % stays in band
          (5.5, 3.0) % exits band
          (7.0, 4.5) % high peak
          (8.2, 1.8)
          (\b, 0.8)
        };

      % Annotations for 2 delta and 2 epsilon
      \node at (axis cs:\x, 4.8) {$2\delta$};
      \node[right] at (axis cs:9.5, \fx) {$2\varepsilon$};

    \end{axis}
  \end{tikzpicture}
\end{document}
```

> [!theorem] Boundedness Theorem: Prove why values of a continuous function form a bounded subset of ℝ.

Intuition: Create a 'safe space' around the function. To prove that function is bounded in a domain interval, first create a set in which the function is bounded. Using l.u.b. property of R, the next goal is to expand the set to the whole domain. Use the continuity of the function at lub to first prove that l.u.b. exists inside the safe space and there exists a point beyond lub that's bounded as well arriving to a contradiction.

**Proof.**
1. For $x\in[a,b]$, let $V_{x}=\{y: \text{for } t\in[a,x], y = f(t)\}$ and $X=\{x\in[a,b]:V_{x} \text{ is bounded subset of } \mathbb{R}\}$. **X** becomes our safe-space.
2. X is clearly bounded in R as a <= x <= b. Therefore, l.u.b. exists, let c = l.u.b. X <= b.
3. Applying continuity of f at c. Let ε = 1, then there exists δ > 0 s.t. for any $t\in[a,c]$, |t-c|<δ => |f(t) - f(c)| < ε.
4. For any $x\in[c-\delta,c)$, $V_{x}$ is bounded, and then varies in $[f(c)-1,f(c)+1]$. Since union of bounded sets is bounded, $V_{c}$ is bounded.
5. Now, for $x\in [c,c+\delta]$, f(x) < f(c) + 1, i.e. f(x) is bounded for x > c, contradicting our l.u.b. assumption. Thus c = b.

> [!theorem] Extreme Value Theorem: Prove that continuous function defined on an interval takes absolute maximum, minimum values.

Intuition: Using a proof strategy similar as above, Let M be the l.u.b. of all values of f(t) in [a,b]. We know that M exists as f is bounded. Create a safe space in which f attains maximum = M and minimum. Since, space is bounded, lub exists = c. assume f(c) < M. Choose any ε < M - f(c) and apply continuity at c, prove that c exists in the safe space set. Now, find a t > c such that f(t) < M, arriving to contradiction that c is l.u.b, proving c = b. This implies all values of f in [a, b] is less than M, but M exists. This proves that f(c) = M.

> [!theorem] Intermediate Value Theorem: A continuous function attains all intermediate values in an interval.

## Exercises

- 9. Take any irrational cuts such that their sum adds up to a rational number. Let's take x=A|B=√2 and y=A'|B'=-√2. $B=\{r\in \mathbb{Q}:r>0\ \text{and} \ r^{2}\geq2\}$ and $B'=\{r'\in \mathbb{Q}:r \geq0 \ \text{or} \ r^{2}<2\}$. Writing B+B' with the cases, it won't have a smallest element. Thus $A+A' \cup B+B'  \neq \mathbb{Q}$.
- 15. Prove for n = 2 by choosing ε appropriately. Proceeding with induction, assume k true, $|u^{k+1}-y^{k+1}|\leq|u-y||u^{k}+u^{k-1}y+\dots+y^{k}$.
- 19. g.l.b. of a set X is such that any $x \in X, x \geq g.l.b.$ and any lower bound in R is smaller than g.l.b. Any bounded set in R from below must have g.l.b. We will show that any set that have a l.u.b, another set in R have a g.l.b. equal to l.u.b and vice-versa. So, lub(-A) = glb(A), and lub(A) = glb(-A).
- 25.
- 30. b)
```tikz
\usepackage{pgfplots}
\begin{document}
  \begin{tikzpicture}
    \begin{axis}[
        axis lines=middle,
        xlabel={$x$},
        ylabel={$y$},
        domain=0:4,
        samples=100,
        ymin=-0.5, ymax=5,
        xmin=-0.5, xmax=4.5,
        width=12cm, height=8cm,
      ]

      % Shade the epigraph
      \addplot[fill=blue!20, draw=none, domain=0:4] {(x-2)^2 + 0.5} \closedcycle;

      % Draw the convex function
      \addplot[thick, blue, domain=0:4] {(x-2)^2 + 0.5};

      % Draw a line segment between two points to show convexity
      \addplot[thick, red, dashed] coordinates {(1, 1.5) (3.5, 2.75)};

      % Mark the midpoint on the line
      \addplot[mark=*, green!60!black] coordinates {(2.25, 2.125)};
      \addplot[mark=none, green!60!black, dashed] coordinates {(2.25, 2.125) (2.25, 0.5625)};

      % Mark the actual function value at midpoint
      \addplot[mark=*, blue] coordinates {(2.25, 0.5625)};

      % Annotation
      \addlegendentry{$f(x) = (x-2)^2 + 0.5$}
      \node at (axis cs:2, 3.5) {Epigraph $S = \{(x,y): f(x) \leq y\}$};
      \node at (axis cs:2.25, 2.5) [green!60!black] {Chord};
      \node at (axis cs:1.2, 1) {$f$ lies below chord};

    \end{axis}
  \end{tikzpicture}
\end{document}
```

- 43. First prove that A is non-empty since f is continuous at a, and bounded a <= A(δ) <= b. Thus, c = l.u.b. exists. Now, our goal is to extend A from c to a point beyond it, and prove that b = c. Apply continuity of f at c, let ε/2 > 0, then for any x in [a, c], there exists δ₀ > 0, |x - c| < δ₀ => |f(x) - f(c)| < ε/2. Fix a $u_{0}\in\left[ c-\frac{\delta_{0}}{2},\delta\right]$. This point is < c, thus u₀ is in A. Apply A(δ₁) at u₀, if x,t in [a,u₀] and |x-t|<δ₁/2 => |f(x) - f(t)| < ε.
	- Choose δ = min{δ₀/2,δ₁}. Extending our interval beyond c, let u = c + δ₀/2. Then, our goal is to prove A(δ) exists at u.
	- Take two cases: 1. x, t <= u₀. Proven trivially by using that u₀ in A.
	- second case: one of x, t > u₀. let x > u₀, x - c < δ₀/2 < δ => |f(x) - f(c)| < ε/2. similarly for f(t). Then, |f(x) - f(t)| <= |f(x) - f(c)| + |f(c) - f(t)| < ε/2 + ε/2 < ε.
	- Hence, u in A as well. contradicting our lub assumption. Thus, c = b.
- 45. a) limsup exists because the sequence s\_n = sup {a\_k: k>=n} is decreasing and bounded. b) if $\sup{a_n} = \infty$, then sequence is not bounded above, hence equal to infinity. c) $\lim \sup a_{n}=-\infty$. d) for unequal, take sequences that oscillate on opposite ends. (-1)^n and (-1)^n+1. for equality, 1/n and 1/n+1. f)
- 46.

## Takeaways

- **9**: learned how to define irrational cuts. I was just making wrong assumptions with the definition.
- Problem 30 taught me about squeeze theorem argument, and how there's multiple different solutions possible for a single problem. I can also solve the problem using ε-δ argument.
- **Important approximations**
	- Triangle inequality: $|a+b|\leq |a| + |b|$
	- Reverse triangle inequality: $||a|-|b|| \leq |a-b|$
	- Cauchy-Schwarz: $|<u,v>| <= \lVert u \rVert\lVert v \rVert$
	- $\frac{a+b+c+\dots}{n}\leq \sqrt[n]{ a\cdot b\cdot \dots }$
	- geometric series sum
	- taylor series approximation

> [!note] Shifted focus from Pugh's analysis to Libretext's [Introduction to Mathematical Analysis by Laffariere et. al.](https://math.libretexts.org/Bookshelves/Analysis/Introduction_to_Mathematical_Analysis_I_(Lafferriere_Lafferriere_and_Nguyen)/) and Principles of Mathematical Analysis a.k.a. Baby Rudin.
> Pugh's textbook is not for someone who's taking a first course in Real analysis, and if this is the first time they're introduced to concepts of ε−δ, convergent sequences, cantor sets, function spaces, etc.
> This was all really new to me, and Pugh expects you to derive major results as exercises, and It was beyond my current problem solving ability. So decided to take a different route, and first learn elementary analysis.
> Using [Rudin exercises notes](https://math.berkeley.edu/~gbergman/ug.hndts/m104_Rudin_exs.pdf) from George M. Bergman to find good exercises to solve.

# Principles of Mathematical Analysis

## Ch2: Basic Topology

- Metric space. Properties of metric space.
- For a set A, definition:
	- limit point $x$: $\forall \epsilon>0,(x-\epsilon,x+\epsilon) \setminus \{x\} \cap A\neq \emptyset$
	- isolated point
	- closed set: Every limit point of subset is in the set.
	- interior point $x$: $\exists \delta>0 \ \text{s.t.} (x-\delta,x+\delta)\subset A$
	- open set: Every point is an interior point.
	- perfect set: Set is closed, and every point is a limit point.
	- bounded set
	- dense set:
- E' is the set of all limit points of E. Closure of set E is the set $\bar{E}=E \cup E'$
- compact subset of metric space is closed.
- closed subset of compact set is compact.
- Intersection of finite collection $\{K_{\alpha}\}$ of compact subsets of a metric space is non-empty, i.e. $\bigcap K_{\alpha}\neq \emptyset$.
- every k-cell is compact.
- for a set E in ℝᵏ, Prove why following is equivalent.
	- E is closed and bounded.
	- E is compact.
	- Every infinite subset of E contains a limit point in E.
- Proving why non-empty perfect set is uncountable.
- Proving why Cantor set is perfect.
- Separated set, connected set.
- Prove why subset of real line is connected iff the interval (x, y) has z in the subset when x < z < y.

### Remarks
- A finite set has no limit point.
	- A finite set in R is always closed.
- Q: If a set is infinitely long, does it always have a limit point?
	- No. It doesn't have a limit point.
	- Every bounded set has a limit point.
- Q: set of rational or irrational numbers: Is it open or closed?
	- Both are neither closed nor open.
- Closed and boundedness implies compactness is only true for $\mathbb{R}^{k}$, and not true for all metric spaces.
- 

### Exercises
- 5. Consider a three limit points: 0, 1, 2. Consider sequence A = (1 + 1/n), B = (2 + 1/n), C = (3 + 1/n), and union of A, B, C is bounded and with three limit points.
- 8. Yes, every point of an open set is an interior point, and every interior point is a limit point of the set. For closed sets, it's not true. Consider a finite set {x, y}, it's closed, but is not a limit point.
- 9. f) Consider the set $E=\mathbb{Q}$. Write out $\bar{E},\bar{E}^{\circ}$.
- 12, 13. Form a finite subcover of the sequence and 0. From the definition, K is compact. For 13, form a similar subcover for some countable set of limit points.
- 16. E is clearly bounded between $\sqrt{ 3 },\sqrt{ 2 }$ and $-\sqrt{ 3 },-\sqrt{ 2 }$. To show that E is closed, every limit point in E is in E. and E is not compact because there is no finite subcover for the set. E is also open, because intersection of open intervals is open.
- 19. 
	- a) If A, B are closed sets, then $\bar{A}=A$ and $\bar{B}=B$. Since both are disjoint, $\bar{A}\cap B=\emptyset, \bar{B}\cap A=\emptyset$.
	- b) We'll prove why $\bar{A}\cap B=\emptyset$. Suppose, it's not an empty set, then some $x\in \bar{A}$ implies x is a limit point, and some neighborhood of x has $q \in A$. Since, $x \in B$, that means, $x \in B$, and there exists a neighborhood N that is entirely in B. Then $q\in A$ and q must be in N. Which leads to contradiction.
	- c) Approach is similar to b). Prove both sets are open, and use b).
	- d) Our goal is to prove that any connected metric space between two points p, r is uncountable using c). Create two sets similar to c) A, B. We know that A, B are separated. Assume X is countable, then if we can prove $X=A\cup B$, then that we will arrive at contradiction. Let X = x1, x2, ..., then $d(p,x_i)=\delta_{i}$ is countable. But $d$ is a real number, then there must be a $\delta \not\in$ the set of distances. Hence, $X=A\cup B$. But X is connected, this is a contradiction.
- 22. Use the hint to create a set of rational coordinations: $\mathbb{Q}^{k}$. First prove, the set is countable. Then, prove that it's dense subset of $\mathbb{R}^{k}$. Since $\mathbb{Q}^{k}\subset \mathbb{R}^{k}$, it's separable.
- 23. Use the hint to create a neighborhood of rational radii on every point of the countable dense subset $S$. First prove that set of neighborhoods are countable. This means, they can form a base. Now, take any open set G, and any point $x\in G\subset X$, By the definition of dense subset, x is either in S or a limit point of S. If x is a limit point, then by the definition of limit points, a point $s$ in S is in every neighborhood of x, thus taking any rational neighborhood on s, $x$ must be inside the neighborhood.
- 25. Use the hint to create a neighborhood of radius 1/n: for every integer n, $\{ B(x,1/n): x\in K \}$ on all points of K. Every neighborhood is an open set, and union of neighborhood is an open set. $K\subset\bigcup_{x\in K} B_{\alpha}(x)$.  Since K is compact, for any open cover, there exists a finite subcover for K. Thus, there is a finite subcover for the neighborhoods.
- 30. 

## Ch3: Sequences and Series

### Sequences
- Convergent sequences
	- Limit is unique
	- are bounded
	- has a limit point
- arithmetic on convergent sequences ($(s_{n}),(t_{n})$): $(s_{n}+t_{n})$, $cs_{n}$, $\left( \frac{1}{s_{n}} \right)$, $(s_{n}t_{n})$
- Comparison between sequences
- Subsequences
	- Bolzano-Weirestrass theorem: Every bounded sequence has a convergent subsequence.
- Cauchy sequences
	- Nested Intervals Theorem: Sequence of nested compact sets $(I_{n})$, then $\bigcap_{n}I_{n}\neq \emptyset$, and if $\lim_{ n \to \infty }\text{diam}I_{n}=0$, then $\bigcap_{n=1}^{\infty}I_{n}$ consists of single point.
	- Convergent sequences are cauchy.
	- For a compact metric space, cauchy sequence converges.
	- Cauchy sequence of real numbers converges.
- Monotonic sequences
	- Bounded monotonic sequences converges.
- limit of unbounded sequences, i.e. $\lim_{ n \to \infty }s_{n}=\infty$, then for every real M, there exists $N\in \mathbb{N}$ such that for every n >= N implies $s_{n}\geq M$. Similarly for $-\infty$ case.
- Limit superior: $\lim_{ n \to \infty }\sup a_{n}$ and limit inferior: $\lim_{ n \to \infty }\inf a_{n}$.
	- Let $(a_{n})$ be a sequence, and $\lim_{ n \to \infty }\sup a_{n}=l$, then for any $\epsilon>0$, $a_{n}<l+\epsilon$. and there exists a subsequence that converge to the limit.

### Series
- Series: $s_{n}=\sum_{k=1}^{n}a_{k}$. Series *converges* implies $s=\sum_{n=1}^{\infty}a_{n}$.
	- Convergence: For every ε > 0, there exists N ∈ ℕ such that for all n >= N, $\sum_{n}^{\infty}a_{n}<\epsilon$.
- Comparison theorem: $|a_{n}|\leq c_{n}$. $\sum c_{n}$ converges implies $\sum a_{n}$ converges. Similarly for divergence.
	- Subsequence comparison: $\sum_{n=1}^{\infty} a_{n}$ and $\sum_{k=0}^{\infty}2^{k}a_{2^{k}}$.
- Root and ratio tests
	- Given $\sum a_{n}$ and $a=\lim_{ n \to \infty } \sup \sqrt[n]{|a_{n}|}$. then a < 1, series converge. a > 1, series diverge.
	- Given $\sum a_{n}$ and $a=\lim_{ n \to \infty }\sup|\frac{a_{n+1}}{a_{n}}|$. then a < 1, series converge. a > 1, series diverge.
- Power series: $\sum_{n=0}^{\infty}c_{n}z^{n}$
- Summation by parts: Given two sequences $(a_{n}),(b_{n})$: $\sum_{n=p}^{q}a_{n}b_{n}=\sum_{n=p}^{q-1}A_{n}(b_{n}-b_{n+1})+A_{q}b_{q}-A_{p-1}b_{p}$.
- Absolute convergence is when $\sum |a_{n}|$ converges.
	- Addition and multiplication of series
	- Suppose $\sum_{n=0}^{\infty}a_{n}$ converges absolutely, and $\sum_{n=0}^{\infty}a_{n}=A,\sum_{n=0}^{\infty}b_{n}=B$ and $c_{n}=\sum_{k=0}^{n}a_{k}b_{n-k}$, then $\sum_{n=0}^{\infty}c_{n}=AB$.

### Remarks
- $e=\sum \frac{1}{n!}$. Prove $e=\lim_{ n \to \infty }(1-\frac{1}{n})$

### Exercises
- 21. 

## Ch4: Continuity
- limits of Functions
	- Sequential limit of functions
	- Limit theorems (f+g, fg, f/g)
- Continuous functions
	- If D is compact and f is continuous, then f(D) is compact.
	- Extreme Value Theorem
	- Intermediate Value Theorem
	- D is compact, and f is one-to-one mapping, then $f^{-1}(f(x))=x$ is a continuous mapping.
- Continuity and Compactness implies Uniform continuity
	- f is uniformly continuous on open interval, iff it can be extended to continuous function on closure of the interval.
- Continuity and Connectedness implies f(X) is connected.
- Left and right limit of f. Discontinuities => f(x-) != f(x+)
- Monotonic functions
- Limit superior and Limit inferior
	- $\underset{x\to \bar{x}}{\lim\sup} f(x)= \underset{\delta>0}{\inf} \underset{x\in N_{\delta}(\bar{x})}\sup f(x)$
	- $\underset{x\to \bar{x}}{\lim\inf} f(x)= \underset{\delta>0}{\sup} \underset{x\in N_{\delta}(\bar{x})}\inf f(x)$
	- limsup f(x) = l implies
		- for every ε>0, f(x) < l+ε in the neighborhood
		- for every ε>0, and for every δ>0, there exists $x_{\delta}\in N_{\delta}(\bar{x})$ s.t. $l-ε < f(x_{\delta})$
- Lower and Upper Semicontinuity: definition
	- If f is l.s.c, then f has an absolute minima.
	- Let $L_{a}(f)=\{ x\in X: f(x)\leq a\}$. f is l.s.c. in X iff $L_{a}(f)$ is closed in X for every a ∈ ℝ.

### Remarks
- Let E be noncompact set in R:
	- find a unbounded continuous function on E.
	- find bounded and continuous function with no maxima.
	- let E be bounded, find a continuous function but not uniformly continuous.
- let f be monotonic function in (a,b). Then f is discontinuous at atmost countable points.
- let f be uniformly continuous on I and g be continuous on f(I), then give example why g(f) is not uniformly continuous.

### Exercises
- 20. 
	- a) $\rho_{E}(x)=0$ implies inf d(x,z) = 0, which implies d(z, z) = 0 or x is a limit point of E. This means x is in closure of E. Now, let x in closure, that means x is in E or a limit point of E. In both cases, inf d(x, z) = 0.
	- b) Using the hint, let ε > 0, consider x,y in X such that d(x,y) < ε, and choose δ such that |x-y| < δ.
		- Now, consider $\rho_{E}(x)=\inf_{z\in E}d(x,z)\leq d(x,z)\ \forall z\in E$.
		- Similarly $\rho_{E}(y)\leq d(y,z)$.
		- Using triangle inequality, $\rho_{E}(x)\leq d(x,z)\leq d(x,y)+d(y,z)$.
		- $d(x,z)\leq d(x,y)+\rho_{E}(y)$, because for any z, we can consider z such that $d(x,z)$ is infimum.
		- $\rho_{E}(x)-\rho_{E}(y)\leq d(x,y)<\epsilon$. Hence, $\rho_{E}$ is UC.
- 21. 
	- a) Using the hint, first prove that $\rho_{F}(K)$ is continuous and positive function. Take any ε > 0, choose x,y such that d(x,y) < δ < ε, then $\rho_{F}(x)-\rho_{F}(y)\leq d(x,y)<ε$ using triangle inequality and infimum definition of $\rho$. Thus, f is continuous. Since F, and K are disjoint, d(x, f) where x in X, and f in F is always positive and attains a minimum δ. Hence, for any p in K, and q in F, d(p,q) > δ.
	- b) Counterexample for closed disjoint sets is unbounded sets in $\mathbb{R}^{2}$ such that they have same limit point, i.e. $A = \{(x,0):x\in \mathbb{R}\}$ and $B=\{ (x,1/x): x \in \mathbb{R} \}$. Both are closed, and disjoint. But when x -> ∞, there exists no δ such that d(x,y) > δ.
- 22. Using 20, we know that $\rho_{A}(x),\rho_{B}(x)$ is UC, then $\frac{\rho_{A}(x)}{\rho_{A}(x)+\rho_{B}(x)}$ is continuous in X. and $\rho_{B}>0 \implies\rho_{A}+\rho_{B}>\rho_{A}$. Hence, $f(p)\subseteq[0,1]$. Since A, B are disjoint closed sets, and from 20, $\rho_{A}=0$ on $\bar{A}=A$, and $\rho_{B}=0$ on $\bar{B}=B$. We can show that V is open by using thereom 4, i.e. $[0,1/2)$ is open in $\mathbb{R}$, and f is continuous implies $f^{-1}([0,1/2))$ is open. Similarly for W. To show that V,W is disjoint, assume $V\cap W\neq \emptyset$, then $x\in V, x \in W$. Using this, we can show that f is not continuous.
- 23. First let's prove the inequality, by taking $\lambda=\left( \frac{x-a}{b-a} \right)$, then $\lambda \in[0,1]$ for x in \[a,b\]. $f(x)=\lambda f(b)+(1-\lambda )f(a)\leq \lambda f(b)+(1-\lambda)f(a)=\left( \frac{x-a}{b-a} \right)f(b)+f(a)$ implies $\frac{f(x)-f(a)}{x-a}\leq \frac{f(b)-f(a)}{b-a}$. Taking $\lambda=\left( \frac{b-x}{b-a} \right)$, and proceeding similarly, we get the right inequality.
	- Using this inequality, we can prove that f is bounded on closed intervals \[c,d\] ⊂ (a,b). Assume f(c), f(d) is bounded and let $k=f(d)-f(c)/(d-c)$. Thus, f(x) - f(c) <= (x-c)(f(d)-f(c)/(d-c)). Thus, f(x) <= f(c) + (x-c)k. Hence, lower bound of f = f(c). Similarly, upper bound = f(d).
	- a) Continuity: Using this, we can prove left and right limit at any point $x_{0}$ in (a,b).
	- b) f is increasing convex on the interval containing g(x), and g is convex, prove $f\cdot g$ is convex. Trivially proven using the definition of increasing and convex function.

## Ch5: Differentiation
- f differentiable at point p. f+g, cf, fg, f/g differentiable at point p.
- Prove chain rule, f is differentiable at point p and g is differentiable at f(p). Prove $(g\circ f)^{\prime}(a)=g^{\prime}(f(a)) f^{\prime}(a)$.
- Fermat's rule: let I be an open interval in R, and f attains local minimum or maximum at p in I, then $f^{\prime}(p)=0$.
- Rolle's theorem, Mean value theorem
- Cauchy's theorem: f, g is continuous on $[a,b]$, and differentiable at $(a,b)$. Then there exists a c in $(a,b)$ such that $[f(b)-f(a)]g'(c) = [g(b)-g(a)]f'(c)$.
- Right and left derivative.
- IVT for derivatives: $f'_{-}(a)<\lambda<f'_{+}(b)$, then there exists a $c\in(a,b)$ such that $f'(c)=\lambda$.
- Inverse Function Theorem: Let f be differentiable on open interval, and f'(x) != 0 for all x in (a,b).
	- Then f is 1-1 on open interval I, and f(I) is open, and the inverse function $f^{-1}:f(I)\to I$ is differentiable, such that $\left(f^{-1}\right)'(y)=\frac{1}{f'(x)}$, where f(x)=y.
- L-Hopital rule: Let f,g be continuous on \[a,b\] and differentiable at (a,b). Prove that $\lim_{ x \to \bar{x} }f(x)/g(x)=l=\lim_{ x \to \bar{x} }f'(x)/g'(x)$ for following conditions:
	- Suppose, $f(\bar{x})=g(\bar{x})=0$ for some $\bar{x}\in[a,b]$. Suppose, further $\exists\delta>0$ such that g'(x) != 0 for all x in $N_{\delta}(\bar{x})$.
	- Suppose, $f,g: (a,b)\setminus\{ \bar{x} \}\to \mathbb{R}$ are differentiable on the domain, and $\lim_{ x \to \bar{x} }f(x)=\infty=\lim_{ x \to \bar{x} }g(x)$. Suppose, further $\exists\ \delta>0$ such that g'(x) != 0 for all x in $N_{\delta}(\bar{x})$.
- If f is rth order differentiable, then f can be approximated using taylor series as $P(h)=f(x)+f'(x)h+\frac{f''(x)h^{2}}{2!}+\dots+\frac{f^{(r)}(x)h^{r}}{r!}$.
	- P approximates f to the order r in the sense that Taylor Remainder R(h)=f(x+h)-P(h) is rth order flat at h=0, i.e. $h\to 0\implies\frac{R(h)}{h^{r}}\to0$.
	- Taylor polynomial is the only polynomial of degree <= r with this approximation property.
	- Taylor's theorem: If f is r+1th order differentiable, then there exists a t in $(\alpha,\beta)$ such that $f(\beta)=P(\beta)+\frac{f^{(n)}(t)}{n!}(\beta-\alpha)^{n}$, where P is the taylor polynomial, and last term is the taylor remainder.
- Differentiation of Complex valued function: All theorems for real-valued function (limit, arithmetic of differentiation applies).
- Differentiation of Vector valued function

### Remarks
- complex valued function for which mean-value theorem doesn't apply.
- vector valued function for which mean-value theorem doesn't apply.

### Exercises
- 19.
	- a) Applying MVT to difference quotient, then there exists cn between an, bn where $f'(c_{n}) = D_{n}$. Since $\alpha_{n}\to 0$ and $\beta_{n}\to0$. there must exists $c_{n}\to0$ (using squeeze theorem). so, $D_{n}=\frac{f(\beta_{n})-f(0)+f(0)-f(\alpha_{n})}{\beta_{n}-\alpha_{n}}$. Use the definition of differentiation to get the limit.
	- b) If $\frac{\beta_{n}}{\beta_{n}-\alpha_{n}}$ is bounded, then find the bound to $\frac{\alpha_{n}}{\beta_{n}-\alpha_{n}}$. Apply definition of diff to Dn, and find the answer.
	- c) again use MVT and squeeze theorem to find $c_n \to 0$ when $n\to\infty$. then f' is continuous, that means $\lim_{n\to \infty} f'(c) = f'(0)$ when $c_{n}\to0$.
- 21. First see that $\rho_{E}$ is not differentiable on even finite closed sets like {0}. So, I need to add either more $\rho$ or take powers. What if i create a function that's 0 on E, and constant everywhere? In that way, f'(x) will be 0 everywhere, but still defined.
	- or something that smooths out the whole interval like $\sum \rho_{E}(x)^{n}$?
- 22. a) Use IVT for differentiation to infer that either f'(x) > 1 or f'(x) < 1. This means, f(x) grows either slowly than g(x) = x or faster. Suppose there is a fixed point at p, after that, f(x) either > x or < x, but never same.
	- b) $f(t)-t = (1+e^t)^{-1}$, find out $f'(x)-1 = -\frac{e^{t}}{(1+e^{t})^{2}}$. For a limit point, this has to equal 0 at some point, but it's always negative. and f(t)-t != 0.
	- c) Since f'(t) is differentiable, it must be continuous for all real t, we can apply mean value theorem such that $f'(t) = \frac{f(x_{n+1})-f(x_{n})}{x_{n+1}-x_{n}}\leq A\implies x_{n+2}-x_{n+1}\leq A(x_{n+1}-x_{n})\leq A^{n}(x_{2}-x_{1})$. Using this we can prove that sequence $(x_{n})$ is a cauchy sequence by choosing m such that $A^{m}|x_{2}-x_{1}|<\epsilon$. Then, let $\bar{x}$ be the limit point of the sequence, since f is continuous, $\lim_{ n \to \infty }f(x_{n})=f(\bar{x})=\bar{x}$. This proves that f has a fixed point.
- 25. b) $\frac{f(x_{n})}{f'(x_{n})}>0\implies x_{n+1}<x_{n}$. We can prove that the sequence is bounded below by $\xi$ as applying $f(\xi)$ implies $x_{n+1}=x_{n}$, thus $\inf x_n=\xi$. let limit be l, then for $n\to \infty$, $l=l-\frac{f(l)}{f'(l)}$ since f is continuous. Hence, f(l) = 0, since $\xi$ is unique, $l=\xi$.
	- c) Applying taylor's theorem directly yields the inequality.
	- d) Put $l=x_{n}-\xi$, and apply the inequality recursively as $\frac{f''(t_{n})}{2f'(x_{n})}\leq \frac{M}{2\delta}=A$.
	- e) Fixed point of g implies g(x) = x = x - f(x)/f'(x) => f(x) = 0. $g'(x) = 1 - \frac{f'(x)^{2}-f(x)f''(x)}{f'(x)^{2}}$. Substituting $x=\xi$, $g'(\xi)=1-\frac{f'(\xi)^{2}-f(\xi)f''(\xi)}{f'(\xi)^{2}}=0$, i.e. g'(x)->0 for x near fixed point.
- 26. First see that you can derive the hint, i.e. $|f(x)|\leq M_{1}(x_{0}-a)\leq A(x_{0}-a)M_{0}$. Then, use compactness of the interval \[a,b\] to conclude that finitely open subcovers $V_{\alpha}$ exist, such that closed set $[a,x_{0}]\subseteq V_{i}$, then we can cover the whole interval using finite closed subsets, and f=0 in each of that interval.
- 27. Assume, the function has two solutions: $f_{1}'(x)=\phi(x,f_{1}(x)),f_{2}'(x)=\phi(x,f_{2}(x))$. Applying the inequality $|f_{1}'(x)-f_{2}'(x)|\leq A|f_{1}(x)-f_{2}(x)|$. Take h(x) = f1(x)-f2(x). From the problem 26, h(x) is differentiable on \[a,b\], h(a) = 0, and |h'(x)| = |f1'(x)-f2'(x)|<=A|h(x)|. Thus, h(x) = 0 for all x in \[a,b\]. Thus, f1 = f2.

## Ch6: Riemann-Stieltjes Integral
- Riemann Integral definition
- Riemann-Stieltjes integram definition
	- Q: Why there's a need for monotone increasing function? What does it represent?
	- $\int_{-}fd\alpha=\int^-fd\alpha=\int_{a}^{b}fd\alpha$.
- Refinement $P^{*}\supset P$.
	- $L(P_{1},f,\alpha)\leq L(P^{*},f,\alpha)\leq U(P^{*},f,\alpha)\leq U(P_{2},f,\alpha)$.
	- $L(P,f,\alpha)\leq \int fd\alpha\leq U(f,P,\alpha)$
- Criteria for Integrability: $f\in \mathscr{R}(\alpha)\iff\forall \space \epsilon >0,\exists P \ \text{s.t.} \space U(P,f,\alpha)-L(P,f,\alpha)<\epsilon$
- f is continuous implies f is Riemann integrable.
	- $U(f,P,\alpha)-L(f,P,\alpha)=\sum_{i=1}^{n}(M_{i}-m_{i})\Delta\alpha$
- f has finitely many discontinuities, and $\alpha$ is continuous at those points, and f is continuous everywhere else. f is Riemann integrable.
	- What if $\alpha$ is discontinuous there?
	- What if $f$ is discontinuous at infinitely many points?
- **Lebesgue Criterion for Riemann Integrability**: $f$ is integrable in $[a,b]$ and bounded by $[M,m]$, and $\phi$ is uniformly continuous in $[m,M]$. Then $\phi\circ f$ is integrable.
	- If $f$ is Riemann integrable, then so is $\lvert f\rvert, f^{2}$
	- Converse is not true: *Dirichlet* function
- Properties of Integral:
	- $f_{1},f_{2}\in \mathscr{R}(\alpha)$ on \[a,b\], then f1+f2 is integrable, and $\int fd\alpha=\int f_{1}d\alpha+\int f_{2}d\alpha$.
	- $\int cfd\alpha=c\int fd\alpha$
	- f is integrable on \[a,b\] and a < c < b, then $\int_{a}^{b}fd\alpha=\int_{a}^{c}fd\alpha+\int_{c}^{b}fd\alpha$
- Unit step function
- Let $(s_{n})$ be sequence of distinct points in (a,b). $\alpha(x)=\sum_{n=1}^{\infty}c_{n}I(x-s_{n})$, and let f be continuous in \[a,b\], then $\int_{a}^{b}fd\alpha=\sum_{n=1}^{\infty}f(s_{n})$.
	- One detail not mentioned is the proof works only for partition like $a<s_{1}<\cdots<s_{n}<b$, because $\int_{a}^{b}fd\alpha_{1}$ is we want each sequence to be used as partition point, so that jumps are discrete, and easier to analyze when doing $\alpha(x_{i})-\alpha(x_{i-1})$.
- Let $\alpha$ be monotonically increasing, and $\alpha'\in\mathscr{R}$ on \[a,b\]. Let f be bounded on the interval, then f is integrable iff $f\alpha'$ is integrable, and $\int_{a}^{b}fd\alpha=\int_{a}^{b}f(x)\alpha'(x)dx$.
- Properties of $\alpha$ in Stieltjes Integral
	- When $\alpha$ is pure step function, Integral reduces to finite or infinite series.
	- When $\alpha$ has integrable derivative, integral reduces to ordinary Riemann Integral.
- Integration and differentiation: $F(x)=\int_{a}^{x} f(t)dt$, then F is continuous on \[a,b\], and if f is continuous at x0, then F'(x0)=f(x0).
- Fundamental theorem of calculus: $\int_{a}^{b} f(x) \, dx=F(b)-F(a)$
	- What are the required conditions for this?
- Rectifiable curves
	- Curve: $\gamma:[a,b]\to \mathbb{R}^{k}$
	- Polygonal length: $\Lambda(\gamma,P)=\sum_{i=1}^{n}|\gamma(x_{i})-\gamma(x_{i-1})|$ for a partition P = {x0,...,xn}.
	- Length of the curve: $\Lambda(\gamma)=\sup\Lambda(P,\gamma)$ over all partitions.
	- Curve is *rectifiable* when $\Lambda(y)<\infty$.
	- Examples: Line segment, circle: $\gamma=(\cos t,\sin t)$ for $t \in [0,2\pi]$.
	- if $\gamma'$ is continuous on \[a,b\], then $\gamma$ is rectifiable, and $\gamma(y)=\int_{a}^{b} |\gamma'(t)| \, dt$
		- Non-rectifiable curve: sin(1/x). $\gamma'$ is not continuous on (0,1\]
		- TODO: come back to this proof later.

### Exercises
- 3. a) Let f be integrable, there for every ε > 0, there exists a partition P such that $U-L<\epsilon$. Then two cases appear, 0 is a point on partition, or 0 is an interior point. For both, U = M = sup f(0+), L = m = inf f(0+). Thus, |f(0+)-f(0)| < e. All other subproblems are done similarly.
- 6. Hint gives away the solution entirely :). P is constructed using finitely many intervals $\bigcup_{k=1}^{2^{n}}I_{n,k}$, and the total length of the intervals is $\frac{2}{3}^{n}$, so now we can take n to arbitrarily large and reduce the total length < ε. There are finitely many intervals covering C, f is continuous in complement of C, and the set is compact, so f is uniformly continuous. Proceeding as the theorem mentioned, creating the partition as x1,...,xn such that each boundary point of the interval is in it, but no interior point of the interval from Cantor set is part of the partition.
- 8. f(x) >= 0, and f decreases monotonically. in the interval for x in \[n,n+1\], f(n+1) < f(x) < f(n) implies $\sum_{i=n}^{n+1}f(i+1)\leq \int_{n}^{n+1}fdx\leq \sum_{i=n}^{n+1}f(i)$. Summing over all interval, $\sum_{n=1}^{\infty}f(n+1)\leq \int_{1}^{\infty}f(x)dx\leq \sum_{n=1}^{\infty}f(n)$. Using the convergence for both one by one, we can prove the other converges.
- 9. Theorem: *"Suppose F and G are differentiable functions on $[a,\infty)$, and $F'=f \in \mathscr{R}$, and $G'=g \in \mathscr{R}$. Suppose $\lim_{b\to\infty} F(b)G(b)$ exists. Suppose $\int_a^{\infty} f(x)G(x)dx = \lim_{b\to\infty} \int_a^b f(x)G(x)dx$ exists, and is finite. Then $\int_a^\infty F(x)g(x)dx$ exists and equals $\lim_{b\to\infty} F(b)G(b) - G(a)F(a) - \int_a^\infty f(x)G(x)dx$."*
	- To prove this, just put H(x) = F(x)G(x), and apply fundamental theorem of calculus to H'(x). Use the limit existence assumption.
	- For instance part: take F(x) = sinx and G(x) = 1/(1+x).
- 10. a) write F(u) = u^p/p + v^q/q - uv. We want to prove F(u) >= 0. Find F'(u), and prove that the point where minima occurs should be greater than 0. b) Applying a) to b) gives the inequality. c) Take RHS by LHS of the inequality, and assume F = f/f_p, where f_p is the right hand side inequality. $\int|F|^{p}=1=\int|G|^{q}$. Use b).
- 12. Using the hint, define the continuous function g(t). g(t) is bounded $m_{i}\leq f(x_{i-1}\leq g(t)\leq f(x_{i})\leq M_{i}$, where $m_{i},M_{i}$ are the supremum and infimum of the interval $[x_{i-1},x_{i}]$. Then, to show $\int|f(t)-g(t)|^{2}dt<\epsilon^{2}$, i'll first find the bound on $f(t)-g(t)$, which should be $M_{i}-m_{i}$. This implies $|f(t)-g(t)|^{2}\leq(M_{i}-m_{i})^{2}\leq 2M(M_{i}-m_{i})$, where M = sup|f(x)|. Then applying this to the riemann integral, $\int|f(t)-g(t)|^{2}dt=\sum_{i=1}^{n}\int_{x_{i-1}}^{x_{i}}|f(t)-g(t)|^{2}dt\leq \sum_{i=1}^{n}2M(M_{i}-m_{i})\Delta x_{i}\leq 2M(U-L)$. Since f is integrable, we can choose partition such that $U-L < \frac{2M}{\epsilon}$.
- 16. a) Solving the integral, and putting m = n+1, gives out the inequality. b) Also solving the integral, cancels out the first s/s-1 term, and the remaining term is equal to integral in (a).

## Ch7: Sequences and Series of Functions
- Sequences of function $(f_{n})_{n=1}^{\infty}$
- Pointwise convergence of function: $\lim_{ n \to \infty }f_{n}(x)=f(x)$.
- Sum of the series of function: $f(x)=\sum_{n=1}^{\infty}f_{n}(x)$
- Uniform convergence: $\forall \ \epsilon>0, \exists\, N\in \mathbb{N}\ \text{s.t.}\ \forall\, n\geq N\implies|f_{n}(x)-f(x)|<\epsilon$
	- Cauchy's convergence criterion

![uniform-convergence](thoughts/images/uniform-convergence.svg)

- Uniform convergence and Continuity
	- Suppose $f_{n}\to f$ uniformly on a set E in a metric space. Let x be the limit point, and suppose that $\lim_{ t \to x }f_{n}(t)=A_{n}$. Then, $A_{n}$ converges, and $\lim_{ t \to x }f(t)=\lim_{ n \to \infty }A_{n}$.
	- Series of continuous function that converges uniformly to f implies f is continuous.
	- To prove converse: i.e. $f_{n}$ is a sequence of continuous function on set K and converges pointwise to continuous function f. Then $f_{n}\to f$ uniformly on K.
		- We need two assumption: set K is compact, and $f_{n}(x)\geq f_{n+1}(x)$.
	- Let $\mathscr{C}(X)$ be set of all complex-valued, continuous, and bounded functions on domain X, then $\mathscr{C}(X)$ is a metric space.
		- Define the metric on a function f as supremum of norm: $\lVert f \rVert=\sup_{x\in X}\lvert f(x) \rvert$
		- Define $\lVert f+g \rVert$.
		- Prove $\lVert f-g \rVert\leq \lVert f-r \rVert+\lVert r-g \rVert$.
		- Prove $\mathscr{C}(X)$ is a complete metric space.
- Uniform convergence and Integration
	- $f_{n}\in \mathscr{R}(\alpha)$ on \[a,b\] and $f_{n}\to f$ uniformly. Then $f\in\mathscr{R}(\alpha)$ and $\int_{a}^{b}fd\alpha=\lim_{ n \to \infty }\int_{a}^{b} f_{n} d\alpha$.
- Uniform convergence and differentiation
	- $f_{n}$ is sequence of continuous and differentiable functions on \[a,b\] and $\left(f_{n}(x_{0})\right)$ converges for some point $x_{0}\in[a,b]$. If $(f_{n}')$ converges uniformly, then $(f_{n})$ converges uniformly to function f, and $f'(x)=\lim_{ n \to \infty }f_{n}'(x) \ \forall\,x\in[a,b]$.
- Equicontinuity
	- Pointwise boundedness
	- Uniform boundedness
	- ==Does every convergent sequence contains a uniformly convergent subsequence?==
		- $f_{n}(x)=\frac{x^{2}}{x^{2}+(1-nx)^{2}}$
	- Definition: Family of function is equicontinuous on set E, $\forall\ \epsilon>0, \exists\, \delta>0,\ \text{s.t}\ |f(x)-f(y)|<\epsilon$ whenever d(x,y)<δ, x∈E,y∈E,$\mathscr{F}$.
	- What's the difference between family of function being equicontinuous, and each individual function being uniformly continuous?
	- If $(f_{n})$ is a pointwise bounded sequence of complex functions on a countable set E, then $(f_{n})$ has a subsequence $(f_{n_{k}})$ such that $(f_{n_{k}}(x))$ converges for every x in E.
	- K is compact, if $f_{n}\in\mathscr{R}(K)$ and $(f_{n})$ converges uniformly in K, then $(f_{n})$ is equicontinuous on K.
	- K compact, $(f_{n})$ is pointwise bounded and equicontinuous on K.
		- a) $(f_{n})$ is uniformly bounded on K
		- b) $(f_{n})$ contains a uniformly convergent subsequence.
		- Q: Why are all three compactness, pointwise boundedness, and equicontinuity needed?
			- If non-compact set is used, then there are no finite open subcovers of the set.
			- if function isn't pointwise-bounded like $f_{n}=n$, then there's the function sequence can grow arbitrarily large.
			- without equicontinuity, function is not horizontally bounded.
- **Function approximation by Stone-Weierstrass**
- If f is continuous complex function on \[a,b\], then there exists a sequence of polynomials Pn such that $\lim_{ n \to \infty }P_{n}(x)=f(x)$ uniformly on \[a,b\].
	- Approximating the identity function: Sequence $(Q_{n})$ of function $Q_{n}:[-1,1]\to \mathbb{R}$ such that $\int_{-1}^{1}Q_{n}dx=1$, and $\forall\ \delta>0, \delta \in[0,1], \exists \,n$ such that $Q_{n}\to0$ uniformly in $|x|\in[\delta,1]$.
	- Let $Q_{n}=c_{n}(1-x^{2})^{n};n=1,2\dots$, where $c_{n}=\frac{1}{\int_{-1}^{1}(1-x^{2})^{n}dx}$.
	- Above condition implies $c_{n}<\sqrt{ n }$
	- $Q_{n}\leq \sqrt{ n }(1-\delta^{2})^{n}$ for $|x| \in[\delta,1]$. Thus $Q_{n}$ uniformly converges to 0 as $n\to \infty$
	- We perform convolution of Qn and f, i.e. $P_{n}=\int_{-1}^{1}f(x+1)Q_{n}(t)dt$, to get an approximation, since Qn is an approximation of the identity.
	- We need to prove two things: Pn is a polynomial, and $\lim_{ n \to \infty }P_{n}=f$.

> [!tip] Convolution
> To take weighted average of a function f in neighborhood of x, we can use a kernel Q(x) such that $\sum_{t=0}^{1} f(x+t)Q(t)$. Properties of the kernel are: Q takes supremum around t = 0, as t->1, Q(x)->0.
>
> It helps to visualise the graph for different values of n: [Desmos \| Graphing Calculator](https://www.desmos.com/calculator/x6b8923ff2)

**Proof**:
- Reduce interval from \[a,b\] to \[0,1\]. and assume f(0) = f(1) = 0, and f=0 for x outside \[0,1\]. Then f is uniformly continuous.
- Consider kernel polynomial sequence $Q_{n}(x)=c_{n}(1-x^{2})^{n}$, where $c_{n}$ is chosen so that $\int_{-1}^{1}Q_{n}(x)dx=1$ for n = (1,2,...).
	- This kernel polynomial is used to perform a convolution with f, to obtain a polynomial such that f(x) = Pn(x).
	- As explained earlier, the properties of Qn are: concentrated near 0, and positive, decreases sharply as n increases.
- Calculate $\int_{-1}^{1}(1-x^{2})^{n}dx$ to find the magnitude of normalization factor $c_{n}<\sqrt{ n }$.
	- This implies that for any δ>0 and $x \in[\delta,1]$, $Q_{n}(x)\leq \sqrt{ n }(1-\delta^{2})^{n}$.
- Now, we perform the convolution on f, $P_{n}(x)=\int_{-1}^{1}f(x+t)Q_{n}(t)dt=\int_{0}^{1}f(t)Q_{n}(t-x)dt$.
	- Since f is non-zero in \[0,1\], then 0 <= x+t <= 1 => -x <= t <= 1-x. Substitute x+t = s.
	- $P_{n}(x)$ turns out to be a **polynomial** since $Q_{n}(t-x)=c_{n}(1-(t-x)^{2})^{n}$ is a polynomial in x, and we sum f over all of t.
- f is also uniformly continuous, then calculate the limit $|P_{n}(x)-f(x)|$.
- Divide the interval in three parts: $[-1,-\delta),[-\delta,\delta],(\delta,1]$.

**Function spaces algebra**
- Family of functions: $\mathcal{A}$
- f,g in A then f+g,fg,cf in A, where c is real.
- A is *Uniformly closed* if limit f of all uniformly convergent sequences (fn) in A: fn->f.
- *uniform closure* B of A: set of all limit functions of all uniformly convergent sequences in A.
- A is said to be *separate points* if for every pair of distinct points x1,x2 in A, there exists a function f in A such that $f(x_{1}) \neq f(x_{2})$.
- If A separates points on set E, and A vanishes at no point of E. then A contains a function f such that for distinct points x1,x2 and constants c1,c2, f(x1)=c1 and f(x2)=c2.
- Let A be an algebra of real continuous functions on compact set K. If A separates points on K, and vanishes at no point, then the uniform closure B consists of all real continuous functions on K.
	- Proof is done in four sub-parts:
	- 1. if $f\in \mathscr{B}\implies|f|\in\mathscr{B}$
	- 2. if $f,g\in \mathscr{B}$ then $\max(f,g)\in\mathscr{B}$ and $\min(f,g)\in\mathscr{B}$.
	- 3. Given real continuous function f, and x in K, and ε > 0, there exists a function $g_{x}\in\mathscr{B}$ such that $g_{x}(x)=f(x)$, and $g_{x}(t)>f(x)-\epsilon$.
	- 4. 

### Remarks
- Examples of converging sequence of differentiable function whose limit function is not differentiable: $f(x)=\lim_{ n \to \infty }x^{n}$
- Sequence of continuous function converging to a limit that is not continuous: $g_{n}(x)=x^{1+\frac{1}{2n-1}}$.
- Nowhere differentiable continuous function: **Sawtooth** function:
	- $\varphi(x)=|x| \ \forall\, x\in[-1,1]$ and $\varphi(x+2)=\varphi(x)$.
	- Prove this function is continuous.
	- Create a uniformly converging series f(x) consisting of $\varphi$. Show that f is continuous.
	- Choose a $\delta_{m}$ such that f is not differentiable, i.e. $\lvert\frac{f(x+\delta_{m})-f(x)}{\delta_{m}}\vert\geq \infty$
- Most continuous functions are nowhere differentiable.

### Exercises

- 3. In 2, we proved that for fg to converge uniformly, we need both fn,gn to be sequence of bounded functions. So, taking fn to be sequence of unbounded functions like (x+1/n) such that fngn does not converge uniformly.
- 4. This function is not defined for x when $(1+n^{2}x)=0$, i.e. forms a countable set for which f(x) does not converge absolutely. For large values of n, and x > 0 or x < 0, and avoiding countable points, $\frac{1}{1+n^{2}x}\leq \frac{1}{n^{2}x}$. For x = 0, series diverges.
	- b) for any $\delta >0$, $x\in[\delta,\infty)\cup(-\infty,-\delta-1]$, function can be compared with $\frac{1}{n^{2}}$ which converges absolutely.
	- c) fails to converge at interval $(0,\delta)\cup(-1-\delta,0)$. $\lim_{ n \to \infty }f_{n}(x)=\frac{1}{1+n^{2}x}=0$. Choosing $x=\frac{1}{n^{2}}$ such that $\frac{1}{n^{2}}<\delta$, then series fails to converge.
	- d) Yes, f is continuous, by showing that each fn converges uniformly to f, then f is continuous.
- 6. $\sum_{n=1}^{\infty}|(-1)^n \frac{x^{2}+n}{n^{2}}|>\sum_{n=1}^{\infty} \frac{1}{n}$ which doesn't converge. Hence, series doesn't converge absolutely. For uniform convergence in a bounded interval (a,b), $\sum_{n=1}^{\infty}(-1)^{n} \frac{x^{2}}{n^{2}}+(-1)^{n}\frac{1}{n}$. Both 1/n and 1/n2 converges, so the partial sum $\lvert\sum_{n=1}^{\infty}-\sum_{n=1}^{N}\rvert = \lvert\sum_{n+1}^{\infty}(-1)^{n} \frac{1}{n} + \frac{x^{2}}{n^{2}}\rvert<\epsilon$.
- 8. Partial sum $|\sum_{n+1}^{\infty}c_{n}I(x-x_{n})|<|\sum_{n+1}^{\infty} c_{n}|<\epsilon$ of the series converges due to $\sum \lvert c_{n} \rvert$. And for any x != xn, f is continuous because partial sum is continuous is the interval $(x_{n},x_{n+1})$, and partial sum converges uniformly to f, thus f is continuous.
- 9. $\lvert f_{n}(x_{n})-f(x)\rvert\leq \lvert f_{n}(x_{n})-f_{n}(x)\rvert+\lvert f_{n}(x)-f(x)\rvert<\frac{\epsilon}{2}+\frac{\epsilon}{2}=\epsilon$. Converse is false because taking any continuous function but not uniformly continuous function, we can prove that converse does not hold. Like take $f_{n}(x)=\frac{x}{n}$ on set \[0,1\]. To show that this function converges uniformly to f=0, we need to find n such that $\lvert f_{n}-f\rvert=\left\lvert  \frac{x_{n}}{n}-0 \right\rvert<\epsilon\implies|x_{n}|<n\epsilon$ is true for all x in \[0,1\]. but, for x > ne, this doesn't converge.
- 10. This function is discontinuous at all x of form p/q, i.e. when x is rational. and the total jump that occur for f(x) at x = p/q is on n = kq, i.e. $\sum_{k=1}^{\infty}\left( kq\cdot \frac{p}{q} \right)/(kq)^{2}=\frac{1}{q^{2}}\sum_{k=1}^{\infty} \frac{1}{k^{2}}= \frac{\pi^{2}}{6q^{2}}$. Since Q form a countable dense set, f is Riemann integrable on every bounded interval using theorem 6.10.
- 13. a) Using hints, first let's prove that f is continuous. Take any x between two rationals, r < x < s. Since $|f_{n_{i}}(x)-f(x)|<\epsilon$. Using pointwise convergence at rationals for subsequence, boundedness of subsequence, and continuity of f, $|f_{n_{i}}(x)-f(x)-f_{n_{i}}(r)+f_{n_{i}}(r)-f(r)+f(r)|<\lvert f_{n_{i}}(x)-f_{n_{i}}(r)\rvert+\lvert f_{n_{i}}(r)-f(r)\rvert+\lvert f(r)-f(x)\rvert<2M+2\epsilon$. Since subsequence is bounded, we can equate each jump of discontuity with a rational, and thus, there are finitely many discontinuities of f. We can use diagonal argument to find a subsequence that's pointwise convergent at f for points of discontinuities.
	- b) K is compact, f is uniformly continuous in K. For some $\delta>0$, |f(x)-f(y)| < ε. Then, using this $\delta$, we can find open finite cover of K, and use the same argument as a) to prove that subsequence converges to f in that interval. Then taking maximum of all $n_{k}$ in all intervals, $f_{n_{k}}\to f$ uniformly.
- 16. Using similar approach as 13, Fix ε. Use equicontinuity to find δ such that $|f_n(x) - f_n(y)| < ε$ for all n when |x-y| < δ. Cover K with finitely many neighborhood such that $K ⊂ \bigcup_{i=1}^{n} V(x_i, \delta)$ (using compactness). For each $x_i$, use pointwise convergence to find $N_i$ such that $|f_n(x_i) - f_m(x_i)| < ε$ for $n,m > N_i$. choose an N1 such that $|f_n(x)-f_n(x_{1})|<\epsilon$, and $|f_n(x1) - f_m(x_{1})| < \epsilon$ (due to pointwise convergence) and $|f_m(x_{1})-f_m(y)|<\epsilon$ (due to equicontinuity). Set N to be the maximum of all these $N_i$ values, then for any x in K, I can find a nearby center $x_i$ and use the triangle inequality to bound the difference between $f_n(x)$ and $f_m(x)$ by 3ε. This establishes the uniform Cauchy criterion.
- 20. Use stone-weirestrass to approximate f with a polynomial. Then $\int_{0}^{1} f^{2}(x)dx=\left(\int_{0}^{1}fdx\right)^{2}=0$.
- 21. 
- 22. i can use 6.12 to define a continuous function g such that $|f-g|^2 < \epsilon/2$. And since g is continuous in a compact set, i can use stone-weierstrass to approximate the polynomial g by finding a sequence of polynomials such that $lim_{n\to \infty} P_{n}(x) = g(x)$, for all x in E. i.e. $|P_{n}(x)-g(x)|^2 < \epsilon/2$. Then use triangle inequality to get the desired inequality.
- 23. Let's go through the hint, $|x|-P_{n+1}(x)=(\lvert x\rvert-P_{n}(x))+\frac{(\lvert x\rvert-P_{n}(x))(\lvert x\rvert+P_{n}(x))}{2}=[(x-P_{n}(x))]\left[1- \frac{|x|+P_{n}(x)}{2}\right]$. Now, using induction, we'll prove the first identity. Take base case as n=1, 0<=P1<=|x|. For n+1, assume n is true, then, $0\leq P_{n+1}(x)\leq |x|$. To prove the last identity, we'll apply the identity for $P_{n}$ recursively, i.e. $|x|-P_{n}(x)=[|x|-P_{n-2}(x)]\left[1- \frac{|x|+P_{n-1}}{2}\right]\cdot \left[ 1- \frac{|x|+P_{n-2}(x)}{2} \right]$. We'll get the first inequality. To get the last inequality, we'll need to find the maximum of the expression. Differentiating it, and putting the derivation equal to 0, we get x = 2/n+1. Putting the value in the expression, $|x|-P_{n}(x)\leq \lvert x| \left( 1-\frac{\lvert x\rvert}{2} \right)^{n}\leq \frac{2}{n+1}\left( \frac{n}{n+1} \right)^{n}\leq \frac{2}{n+1}$. Applying the limit, we prove our result.

## Ch8: Special Functions

- Analytic functions are expressed as $f(x)=\sum_{n=0}^{\infty}c_{n}(x-a)^{n}$.
	- Interval of convergence: $(-R,R)$
	- Smooth functions: Inifinitely differentiable functions.
	- Example of smooth non-analytic function
	- Taylor series of an analytic function, is only possible when the function is smooth.
	- If f converges for |x-a| < R, then we say f is expanded as power series at point x=a.
- Power series
	- Suppose series $\sum_{n=0}^{\infty}c_{n}x^{n}$ converges for |x|< R, and f(x) is defined as the series. Then series converges uniformly in $(-R+\epsilon,R-\epsilon)$ for all ε>0, and f is continuous and differentiable in (-R,R) and $f'(x)=\sum_{n=0}^{\infty}nc_{n}x^{n-1}$.
	- Suppose power series converges, and $f(x)=\sum_{n=0}^{\infty}c_{n}x^{n}$ and $\lvert x\rvert<1$, then $\lim_{ x \to 1 }f(x)=\sum_{n=0}^{\infty}c_{n}$.
		- Let $s_{m}=\sum_{n=0}^{m}c_{n}$.
		- Prove: ==$\sum_{n=0}^{m}c_{n}x^{n}=(1-x)\sum_{n=0}^{m-1}s_{n}x^{n}+s_{m}x^{m}$==. Taking $m\to \infty$, this equals $(1-x)\sum_{n=0}^{\infty}s_{n}x^{n}$.
		- ==$(1-x)\sum_{n=0}^{\infty}x_{n}=1$==, when $\lvert x\rvert<1$.
			- Ques: Can I do it for another point in the interval? Why is |x| < 1?
	- given double sequence $(a_{ij})$, suppose $\sum_{j=1}^{\infty}\lvert a_{ij}\rvert=b_{i}$, and $\sum b_{i}$ converges, then $\sum_{i=1}^{\infty}\sum_{j=1}^{\infty}a_{ij}=\sum_{j=1}^{\infty}\sum_{i=1}^{\infty}a_{ij}$.
	- Taylor's theorem: If f(x) = power series and converges in |x| < R. if a < |R|, then f can be expanded at point x=a which converges in |x-a| < R - |a|, and $f(x)=\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^{n}$ for (|x-a|<R-|a|).
	- Suppose two power series converges to same f in (-R,R), then prove uniqueness of power series. Next result, shows that we can use even weaker *assumption*.
	- Suppose series $\sum a_{n}x^{n},\sum b_{n}x^{n}$ converge in segment S = (-R,R). Let E be the set of all x in S such that $\sum_{n=0}^{\infty}a_{n}x^{n}=\sum_{n=0}^{\infty}b_{n}x^{n}$. If E has a limit point in S, then an=bn for n=0,1,2...
- Exponential and logarithmic function
	- E(z), E(z+w), E'(z)
	- E(1) = e.
	- E(p) for any rational p. extend this to any real x.
	- $\lim_{ x \to \infty }x^{n}e^{-x}=0$ for every n
	- E(L(y)) = y, L(E(x)) = x.
	- L'. L(uv)
	- $x^{\alpha}=E(\alpha L(x))$
	- $\lim_{ x \to \infty }x^{-\alpha}\log x=0$
- Trigonometric functions
	- $C(x)=\frac{1}{2}[E(ix)+E(-ix)],\space S(x)=\frac{1}{2i}[E(ix)-E(-ix)]$
	- C'(x)=-S(x), S'(x)=C(x)
	- Prove there exists a positive number x > 0, such that C(x) = 0.
	- E is periodic with $2\pi i$
	- C, S are periodic with $2\pi$
	- if 0 < t < 2π, then E(it) != 1
	- if z is a complex number with |z| = 1, then there is a unique t in \[0,2π) such that E(it) = z.
- Algebraic completeness of complex field or Fundamental theorem of algebra
- Fourier series
	- trigonometric polynomial: $f(x)=a_{0}+\sum_{n=1}^{N}a_{n}\cos nx+b_{n}\sin nx$. Equivalent to $f(x)=\sum_{n=-N}^{N}c_{n}e^{inx}$
	- $c_{m}=\frac{1}{2\pi}\int_{-\pi}^{\pi}f(x)e^{-imx}dx$
	- Trigonometric series: $\sum_{n=-\infty}^{\infty}c_{n}e^{inx}$
	- If f is integrable on $[-\pi,\pi]$, then $c_{m}$ are *Fourier coefficients* and series formed using coefficients is *Fourier series*.
- *Orthogonal system of function* $(\phi_{n})$ is a sequence of complex function on \[a,b\] such that $\int_{a}^{b}\phi_{n}(x)\overline{\phi_{m}(x)}\,dx=0$. *Orthonormal* when $\int_{a}^{b}\lvert \phi_{n}\rvert^{2}dx=1$.
- $c_{n}=\int_{a}^{b}f(t)\overline{\phi_{n}(t)}dt$ is the Fourier coefficient of f relative to $(\phi_{n})$, then we can write $f(x)\sim \sum_{n=1}^{\infty}c_{n}\phi_{n}(x)$.
- Best possible mean square approximation of f using partial Fourier series $s_{n}=\sum_{m=1}^{n}c_{m}\phi_{m}$.
- Bessel's inequality: $\sum_{n=1}^{\infty}\lvert c_{n}\rvert\leq \int_{a}^{b}\lvert f(x)\rvert^{2}dx$
- Trigonometric series: periodic 2π, and Riemann-integrable in \[-π,π].
	- Partial sum: $s_{N}(x)=s_{N}(f;x)=\sum_{n=-N}^{N}c_{n}e^{inx}$
	- Drichlet's kernel: $D_{N}(x)=\sum_{n=-N}^{N}e^{inx}=\frac{\sin\left( N+\frac{1}{2} \right)x}{\sin\left( \frac{x}{2} \right)}$
- Pointwise convergence of fourier series: Suppose for some x, there are constants $\delta>0$ and $M<\infty$ such that $\lvert f(x+t)-f(x)\rvert\leq M\lvert t\rvert$ for all t in $(-\delta ,\delta)$, then $\lim_{ N \to \infty }s_{N}(f;x)=f(x)$
- For a continuous f with period 2π, there exists a trigonometric polynomial such that $\lvert P(x)-f(x)\rvert<\epsilon$ for all real x and for every ε > 0.
- Parseval's theorem: f,g are Riemann integrable with period 2π, and $f(x)\sim \sum_{n=-\infty}^{\infty}c_{n}e^{inx}$, $g(x)\sim \sum_{n=-\infty}^{\infty}\gamma_{n}e^{inx}$. Then, $\lim_{ N \to \infty } \frac{1}{2\pi}\int_{-\pi}^{\pi}\lvert f(x)-s_{N}(f;x)\rvert^{2}dx=0$, and $\frac{1}{2\pi}\int_{-\pi}^{\pi}f(x)\overline{g(x)}dx=\sum_{n=-\infty}^{\infty}c_{n}\bar{\gamma}_{n}$.

## Ch 9
- Contraction: For a metric space X with metric $d$ and operator $\varphi$, if there is a number c < 1 such that $d(\varphi(x),\varphi(y))\leq cd(x,y)$, then $\varphi$ is a contraction from X to X.
- Contraction Mapping theorem: If X is a complete metric space, and $\varphi$ is a contraction of X into X, then $\varphi$ has a unique fixed point p, and for any x in X, $\varphi^{n}(x)=\varphi(\varphi(\dots(x)))$ converges to p as n tends to infinity.
	- Can be proven by showing using induction that any sequence in the metric space is a cauchy sequence, and since X is complete, it converges to a fixed point.
- Inverse Function Theorem:
	- 
- Implicit Function Theorem:

# Vector Calculus

- Vector equations of line, plane
	- vector form
	- Parametric form
	- symmetric form
- Continuity
- Partial Differentiation
- Higher order partial differentiation
- Differentiation
	- Chain rule: $D(f(\mathbf{x}(t_{0})))=D(f(\mathbf{x}_{0}))D(\mathbf{x}(t_{0}))=\nabla f(\mathbf{x}_{0})\cdot \mathbf{x}'(t_{0})$
- **Directional derivatives**: $D_{\vec{u}}f=\nabla f\cdot \vec{u}$
- **Tangent** plane$\nabla f(\mathbf{x}_{0})\cdot(\mathbf{x}-\mathbf{x}_{0})$, Gradient vector: $\nabla f=\left( \frac{ \partial f }{ \partial x_{1} },\frac{ \partial f }{ \partial x_{2} },\dots,\frac{ \partial f }{ \partial x_{n} } \right)$, **Normal** line: $\vec{r}(t)= \langle x_{0},y_{0},z_{0}\rangle+t\nabla f(x_{0},y_{0},z_{0})$
- **Gradient vector** is *orthogonal* to the surface at a point.
	- Let $X\subseteq R^{n}$ and $f:X\to \mathbb{R}$ be a function of class $C^{1}$. If $x_{0}$ is a point on the level set $S=\{ x \in X \vert f(x)=c \}$, then $\nabla f(x_{0})$ is orthogonal to S.
	- Parametrize C as $x=x(t)=(x_{1}(t),\dots,x_{n}(t))$, then $f(x(t))=c$ and $v=x'(t_{0})$. Differentiate with respect to t, $\frac{d}{dt}f(x(t))=\nabla f(x(t))x'(t)$. Evaluate at $t_{0}$, $\nabla f(x_{0})\cdot v=0$.
- Inverse function theorem: based on the principle that smooth function behave locally like their linearizations.
	- A smooth map with non-degenerate infinitesimal behavior (Jacobian $J_{f}$ is non-zero) is locally invertible, i.e. you can recover the point corresponding to a function value.
	- Formally, a smooth function defined on an open set such that at a point jacobian matrix is non-zero, then there is a neighborhood of the point, where a uniquely determined inverse smooth function exists.
- Implicit function theorem: Not all functions can be defined implicitly, i.e. in the form $f(x,y)=z$. For a smooth function satisfying the level set $F(x,y,z)=c$, locally at a point on the level set, a function can be defined such that $f(x,y)=z$, given $F_{z}(x_{0},y_{0},z_{0})\neq 0$.
	- Formally, For a smooth function, and a point **a** on the level set S = {F(x)=c}. If derivative of $F_{x_{n}}$ is non-zero at a, then there exists a neighborhood of **a**, and the neighborhood of remaining dimensions $x_{1},\dots,x_{n-1}$, such that a function exists $f(x_{1},\dots,x_{n-1})=x_{n}$.
- **Path**: Continuous function $\mathbf{x}:I\to \mathbb{R}^{n}$, where I is any interval in R. Defined as $x(t)$
	- Differentiable path: velocity, tangent vector: defined as $v(t)=x'(t)$.
	- Equation of line tangent to path at $x_{0}$: $I(t)=x_{0}+(t-t_{0})v_{0}$
	- Length of the path: $L=\int ds=\int \lVert x'(t) \rVert dt$. For path $x:[a,b]\to \mathbb{R}^{n}$, $L(x)=\int_{a}^{b}\lVert x'(t) \rVert dt$
		1. $ds=\sqrt{ 1+\left( \frac{dy}{dx} \right)^{2} }dx$ or $\sqrt{ 1+\left( \frac{dx}{dy} \right)^{2} }dy$
		2. $ds=\sqrt{ \left( \frac{dx}{dt} \right)^{2}+\left( \frac{dy}{dt} \right)^{2} }dt$
		3. $ds=\sqrt{ r^{2}+\left( \frac{dr}{d\theta} \right)^{2} }d\theta$ if $r=f(\theta),\ \alpha\leq\theta\leq\beta$.
	- **Arclength**: $s(t)=\int_{a}^{t}\lVert x'(\tau) \rVert d\tau$
		- $\frac{ds}{dt}=\lVert x'(t) \rVert$
		- $x'(s)=\frac{x'(t)}{\lVert x'(t) \rVert}$
		- Prove: $\frac{dT}{dt} \perp T$ for all T in I
	- **Curvature**: angular rate of change of direction of T per unit change of distance along the path defined as $\kappa(t)=\frac{\lVert dT/dt \rVert}{ds/dt}$ = $\left\lVert  \frac{dT}{ds}  \right\rVert$
- **Tangent** vector: $T=\frac{dx}{ds}=\frac{v}{\lVert v \rVert}=\frac{x'(t)}{\lVert x'(t) \rVert}$
- Principal **Normal** vector: $\mathbf{N}=\frac{dT/dt}{\lVert dT/dt \rVert}=\frac{dT/ds}{\lVert dT/ds \rVert}$ with the assumption that $x'(t)\neq0$ and $x'(t)\times x''(t)\neq0$.
	- $\frac{dT}{ds}=\kappa N$
	- vectors $T,N$ determine the *osculating* plane (plane that instantaneously contains the path) of the path at point P.
- **Binormal** vector $\mathbf{B}=T\times N$
	- $\frac{dB}{ds}=-\uptau N$, where $\uptau$ is defined as *torsion* of the path x. Measures how much the path "twists" out of the plane or how "three dimensional" x is.
	- $T,N,B$ together are called **moving frame** of the path.
- **Vector fields**: mapping $F:X\subseteq \mathbb{R}^{n}\to \mathbb{R}^{n}$. vector field F(x) assigns to each point x a vector in $\mathbb{R}^{n}$
	- **Gradient field**: $F(x)=\nabla f(x)$ where $f:X\to R$ is a scalar valued function also called *potential function* of the vector field.
	- **Flow line** of a vector field F is a differentiable path: $\mathbf{x}:I\to \mathbb{R}^{n}$ such that $\mathbf{x}'(t)=F(x(t))$. Velocity vector of x at any time t is given by the value of the vector field at the point on x at time t.
	- Let $F:X\subseteq \mathbb{R}^{n}\to \mathbb{R}^{n}$ be a vector field. **Flow** of $F$ is a differentiable function $\phi:X\times(a,b)\to \mathbb{R}^{n}$ such that $\frac{ \partial \phi(\mathbf{x},t) }{ \partial t }=F(\phi(x,t)) \ ;\ \phi(\mathbf{x},0)=\mathbf{x}$.
- del: $\nabla=\mathbf{i}\frac{ \partial  }{ \partial x }+\mathbf{j}\frac{ \partial  }{ \partial y }+\mathbf{k}\frac{ \partial  }{ \partial z }$, gradient: $\nabla f$ divergence: $\nabla\cdot F$, where F is a vector field, Curl: $\nabla \times F$ operator

## Absolute & Relative Maximum
- Absolute, Relative minima
- Critical point/Stationary point
- Saddle point
- $D(a,b)=f_{xx}(a,b)f_{yy}(a,b)-[f_{xy}(a,b)]^{2}$
	- When D > 0 and $f_{xx}(a,b)>0$, then $a,b$ is a relative minima
	- when $D>0$ and $f_{xx}(a,b)<0$, then $a,b$ is a relative maxima
	- when $D<0$, then (a,b) is a saddle point

## Multiple Integrals

- Double integrals

### Iterated Integrals

**Fubini's Theorem**: If $f(x,y)$ is continuous on $R=[a,b]\times[c,d]$ then,
$$\iint\limits_{R}f(x,y)\, dA = \int_{a}^{b}\int_{c}^{d}f(x,y)\, dy\, dx = \int_{c}^{d}\int_{a}^{b}f(x,y)\, dx\, dy$$
These integrals are called **iterated integrals**.

- Triple integrals
- Change of variables

## Line Integral

**Line integral along curve C** or line-integral along arc-length
$$\int\limits_{C}f(x,y,z)\, ds=\int_{a}^{b}f(x(t),y(t),z(t))\underbrace{ \sqrt{ \left( \frac{dx}{dt} \right)^{2}+\left( \frac{dy}{dt} \right)^{2} +\left( \frac{dz}{dt} \right)^{2}} }_{ \lVert\vec{r}'(t)\rVert }\, dt$$

**Line integral with respect to x, y**
$$
\begin{align*}
\int\limits_{C}f\left(x,y,z\right)dx & = \int_{a}^{b}f(x(t),y(t),z(t))x'(t) dt \\ 
\int\limits_{C}f\left( x,y,z\right)dy & = \int_{a}^{b}f(x(t),y(t),z(t))y'(t) dt \\ 
\int\limits_{C}f\left(x,y,z\right)dz & = \int_{a}^{b}f(x(t),y(t),z(t))z'(t) dt
\end{align*}
$$

where the curve is parametrized by $x = x\left( t \right)\hspace{0.25in}y = y\left( t \right)\hspace{0.25in}z = z\left( t \right)\hspace{0.25in}a \le t \le b$.

When these occur together, $$\int\limits_{C}{{Pdx\, + Q\,dy + R\,dz}} = \int\limits_{C}{{P\left( {x,y,z} \right)dx}} + \int\limits_{C}{{Q\left( {x,y,z} \right)\,dy}} + \int\limits_{C}{{R\left( {x,y,z} \right)dz}}$$

**Line integral with respect to vector field**

Given vector field $\vec{F}(x,y,z)=P(x,y,z)\vec{i}+Q(x,y,z)\vec{j}+R(x,y,z)\vec{k}$ and three dimensional smooth curve $\vec{r}(t)=x(t)\vec{i}+y(t)\vec{j}+z(t)\vec{k}$, the line integral of $\vec{F}$ along C is $$\int\limits_{C}\vec{F}\cdot d\vec{r}=\int_{a}^{b}\vec{F}(\vec{r}(t))\cdot \vec{r}'(t)\, dt$$

Note, that tangent vector is given as $\vec{T}(t)=\frac{\vec{r}(t)}{\lVert \vec{r}(t) \rVert}$, using which line integral of vector field can be written as line integral with respect to arc length as $$\int\limits_{C}\vec{F}\cdot d\vec{r}=\int\limits_{C}\vec{F}\cdot \vec{T}\, ds$$

Similarly, line integral of vector field can be written with respect to $x,y,z$ as

$$
\begin{align}
\int\limits_{C}\vec{F}\cdot d\vec{r} & =\int_{a}^{b}(P\vec{i}+Q\vec{j}+R\vec{k})\cdot(x'\vec{i}+y'\vec{j}+z'\vec{k}) \, dt\\
 & =\int_{a}^{b}P\, dx+Q\, dy+R\, dz \,
\end{align}
$$

### Green's Theorem

Let 𝐶 be a positively oriented, piecewise smooth, simple, closed curve and let 𝐷 be the region enclosed by the curve. If 𝑃 and 𝑄 have continuous first order partial derivatives on 𝐷 then,

$$\underbrace{ \oint\limits_{C}\vec{F}\, ds }_{ \text{line integral} }=\int\limits_{C}{{Pdx\, + Qdy}} = \underbrace{ \iint\limits_{D}{{\left( {\frac{{\partial Q}}{{\partial x}} - \frac{{\partial P}}{{\partial y}}} \right)\,dA}} }_{ \text{double integral of infinitesimal region }D }$$

Informally, Green theorem basically says that circulation of field $F$ along the curve $\partial D$ is equal to infinitesimal curl along the whole region.

**Divergence theorem for the plane**

If $D$ is the same region, and C is the same curve as Green's theorem, $\mathbf{n}$ is outward normal vector to $D$, then

$$
\oint\limits_{C}\vec{F}\cdot \vec{\mathbf{n}}\, ds=\int\int_{D}\nabla\cdot \vec{F}\, dA
$$

This can be interpreted as net outward flux of $F$ across $C$ equals net divergence (rate of density change) across all of region $D$.

**Conservative Vector Fields**

For a 2-dimensional vector field, determining whether the vector field is conservative or not, and then finding a potential function for the vector field is straightforward.

Let $\vec F = P\,\vec i + Q\,\vec j$ be a vector field on an *open* and *simply-connected* region $D$. Then if 𝑃 and 𝑄 have continuous first order partial derivatives in $D$ and

$$\frac{{\partial P}}{{\partial y}} = \frac{{\partial Q}}{{\partial x}}$$

the vector field $\vec{F}$ is conservative. In other words, $F=\nabla f$ for some scalar valued function $f$ iff $\nabla \times F=0$ at all points in $D$.

If the potential function exists, then

$$\nabla f = \frac{\partial f}{\partial x}\,\vec{i} + \frac{\partial f}{\partial y}\,\vec{j} = P\vec{i} + Q\vec{j} = \vec{F}$$

Setting the individual components and integrating:

$$f\left( {x,y} \right) = \int{{P\left( {x,y} \right)\,dx}}\hspace{0.5in}{\mbox{or}}\hspace{0.5in}f\left( {x,y} \right) = \int{{Q\left( {x,y} \right)\,dy}}$$

## Surface Integral

**Parametric Surface**

$$
\begin{align*}z &= f\left( {x,y} \right)\hspace{0.25in}\,\, \Rightarrow \hspace{0.25in}\,\,\vec r\left( {x,y} \right) = x\,\vec i + y\,\vec j + f\left( {x,y} \right)\vec k\\ x & = f\left( {y,z} \right)\hspace{0.25in}\,\, \Rightarrow \hspace{0.25in}\,\,\vec r\left( {y,z} \right) = f\left( {y,z} \right)\,\vec i + y\,\vec j + z\,\vec k\\ y & = f\left( {x,z} \right)\hspace{0.25in}\,\, \Rightarrow \hspace{0.25in}\,\,\vec r\left( {x,z} \right) = x\,\vec i + f\left( {x,z} \right)\,\vec j + z\,\vec k\end{align*}
$$

A general parametric surface is given by

$$\vec r\left( {u,v} \right) = x\left( {u,v} \right)\vec i + y\left( {u,v} \right)\vec j + z\left( {u,v} \right)\vec k$$

A parametrized surface $S=r(D)$ is smooth at $r(u_{0},v_{0})$ if map $r\subset C^{1}$ in neighborhood of $(u_{0},v_{0})$ and if standard normal vector $\vec{\mathbf{n}}(u_{0},v_{0})=\vec{r}_{u}(u_{0},v_{0})\times \vec{r}_{v}(u_{0},v_{0})\neq0$.

Tangent plane to the parametric surface is given by $\vec{n}(u_{0},v_{0})\boldsymbol{\cdot}(\mathbf{x}-X(u_{0},v_{0}))=0$.

**Scalar Surface Integral**

Let surface $S$ be given by $z=g(x,y)$, then the surface integral is

$$
\iint\limits_{S}{{f\left( {x,y,z} \right)\,dS}} = \iint\limits_{D}f\left( {x,y,g\left( {x,y} \right)} \right)\sqrt{\left(\frac{\partial g}{\partial x}\right)^{2}+\left(\frac{\partial g}{\partial y} \right)^{2}+1} dA
$$

Let $r:D\to \mathbb{R}^{3}$ be smooth parametrized surface, where $D\subset \mathbb{R}^{2}$ is a bounded region. Let $f$ be a continuous function whose domain includes $S=r(D)$. Then scalar surface integral of $f$ along $r$

$$
\iint\limits_{S}f(x,y,z)dS = \iint\limits_{D}f(\vec{r}(u,v)) \left\| \vec{r}_u \times \vec{r}_v \right\|dA
$$

**Vector Surface Integral**

Let $F(x,y,z)$ be a continuous vector field whose domain includes $S=r(D)$, with $r:D\to \mathbb{R}^{3}$ be a smooth parametrized surface. Then vector surface integral of $F$ along $r$ is given by

$$
\iint\limits_{S}\vec{F}\cdot d\vec{S} = \underbrace{ \iint\limits_{S}\vec{F} \boldsymbol{\cdot} \vec{n} \, dS}_{\text{flux}}
$$

where $\vec{n}(u,v)=\vec{r}_{u}\times \vec{r}_{v}$ is the unit normal vector.

This can be interpreted as **flux** of $F$ across $S$. We can think $F$ as velocity vector of a 3-dimensional fluid, and $S$ as 3D surface, then flux is defined as rate of fluid transport across $S$ per unit time.

## Stokes Theorem

Let $S$ be an oriented smooth surface that is bounded by a simple, closed, smooth boundary curve $C$ with positive orientation. Also let $\vec{F}$ be a vector field then,

$$
\oint\limits_{C}\vec{F}\cdot d\vec{r} = \iint\limits_{S}\nabla \times \vec{F}\cdot d\vec{S}
$$

## Gauss Theorem

Let $E$ be a simple solid region and $S$ is the boundary surface of $E$ with positive orientation. Let $\vec{F}$ be a vector field whose components have continuous first order partial derivatives. Then,

$$\iint\limits_{S}{{\vec F\centerdot d\vec S}} = \iiint\limits_{E}{{{\mathop{\rm div}\nolimits} \vec F\,dV}}$$

Gauss’s theorem says that the *“total divergence”* of a vector field in a bounded region in space is equal to the flux of the vector field away from the region (i.e., the flux across the boundary surface(s)).



# Next Steps
- [Algebra I](https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/pages/readings/)
- [Analysis II](https://ocw.mit.edu/courses/18-101-analysis-ii-fall-2005/pages/syllabus/): Analysis on several variables -> Munkres' Analysis on manifold
	- [18.101 — Analysis II (Fall 2006)](https://math.mit.edu/classes/18.101/fa07/#handouts)
- [Introduction to Lie Groups](https://ocw.mit.edu/courses/18-755-introduction-to-lie-groups-fall-2004/pages/syllabus/)
- [Topology](https://ocw.mit.edu/courses/18-901-introduction-to-topology-fall-2004/)
- [Differential Geometry](https://ocw.mit.edu/courses/18-950-differential-geometry-fall-2008/pages/syllabus/)
- [Algebraic Topology](https://ocw.mit.edu/courses/18-905-algebraic-topology-i-fall-2016/)
- [Algebraic Geometry](https://ocw.mit.edu/courses/18-725-algebraic-geometry-fall-2003/pages/syllabus/)