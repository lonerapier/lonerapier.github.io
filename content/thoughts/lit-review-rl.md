---
title: RL Literature Review
date: 2026-07-01
tags:
- machine-learning
- deep-learning
- reinforcement-learning
---
# Questions

- Form
- What's the advantage of stochastic policies over deterministic policies, especially when stochastic policies
- [RL is an evolutionary algorithm](https://snimu.github.io/2026/09/29/rl-is-an-evolutionary-algorithm.html)

# Literature Review

More papers
- [DiscoRL: Discovering state-of-the-art reinforcement learning algorithms \| Nature](https://www.nature.com/articles/s41586-025-09761-x): David silver last work at deepmind
- MuZero: [Schrittwieser, Julian, et al. "Mastering atari, go, chess and shogi by planning with a learned model." Nature 588.7839 (2020): 604-609.](https://arxiv.org/abs/1911.08265)
- A3C: [\[1602.01783\] Asynchronous Methods for Deep Reinforcement Learning](https://arxiv.org/abs/1602.01783)
- [\[2211.07819\] General Intelligence Requires Rethinking Exploration](https://arxiv.org/abs/2211.07819)
- [Keep the Tokens Flowing: Lessons from 16 Open-Source RL Libraries](https://huggingface.co/blog/async-rl-training-landscape)
- [Reinforcement Learning for LLMs: The Complete Guide](https://cameronrwolfe.substack.com/p/llm-rl)
- [GitHub - TuragaLab/flybody: MuJoCo fruit fly body model and locomotion RL tasks · GitHub](https://github.com/TuragaLab/flybody)

Q-Learning
- DQN: [Human-level control through deep reinforcement learning \| Nature](https://www.nature.com/articles/nature14236)
- [\[2010.14498\] Implicit Under-Parameterization Inhibits Data-Efficient Deep Reinforcement Learning](https://arxiv.org/abs/2010.14498) – Argues methods used for data-efficient RL like off-policy online RL and offline RL (on the extreme case) exhibits under-parametrisation with more training iteration. They show the loss of expressivity due to drop in the rank of the learned value network features, and correlates that with the performance drop usually observed in bootstrapped DeepRL algorithms like Fitted Q-Iteration, TD learning.
	- How to mitigate it?

Policy Gradient
- [Silver, David, et al. "Deterministic policy gradient algorithms." Pmlr, 2014.](https://proceedings.mlr.press/v32/silver14.pdf)
- DDPG – [Lillicrap, Timothy P., et al. "Continuous control with deep reinforcement learning." _arXiv preprint arXiv:1509.02971_ (2015).](https://arxiv.org/abs/1509.02971)
- TD3 – [Fujimoto, Scott, Herke Hoof, and David Meger. "Addressing function approximation error in actor-critic methods." International conference on machine learning. Pmlr, 2018.](https://arxiv.org/abs/1802.09477)
- PPO: [\[1707.06347\] Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)
- SAC: [\[1812.05905\] Soft Actor-Critic Algorithms and Applications](https://arxiv.org/abs/1812.05905)

Distillation
- [\[2306.13649\] On-Policy Distillation of Language Models: Learning from Self-Generated Mistakes](https://arxiv.org/abs/2306.13649)
- [On-Policy Distillation - Thinking Machines Lab](https://thinkingmachines.ai/blog/on-policy-distillation/)
- [Reinforcement Learning via Self-Distillation \| alphaXiv](https://www.alphaxiv.org/abs/2601.20802)
- [\[1910.01108\] DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter](https://arxiv.org/abs/1910.01108)
- [\[2303.17651\] Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)
- [\[2106.01345\] Decision Transformer: Reinforcement Learning via Sequence Modeling](https://arxiv.org/abs/2106.01345)
- [\[2305.20050\] Let's Verify Step by Step](https://arxiv.org/abs/2305.20050)

Inverse RL:
- [Watching the Path, Recovering the Goal: Classical Inverse RL \| Aman Sharma](https://arcaman07.github.io/blog/inverse-rl-classical.html)

 RL x Diffusion
- [Diffusion Models for Reinforcement Learning: Foundations, Taxonomy, and Development \| alphaXiv](https://www.alphaxiv.org/abs/2510.12253)
- [Enhancing Deep Reinforcement Learning: A Tutorial on Generative Diffusion Models in Network Optimization \| alphaXiv](https://www.alphaxiv.org/abs/2308.05384)
- [\[2603.27450\] FlowRL: A Taxonomy and Modular Framework for Reinforcement Learning with Diffusion Policies](https://arxiv.org/abs/2603.27450)
- [\[2208.06193\] Diffusion Policies as an Expressive Policy Class for Offline Reinforcement Learning](https://arxiv.org/abs/2208.06193)
# Environments
- [OpenReward: Train and evaluate agents on 380+ reinforcement learning environments with zero infrastructure setup.](https://openreward.ai/)
- [https://puffer.ai/](https://puffer.ai/)
- [Pavlov's List: RL envs and data startups](https://pavlovslist.com/)

# Repositories
- [GitHub - PufferAI/PufferLib: Puffing up reinforcement learning · GitHub](https://github.com/PufferAI/PufferLib)
- [GitHub - Al-does/RL-Harness: RL Harness — local RLlib harness for custom RL experiments · GitHub](https://github.com/Al-does/RL-Harness), [GitHub - Al-does/alex-rl-experiments: Alex's personal RL experiment recipes for rl-harness · GitHub](https://github.com/Al-does/alex-rl-experiments)
- [GitHub - ray-project/ray: Ray is an AI compute engine. Ray consists of a core distributed runtime and a set of AI Libraries for accelerating ML workloads. · GitHub](https://github.com/ray-project/ray)

# Course
- [RL Course by David Silver - Lecture 1: Introduction to Reinforcement Learning - YouTube](https://youtu.be/2pWv7GOvuf0)
- [CS234: Reinforcement Learning Winter 2026](https://web.stanford.edu/class/cs234/modules.html)
- [CS 224R Deep Reinforcement Learning | Stanford](https://cs224r.stanford.edu/)
- [CS 185/285 | UC Berkeley](https://rail.eecs.berkeley.edu/deeprlcourse/)
- [CS885 Winter 2025 - Schedule | UWaterloo](https://cs.uwaterloo.ca/~ppoupart/teaching/cs885-winter25/schedule.html)
- [CS 2824 Foundations of RL | Harvard](https://harvard-cs2824-s26.github.io/)
- [Home \| RL Theory](https://rltheory.github.io/)

Tutorials
- [Reinforcement Learning: An Overview \| alphaXiv](https://www.alphaxiv.org/abs/2412.05265)
- [Reinforcement Learning from Human Feedback \| alphaXiv](https://www.alphaxiv.org/abs/2504.12501)
