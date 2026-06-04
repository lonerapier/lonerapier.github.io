# Normalizing flows



# Flow Matching

As we saw, learning forward and reverse SDE using score function changed the dynamics under which diffusion-based models operate. Differential equations turned out to be the underlying language. Because diffusion is just transporting particles from one state to another where start and end states follows certain distribution. The question arose, "whether we can use ODEs to follow the exact same trajectory as the learned SDE in score-based models?". Flow matching based generative models constructed a suitable ODE, 
solving which gets the **flow** of the equation. Solving the ODE implies learning the associated vector field.

So, the goal of flow matching based generative model is to design a vector field that transforms a sample-able distribution (say Gaussian) to target distribution $p_{\mathcal{D}}$.

> [!note] Vector field and ODE
> Vector field $u:\mathbb{R}^{n}\times[0,1]\to \mathbb{R}^{n},\ (x,t)\mapsto u_{t}(x)$ assigns a vector to each position in the space, and represents instantaneous movement at all locations, and we want to create an ODE, solution of which gives a trajectory that follows the vector field. Formally, $\frac{d}{dt}X_{t}=u_{t}(X_{t})$ with the initial condition, $X_{0}=x_{0}$.
> 
> Before moving forward, We should also be confident about the existence of a solution to such an ODE. Fortunately, it's already proven that when the vector field $u$ is in $C^{1}$ with a bounded derivative then the ODE has a unique solution given by flow.

Flow map, $\psi:\mathbb{R}^{n}\times[a,b]\to \mathbb{R}^{n}$ denotes the location of a particle in the space at time t. Solution to the ODE, $\frac{ \partial  }{ \partial t }\psi_{t}(x_{0})=u_{t}(\psi_{t}(x_{0}))$, with initial condition $\psi_{0}(x_{0})=x_{0}$. Trajectory of the ODE is recovered via $X_{t}=\psi_{t}(X_{0})$. Thus, solving an ODE, or finding the vector field, or flow map is equivalent. Intuitively, **Flow map** is the solution to the **ODE** defined by **vector fields**.

We don't know the final distribution, so we need a way to estimate the flow map using only samples from $p_{\mathcal{D}}$. An intermediate solution is to pick a conditional sample $z_{j}$ and let all trajectories $X_{0}\sim p_{\text{init}}$ end at $z_{j}$. We define a *conditional interpolating probability path* as the set of distribution $p_{t}(x|z)$ such that $p_{0}(\cdot|z)=p_{\text{init}},\ p_{1}(\cdot|z)=\delta_{z}\quad \forall z\in \mathbb{R}^{n},\,t\in[0,1]$. Think of probability path as a straight line from noise distribution $p_{\text{init}}$ and data distribution $p_{\mathcal{D}}$. Taking the example of Gaussian probability path, trajectory $\psi_{t}(X_{0})$ is defined a simple straight line trajectory $\psi_{t}(X_{0})=\alpha_{t}z+\beta_{t}X_{0},\, X_{0}\sim \mathcal{N}(0 , I)$ and $\alpha_{t},\beta_{t}$ are the noise schedulers such that $\alpha_{t}+\beta_{t}=1$. So eventually, $\beta_{t}\to0$, and $\psi_{t}(X_{0})=z$. For intermediate time, $\psi_{t}(x|z)\sim \mathcal{N}(\alpha_{t}z , \beta_{t}^{2}I)$ is shrinking Gaussian.

The probability path can define intermediate distributions along the trajectory, but we don't know the marginal vector field $u_{t}(x)$ corresponding to all points $z\in \mathbb{R}^{n}$. So, we can define the conditional vector field $u_{t}^{\text{target}}(\cdot|z)$ for every data point $z\in \mathbb{R}^{n}$ such that solving the ODE $\frac{d}{dt}X_{t}=u_{t}^{\text{target}}(X_{t}|z)$ gives the conditional probability path $X_{t}\sim p_{t}(\cdot|z)\quad(0\leq t\leq1)$.

$$
\begin{equation}
\frac{d}{dt}X_{t}=u_{t}^{\text{target}}(X_{t}|z)\implies \frac{d}{dt}\psi_{t}(X_{0}|z)=u_{t}^{\text{target}}(X_{t}|z)
\end{equation}
$$

Taking an example of conditional Gaussian probability path $\psi_{t}(X_{0})=\alpha_{t}z+\beta_{t}X_{0}$.

$$
\begin{align}
\frac{d}{dt}(\alpha_{t}z+\beta_{t}x_{0}) & =u_{t}^{\text{target}}(\alpha_{t}z+\beta_{t}x_{0}|z) & \forall x,z\in \mathbb{R}^{n} \\
\dot{\alpha}_{t}z+\dot{\beta}_{t}x_{0} & =u_{t}^{\text{target}}(\alpha_{t}z+\beta_{t}x_{0}|z) & \left[ \dot{\alpha}_{t}=\frac{d\alpha_{t}}{dt},\dot{\beta}_{t}=\frac{d\beta_{t}}{dt} \right] \\
\left( \dot{\alpha}_{t}z+\dot{\beta}_{t}\left( \frac{y-\alpha_{t}z}{\beta_{t}} \right) \right) & =u_{t}(y|z) & [\because\text{Denote }y=\alpha_{t}z+\beta_{t}x] \\
\left( \dot{\alpha}_{t}-\frac{\dot{\beta}_{t}}{\beta_{t}}\alpha_{t} \right)z+\frac{\dot{\beta}_{t}}{\beta_{t}}y & =u_{t}(y|z) \\
\left( \dot{\alpha}_{t}-\frac{\dot{\beta}_{t}}{\beta_{t}}\alpha_{t} \right)z+\frac{\dot{\beta}_{t}}{\beta_{t}}x & =u_{t}(x|z)  & [\text{Change of variables, denote }y\to x] \\
\end{align}
$$

So, we have the conditional vector field, but as explained before, what we need is *marginal vector field*. Define **marginal vector field** as the average of all conditional fields for all data points $z\in \mathbb{R}^{n}$ weighed by how likely it is to get $x$ from $z$. We use **continuity equation** to get marginal from conditional vector fields.

$$
\partial_{t}p_{t}(x)=-\text{div}(p_{t}u_{t}^{\text{target}})(x)\quad \forall x \in \mathbb{R}^{n},0\leq t\leq1
$$

Informally, it states that change of probability mass at each location over time equals the net inflow (negative divergence) of mass change according to the vector field at x (Each particle follows the field scaled by total mass currently residing at $x$). Interpret $\text{div}(p_{t}u_{t}^{\text{target}})(x)$ as $u_{t}\in \mathbb{R}^{n}\to \mathbb{R}^{n}$ as vector-valued function, $p_{t}\in \mathbb{R}^{n}\to \mathbb{R}$ as scalar valued function, then $p_{t}(x)u_{t}(x)\in \mathbb{R}^{n}$, and 
$$
\begin{equation}
\nabla\cdot(p_{t}u_{t}^{\text{target}})(x)=\left[ \frac{ \partial  }{ \partial x_{1} } ,\frac{ \partial  }{ \partial x_{2} } ,\dots,\frac{ \partial  }{ \partial x_{n} }  \right]
\begin{bmatrix}
p_{t}u_{t}^{1}(x) \\
p_{t}u_{t}^{2}(x) \\
\vdots \\
p_{t}u_{t}^{n}(x)
\end{bmatrix}
\end{equation}
$$

We know that conditional vector field $u_{t}^{\text{target}}(\cdot|z)$ correctly transports conditional probability path $p_{t}(x|z)$. But we need to know whether marginal vector field will also correctly solve the marginal probability path. 

$$
u_{t}^{\text{target}}(x)=\int u_{t}^{\text{target}}(x|z)\frac{p_{t}(x|z)p_{\mathcal{D}}(z)}{p_{t}(x)}dz
$$

Define marginal vector field as the average over all data points $z$ that takes velocity $u_{t}^{\text{target}}(x|z)$ weighted by the probability of generating $x$ from $z$, and we have to prove that it follows the marginal probability path, i.e $X_{0}\sim p_{\text{init}},\quad \frac{d}{dt}X_{t}=u_{t}^{\text{target}}(X_{t})\implies X_{t}\sim p_{t}\quad(0\leq t\leq1)$. We can prove this using continuity equation:

$$
\begin{align}
\partial_{t}p_{t}(x) & = \partial_{t}\int p_{t}(x|z)p_{\mathcal{D}}(z)dz \\
 & =\int \partial_{t}p_{t}(x|z)p_{\mathcal{D}}(z)dz \\
 & =\int-\text{div}(p_{t}(\cdot|z)u_{t}^{\text{target}}(\cdot|z)) p_{\mathcal{D}}(z)dz \\
 & =-\text{div}\left( \int p_{t}(x|z)u_{t}^{\text{target}}(x|z)p_{\mathcal{D}}(z)dz \right) \\
 & =-\text{div}\left(p_{t}( x)\int u_{t}^{\text{target}}(x|z)\frac{p_{t}(x|z)p_{\mathcal{D}}(z)}{p_{t}(x)}dz \right)(x) \\
 & =-\text{div}(p_{t}u_{t}^{\text{target}})(x)
\end{align}
$$

Continuity equation is satisfied when marginal vector field equals the field defined above, and transports $X_{0}\sim p_{\text{init}}$ to $p_{t}$ such that the endpoint of the flow $X_{1}\sim p_{\mathcal{D}}$. Now, we see how do we learn the marginal vector field $u_{t}^{\text{target}}$.

We parametrise the vector field as neural network approximation $u_{t}^{\theta}$ and use MSE loss as the flow matching loss:
$$
\begin{equation}
\mathcal{L}_{\text{FM}}(\theta)=\mathbb{E}_{t\sim U[0,1],x\sim p_{t}}\left[ \lVert u_{t}^{\theta}(x)-u_{t}^{\text{target}}(x) \rVert ^{2} \right]
\end{equation}
$$

But we can't directly sample from $p_{t}(x)$, so we use ancestral sampling $z\sim p_{\mathcal{D}},x\sim p_{t}(x|z)$.

$$
\begin{equation}
\mathcal{L}_{\text{FM}}(\theta)=\mathbb{E}_{t\sim U[0,1],z\sim p_{\mathcal{D}},x\sim p_{t}(x|z)}\left[ \lVert u_{t}^{\theta}(x)-u_{t}^{\text{target}}(x) \rVert ^{2} \right]
\end{equation}
$$

Informally, the loss says to draw a random time $t\in [0,1]$, then draw a random point $z$ from the data set, and sample $x\sim p_{t}(\cdot|z)$, and compute $u_{t}^{\theta}(x)$, and then finally compute the mean squared error between the output from the neural network and true marginal vector field $u_{t}^{\text{target}(x)}$. But computing the marginal vector field requires that the integral is tractable, which is often untrue. Solution to this is to use a known term and replace with unknown term in the loss formula, and then use the surrogate loss. We will, ofcourse, have to prove that minimising the surrogate loss is equivalent to minimising the original one. We use the conditional velocity field $u_{t}^{\text{target}}(x|z)$, and define the new loss as:

$$
\begin{equation}
\mathcal{L}_{\text{CFM}}(\theta)=\mathbb{E}_{t\sim U[0,1],z\sim p_{\mathcal{D}},x\sim p_{t}(x|z)}\left[ \lVert u_{t}^{\theta}(x)-u_{t}^{\text{target}}(x|z) \rVert ^{2} \right]
\end{equation}
$$

In the next result, we show that marginal flow matching loss equals the conditional flow matching loss up to a constant, $\mathcal{L}_{\text{FM}}=\mathcal{L}_{\text{CFM}}+C$. Therefore, $\nabla_{\theta}\mathcal{L}_{\text{FM}}=\nabla_{\theta}\mathcal{L}_{\text{CFM}}$. Proof works by expanding the mean squared error into components and removing constants:

$$
\begin{align}
\mathcal{L}_{\text{FM}}(\theta) & =\mathbb{E}_{t\sim U[0,1],x\sim p_{t}}\left[ \lVert u_{t}^{\theta}(x)-u_{t}^{\text{target}}(x) \rVert^{2}  \right] \\
 & =\mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}\left[ \lVert u_{t}^{\theta}(x) \rVert ^{2} \right]-2\mathbb{E}_{t\sim U,x\sim p_{t}}[u_{t}^{\theta}(x)^{T}u_{t}^{\text{target}}(x)]+\underbrace{ \mathbb{E}_{t\sim U,x\sim p_{t}}\left[ \lVert u_{t}^{\text{target}}(x) \rVert  ^{2}\right] }_{ \text{independent of $\theta$} } \\
\end{align}
$$

Now, let's take a look at the second summand:

$$
\begin{align}
\mathbb{E}_{t\sim U,x\sim p_{t}}[u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x)] & =\int _{0}^{1}\int p_{t}(x)u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x) \, dx  \, dt \\
 & = \int _{0}^{1}\int p_{t}(x)u_{t}^{\theta}(x)^{\top}\left[ \int u_{t}^{\text{target}}(x|z) \frac{p_{t}(x|z)p_{\mathcal{D}}(z)}{p_{t}(x)}dz \right] \, dx  \, dt \\
 & = \int _{0}^{1}\int \int u_{t}^{\theta}(x)^{\top} u_{t}^{\text{target}}(x|z)p_{t}(x|z)p_{\mathcal{D}}(z)\, dz\, dx\, dt \\
 & = \mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}[u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x|z)]
\end{align}
$$

We plug the result into the equation for $\mathcal{L}_{\text{FM}}$,

$$
\begin{align}
\mathcal{L}_{\text{FM}}(\theta) & =\mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}\left[ \lVert u_{t}^{\theta} \rVert^{2}- 2u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x|z) \right] + C_{1} \\
 & =\mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}\left[ \lVert u_{t}^{\theta} \rVert^{2}- 2u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x|z)+\lVert u_{t}^{\text{target}}(x|z) \rVert ^{2}-\lVert u_{t}^{\text{target}}(x|z) \rVert ^{2} \right] + C_{1} \\
 &  =\mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}\left[ \lVert u_{t}^{\theta} - 2u_{t}^{\theta}(x)^{\top}u_{t}^{\text{target}}(x|z)\rVert^{2} \right] + \underbrace{ \mathbb{E}_{t\sim U,z\sim p_{\mathcal{D}},x\sim p_{t}}\left[ -\lVert u_{t}^{\text{target}}(x|z) \rVert ^{2} \right] }_{ \text{independent of $\theta$} } + C_{1} \\
 & = \mathcal{L}_{\text{CFM}}+C_{2}+C_{1}
\end{align}
$$

Therefore, flow matching training consists of minimising the conditional flow matching loss. We can see that the loss equation turns out to be simple regression, equivalent to supervised learning. We also thus, don't need to simulate any ODE during training, and can directly train the neural network on the loss.

For the Gaussian conditional probability paths, the loss function simplifies to

$$
\begin{align}
\mathcal{L}_{\text{CFM}}(\theta) & =\mathbb{E}_{t,z,x\sim \mathcal{N}(\alpha_{t}z , \beta_{t}^{2}I_{d}) }\left[ \left\lVert  u_{t}^{\theta}(x)-\left( \dot{\alpha}_{t}-\frac{\dot{\beta}_{t}}{\beta_{t}}\alpha_{t} \right)z-\frac{\dot{\beta}_{t}}{\beta_{t}}x  \right\rVert^{2} \right] & (\text{substitute }u_{t}^{\text{target}}(x)) \\
 & =\mathbb{E}_{t,z,\epsilon \sim \mathcal{N}(0 , I_{d}) }\left[ \lVert u_{t}^{\theta}(\alpha_{t}z+\beta_{t}\epsilon)-(\dot{\alpha}_{t}z+\dot{\beta}_{t}\epsilon) \rVert^{2}  \right] & (\text{replace $x$ by }\alpha_{t}z+\beta_{t}\epsilon) \\ \\
 &  = \mathbb{E}_{t,z,\epsilon}[\lVert u_{t}^{\theta}(tz+(1-t)\epsilon)-(z-\epsilon)\rVert^{2}] & (\alpha_{t}=t,\beta_{t}=1-t)
\end{align}
$$

# References
1. Lipman, Yaron, et al. "Flow matching for generative modeling." _arXiv preprint arXiv:2210.02747_ (2022).
2. Liu, Xingchao, Chengyue Gong, and Qiang Liu. "Flow straight and fast: Learning to generate and transfer data with rectified flow." _arXiv preprint arXiv:2209.03003_ (2022).
3. Albergo, Michael, Nicholas M. Boffi, and Eric Vanden-Eijnden. "Stochastic interpolants: A unifying framework for flows and diffusions." _Journal of Machine Learning Research_ 26.209 (2025): 1-80.
4. Lipman, Yaron, et al. "Flow matching guide and code." _arXiv preprint arXiv:2412.06264_ (2024).