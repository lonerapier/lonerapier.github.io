# Generative Modelling

Generative model is defined as a stochastic function $g:\mathcal{Z\times Y\to X}$ (contrary to a discriminative model (e.g. classifier) $f:\mathcal{X\to Y}$), where $z\in \mathcal{Z}$ is the latent variable, and $y\in \mathcal{Y}$ is the label/description. Output of the generator $g$ can be varied using the randomised latent variable. 
$$
\begin{align}
z&\sim p(Z) \\
x&=g(z,y)
\end{align}
$$

Latent variable z is a multi-dimensional vector that describes the features of the output not mentioned in label to the model. In an image generation model, it could be the setting of the environment, colour depth, pose, background.

Process:
- Learner: Given output data for a discriminative: $\{ y^{(i)} \}_{i=1}^{N}$, learner gets fed and outputs a generator function $g$.
- Generator: Sampling the generator with a randomised vector $z$ produces output $\{ \hat{x}^{(i)} \}_{i=1}^{N}$.

Unconditional vs Conditional generative models: Model may be conditioned on inputs or some other variables c of the form $p(X|Y)$.

Objective: How to measure the quality of the output by a generative model?
- Output synthetic data that matches original data on certain marginal statistics. For example, it has the same mean colour as real photos or same colour variance.
	> [!question] How to find the statistics for other modalities like text/molecules? Number of words/sentences?
- Output synthetic data that has high probability under a density model fit to the real data, i.e. $\hat{x}\sim p_{\mathcal{D}}$ where $p_{\mathcal{D}}$ is the true process that produces original data.

Approaches: How to form data generators?
- Direct approach: learn the generator function $G:\mathcal{Z\times X\to Y}$ directly. GANs or Diffusion models work based on direct approach.
- Indirect approach: learn a score function $E:\mathcal{X}\to \mathbb{R}$ and generate samples that scores highly under this function. Density models and Energy based models work under indirect approach.

[[thoughts/ebm]]

[[thoughts/autoregressive]]

[[thoughts/gan]]

[[thoughts/vae]]

[[thoughts/vdm]]

[[thoughts/score-matching]]

[[thoughts/flow-matching]]

[[thoughts/discrete-diffusion]]