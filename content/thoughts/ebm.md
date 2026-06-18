---
title: "Energy-based models"
date: 2026-04-30
tags:
- machine-learning
- generative-modelling
- notes
---


# Density Models

Density models output the PDF $p_{\theta}$ fit to the training data and optionally a generator depending on the direct or indirect approach used for modelling. Training data distribution $p_{\theta}$ may be used to produce a generator or density function might be the final goal. Sampling techniques like MCMC or Langevin sampling can be used to sample from the distribution as a form of indirect approach to generative modelling.

Objective is measured using divergence, usually KL divergence: $p_{\theta}^{*}=\arg \underset{p_{\theta}}{\min}D_{\text{KL}}(p_{\mathcal{D}}\lVert p_{\theta})$.

> [!question] Why use KL divergence, and Why is KL divergence measured with forward direction and not $p_{\theta}\lVert p_{\mathcal{D}}$?
> Because we usually don't have the actual function $p_{\mathcal{D}}$ and only have input $x\sim p_{\mathcal{D}}$ drawn from the distribution. KL divergence can be measured by only using samples from the underlying distribution, and we already output the training data distribution using the model.

Objective turns out to be $p_{\theta}^{*}=\underset{p_{\theta}}{\arg\max} \frac{1}{N}\sum_{i=1}^{N}\log p_{\theta}(x^{(i)})$. Maximising the objective means giving maximum probability density over the actual samples seen, and due to the marginalising property of PDFs, this reduces the distribution density over other regions.

# EBMs

Contrary to density based models, EBMs don't normalise the probability density function, and instead learn the unnormalised energy function $E_{\theta}$, and then convert it to normalised density $p_{\theta}=\frac{1}{Z_{\theta}}\exp(-E_{\theta})$, where $Z_{\theta}=\int_{x}\exp(-E_{\theta}(x))dx$ is the normalising constant or *partition function*. Probability density is similar to Boltzmann or Gibbs distribution used in statistical mechanics, and thus, lower energy means high probability. So, we minimise energy to increase probability.

> [!question] If we don't normalise, how is EBMs useful? Where are they used?

Advantage of EBMs is the flexible use of any non-negative real scalar function as energy function, and this allows to use different type of NN architectures. Each of these architecture can have specialised use in different tasks like image generation, RL, density estimation, etc.

Calculating relative probability $p_{\theta}(x_{1})/p_{\theta}(x_{2})$ is straightforward for EBMs and is generally, what's required for sampling in MCMC. It's not fit for places where end output need to indicate true probabilities about the result. 

To fit the probabilistic model $p_{\theta}$ parametrised by $\theta$ to underlying data distribution: $\ell(\theta)=E_{x\in p_{\mathcal{D}(x)}}[\log p_{\theta}(x)]$. Maximising log likelihood is equivalent to minimising the KL divergence: $\ell(\theta)=-D_{\text{KL}}(p_{\mathcal{D}}\lVert p_{\theta})+\text{const}$.

Gradient of log-likelihood is estimated using MCMC methods: $\nabla_{\theta}\log p_{\theta}(x)=-\nabla_{\theta}E_{\theta}(x)-\nabla_{\theta}\log Z_{\theta}$, where the first term is positive gradient, and minimising that means optimising the parameters in the direction of minimising the energy. We don't know what second term is (since the normalisation is an intractable integral). But using basic calculus, this simplifies to 

$$
\begin{align}
\nabla_{\theta}\log Z_{\theta}&=\frac{1}{Z_{\theta}}\nabla_{\theta}\int_{x}e^{-E_{\theta}}dx \\
&=\int_{x}\frac{e^{-E_{\theta}}}{Z_{\theta}}\nabla_{\theta}E_{\theta}dx \\
&=-E_{x\sim p_{\theta}}[\nabla_{\theta}E_{\theta}(x)]
\end{align}
$$

Thus, both first and second term can be estimated using MC sampling by defining $x^{(i)}\sim p_{\mathcal{D}}$ and $\hat{x}^{(i)}\sim p_{\theta}$, then 

$$
\underbrace{ -E_{x\sim p_{\mathcal{D}}}[\nabla_{\theta}E_{\theta}(x)] }_{{ \text{positive term} }}+\underbrace{ E_{x\sim p_{\theta}}[\nabla_{\theta}E_{\theta}(x) ]}_{{ \text{negative term} }}\approx-\frac{1}{N}\sum_{i=1}^{N} \nabla_{\theta}E_{\theta}(x^{(i)})+\frac{1}{N}\sum_{i=1}^{N} \nabla_{\theta}E_{\theta}(\hat{x}^{(i)})
$$

To build the intuition for the final update, the parameters are optimised such that the contrast between actual data samples $x^{(i)}$ and model's output samples $\hat{x}^{(i)}$ are closer together. This is the method of **contrastive divergence** where on each iteration of the optimisation step, the method decreases the energy assigned to data samples (positive term) and increases the energy assigned to model's output samples (negative term). Eventually (after T steps), the energy function perfectly fits the data, and both the terms cancel out which is what the CD optimiser minimises.

> [!note] Both Density and Energy based models do not have latent variables that can be altered to directly control the generated data but instead follow the indirect approach of estimating the true distribution and output a score/probability related to likelihood of data which can be optimised to synthesise higher quality data.

## Score Matching

- Score matching: Learning the energy function as gradient of log probability
- How it tackles learning EBMs: instead of expensive MCMC sampling for each iteration using CD, score matching can allow to learn energy function directly.
- Fisher divergence: minimise the l2 norm of true signal vs learned function
- Basic Score matching
- Denoising score matching
- Sliced score matching