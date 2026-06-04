---
title: "Approximation theory"
date: 2026-04-10
tags:
- machine-learning
- theory
- notes
---


# Approximation Theory

Given a family of curves G, and a family of neurons F. For any curve $g \in G$, does there exist a neural net $f \in F$ such that $\xi(g,f)<\epsilon$.
- Goal is to think about how deep and how wide the network should be? Why should we care about the architecture of a NN?
- One nice family: Lipschitz family of functions.

Prove a special version of universal approximation theorem for lipschitz functions and 3-layer relu networks. More details of the proof can be found [here](https://mjt.cs.illinois.edu/dlt/#classical-approximations-and-universal-approximation).
- To understand this, taking a special case of univariate case, and approximating the function using piecewise constant function or rectangles, and then finding the error such that $\lvert f(x)-g(x)\rvert<\epsilon$ can be an easier first introduction.
- Let $g:[0,1]^{d}\to \mathbb{R}$ be any L-lipschitz function. Then for any error $\epsilon>0$, there exists a 3-layer relu network with total number of neurons $N = 4d(L/\epsilon)^d$ such that $\int_{[0,1]^{d}}\lvert f(x)-g(x)\rvert dx<2\epsilon$.
	- This can be generalised to any continuous function, i.e. when g is any continuous function. There exists a 3-layer ReLU network f with $\Omega\left( \frac{1}{\delta^{d}} \right)$ ReLU with $\int_{[0,1]^{d}}\lvert f(x)-g(x)\rvert dx\leq 2\epsilon$.
- We aim to approximate the function using a partition as rectangles $\mathcal{P}=\{ R_{1},R_{2},\dots,R_{N} \}$ such that each side $<\delta$. Each $R_{i}$ is of the form $\prod_{i=1}^{d}[a_{j},b_{j})$.
- Let $h=\sum_{i}\alpha_{i}\boldsymbol{1}_{R_{i}}$ be the piecewise constant function. This means the function will be approximated $\lvert h-g\rvert<\epsilon$ at each partition using h when $\alpha_{i}=g(x_{i})$, where each $x_{i}\in R_{i}$.
- We can represent rectangles  using a linear combination of ReLU $g_{1}\left(x\right)=\sigma\left(\frac{x-\left(a-c\right)}{c}\right)-\sigma\left(\frac{x-a}{c}\right)-\sigma\left(\frac{x-b}{c}\right)+\sigma\left(\frac{x-\left(b+c\right)}{c}\right)$, same for other dimensions as well. $g_{i,\gamma}(x)=1$ when $x \in R_{i}$ and $g_{i,\gamma}(x)\in[0,1]$ when $x \in [a-\gamma,b+\gamma]$, and 0 otherwise.
- This can be combined to form a hyperrectangle $g_{\gamma}(x)=\sigma\left( \sum_{j}g_{j,\gamma}(x_{j})-(d-1) \right)$, (d-1) to cut the hyperrectangle at other positions. So, this is equal to 1 at only the partition $R_{i}$. Thus, $g_{\gamma}\approx \boldsymbol{1}_{R_{i}}$.
- and then linearly combined using a ReLU layer $f(x)=\sum_{i}\alpha_{i}g_{i}(x)$.
- So, we're in a 3-way approximation g -> h -> f, and that's why $2\epsilon$, $\lVert f-g \rVert\leq \lVert f-h \rVert+\lVert h-g \rVert$
- Note the curse of dimensionality in above proof (exponential dependence on $d$), and above proof fails to generalise because we're using rectangles to approximate a function.

Universal Approximation class
A class of functions $F$ is universal approximator over a compact set S if for every continuous function g and $\epsilon>0$, there exists $f\in F$ such that $\sup_{x \in S}\lvert f(x)-g(x)\rvert<\epsilon$.
- Above proof can be succinctly done in 2 layers.
- This is generally proven using Stone-Weierstrass Theorem.
- TODO: read this.

**Barron's Theorem**

Fourier representation is also a universal approximator
	- TODO: read this.

## Depth Separation

Goal is to prove that to approximate a function that can be approximated with constant width deep networks, constant deep shallow network, require exponential many neurons.
	- Proven by taking a function $g(x)=\sigma(2\sigma(x)-4\sigma\left( x-\frac{1}{2} \right))$. This function has the property that the number of kinks scale exponentially with $g^{L}$.
	- In a L layer ReLU network or widths $(m_{1},m_{2},\dots,m_{L})$, number of affine pieces $N_{i}$ (piecewise linear regions) for layer i <= $2m_{i}*N_{i-1}=2^{L}\prod m_{j}$. Thus, $N_{A}(g)\leq 2^{i}\prod_{j<i}m_{j}$.
	- And total number of affine pieces = $N_{A}(f)\leq 2^{L}\prod_{j<L}m_{j}\leq\left( \frac{m}{L} \right)^{L}$.
	- Any univariate function f with N piecewise linear regions or affine pieces (or kinks) can be composed together.
		- $N_{A}(f+g)\leq N_{A}(f)+N_{A}(g)$, $N_{A}(f \circ g)\leq N_{A}(f)\cdot N_{A}(g)$.
	- Above result is used to prove that depth increases number of affine pieces multiplicatively, while width only scales it additively.
	- TODO: redo the proof properly.