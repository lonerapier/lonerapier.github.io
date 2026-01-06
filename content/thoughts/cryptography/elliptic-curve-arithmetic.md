---
title: "Elliptic Curve Arithmetic"
date: 2024-02-10
tags:
- cryptography
- elliptic-curves
---

Elliptic curve representations:
- Short Weierstrass: $E: y^{2}-x^3-Ax-B=0$
- Montgomery: $E: y^2-x^3-Ax^2-x=0$
- Edward:
- Twisted Edwards:

Elliptic curve
- Affine point: $P: (x,y)$
- Projective point: $P: (x, y, z)$
- Jacobian point:

# Doubling

# Square

# Addition

## Addition

Addition: $P,Q \in E: R = P+Q$ where $x_{1}\neq x_{2}$. Using [algebraic formula](https://en.wikipedia.org/wiki/Elliptic_curve#The_group_law),

Using chord method,

$$
\begin{align}
\lambda &= \frac{y_{2}-y_{1}}{x_{2}-x_{1}} \\
x_{3} &= \lambda^{2}-x_{1}-x_{2} \\
y_{3} &= \lambda(x_{1}-x_{3})-y_{1}  = \lambda(2x_{1}+x_{2})-\lambda^{3}-y_{1}\\
R &= (x_3,y_3)
\end{align}
$$

Cost: $6A+2M+1I$

as human species, we have arrived to the unanimous conclusion that we hate divisions, and will do anything to avoid them.

## Doubling

Case where, $P=Q$

Using tangent method, slope of the curve comes out to be:

$$
\begin{align}
\lambda &= \frac{3x_{1}^{2}+a}{2y_{1}} \\
x_{3} &= \lambda^{2}-2x_{1} \\
y_{3} &= \lambda(x_{1}-x_{3})-y_{1}=\lambda(3x_{1})-\lambda^3-y_{1} \\
R &= (x_{3},y_{3})
\end{align}
$$

Cost: $4A+2M+1I$

## Scalar Multiplication

scalar multiplication for elliptic curve refers to multiplication of a scalar value $k\in\mathbb{F}_{r}$ with a point $P\in E$. Three different kinds of scalar mult exists:

- **Fixed base**: where the point is fixed
- **Variable base**: where the point can be different
- **Double base**: multiple points with multiple scalars

## Montgomery Curve Formulae

montgomery curves

## List of Things and Resources to Learn

- all different point representations and their advantages/disadvantages.
	- affine
	- projective
	- Jacobian
	- extended jacobian
- different curve representations
	- short weierstrass
	- montgomery
	- edwards
	- twisted edwards
- hash to curve
- constant time operations
- pairings

### Resources

- [axioms' halo2curves](https://github.com/axiom-crypto/halo2curves)
- [pse's halo2curves](https://github.com/axiom-crypto/halo2curves)
- [dalek-cryptography's ed25519](https://github.com/dalek-cryptography/curve25519-dalek)
- [martin klepmann's paper](https://martin.kleppmann.com/papers/curve25519.pdf)
- [lamdaworks' ec module](https://github.com/lambdaclass/lambdaworks/tree/main/math/src/elliptic_curve)
- [arkworks' ec module](https://github.com/arkworks-rs/algebra/tree/master/ec)
- [twisted edwards curve](https://eprint.iacr.org/2008/013)
- [twisted edwards curve revisted](https://eprint.iacr.org/2008/522)
- [pairing friendly ec curves of prime order](https://eprint.iacr.org/2005/133.pdf)
- [Hyperelliptic database](https://hyperelliptic.org/EFD/)
- [ristretto group](https://ristretto.group/)
- [Constant-Time Arithmetic for Safer Cryptography](https://eprint.iacr.org/2021/1121)
- [constant time montgomery ladder](https://eprint.iacr.org/2020/956)
- [Hardware Aspects of Montgomery Modular Multiplication](https://eprint.iacr.org/2017/1115)
- [Montgomery Multiplication Using Vector Instructions](https://eprint.iacr.org/2013/519)
- [Selecting Elliptic Curves for Cryptography: An Efficiency and Security Analysis](https://eprint.iacr.org/2014/130)
- [Faster addition and doubling on elliptic curves](https://eprint.iacr.org/2007/286)
- [Montgomery curves and the Montgomery ladder](https://eprint.iacr.org/2017/293)
