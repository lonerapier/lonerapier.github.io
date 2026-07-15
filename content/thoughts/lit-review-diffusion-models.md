---
title: Literature Review of Diffusion Models
date: 2026-07-14
tags:
- deep-learning
- generative-modeling
- machine-learning
---

Interests
- Flow-based generative models (flow matching, diffusion/score models, and related formulations)
- Sampling and learning algorithms
- One-step and few-step models; distillation and consistency-style training
- Optimal transport perspectives
- Connections with other generative paradigms
- Discrete flow and diffusion models, and applications to language modeling, protein modeling
- Applications including vision, text, multimodal modeling, and scientific settings
- what's after diffusion (markov-process based iterative noising and denoising), score (navigating the data manifold through score approximation), and flow matching (approximating the optimal transport map)? Energy based matching?

Questions
- Why high-dimensional gaussians' density is concentrated on a sphere?
- What's fisher divergence, and what's the geometry like? Compare it to more general bregman divergence?
- What's tweedie's identity? How to derive it? Explain it in plain words.
- Write the continuous time version of langevin dynamics? Why is there a square-root 2 in the diffusion term? Why is it useful for diffusion models?
- Score Matching
	- What's the difference between score matching (Hyvärinen and Dayan, 2005) and denoising score matching (Vincent, 2011)?
	- What's the issue with Score matching?
	- How does sliced score matching sidestep the problems in score matching? And what's the problem with sliced score matching?
	- Write the loss function for denoising score matching (DSM). Express *denoiser*. How does it connect with tweedie's identity?
	- How does NCSN improves upon previous iteration of score matching? Write training objective of NCSN.
	- can i explain the difference between VE-SDE, and VP-SDE?
	- Why is NCSN VE-SDE, and DDPM VP-SDE?
	- How are NCSN and DDPM losses connected?
	- What's the difference between denoising score matching and NCSN?
	- Illustrate DDPM, NCSN.
	- Proof of affine-drift conditional forward kernel closed-form analytical formulation as gaussian.
	- Why does forward marginal density converge to prior distribution?
	- Write reverse SDE dynamics equation. Explain the reason for diffusion coefficient in the drift coefficient term.
	- How does f,g in forward and reverse SDE vary with time?
	- What's PF-ODE? How to convert between other representations of the same thing? i.e. going from SDE to ODE to discretization.
	- What's the algorithm/pseudocode for annealed langevin dynamics? How is it different from Unadjusted langevin algorithm?
	- Proof of fokker-planck.
	- How does $\sigma$ vary from $t=0\to t=T$? Is it more at the start or the end?
- Flow matching
	- NF, continuous NF, NODE
	- Illustrate flow matching models.
- Efficient solvers and samplers
	- What are the different samplers for ODEs and SDEs that are used?
	- What are the different ODE solvers used for sampling the diffusion models?
	- Write the equation for euler-maruyama?
	- What's the sde solver beside euler-maruyama?
	- What are the main takeaways from EDM paper?
- Guided diffusion
	- How will you explain DPS really quickly?
	- guidance: classifier-based, classifier free
- Multimodal diffusion
	- What's the problem with CLIP? What are other better multimodal encoders?
- Architecture
	- Lay out the architecture for U-Net and DiTs. How are they different? Which to prefer? What's the pitfalls?
	- Write the architecture for Image generators: SD2, SD3, Flux 1-2, Nano Banana
	- Illustrate the architecture for multimodal DiT
	- Write the architecture for Video Gen models. Meta Movie gen, google omni
	- What's the current SOTA architecture for Any-to-Any generative model?
- Discrete diffusion or flow matching
	- Illustrate discrete flow matching
	- What's the difference between MDLM
	- Block diffusion modeling
	- CTMC theory. Why is it useful?
- What is the design space over which diffusion models can be categorized?

# Diffusion

DDPM
- [Deep Unsupervised Learning using Nonequilibrium Thermodynamics](https://proceedings.mlr.press/v37/sohl-dickstein15.html): introduced iterative Markov process based noising and denoising.
- [\[2006.11239\] Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239): Introduced ELBO training and epsilon-prediction objective formulation.

Score Matching and SDE
- [\[1907.05600\] Generative Modeling by Estimating Gradients of the Data Distribution](https://arxiv.org/abs/1907.05600): Reintroduced score matching as viable objective
- [\[2011.13456\] Score-Based Generative Modeling through Stochastic Differential Equations](https://arxiv.org/abs/2011.13456): Introduced diffusion models as SDE that can be reversed and sampled using langevin samplers.

Design space and solvers
- [\[2206.00364\] Elucidating the Design Space of Diffusion-Based Generative Models](https://arxiv.org/abs/2206.00364)
	- Main ODE equation that arises from solving the diffusion ODE
	- Solution to ODE can now be done using different ODE solvers, particularly better approximator like RK2/4
	- Reparametrization of loss function.
	- Analyzing different noise (sigma) schedules.
- [\[2312.02696\] Analyzing and Improving the Training Dynamics of Diffusion Models](https://arxiv.org/abs/2312.02696)
- [\[2010.02502\] Denoising Diffusion Implicit Models](https://arxiv.org/abs/2010.02502): DDIM
- [\[2206.00927\] DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling in Around 10 Steps](https://arxiv.org/abs/2206.00927): DPM-Solver
- [\[2102.09672\] Improved Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2102.09672): iDDPM
- [\[2107.00630\] Variational Diffusion Models](https://arxiv.org/abs/2107.00630): VDM
- [\[2202.00512\] Progressive Distillation for Fast Sampling of Diffusion Models](https://arxiv.org/abs/2202.00512): Introduced v-prediction parametrization and progressive distillation
- Distillation, one-step sampling
	- [\[2202.00512\] Progressive Distillation for Fast Sampling of Diffusion Models](https://arxiv.org/abs/2202.00512)
	- [\[2303.01469\] Consistency Models](https://arxiv.org/abs/2303.01469)
	- [\[2505.18825\] How to build a consistency model: Learning flow maps via self-distillation](https://arxiv.org/abs/2505.18825)
	- [\[2410.12557\] One Step Diffusion via Shortcut Models](https://arxiv.org/abs/2410.12557)

Guidance
- [\[2105.05233\] Diffusion Models Beat GANs on Image Synthesis](https://arxiv.org/abs/2105.05233): Introduces Classifier-based guidance
- [\[2207.12598\] Classifier-Free Diffusion Guidance](https://arxiv.org/abs/2207.12598): Introduced classifier-free guidance

Latent diffusion
- [\[2112.10752\] High-Resolution Image Synthesis with Latent Diffusion Models](https://arxiv.org/abs/2112.10752)
- [Latent Diffusion Models: A Survey on Foundations, Variants, and Web-scale Deployments							\| Journal of Web Engineering](https://journals.riverpublishers.com/index.php/JWE/article/view/31737)

Discrete
- [\[2107.03006\] Structured Denoising Diffusion Models in Discrete State-Spaces](https://arxiv.org/abs/2107.03006): D3PM
- [\[2205.14987\] A Continuous Time Framework for Discrete Denoising Models](https://arxiv.org/abs/2205.14987)
- [\[2402.04997\] Generative Flows on Discrete State-Spaces: Enabling Multimodal Flows with Applications to Protein Co-Design](https://arxiv.org/abs/2402.04997)
- [\[2406.07524\] Simple and Effective Masked Diffusion Language Models](https://arxiv.org/abs/2406.07524): MDLM
- [\[2503.09573\] Block Diffusion: Interpolating Between Autoregressive and Diffusion Language Models](https://arxiv.org/abs/2503.09573)
- [\[2510.22852\] Encoder-Decoder Diffusion Language Models for Efficient Training and Inference](https://arxiv.org/abs/2510.22852)
- [\[2506.10892\] The Diffusion Duality](https://arxiv.org/abs/2506.10892)
- [\[2412.10193\] Simple Guidance Mechanisms for Discrete Diffusion Models](https://arxiv.org/abs/2412.10193)
- [Beyond Single Tokens: Distilling discrete diffusion models \| Emiel Hoogeboom](https://ehoogeboom.github.io/post/discrete_mmd_diffusion_language_models
- [\[2407.15595\] Discrete Flow Matching](https://arxiv.org/abs/2407.15595)

Diffusion x RL
- [\[2208.06193\] Diffusion Policies as an Expressive Policy Class for Offline Reinforcement Learning](https://arxiv.org/abs/2208.06193)
- [\[2606.17551\] Reversal Q-Learning](https://arxiv.org/abs/2606.17551)
- [\[2407.13734\] Understanding Reinforcement Learning-Based Fine-Tuning of Diffusion Models: A Tutorial and Review](https://arxiv.org/abs/2407.13734)
- [\[2505.05470\] Flow-GRPO: Training Flow Matching Models via Online RL](https://arxiv.org/abs/2505.05470)
- [\[2505.07818\] DanceGRPO: Unleashing GRPO on Visual Generation](https://arxiv.org/abs/2505.07818)

Geometry x diffusion
- [\[2505.17517\] The Spacetime of Diffusion Models: An Information Geometry Perspective](https://arxiv.org/abs/2505.17517)
- [Riemannian Diffusion Models](https://proceedings.neurips.cc/paper_files/paper/2022/hash/123d3e814e257e0781e5d328232ead9b-Abstract-Conference.html)
- [Scaling Riemannian Diffusion Models](https://proceedings.neurips.cc/paper_files/paper/2023/hash/fe1ab2f77a9a0f224839cc9f1034a908-Abstract-Conference.html)
- [Riemannian Score-Based Generative Modelling](https://proceedings.neurips.cc/paper_files/paper/2022/hash/105112d52254f86d5854f3da734a52b4-Abstract-Conference.html)
- [Flow Matching on General Geometries](https://proceedings.iclr.cc/paper_files/paper/2024/hash/d1f9936d3be6997ffffab692977eebe6-Abstract-Conference.html)
- [\[2605.31106\] Riemannian Diffusion Models on General Manifolds via Physics-Informed Neural Networks](https://arxiv.org/abs/2605.31106)

Diffusion x Interp
- [\[2606.20560\] How Transparent is DiffusionGemma?](https://arxiv.org/abs/2606.20560)
- [DiffusionGemma model card  \|  Google AI for Developers](https://ai.google.dev/gemma/docs/diffusiongemma/model_card?hl=en#model_overview)
- [\[2408.13256\] How Diffusion Models Learn to Factorize and Compose](https://arxiv.org/abs/2408.13256)

Generalization
- [\[2506.03719\] On the Closed-Form of Flow Matching: Generalization Does Not Arise from Target Stochasticity](https://arxiv.org/abs/2506.03719)

# Flow Matching

Tutorials
- [\[2412.06264\] Flow Matching Guide and Code](https://arxiv.org/abs/2412.06264)

Flow matching
- [\[2209.03003\] Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow](https://arxiv.org/abs/2209.03003): Introduced first flavor of flow matching models called Rectified Flows,
- [\[2303.08797\] Stochastic Interpolants: A Unifying Framework for Flows and Diffusions](https://arxiv.org/abs/2303.08797)
- [\[2602.16813\] Flow Map Language Models: One-step Language Modeling via Continuous Denoising](https://arxiv.org/abs/2602.16813)
- [\[2510.21608\] Generalised Flow Maps for Few-Step Generative Modelling on Riemannian Manifolds](https://arxiv.org/abs/2510.21608)

# Evaluation
- [\[2606.20536\] The FID Lottery: Quantifying Hidden Randomness in Generative-Model Evaluation](https://arxiv.org/abs/2606.20536) \[[Website](https://kyutai.org/fid-lottery)\]
- 


# Foundational Models
- [\[2403.03206\] Scaling Rectified Flow Transformers for High-Resolution Image Synthesis](https://arxiv.org/abs/2403.03206): SD3. Scaled Rectified flows with QK-normalization, logit-normal noise scheduler. Introduced MM-DiT architecture.
- [\[2506.15742\] FLUX.1 Kontext: Flow Matching for In-Context Image Generation and Editing in Latent Space](https://arxiv.org/abs/2506.15742)

# Miscellaneous
- [\[2504.10612\] Energy Matching: Unifying Flow Matching and Energy-Based Models for Generative Modeling](https://arxiv.org/abs/2504.10612)
- [\[2511.13720\] Back to Basics: Let Denoising Generative Models Denoise](https://arxiv.org/abs/2511.13720): Debunked myths surrounding diffusion model training, particularly, showing low FID scores with x-pred and v-loss due to predicting in high dimension without preconditioning introduced in EDM.
- [\[2602.18428\] The Geometry of Noise: Why Diffusion Models Don't Need Noise Conditioning](https://arxiv.org/abs/2602.18428)

# Inverse Problems
- [\[2209.14687\] Diffusion Posterior Sampling for General Noisy Inverse Problems](https://arxiv.org/abs/2209.14687)
- [Pseudoinverse-Guided Diffusion Models for Inverse Problems | ICLR 2023](https://openreview.net/pdf?id=9_gsMA8MRKQ)
- [\[2509.26489\] Contrastive Diffusion Guidance for Spatial Inverse Problems](https://arxiv.org/abs/2509.26489)
- [\[2505.05657\] ArrayDPS: Unsupervised Blind Speech Separation with a Diffusion Prior](https://arxiv.org/abs/2505.05657)
- [Zero-shot Human Pose Estimation using Diffusion-based Inverse solvers](https://iclrinpose-crypto.github.io/ICLRInPose/)
- 

# Practical Implementations

# Tutorials
- [Diffusion Models From Scratch](https://www.tonyduan.com/diffusion/index.html)
- [\[2510.21890\] The Principles of Diffusion Models](https://arxiv.org/abs/2510.21890)
- [\[2403.18103\] Tutorial on Diffusion Models for Imaging and Vision](https://arxiv.org/abs/2403.18103)
- [\[2406.08929\] Step-by-Step Diffusion: An Elementary Tutorial](https://arxiv.org/abs/2406.08929)
- [Diffusion Models: A Comprehensive Survey of Methods and Applications \| alphaXiv](https://www.alphaxiv.org/abs/2209.00796)
- [Statistical Analysis of Markovian Generative Modeling \| alphaXiv](https://www.alphaxiv.org/abs/2604.22712)
- [Diffusion Models: A Mathematical Introduction \| alphaXiv](https://www.alphaxiv.org/abs/2511.11746)
- [Score-based Diffusion Models via Stochastic Differential Equations -- a Technical Tutorial \| alphaXiv](https://www.alphaxiv.org/abs/2402.07487)
- [A Tutorial on Diffusion Theory: From Differential Equations to Diffusion Models \| alphaXiv](https://www.alphaxiv.org/abs/2605.22586)
- [\[2412.11024v2\] Exploring Diffusion and Flow Matching Under Generator Matching](https://arxiv.org/abs/2412.11024v2)