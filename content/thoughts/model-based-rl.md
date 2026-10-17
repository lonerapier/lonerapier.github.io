---
title: Model-based RL
date: 2026-10-10
tags:
  - reinforcement-learning
  - machine-learning
  - representation-learning
---
- high-level algorithm?
	1. Take a dataset $\mathcal{D}=\{ s,a,s' \}$ collected using base behavior policy $\pi_{\beta}(\cdot \mid s)$
	2. Learn a simulator $f(s,a)=s'$ (you ideally want stochastic simulator, but we'll go ahead with deterministic one for simplicity)
		 Minimised using some objective. If deterministic, can be MSE and if probabilistic, can be log likelihood.
	3. Learn the optimal policy $\pi_{f}$ under simulator $f$ using any RL algorithm
		 Can be model-free or planning and trajectory optimisation algorithms like MCTS
- Why might it not work?
	1. Collected data does not represent the whole distribution.
	2. World is difficult to simulate or learner is underparameterised/overly complex.
	3. Learned simulator might be computationally intensive and slow to simulate (eg. updating the simulated world at 3fps), Planning might be difficult in that environment (so even if we have a learned model of the world, it's not enough to execute control in that environment), Model representation might not be efficient (eg. pixel representation might not be the most efficient way to perform planning and control)
- How to modularise the problem?
	1. Statistics/Algorithms problem
	2. DL/Models problem (GPUs go brr...)
	3. Planning/Control/RL problem
- Distributional shift in model-based RL – Problem occurs when the state distribution under learned policy doesn't match the data distribution $p_{\pi_{f}}\neq p_{\pi_{\beta}}$. Example; Suppose a self-driving model only learns on a single empty road, and a policy learned to reach home fastest using that model will accelerate to maximum. Now, in the real world that policy will definitely crash due to congestion on the road, and even be harmful to the people.
	- A way to reduce the distributional shift problem is to again to something similar to Dagger, and replace the learned policy as the behavior policy $\pi_{\beta}\leftarrow \pi_{f}$, and start again.
	- To get a reasonable policy, what's the most important parameter? Is it the dataset, reward, simulator, policy learning algorithm? – Hard to choose one, but in an iterative loop, dataset usually gets better and better as we keep optimising the policy. A policy that sufficiently explores is still maximising the reward objective across all trajectories. So, a plain reward objective might lead to erroneous state that simulator describes as extremely rewarding, which slows down the convergence, because those states are unimportant to learn the optimal policy. So, rewards should be carefully crafted so that maximising it doesn't encounter impossible scenarios.
	- It's also unnecessary to learn a new optimal policy during every iteration, because our goal is to improve both the simulator and the policy, so we can just run one iteration of our policy learning algorithm, get a new policy, and restart the iteration again.
	- From a different perspective, we can think of completely learning a new policy every time as overfitting to the trajectory-reward distribution, and this might lead to faulty states due to peaks in the overfitted function.
- So, what's the solution?
	1. Stick to regions where the learned dynamics model (simulator) is "*confident*". To model the confidence, we often use probabilistic, uncertainty aware models, and can exhibit pessimism (penalty) in the face of model uncertainty, i.e. learn $f_{\theta}$: $\arg \underset{\theta}{\min}\mathcal{L}(\theta)=\mathbb{E}_{\pi_{\beta}}[KL(f\|p)]\propto-\sum_{i=1}^{N}\log f_{\theta}(s'\mid s,a)$
	2. Keep inside "trust regions", $KL(\pi_{f}\|\pi_{\beta})\leq\epsilon$
	3. In MBRL setting, optimism should be paired with some kind of constraint to get good exploration. **Why?** Because overly optimistic settings lead you to same faulty states, and overly pessimistic exploits the current model with high regret.
- We have established the needs to model uncertainty in the simulator's output, and we can materialize it by modeling confidence in model's output. To do that, let's first categorise uncertainty over dynamics:
	1. Aleatoric or Statistical Uncertainty:  stochasticity of the dynamics $p(s'\mid s,a)$ themselves
	2. **Epistemic** or Model uncertainty:  Uncertainty by the model over the true dynamics $p$. We **care** about model uncertainty because statistical uncertainty is the nature of environment itself.
- How to model Epistemic uncertainty? – the model is usually learned by best-fit likelihood $p(\mathcal{D}\mid \theta)$ of the parameters to the data, then we can model the uncertainty using the prior $p(\theta)$ over the parameters to capture epistemic uncertainty $p(\theta\mid \mathcal{D})$. One way to do this is using Bayesian neural networks.
	- Another practical way to do this to train an ensemble of models $f_{\theta_{1}},f_{\theta_{2}},\dots,f_{\theta_{k}}$ and estimate the distribution empirically, $p(\theta\mid \mathcal{D})\approx \frac{1}{k}\sum_{i=1}^{k}\mathbb{1}(\theta=\theta_{i})$. To train these independent models, we need k independent datasets. To make this practical, we sample dataset $\mathcal{D}_{i}$ with replacement from $\mathcal{D}$ (bootstrap sampling). In practice, even different intialisation of these models work due to randomness of SGD and initialisation.
- So, far we have a simple algorithm that models the uncertainty in simulator output, and penalises the policy for going beyond the trust region. Let's shift gears, and think about pure planning without RL using simulators only.
- Remember in model-free RL, we used value functions to learn a good policy that can give us optimal actions from a state. Now we have a model that predicts outcomes of arbitrary sequences of actions. So theoretically, given states, we should be able to optimise over the objective to select good actions without learning a policy.
- These planning algorithms are typically categorised into two:
	- Closed-loop – When you replan after executing each action. $s_{1},a_{1}\sim \pi(a_{1}\mid s_{1}),s_{2},a_{2}\sim \pi,\dots$ Each of these actions are taken in the real world.
	- Open-loop – When the agent selects a sequence of action and execute it without replanning.
- Stochastic environments realises a distribution of states over previous state-action pairs, $p(s'\mid s,a)$. So, a sequence of actions can be selected from the following objective: $a_{1},\dots,a_{T}=\underset{a_{1},\dots,a_{T}}{\arg\max}\ \mathbb{E}_{s_{t+1}\sim f(s_{t},a_{t})}\left[ \sum_{t}r(s_{t},a_{t})|a_{1},\dots ,a_{T} \right]$.
	- What's the problem with open-loop environments in stochastic environments? It does seem an easier option because we're planning a bunch steps ahead. Open-loop is suboptimal in stochastic because the dynamics of a real-world environment is noisy (animal in front of a self-driving car), and planning a bunch of action ahead can lead to disastrous policies.
- Methods for planning in open-loop case:
	1. Random shooting – create a bunch of action sequences, and select the one with maximum objective $A^{*}=\arg\max_{A_{i}}J(\mathbf{A}_{i})$
	2. Cross entropy method – Initialise the distribution $p(\mathbf{A})$ over action sequences, start with initial sequence, and iteratively optimise the actions in the sequence with the elites (actions with highest return), update distribution to fit the selected top sequences (update mean and covariance if gaussian).
	3. MCTS
	4. Tree-based motion planning
- Okay, so planning in open-loop is out of the picture, but we can still plan with closed-loop case by modeling the objective $J(\theta)=\mathbb{E}_{\tau \sim \pi_{\theta},f}\left[ \sum_{t=1}^{N}r(s_{t},a_{t}) \right]=\int p(\tau)\sum_{t=1}^{N}r(s_{t},a_{t})ds_{1}da_{1}ds_{2}\dots ds_{N}da_{N}$. Now, taking the derivative of this objective with respect to the parameters gives us the gradient to maximise $J(\theta)$. But as you might expect, it contains product of jacobians $\frac{ds_{t}}{da_{t}}$ which can lead to exploding or vanishing gradients and make the optimisation difficult to handle in practice.
- So, we're back to model-free RL algorithms. Counterintuitively, a learned simulator is used to accelerate the learning of model-free algorithms, because now, we can have extra data by augmenting the samples from the replay buffer with rollouts generated in the simulator. This leads to Dyna (Sutton et al.) style algorithms which uses off-policy model-free algorithms like q-learning, actor-critic, etc. to learn both from real and simulated rollouts.
- Dyna
	1. Initalise the model $f_{\theta}(s'\mid s,a)$ and policy $\pi_{\theta}$
	2. while training do
		1. Collect dataset $\mathcal{D}$ from the real environment using policy $\pi_{\theta}$
		2. Fit the model $f_{\theta}$ to update $p_{\theta}(s'\mid s,a)$ and reward $r(s,a)$
		3. repeat K times
			1. sample $s\sim \mathcal{D}$
			2. Choose action $a$ from either $\mathcal{D}$ or policy or random
			3. simulate $s'=f(s,a)$ and reward $r=r(s,a)$
			4. train the policy on $s,a,r,s'$ with any model-free RL (eg. Q-learning)
			5. take N more steps in the model from $s'$ to get a trajectory $\tau$ and train $\pi_{\theta}$ on it.
- Representing this as a series of independent steps that we can turn the knobs of enables more general class of algorithms.
- > [!todo] add a diagram.
- Representing the model
	- Why PO-MDP setting is much more interesting than fully observed? It's present almost everywhere, because there are only a few environments where we have full observability of the environment (chess, go, gridworld).
	- What are the different ways of representing POMDPs? – usually done using state-space models where the hidden variables are the states, and inputs are the observations from the environment containing partial information about the world.
	- We're going to look at modeling the latent state-space model using variation inference (VAEs). So, our next goal is to determine the inputs and hidden variables to apply the variational inference framework to these sequence models.
	- Inputs: $(o_{1},\dots,o_{T})$ and latent variable: $(s_{1},\dots,s_{T})$.
	- Prior is the distribution over states, $p(z)=p(s_{1})\prod_{t}p(s_{t+1}\mid s_{t},a_{t})$, where in most variational setting $p(z)\sim \mathcal{N}(0 , \boldsymbol{I})$ is an isotropic gaussian, but here, the prior is a learned variable with $p(s_{1})\sim \mathcal{N}(0 , \boldsymbol{I})$ and $p(s_{t+1}\mid s_{t},a_{t})$ is learned state dynamics.
	- Decoder $p(x\mid z)=\prod_{t}p(o_{t}\mid s_{t})$ can be a simple MLP that takes in the latent variable (state), and outputs observations.
	- Encoder defines our posterior $q_{\phi}(z\mid x)=\prod_{t}q_{\phi}(s_{t}\mid o_{1:t})$, that takes sequence of previous observations, and outputs current state.
	- Training objective: We use the standard variational autoencoder objective conditioned on actions to define the latent space model.
- $$\max_{\phi,\psi}\sum_{i=1}^{N} \sum_{t=1}^{T} \mathbb{E}_{q}[\log p_{\phi}(s_{t+1,i}\mid s_{t,i}a_{t,i})+\log p_{\phi}(o_{t,i}\mid s_{t,i})]+\mathcal{H}(q_{\psi}(s_{t}\mid o_{t}))$$
	- **Q**: What should we take the expectation with? – Expectation term is dependent on both $s_{t+1},s_{t}$, so either the encoder needs to sample both the current and next state or we can have the encoder learn the joint distribution over current and next state, so then the expectation is taken w.r.t. $(s_{t},s_{t+1})\sim q(s_{t},s_{t+1}\mid o_{1:T,i},a_{1:T,i})$
	- We have many ways of representing the approximate posterior $q_{\psi}$. Why would we learn them differently? Firstly, an encoder is trying to provide a concise representation of the environment along with estimating the uncertainty of being in that state. We have already seen how **overconfident** models in *partially observable* setting is the cause of failure during policy learning. So, how we model the encoder depends on the environment we're in. For some, it's possible that only representing the current state from the encoder is sufficient, and gives a good representation of the environment. Then sampling the next state $s_{t+1}$ doesn't depend on the previous state $s_{t}$, but only the observation $o_{1:t}$.
	- But sometimes the situation exacerbates into **representation collapse** in the encoder, because of how we're optimising the objective. We know that expectation term depends both on current and next state, so sampling them independently leads to all-to-all couplings of $(s_{t},s_{t+1})$, which is physically impossible in most environments (we can't go to all states from every other state). So, a full-fledged encoder $q_{\psi}(s_{t},s_{t+1}\mid o_{1:T},a_{1:T})$ that learns the entire distribution of states as the approximate posterior gives the most accurate representation.
		- Filtering posterior $q_{\psi}(s_{t}\mid o_{1:t},a_{1:t})$
		- Full smoothing posterior $q_{\psi}(s_{t},s_{t+1}\mid o_{1:T},a_{1:T})$
		- Single-step encoder $q_{\psi}(s_{t}\mid o_{t})$ – just depend on the previous observation. This obviously has the advantage of being easier to model, optimise and computationally cheap, but only works on simple environments.
- Let's now combine everything we've learned so far in MBRL and and conjure up a simple actor-critic algorithm.
	1. get $(o_{i},a_{i},o_{i+1})$ by taking one step using policy $\pi_{\theta}(a\mid o)$.
	2. Add to the replay buffer, sample batch $\mathcal{B}=\{ o_{i},a_{i},o_{i+1} \}$ from the buffer.
	3. For each sample in the batch:
		1. update the learned encoder, decoder, and reward models. $p_{\phi}(s_{i+1}\mid s_{i},a_{i}),p(o_{i}\mid s_{i}),p_{\phi}(r_{i}\mid s_{i}),q_{\psi}(s_{i}\mid o_{i})$
		2. Use the learned encoder to get $s_{i}\sim q_{\psi}(s_{i}\mid o_{i})$ and $s_{i+1}\sim q_{\psi}(s_{i+1}\mid o_{i+1})$
		3. Simulate additional data using the decoder $p_{\phi}$
		4. evaluate $y_{i}=r(s_{i},a_{i})+\gamma \mathbb{E}_{a'\sim \pi_{\theta}(a'\mid o_{i+1})}[Q_{\phi}^{\pi}(s_{i+1},a')]$
		5. update $\phi$ by $\nabla_{\phi}\sum_{i=1}^{\lvert \mathcal{B}\rvert}\lVert Q_{\phi}^{\pi}(s_{i},a_{i})-y_{i} \rVert^{2}$
		6. $\nabla_{\theta}J(\theta)\approx \sum_{i}\mathbb{E}_{a\sim \pi_{\theta}}[\nabla_{\theta}\log \pi_{\theta}(a\mid o_{i})Q_{\phi}^{\pi}(s_{i},a)]$
		7. $\theta\leftarrow\theta+\alpha \nabla_{\theta}J(\theta)$
	- One may also prefer to use policy being run and evaluated entirely in latent space, $\pi_{\theta}(a\mid s)$, then $\pi_{\theta}(a\mid o)=\mathbb{E}_{s\sim q_{\psi}(s\mid o)}[\pi_{\theta}(a\mid s)]$.