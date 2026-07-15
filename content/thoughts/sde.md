---
title: Stochastic Differential Equations
date: 2026-05-08
tags:
- mathematics
- differential-equations
- stochastic-differential-equations
- statistics
---

- ODEs are equations defined using derivatives of variables. In the simplest form, how a physical object position as a function of time $x(t)$ is updated can be defined using some function $f(t,x(t))$.
- What does this equation mean?
- Write the differential equation in a shorter way, and explain it.
	- $dx(t)=f(t,x(t))dt$
	- This states that infinitesimal change in position $x(t)$ is equal to the function $f(t,x(t))$ scaled by infinitesimal difference $dt$
- An equation of the form $y=f(x)$ gives the value of y according to function f at any point inside the support of the function. While a differential equation is a vector field that gives the change of position at any point and at any time t.
- The way to solve a differential equation is to take an initial point, and sum the infinitesimal changes over time. $x(T)=x(0)+\int_{0}^{T}dx(t)=x(0)+\int_{0}^{T}f(t,x(t))dt$
- To make the integral tractable, above formulation can be discretized to $\Delta x(t)$ and $\Delta t$, and turned into a summation.

Before talking about SDEs, let's talk about Stochasticity over time: **Weiner Process**.
- Weiner Process models position of a particle with a purely random trajectory in a Euclidean space. Mathematically, we can represent the position as: $dx(t)=\epsilon \ dt$, where $\epsilon$ is a probability distribution.
- The above equation is a differential equation with a non-deterministic function that follows some distribution, and we equate the infinitesimal change in position to random move in space scaled times the infinitesimal time that move is followed.
- Since $\epsilon$ is a random variable, each position also follows the same distribution and, we treat each position in time itself as a random variable, governed by equation above.
- We can choose any distribution for $\epsilon$, but Good ol' friend Gaussian doesn't like that, and is staring right at us through the Central limit hole! We model the probability of random movement with a standard Gaussian, $\epsilon\sim \mathcal{N}(0,I)$.
- We choose amount of infinitesimal time to be $\sqrt{ dt }$. We'll understand the reason why shortly.
- Thirdly, we want the starting position of the differential equation to be $x_{0}=0$.
$$
\begin{equation}
x_{T} =x_{0}+\int_{t=0}^{T}dx_{t}  =\int_{0}^{T}\epsilon \sqrt{ dt } 
\end{equation}
$$

- Since $\epsilon$ is a random variable, we don't know its integral. Rather we look at the first two moments:
	- $\mathbb{E}[x_{T}]=\mathbb{E}\left[ \int_{t=0}^{T}dx_{t} \right] =\int_{t=0}^{T}\mathbb{E}[\epsilon]\sqrt{ dt }=0$
	- $\mathbb{V}[x_{T}]=\mathbb{V}\left[ \int x_{T} \right]=\int_{0}^{T}dt\mathbb{V}[\epsilon]=T$.
- So, all paths stay around initial position 0, and start to spread further proportional to the length of the path. Also, the derivation turned out to be straightforward due to our choice of infinitesimal time $\sqrt{ dt }$.
- The process defined so far is an elementary stochastic process called Wiener process $W_{t}$ that defines the path of infinitesimal movement of particle.

> [!todo] add a brownian motion picture

Let's define the properties of the Wiener process:
- Initial position: $W_{0}=0$
- Independent increments: $\text{Cov}[W_{t+u}-W_{s},W_{s}]=0, \ u\geq0,s\leq t$. Any future motion is independent of past motion. This can be seen as continuous time analog of iid steps in random walks.
- Stationary Gaussian increments: $W_{t+u}-W_{t}\sim \mathcal{N}(0,u)\implies dW_{t}\sim \mathcal{N}(0 , \boldsymbol{dt})$. The displacement of the particle over an interval is Gaussian distributed with mean 0 and variance proportional to the interval. We just proved this above.
- Continuous time paths but nowhere differentiable. Paths are continuous, but this being a stochastic process, Wiener process is not differentiable because $W_{t+u}-W_{t}\sim \mathcal{N}(0,u)$, so $\lim_{ u \to 0 }\frac{W_{t+u}-W_{t}}{u}=\frac{\sqrt{ u }}{u}\to \infty$.
- Other properties include the covariance structure: $\mathbb{E}[W_{s}W_{t}]=\min(s,t)$, Markov property: $p(W_{t}|\text{past})=p(W_{t}|W_{s})$ for $s<t$, Martingale property: $\mathbb{E}[W_{t}|\mathcal{F}_{s}]=W_{s}$.

We write the Brownian motion SDE by equating the infinitesimal change in position with Brownian motion which is defined by a normally distributed random variable scaled by $\sqrt{ dt }$.

$$
dx_{t}=dW_{t}=\epsilon \sqrt{ dt }, \quad \epsilon \sim \mathcal{N}(0 , \boldsymbol{I}) 
$$

Interestingly, Wiener process is continuous but **non-differentiable**. Intuitively, we know that differential of a continuous function in classical calculus measures the rate of change of the function on an infinitesimal change in domain. But for Wiener process, $dW_{t}=\epsilon \sqrt{ s }$, where $\epsilon$ is a random variable (usually Gaussian) which does not depend on time. So, no matter how much we zoom into the domain to get the infinitesimal value, we'll always have a random brownian motion on the finer axis, which explains the *fractal* property of Brownian motion.

> [!todo] Enter fractal picture from wikipedia



SDE

An SDE is just combination of ODE and stochastic process. We defined a stochastic differential equation which is the infinitesimal change in random variable $X_{t}$ as sum of deterministic change $\mu_{t}dt$ and stochastic process (infinitesimal Wiener process) $\sigma_{t}dW_{t}\sim \mathcal{N}(0,\sigma_{t}^{2}dt)$

$$
dX_{t}=\underbrace{ \mu_{t}dt }_{ \text{deterministic} }+\underbrace{ \sigma_{t}dW_{t} }_{ \text{stochastic} }
$$

This is also known as Ito drift-diffusion process. Solving the SDE, we'll assume constant $\mu_{t}=\mu$ and $\sigma_{t}=\sigma$.

$$
\begin{align}
X_{T} & =\int_{t=0}^{T}dX_{t} \\
 & = \int_{t=0}^{T}\mu dt+\sigma dW_{t} \\
  & =\mu T+\sigma \int_{0}^{T}dW_{t} \\
	 & =\mu T+\sigma W_{T}
\end{align}
$$

$W_{T}\sim \mathcal{N}(0,T)$ is a random variable. Let's calculate analytical mean and variance of the process.

$$
\begin{aligned}
\mathbb{E}[X_{T}]=\mathbb{E}[\mu T+\sigma W_{T}]=\mu T+\sigma \mathbb{E}[W_{T}]=\mu T\\
\mathbb{V}[X_{T}]=\mathbb{V}[\mu T+\sigma W_{T}]=\sigma^{2}\mathbb{V}[W_{T}]=\sigma^{2}T
\end{aligned}
$$

- **Ito's Process**: Ito's lemma that tells how to differentiate an SDE: [Ito's (Di)Lemma](https://ludwigwinkler.github.io/blog/ItosLemma/)
- Ornstein-Uhlenbeck process: [Solving (Some) SDEs](https://ludwigwinkler.github.io/blog/SolvingSDEs/)
- **Fokker-Planck Equation**
	- [FokkerPlanck\_Equation](https://www.peterholderrieth.com/blog/2023/The-Fokker-Planck-Equation-and-Diffusion-Models/)

> [!note] Questions that we're going to answer in this document:
> 1. Write Fokker-Planck equation. Understand the physical intuition behind it.
> 2. Derive FP equation, and reverse SDE using FP equation.
> 3. Why FP equation is necessary to show that stochastic equation used in score-based models preserve the intermediate distribution?
> 4. Derive PF-ODE from the SDE and FP equation.

For the drift function $f:\mathbb{R}^{d}\times \mathbb{R}\to \mathbb{R}^{d}$ and diffusion function $g:\mathbb{R}^{d}\times \mathbb{R}\to \mathbb{R}^{d\times d}$, we let $\{ X_{t} \}_{t\in[0,T]}$ evolve with the forward SDE,

$$\boxed{dX_{t}=f(X_{t},t)dt+g(X_{t},t)dW_{t}}$$

> [!question] Why is $g\in \mathbb{R}^{d\times d}$?
> Notice that $W_{t}$ is a d-dimensional Wiener process. So, there exists d-independent noise sources of $\{dW_{t}^{(j)}\}_{j\in[0,d)}\in \mathbb{R}^{d}$. To find out the effect of these noise channels on coordinate $i$ of $X_{t}$, $[gdW_{t}]_{i}=\sum_{j}g_{ij}dW_{t}^{(j)}$. Thus, $g$ is the map that takes $d-$dim noise vector and produces $d-$dim perturbation, where each row $i$ of g calculates effect of the noise sources on coordinate $i$.



**Time reversal of diffusion/reverse SDE**
- Why do we want to reverse an SDE?

**Score estimation using SDE**

# Stochastic Calculus

[Introduction to Stochastic Calculus \| Ji-Ha's Blog](https://jiha-kim.github.io/posts/introduction-to-stochastic-calculus/)
[Itô Processes and The Fundamental Theorem of Stochastic Calculus](https://benchugg.com/research_notes/sde_ito_lemma/)
[ItoSDE\_Tutorial](https://www.peterholderrieth.com/blog/2023/Diffusion-Models-with-Stochastic-Differential-Equations-A-Introduction-with-Self-Contained-Mathematical-Proofs/)
[LW - Blog](https://ludwigwinkler.github.io/blog/)
