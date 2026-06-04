---
title: "Academic Paper reading log"
date: 2026-05-23
tags:
- academic-papers
- machine-learning
---

# 22-05
Inverse problems using diffusion models
- What are the definition of inverse problems? $y=Ax+n$, where $n$ is noise (random, unavoidable errors), $x$ is the true state that we want to know, and $A$ is a measurement function (corruption or transformation function).
- Examples:
	- Blurring: y = blurred image, x = clean image, A = nearby pixel averaging
	- Mask & Delete: y = masked image, x = clean image, A = cuts gray box
	- Pose estimation: y = three floating dots, x = 3D human pose, A = motion capture system.
- Usually, forward problems (solving for y from x) are solved by using plain physics. And for inverse problems, When $A^{-1}$ is computable, x can be directly solved. But, for most inverse problems, A is invertible, and there are many possible $x$ for the same y. Thus, the problem is said to be *ill-posed*.
- The classical line of attack solves for minimum distance between the solution ($y,Ax$) based on some prior $R(x)$: $$\arg \underset{x}{\min}J(x)=\underbrace{ d(y,A(x)) }_{ \text{distance from }y }+\underbrace{ \lambda R(x) }_{ \text{regularizer} }$$
- Many works have explored different types of regularizers:
	- Total variation (TV) regularization: $\min \frac{1}{2}\lVert Ax-y \rVert^{2}_{2}+\lambda \lVert x \rVert_{\text{TV}}$, where $\lVert x \rVert_{\text{TV}}=\lVert \nabla x \rVert_{1}=\sum_{i}\sum_{j}\sqrt{ (x_{i+1,j}-x_{i,j})^{2}+(x_{i,j+1}-x_{i,j})^{2} }$ which is the L1 norm of the gradient. So, the regularizer restricts total variation in a single update, and selects $x$ that prevents a spike change.
	- Truncated SVD: We decompose A into SVD components: $A=U\Sigma V^{\top}$, and write the naive pseudo-inverse solution as $x_{\text{naive}}=\sum_{i=1}^{n}\frac{u_{i}^{\top}y}{\sigma_{i}}v_{i}$. For small eigenvalues, in ill-posed inverse problems some eigenvalues rapidly decay to zero. Dividing a noisy measurement $y$ with a small $\sigma_{i}$, scales the noise massively. TSVD truncates problematic small singular values by choosing a truncation threshold $k<n$, keeping the first k singular values, and discarding the rest by setting them to zero. Thus, TSVD solution can be formulated as $x_{\text{TSVD}}=\sum_{i=1}^{k} \frac{u_{i}^{\top}y}{\sigma_{i}}v_{i}$.
	- Bayesian inference: We treat $x$ as random variable, and apply Bayes' law to compute the posterior: $p(x|y)=\frac{p(y|x)p(x)}{\int p(y|x)p(x)dx}$, where the likelihood is regularized by a prior. Taking the argmax of the posterior gives a suitable solution $x$. But finding suitable prior is not straightforward.
- This is where generative models simplified the scope of the problem. Generative models are excellent at learning unknown distributions from samples of the distribution. By using a diffusion model to learn the prior distribution from data, and even generate prior samples based on feedback.

# 24-05

Pseudo-inverse GDM
- Measurement of some signal: $\mathbf{y}=\boldsymbol{H}\mathbf{x}_{0}+\mathbf{z}$, where $\boldsymbol{H}\in \mathbb{R}^{n\times m}$ and $\mathbf{z}\sim \mathcal{N}(0 , \sigma_{y}^{2}\boldsymbol{I})$.
- Writing score of posterior using bayes law: $\nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t}|\mathbf{y})=\underbrace{ \nabla_{\mathbf{x}_{t}}\log p(\mathbf{y}|\mathbf{x}_{t}) }_{ \text{likelihood} }+\underbrace{ \nabla_{\mathbf{x}_{t}}\log p(\mathbf{x}_{t}) }_{ \text{score} }$
- We know that $\nabla_{\mathbf{x}_{t}}\log p(\mathbf{y}|\mathbf{x}_{t})$ is intractable to compute, so we marginalize $p_{t}(\mathbf{y}|\mathbf{x}_{t})=\int_{\mathbf{x}_{0}}p(\mathbf{x}_{0}|\mathbf{x}_{t})p(\mathbf{y}|\mathbf{x}_{0})d\mathbf{x}_{0}$.
- Approximate $p_{t}(\mathbf{x}_{0}|\mathbf{x}_{t})\sim \mathcal{N}(\mathbf{\hat{x}}_{t} , r_{t}^{2}\boldsymbol{I})$ with a gaussian where $r_{t}^{2}$ is a time-dependent variance that depends on the data, 
	- the mean $\hat{\mathbf{x}}_{t}$  is obtained using Tweedie's formula: $\hat{\mathbf{x}}_{t}=\mathbb{E}[\mathbf{x}_{0}|\mathbf{x}_{t}]=\mathbf{x}_{t}+\sigma^{2}_{t}\nabla_{\mathbf{x}_{t}}\log p_{t}(\mathbf{x}_{t})\approx \mathbf{x}_{t}+\sigma^{2}_{t}S_{\theta}(\mathbf{x};\sigma_{t})$.
- When $\boldsymbol{H}$ is linear, and measurement is obtained by adding gaussian white noise along with $p(\mathbf{x}_{0}|\mathbf{x}_{t}),p(\mathbf{y}|\mathbf{x}_{0})$ both being Gaussian r.v. implying the distribution of $\mathbf{y}$ conditioned of $\mathbf{x}_{t}$ is also Gaussian 
$$p(\mathbf{y}|\mathbf{x}_{t})\approx \mathcal{N}(\boldsymbol{H}\hat{\mathbf{x}}_{t} , r^{2}_{t}\boldsymbol{H}\boldsymbol{H}^{\top}+\sigma_{\mathbf{y}}^{2}\boldsymbol{I})$$
- And we finally get following approximation to the score. This is interpreted as vector-jacobian product and can be obtained using backpropagation through the network.
$$\nabla_{\mathbf{x}_{t}}\log p_{t}(\mathbf{y}|\mathbf{x}_{t})\approx\left((\underbrace{ \mathbf{y}-\boldsymbol{H}\hat{\mathbf{x}}_{t})^{\top}( r_{t}^{2}\boldsymbol{H}\boldsymbol{H}^{\top}+\sigma^{2}_{\mathbf{y}}\boldsymbol{I})^{-1}\boldsymbol{H} }_{ \text{vector} }\underbrace{ \frac{ \partial \mathbf{\hat{x}}_{t} }{ \partial \mathbf{x}_{t} } }_{ \text{Jacobian} }  \right)^{\top}$$
- For cases when $\sigma_{\mathbf{y}}=0$, above equation can be written as following, and indicates that likelihood guidance term is influenced by the pseudo-inverse of the measurement matrix.
$$
\begin{align}
\nabla_{\mathbf{x}_{t}}\log p(\mathbf{y}|\mathbf{x}_{t}) & \approx\left((\underbrace{ \mathbf{y}-\boldsymbol{H}\hat{\mathbf{x}}_{t})^{\top}( r_{t}^{2}\boldsymbol{H}\boldsymbol{H}^{\top}+\cancelto{0}{ \sigma^{2}_{\mathbf{y}}\boldsymbol{I} })^{-1}\boldsymbol{H} }_{ \text{vector} }\underbrace{ \frac{ \partial \mathbf{\hat{x}}_{t} }{ \partial \mathbf{x}_{t} } }_{ \text{Jacobian} }  \right)^{\top} \\
 & =\left((\mathbf{y}-\boldsymbol{H}\hat{\mathbf{x}}_{t})^{\top}\boldsymbol{H}\left( \frac{1}{r_{t}^{2}\boldsymbol{H}\boldsymbol{H}^{\top}} \right)J_{\mathbf{x}_{t}}(\hat{\mathbf{x}})\right)^{\top} \\
 & =\left( \frac{1}{r_{t}^{2}}(\mathbf{y}^{\top}-\hat{\mathbf{x}}^{\top}\boldsymbol{H}^{\top})(\boldsymbol{H}\boldsymbol{H}^{\top})^{-1}\boldsymbol{H} \cdot J_{\mathbf{x}_{t}}(\hat{\mathbf{x}}_{t}) \right)^{\top} \\
 & =\left( \frac{1}{r_{t}^{2}}\Big(\mathbf{y}^{\top}(\boldsymbol{HH}^{\top})^{-1}\boldsymbol{H} -\hat{\mathbf{x}}_{t}\boldsymbol{H}^{\top}(\boldsymbol{HH^{\top}})^{-1}\boldsymbol{H}\Big)\cdot J_{\mathbf{x}_{t}}(\hat{\mathbf{x}}_{t})\right)^{\top} \\
 & =\left( \frac{1}{r_{t}^{2}}(\boldsymbol{H}^{\top}(\boldsymbol{HH^{\top}})^{-1}\mathbf{y})^{\top}-(\boldsymbol{H}^{\top}(\boldsymbol{HH^{\top}})^{-1}\boldsymbol{H}\mathbf{\hat{x}}_{t})^{\top}\cdot J_{\mathbf{x}_{t}}(\hat{\mathbf{x}}_{t}) \right)^{\top} \\
 & =\left( \frac{1}{r_{t}^{2}}(\boldsymbol{H}^{\dagger}\mathbf{y}-\boldsymbol{H}^{\dagger}\boldsymbol{H}\mathbf{x}_{t})^{\top}\cdot J_{\mathbf{x}_{t}}(\hat{\mathbf{x}}_{t}) \right)^{\top} & (\boldsymbol{H}^{\top}(\boldsymbol{HH^{\top}})^{-1} \text{ is Moore-Penrose PI})
\end{align}
$$
- As notable from the equation derived above, score of the likelihood doesn't require $H$ to be differentiable, because $\boldsymbol{H}$ and the pseudo-inverse $\boldsymbol{H}^{\dagger}$ are used directly as static functions inside the "vector" of the *vector-jacobian* product. This means $\boldsymbol{H}$ doesn't need to linear or even differentiable.
- For complex non-linear cases, measurement function $h(\mathbf{x}):\mathbb{R}^{n}\to \mathbb{R}^{m}$ need to only satisfy the pseudo-inverse property, namely we need to find another function $h^{\dagger}:\mathbb{R}^{m}\to \mathbb{R}^{n}$ such that $h(h^{\dagger}(h(\mathbf{x})))=h(\mathbf{x}),\ \forall \mathbf{x} \in \mathbb{R}^{n}$.
- Variance of approximation $r_t^2$. Assume $p_0(\mathbf{x}_0)\sim\mathcal{N}(0,\boldsymbol{I})$, then applying Bayes law to $p_t(\mathbf{x}_0|\mathbf{x}_t)\propto p_{0}(\mathbf{x}_{0})p(\mathbf{x}_{t}|\mathbf{x}_{0})$. We know that forward noising process adds Gaussian noise with variance $\sigma^{2}_{t}$, and $p(\mathbf{x}_{t}|\mathbf{x}_{0})\sim \mathcal{N}(\mathbf{x}_{0} , \sigma^{2}_{t}\boldsymbol{I})$.
	- The posterior turns out to be $p_{t}(\mathbf{x}_{0}|\mathbf{x}_{t})\propto \mathcal{N}\left( \frac{\mathbf{x}_{t}}{\sigma^{2}_{t}+1} , \frac{\sigma^{2}_{t}}{\sigma^{2}_{t}+1} \right)$. So, for $t = 0,\sigma_{t}^{2}\to0\implies r_{0}=0$ and $t=T, \sigma^{2}_{t}\gg_{1}\implies r_{T}\approx1$.
	- To see how the algorithm behaves (listening to unconditional score vs likelihood as measurement guidance) over time with respect to variance, assume $H=I$, the weighting factor for the likelihood guidance term comes out to be $r_{t}^{2}(r_{t}^{2}+\sigma_{\mathbf{y}}^{2})^{-1}$.
	- For $t\to T$, $\sigma_{t}$ is large, the image is composed of purely white noise, and the model doesn't know if it's generating image of a face or cat or dog, $r_{t}\approx1$ meaning the guidance term dominates the unconditional path, and forcefully take the sample towards noisy measurement $\mathbf{y}$.
	- For $t\to0$, $r_{t}\to\sigma_{t}$ then $r_{t}^{2}(r_{t}^{2}+\sigma_{\mathbf{y}}^{2})^{-1}\approx\sigma_{t}^{2}\sigma_{\mathbf{y}}^{-2}\to0$. So, the noisy measurement term provides little impact, and the algorithm follow the unconditional generation path.