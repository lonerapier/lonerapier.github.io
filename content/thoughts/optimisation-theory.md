## Optimisation

Resources:
- [Numerical Methods I - CS 357 @ UIUC Textbook](https://cs357.cs.illinois.edu/textbook/)
- [EE364a: Convex Optimization I](https://web.stanford.edu/class/ee364a/), [EE364b - Convex Optimization II](https://stanford.edu/class/ee364b/)
- [EE227BT: Convex Optimization](https://people.eecs.berkeley.edu/~elghaoui/Teaching/EE227BT/index.html), [EE 227C (Spring 2018) Convex Optimization and Approximation](https://ee227c.github.io/)

### First-order Methods

**Momentum**: Instead of just using past gradient, create a weighted average of all the past gradients.
- $m_{t+1}=\beta m_{t}+g_{t}$, where $m_{t}$ is the momentum and $g_{t}$ is the gradient of the objective function at step t, and $0<\beta<1$.
- $\theta_{t+1}=\theta_{t}-\eta_{t+1}m_{t+1}$
- > [!question] Why does using past gradients reach convergence faster?
- Problem with simple momentum is that it not slow down enough at the bottom of the valley.

**Nesterov Momentum**:
- $m_{t+1}=\beta m_{t}-\eta_{t}\nabla \mathcal{L}(\theta_{t}+\beta m_{t})$
- $\theta_{t+1}=\theta_{t}+m_{t+1}$
- For each step, Nesterov's momentum uses gradient at new location $\theta_{t}+\beta m_{t}$ instead of current location.

### Second order Methods

**Newton's method**: $\theta_{t+1}=\theta_{t}-\eta_{t}\mathrm{H}_{t}^{-1}g_{t}$, where $\mathrm{H}_{t}=\mathrm{H}(\theta_{t})=\nabla^{2}\mathcal{L}(\theta_{t})$.
- when Hessian is convex, the descent direction is chosen as $-\mathrm{H}_{t}^{-1}g_{t}$
- Can be derived using taylor approximation of $\mathcal{L}(\theta)$ around $\theta_{t}$, and finding the minimum.
- BFGS
- Trust region: Do the opposite of line search, i.e. instead of determining the direction and then travelling optimally. Determine the distance first, and then solve for optimal direction.
	- around parameter $\theta_{t}$ determine a Region $\mathcal{R}_{t}$, where objective function can be approximated as $M_{t}(\delta)$ locally as a quadratic using taylor approximation.
	- At each step, we solve: $\delta^{*}=\arg \underset{\delta \in \mathcal{R_{t}}}{\min}M(_{t}(\delta))$, where $M_{t}(\delta)=\mathcal{L}(\theta_{t})+g_{t}^{\top}\delta+\frac{1}{2}\delta^{\top}\mathrm{H}_{t}\delta$.
	- If $\mathcal{R}_{t}$ is taken as a ball of radius r, then adding a Lagrange multiplier to M, $\delta^{*}=\arg \underset{_{\delta}}{\min}M(\delta)+\lambda \lVert \delta \rVert_{2}^{2}$.
	- Solve this using $\delta=-(H+\lambda I)^{-1}g$, i.e. $\lambda$ can be taken such that all eigenvalues are non-negative, and convex optimization methods like Momentum can be applied.

### SGD

**Lagrange Multipliers**: [Calculus III - Lagrange Multipliers](https://tutorial.math.lamar.edu/Classes/CalcIII/LagrangeMultipliers.aspx)

**Steepest Descent**: [Done](https://kenndanielso.github.io/mlrefined/blog_posts/13_Multilayer_perceptrons/13_7_General_steepest_descent.html) using different norms: Lp norms.

> [!todo] derive dual norm $\lVert a \rVert^{\dagger}_{q}$ of $a^{T}b$ subject to arbitrary $L_{p}$ norm $\lVert b \rVert_{p}=1$.

Dual formulation of steepest descent

$$
\begin{equation}
\underset{ \Delta w\in \mathbb{R}^{n} }{ \arg \min }\left[g^{\top}\Delta w+\frac{\lambda}{2}\lVert \Delta w \rVert^{2} \right]=-\frac{\lVert g \rVert^{\dagger}}{\lambda}\cdot \arg\min_{t\in \mathbb{R}^{n}:\lVert t \rVert=1 }g^{\top}t
\end{equation}
$$

- From the definition of dual norm, $\lVert g \rVert^{\dagger}=\underset{ \lVert b \rVert=1 }{ \max }g^{\top}b$ which implies, for any unit vector $\frac{w}{\lVert w \rVert}$, $$g^{\top}w\leq \lVert g \rVert^{\dagger}\lVert w \rVert$$
- Flipping the sign and adding the extra term: $$-\lVert g \rVert^{\dagger}\lVert \Delta w \rVert+\frac{\lambda}{2}\lVert \Delta w \rVert^{2}\leq g^{\top}\Delta w+\frac{\lambda}{2}\lVert \Delta w \rVert^{2}$$
- Our goal is to find $\Delta w$ to minimise $-\lVert g \rVert^{\dagger}\lVert \Delta w \rVert+\frac{\lambda}{2}\lVert \Delta w \rVert^{2}$. Let $u=\lVert\Delta w\rVert$, taking the gradient, we get $u=\lVert g \rVert^{\dagger} / \lambda$.
- Now, from dual norm, $g^{\top} \frac{\Delta w}{\lVert \Delta w \rVert}\geq-\lVert g \rVert^{\dagger}=-\underset{ t\in \mathbb{R}^{n}:\lVert t \rVert=1 }{ \max }g^{\top}t$. This becomes an equality when $$\frac{\Delta w}{\lVert \Delta w \rVert}=-\underset{ t\in \mathbb{R}^{n}:\lVert t \rVert=1 }{ \arg\max }g^{\top}t$$.
- Thus $$\Delta w=-\lVert \Delta w \rVert\underset{ t\in \mathbb{R}^{n}:\lVert t \rVert=1 }{ \arg\max }g^{\top}t=-\frac{\lVert g \rVert^{\dagger}}{\lambda}\underset{ t\in \mathbb{R}^{n}:\lVert t \rVert=1 }{ \arg\max }g^{\top}t$$

For $L_{2}$ based norm, dual norm = standard $L_{2}$ norm $\lVert g \rVert_{2}$ and $\arg \underset{\lVert t \rVert_{2}=1}{\max}g^{\top}t=\frac{g}{\lVert g \rVert}$, then $\Delta w=-\frac{\lVert g \rVert_{2}}{\lambda}$. This is the standard Gradient descent formula.

For $L_{\infty}$ based norm, dual norm = $L_{1}$ norm $\lVert g \rVert_{1}$ and $\underset{\lVert t \rVert_{\infty}=1}{\arg\max}\ g^{\top}t=\text{sign}(g)$, then $\Delta w=-\left( \frac{\lVert g \rVert_{1}}{\lambda} \right)\text{sign}(g)$. Note that, this is equivalent to Adam update when setting the parameters $\beta_{1},\beta_{2},\epsilon=0$. So, direction depends only on the sign and not the magnitude.

## EM

