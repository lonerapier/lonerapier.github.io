---
title: "Elliptic Curve Arithmetic"
date: 2023-12-25T00:00:00Z
tags:
- cryptography
- elliptic-curves
- algebra
---

Elliptic curve point: $P: (x,y)$

## Negation

Inverse of a point by inverting on x-axis, including the case when $x_1=x_2=0$:

$$
-P: (-x, y)
$$

## Square

## Addition

Addition: $P,Q \in E: R = P+Q$ where $x_{1}\neq x_{2}$. Using [algebraic formula](https://en.wikipedia.org/wiki/Elliptic_curve#The_group_law),

Using chord method,

$$
\begin{align}
\lambda &= \frac{y_{2}-y_{1}}{x_{2}-x_{1}} \\
x_{3} &= \lambda^{2}-x_{1}-x_{2} \\
y_{3} &= \lambda(x_{1}-x_{3})-y_{1} \\
R &= (x_3,y_3)
\end{align}
$$

Cost: $6A+2M+1I$

## Doubling

Case where, $P=Q$

Using tangent method, slope of the curve comes out to be:

$$
\begin{align}
\lambda &= \frac{3x_{1}^{2}+a}{2y_{1}} \\
x_{3} &= \lambda^{2}-2x_{1} \\
y_{3} &= y_{1}-\lambda(x_{1}-x_{3})
\end{align}
$$

Cost: $4A+2M+1I$

## Square Root

## Scalar Multiplication
