---
title: Gaussian Processes
date: 2026-02-07
tags:
  - statistics
---

> [!tip] MVN
> $\mathcal{N}(\mu,\Sigma)$ is a distribution on a set of n random variables in n-dimension, where index i determines $i^{\text{th}}$ random variable, $\mu$ sets the position and scale of the distribution and $\Sigma$ sets the shape of the distribution on the basis of correlation between each pair of $\mathbf{x}_{i},\mathbf{x}_{j}$, where $\mathbf{x}_{i}$ is ith random variable.
>
> Joint distribution: $$P_{X,Y}=\begin{bmatrix} X \\ Y \end{bmatrix}\sim \mathcal{N}(0,\Sigma)=\mathcal{N}\left(\begin{bmatrix} 0 \\ 0 \end{bmatrix},\begin{bmatrix} \Sigma_{XX} & \Sigma_{XY} \\ \Sigma_{YX} & \Sigma_{YY} \end{bmatrix}\right)$$
>
> Conditional distribution: $$P_{X|Y}\sim\mathcal{N}(\mu_{X}+\Sigma_{XY}\Sigma_{YY}^{-1}(Y-\mu_{Y}),\Sigma_{XX}-\Sigma_{XY}\Sigma_{YY}^{-1}\Sigma_{YX})$$

- Non-parametric method that allows us to make predictions on our data by incorporating prior knowledge. It defines a **probability distribution over possible functions**.
- Most common example about usage of Gaussian process is to fit a function to a data (regression). But you might wonder, that the possible solution to this problem is infinitely large, or in other words the function space that fits to the problem is arbitrary.
- Gaussian process assigns a probability to each of these functions and restricts the function space. Mean of this distribution gives us the most probable characterisation of the data.
- defines distribution over functions $f:\mathcal{X}\to \mathbb{R}$, where $\mathcal{X}$ is any domain with the assumption that set of values $[f(x_{1}),\dots,f(x_{M})]$ of function of any input set is jointly Gaussian with mean $\mu=m(x_{1}),\dots,m(x_{M})$ and covariance $\Sigma_{ij}=\mathcal{K}(x_{i},x_{j})$.
- For a new input (test point) $x_{*}$, we infer $f(x_{*})$ from knowledge of $f(x_{1}),\dots ,f(x_{n})$.
- We assume that both the training set $Y$ and test set $X$ is Gaussian, and due to the property of Gaussian distribution, the joint $P_{X,Y}$ and conditional distribution $P_{X|Y}$ is also Gaussian.
- The joint distribution $P_{X,Y}$ with dimension $\lvert X\rvert+\lvert Y\rvert$ spans the space of all possible function values for the function that we are trying to predict.
- We use Bayesian inference to model the prior $P_{X}$ when no training data is seen, and gradually build up the posterior $P_{X|Y}$ as we see more training data.
- To determine the conditional probability distribution, we need to build the prior with the parameters $\mu,\Sigma$.
	- Mean is generally assumed to be 0 in the starting to ease the complexity, and can be added later as it just shifts and scales the distribution.
	- Covariance matrix is determined using covariance function or kernel of the Gaussian process. It takes as input the pairwise points and outputs the similarity between them.
- Before diving into kernel methods, let's move ahead and understand what happens after we have the parameters and thus, the prior.
	- Using the covariance function, we build the covariance matrix as a Gram matrix (positive definite matrix).
	- Once we have the parameters, we can just draw samples from the distribution and values of the function at test data is just the ith point of the vector.
- Kernel: maps input to higher-dimensional space and measures the similarity between pair of points.
	- Stationary: invariant to translation like RBF, Periodic kernels. Covariance of two points is only dependent upon their relative position.
	- Non-stationary: covariance depends on the absolute position of the points. Linear kernel.
	- We can combine kernels together to build a better prior, and even estimate the kernel hyperparameters using gradient based methods.
- Once we start observing training data, we model the joint distribution $P_{X,Y}$ between the test and training to compute the corresponding covariance matrix.
- Next, we condition the gaussian on test data and compute $P_{X|Y}$ which gives us the derived parameters $\mathcal{N}(\mu',\Sigma')$. Training points constrain the set of possible function in our function space to the functions that pass through the training data. Predictive uncertainty reduces significantly near the defined points and increases as we move further away.
- We can also model the error in training points as gaussian $\epsilon\sim\mathcal{N}(0,\sigma^{2})$ and add to our training points $Y=f(X)+\epsilon$, the joint distribution then gets modified slightly: $$P_{X,Y}=\begin{bmatrix} X \\ Y \end{bmatrix}\sim \mathcal{N}(0,\Sigma)=\mathcal{N}\left(\begin{bmatrix} 0 \\ 0 \end{bmatrix},\begin{bmatrix} \Sigma_{XX} & \Sigma_{XY} \\ \Sigma_{YX} & \Sigma_{YY}+\sigma^{2}I \end{bmatrix}\right)$$

TODO:
- GPs for classification
- Estimating the kernel using gradient based methods

Further reading:
- PML book 1, Section 17.2
- PML book 2, Chapter 18

References:
- [A Visual Exploration of Gaussian Processes](https://distill.pub/2019/visual-exploration-gaussian-processes)