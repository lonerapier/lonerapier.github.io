---
title: Zeroes And Poles
date: 2022-10-10
tags:
- mathematics
---

In complex analysis, functions are studied that are differentiable (in the complex space) at almost all points. Zeroes and poles are very important concept.

**Zeros** are termed as points at which a function $f, f(z) = 0$.

A **Pole** $\left( \frac{1}{f}(z)=0 \right)$ (also called an *isolated singularity*) is a point where the limit of a complex function inflates dramatically with polynomial growth.



More specifically, a point $z_0$ is a pole of a complex valued function $f$ if the function value $f(z)$ tends to infinity as $z$ gets closer to $z_0$. If the limit is finite, then $z_0$ is not a pole.

$z_0$ is a pole of order $n$ if:

$$\lim\limits_{z \to z_0} (z-z_0) \cdot f(z) \neq 0$$

What is done here is $f(z)$ is multiplied by $(z-z_0)^n$ and then taking limit as $z$ approaches $z_0$. If the result is not equal to $0$, then $z_0$ is a pole.

### Order of Zeros

let's take an example of $f(x)=x$ and $g(x)=x^{2}$. It has a zero at $x=0$ and it's order is $1$ for $f$ and $2$ for $g$, since $g$ has a repeated root. We say order of zeroes for $f$ is 1 and for $g$, it's 2. for rational functions (can be written as fraction), order of zero of whole function is $ord_{p}(num)-ord_{p}(denom)$. Generally, order of zero of a zero function is termed as infinity.

Similarly, take $f(x)=\frac{1}{x};g(x)=\frac{1}{x^2}$, order of poles for $f$ at $x=0$ is 1, and $g$ is 2.

Denote order of zero a holomorphic function $f$ at point $p$ by $ord_{p}(f)$, extend the definition to meromorphic functions $f=\frac{g}{h}$ where $g,h$ are holomorphic, then $ord_{p}(f)=ord_{p}(g)-ord_{p}(h)$.

- $ord_{p}(f)\in\mathbb{Z}\cup \left\{\infty\right\}$, where $ord_{p}(f)=\infty \iff f=0$.
- $ord_{p}(f.g)=ord_{p}(f)+ ord_{p}(g)$
- $ord_{p}(f+g)\leq \min\left\{ord_{p}(f),ord_{p}(g)\right\}$

## Meromorphic Functions

**Holomorphic function** (also known as Analytic function) usually refer to functions that are infinitely differentiable.

Formal Definition:

Let G be an open set in $\mathbb{C}$. A function $f: G \to C$ is called holomorphic if, at every point $z \in G$, the complex derivative

$$f'(z) = \lim\limits_{h \to 0} \frac{f(z+h) - f(z)}{h}$$

exists as a complex number where $\mathbb{C}$  = complex realm.

Meromorphic Function is the ratio of two analytic function which are analytic except for poles.

## Resources

- [Zeroes and Poles](https://web.mit.edu/2.14/www/Handouts/PoleZero.pdf)
- [Divisors and Pairings](https://klwu.co/knowledge/ec-basics-3-divisors/)
