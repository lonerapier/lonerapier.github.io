---
title: World Models
tags:
  - machine-learning
  - reinforcement-learning
  - representation-learning
  - generative-modeling
date: 2026-08-25
---
> [!info]
> Spearman Correlation metric

Questions:
- What's the main motivation behind world models?
	- LLMs learn to model the world through language, but only language. Intelligence that understands the world around us, has to also learn the physics and geometry of the world, which LLMs do know about, but doesn't know how to act in it.
	- Goal is to create a model that can directly learn from observation, and experience. A model that can understand the world around it, predict what happens from the observations, and can act inside the environment with the goal of completing a task by planning and perturbing its internal representation.
- What are world models? How are they different from LLMs?
	- Defined as abstract predictor that leans to model the dynamics of the environment and can perform actions in the environment by planning entirely inside the learned representation.
- What does a world model do?
	- I like the categorization of world models into three variants. [^1]
		- Renderer – Takes as input the previous states, and outputs next observation $P(o_{t+1}|s_{t},a_{t})$, like generating the next pixels in a video/image. Popular examples include Video generation models like Genie 3.
		- Simulator – Outputs next state based on previous states and actions that's geometrically and dynamically consistent with the physical laws. Example: Mujoco, RL environments.
		- Planner – Outputs next action given the states and goal. Examples include action-based models like VLAs, WAMs (although WAMs can be classified as both renderer and planner).
- How does world model work?
	- Runs a loop of *observe, predict, act* that combines the previous three categorizations together.
	- For a world model to understand the world, it has to create efficient representation of the objects, actions, and dynamics of the environment. This means it needs a powerful encoder that understands the native multi-modality (objects have certain shape, they behave, their sound) of the physical world.
	- Next, it simulates the world by looking at the previous states by generating the observations in the environment.
	- Then, it learns to map the observations to the environment using physical representation of the model.
- Why is a world model needed?
	- A world model combines a powerful encoder, generator and planner in one.
	- Compressed representation of the world can be used to perform many downstream tasks (similar to how in-context learning emerged in LLMs as a byproduct of scaling laws).
	- Consistent generator can serve as training ground for the agent, i.e. the model can learn to behave entirely on the internal representation without any physical interaction.
	- Long horizon planner learns to find creative and effective moves in the environment, similar to Move 37 in AlphaGo. [^2]
- What are one of the first manifestations of world models?
	- [@sutton1991dyna] proposed an architecture to combine learning, planning and reacting in a single system.
	- [@ha2018world] presented one of the first worlds models inspired by human cognition. The architecture closely resembled what we discussed, with a *vision* $V$ model that encodes high-dimensional observation to a latent space, a *memory* $M$ module that understand the representation and predicts the future states, and a *controller* $C$ model that maps the predicted representation to good actions in the environment.
- Which results showed the early signs of confidence in the world model architecture?
	- [@ha2018world]
	- [molmobot]
- What does a world model need for training?
	- Large quantity of videos from the environment that shows a previous agent exploring and interacting within the environment.
	- Observations of the environments actor and goal. These observations are either inferred from the environment directly or labeled afterwards. For example: in a game, if the player opens a door, the action and the move is linked with the observation to establish the causality.
- How is the objective modeled, i.e. how does a world model know what action to pick?
	- Learning the accurate representation, one that's compressed enough to be efficient and expressive enough to represent the set of possible outcomes in the environment is the job of the generator.
	- > [!question] What are the prediction approaches used by different predictors?
	- Classic MSE learns to average all the modes and leads to blurriness as visible in VAEs when used as generative models.
	- Diffusion models learn to denoise the latent variable in a supervised manner, and samples from the mode of the learned distribution.
	- Autoregressive models learns to sample sequentially using chain rule of probability while the output is dependent on previous tokens in the output.
	- > [!question] Does AR models model the exact likelihood? as compared to variational ELBO in VAEs or DDPM?
	- JEPA architecture models the environment entirely in the latent space, and prevents the irregularities arising in other generative models by never having to decode back to pixel space. Decoder's capabilities depends on the task – A video generative model will map back to pixel space, while An action model will map to the action space of the robot.
- History of World Models
	1. **Idea** (90s) – Dyna, Making the World differentiable
	2. **Initial working models (MVP)** (2018-2020) – World Models, Model-based RL for Atari
	3. **Models matching human performance** (2021-2022) – DreamerV2, MuZero, IRIS, Jepa
	4. **Models learning and acting in simulated world** (2023-2024) – Gaia, Diamond, Genie
	5. **Models acting in real world** (2025-beyond) – Gaia-2, Gaia-3, V-Jepa 2, SIMA 2, Mira-WM
- Are there any signs of scaling law exhibited by world models?
	- IRIS modeled visual tokens with a limited vocabulary similar to early transformers (RNNs, and SSMs were used prior to this for modeling WMs) and showed scaling laws similar to LLMs can hold out for world models.
	- GAIA-1 scaled world models for real-world driving to 9B.
	- Diamond used diffusion to predict future frames opposed to autoregressive modeling for visual generation used in previous generations like IRIS, GAIA.
	- GAIA-2 scaled diffusion approach to real-world autonomous driving simulation using latent diffusion with flow matching loss and space-time factorized transformers.
	- Environment generation models like Genie-1, Genie-2 trained on unlabeled video of 2D games are able to generate game environments with high-fidelity action space without any action inputs.
	- Sora 1, Sora 2, Veo 3, Wan 2, Cosmos 3, Seedream 2 generates high resolution videos with extraordinary visual quality.
	- V-Jepa 2 is an action-conditioned world model trained on 1M hours of video with self-supervised masked prediction and finetuned on task specific dataset (DROID). It planned entirely in latent space, and was much faster than other pixel-space counterparts.
	- SIMA-2 is an alternate strategy to use an LLM as an agent inside 3D game environments which could be generated by a model like Genie 3.
- Foundation model categories
	- LLM as agents
	- Video generation models: Sora, Veo, Seedance, Wan, Runway, Luma AI
	- 3D world generation: World labs, Genie, General intuition
	- Latent world models: AMI labs
	- Latent WM agents: Dreamer V4
	- World Action models: Physical Intelligence, Dyna, Generalist, NVIDIA cosmos
- Difference between training VLA and WAMs
	- For VLA, language is the first class citizen of the model along with static images
	- For WAM, large scale videos with action supervision (aligned with the task that we're looking to solve) is the primary training driver.

![[thoughts/images/world-models-ha-schmidhuber.png]]

# References
- [Notboring - World Models: Computing the Uncomputable](https://www.notboring.co/p/world-models)
- [MIRA](https://mira-wm.com/)
- [DIAMOND](https://diamond-wm.github.io/): Diffusion for World Modeling: Visual Details Matter in Atari
- Dreamer
	- Dreamer v1: [\[1912.01603\] Dream to Control: Learning Behaviors by Latent Imagination](https://arxiv.org/abs/1912.01603)
	- Dreamer v2: [\[2010.02193\] Mastering Atari with Discrete World Models](https://arxiv.org/abs/2010.02193)
	- Dreamer v3: [\[2301.04104\] Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104)
	- Dreamer v4: [\[2509.24527\] Training Agents Inside of Scalable World Models](https://arxiv.org/abs/2509.24527)
- [\[2606.00133\] World Models: A Comprehensive Survey of Architectures, Methodologies, Reasoning Paradigms, and Applications](https://arxiv.org/abs/2606.00133)
- [How to train a frontier-level world model](https://next-state.github.io/open-dreamer/)
- Video Generative models
	- Genie 3
	- Sora
- WAMs
- [CIS 6280 · World Models](https://www.cis.upenn.edu/~cis6280/)
- Project Ideas:
	- [Jasmine: A Simple, Performant and Scalable JAX-based World Modeling Codebase \| p(doom)](https://pdoom.org/research/jasmine//)
	- [How to train a frontier-level world model](https://next-state.github.io/open-dreamer/)
	- [Latent Node on X: "https://t.co/VosKdcQE8d" / X](https://x.com/latent_node/status/2033769450592485543)
	- [la leWorldModel \| the-puzzler](https://the-puzzler.github.io/blog/la-leworldmodel/)
	- 

Dyna
```
@article{sutton1991dyna,
  title={Dyna, an integrated architecture for learning, planning, and reacting},
  author={Sutton, Richard S},
  journal={ACM Sigart Bulletin},
  volume={2},
  number={4},
  pages={160--163},
  year={1991},
  publisher={ACM New York, NY, USA}
}
```

Ha, Schmidhuber
```
@article{ha2018world,
  title={World models},
  author={Ha, David and Schmidhuber, J{\"u}rgen},
  journal={arXiv preprint arXiv:1803.10122},
  volume={2},
  number={3},
  pages={440},
  year={2018}
}
```

LeJepa
```
@misc{balestriero2025lejepaprovablescalableselfsupervised,
      title={LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics}, 
      author={Randall Balestriero and Yann LeCun},
      year={2025},
      eprint={2511.08544},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2511.08544}, 
}
```

LeWorldModel
```
@misc{maes2026leworldmodelstableendtoendjointembedding,
      title={LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels}, 
      author={Lucas Maes and Quentin Le Lidec and Damien Scieur and Yann LeCun and Randall Balestriero},
      year={2026},
      eprint={2603.19312},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2603.19312}, 
}
```

When LeJepa learn a world model
```
@misc{klindt2026doeslejepalearnworld,
      title={When Does LeJEPA Learn a World Model?}, 
      author={David Klindt and Yann LeCun and Randall Balestriero},
      year={2026},
      eprint={2605.26379},
      archivePrefix={arXiv},
      primaryClass={stat.ML},
      url={https://arxiv.org/abs/2605.26379}, 
}
```

[^1]: [A Functional Taxonomy of World Models - Dr. Fei-Fei Li](https://drfeifei.substack.com/p/a-functional-taxonomy-of-world-models)
[^2]: [AlphaGo — Google DeepMind](https://deepmind.google/research/alphago/)