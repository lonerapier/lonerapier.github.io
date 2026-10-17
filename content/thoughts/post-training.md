---
title: "Post Training: LLMs, Agents"
date: 2026-10-01
tags:
  - machine-learning
  - reinforcement-learning
  - post-training
---
- Post-training zoo
	- TRL, TRL docs
	- [Post Training Guide - a Hugging Face Space by NeuralNoble](https://huggingface.co/spaces/NeuralNoble/post-training-guide)
	- SFT: full finetuning
		- [\[2109.01652\] Finetuned Language Models Are Zero-Shot Learners](https://arxiv.org/abs/2109.01652): FLAN showed instruction fine tuning works.
		- [\[2212.10560\] Self-Instruct: Aligning Language Models with Self-Generated Instructions](https://arxiv.org/abs/2212.10560): Fine tuning on synthetic data.
		- [\[2203.02155\] Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155): InstructGPT introduced RLHF.
		- [\[2305.11206\] LIMA: Less Is More for Alignment](https://arxiv.org/abs/2305.11206): showed quality matters more than quantity (**1,000 curated examples**).
		- **Q**: How is SFT different than pretraining? – pretraining trains the model of next token prediction while SFT is mainly done to make the model follow instructions and chat format (identifying the needs of the user, following the conversation, answering questions effortlessly).
		- **Q**: Does finetuning leads to forgetting pretrained concepts?
		- **Q**: How to judge size of dataset required to gain superior quality?
		- **Q**: Optimal learning rate
		- **Q**: Optimal batch sizes
		- **Q**: LoRA for which part of the transformer (MLP, Attn, or MLP + Attn)?
	- PEFT
		- LoRA – learn a low rank adapter matrices that matches full finetuning performance with 60-70% of compute and 100x less storage requirement.
			- [\[2106.09685\] LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
		- QLoRA – quantised finetuning.
		- [LoRA Without Regret - Thinking Machines Lab](https://thinkingmachines.ai/blog/lora/): showed how LoRA matches full finetuning performance
	- RLHF: preference learning (requires PPO to prevent reward hacking)
		- [\[2212.08073\] Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073): Moved from human to AI feedback grounded by principles in a "constitution".
		- Why RLHF cannot scale? – Requires 3 separate models apart from trained policy (reward model, reference model, critic model).
	- DPO: preference optimisation – removes the need for reward and critic model.
		- [\[2305.18290\] Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)
	- GRPO
		- [\[2402.03300\] DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300)
		- [Training Search Agents with GRPO — Jasper Lu](https://jasperlu.com/blog/training-search-agents-grpo/)
		- [GRPO is Secretly a Process Reward Model \| alphaXiv](https://www.alphaxiv.org/abs/2509.21154)
		- [It Takes Two: Your GRPO Is Secretly DPO \| alphaXiv](https://www.alphaxiv.org/abs/2510.00977)
		- [GRPO++: Tricks for Making RL Actually Work](https://substack.com/@cwolferesearch/p-181791956)
	- ORPO: removes reference model as well.
	- Distillation
		- [On-Policy Distillation - Thinking Machines Lab](https://thinkingmachines.ai/blog/on-policy-distillation/)

Reward framing
- How is a reward model trained on preferences? Bradley-terry model
- Outcome-based rewards
- Process-based rewards
- Generative rewards (LLM-as-a-judge)

Other papers
- [The ultimate guide to RL environments: building and scaling them in the LLM era - a Hugging Face Space by AdithyaSK](https://huggingface.co/spaces/AdithyaSK/rl-environments-guide#what-is-an-rl-environment-in-the-llm-age)
- [\[2512.21852\] A Comedy of Estimators: On KL Regularization in RL Training of LLMs](https://arxiv.org/abs/2512.21852): when which KL estimators are right
- [Async GRPO in the wild](https://yumoxu.notion.site/async-grpo-in-the-wild)
- [Finetuning with Sampling: SFT Learns Better Than You Think](https://aakaran.github.io/finetuning_with_sampling/)
- [\[2608.24949\] Demystifying Reinforcement Learning Post-Training of Language Models](https://arxiv.org/abs/2608.24949)
- Compare how other environment framework works:
- [Agentic RL: Frameworks and Best Practices](https://cameronrwolfe.substack.com/p/agentic-rl?utm_campaign=posts-open-in-app&triedRedirect=true): How to extend basic RL thinking models to agentic RL (tool calls, multimodal generation, etc.)
- Distributed RL: [Frontier RL Is Cheaper Than You Think](https://fireworks.ai/blog/frontier-rl-is-cheaper-than-you-think)
- [Towards Universal Post-Training for Robotics — Perry Dong](https://pd-perry.github.io/posts/post-training.html)
- [Pavlov's List: RL envs and data startups](https://pavlovslist.com/)