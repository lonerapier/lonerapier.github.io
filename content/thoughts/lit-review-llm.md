---
title: Literature Review - LLMs
date: 2026-07-20
tags:
  - deep-learning
  - machine-learning
---
# Architecture

## MoE
- [\[2401.04088\] Mixtral of Experts](https://arxiv.org/abs/2401.04088): Introduces Mixtra-8B MoE models that outperformed GPT3.5 using 2-of-8 expert strategy.

# Reasoning

- ["Stealing Reasoning Traces from Proprietary LLM APIs", arxiv 2608](https://stolen-thoughts.com/)
- [Fine-tuning LFM2.5-1.2B-Instruct with GRPO – Leonie Monigatti](https://leoniemonigatti.com/blog/fine-tuning-lfm2-5-1-2b-instruct-with-grpo.html)

# Inference
- [Inside vLLM: Anatomy of a High-Throughput LLM Inference System - Aleksa Gordić](https://www.aleksagordic.com/blog/vllm)
- [Why your local LLM feels dumber than it is - Machine Learning, LLMs, & AI - Level1Techs Forums](https://forum.level1techs.com/t/why-your-local-llm-feels-dumber-than-it-is/253917)
- [LLM Inference Calculator](https://llm-inference-calculator-delta.vercel.app/)

## Speculative Decoding

- [How speculative decoding makes LLMs go brrr – Leonie Monigatti](https://leoniemonigatti.com/blog/speculative-decoding.html)
- [Accelerating Generative AI with PyTorch II: GPT, Fast – PyTorch](https://pytorch.org/blog/accelerating-generative-ai-2/)
- [Speculative Decoding From Scratch \| SR Cookbooks](https://sabrresearch.com/cookbooks/speculative-decoding-from-scratch?utm_source=chatgpt.com)
- [Speculative Decoding Tutorial \| Pramodith Dissects](https://pramodith.github.io/posts/speculative-decoding/?utm_source=chatgpt.com)
- [An Introduction to Speculative Decoding for Reducing Latency in AI Inference \| NVIDIA Technical Blog](https://developer.nvidia.com/blog/an-introduction-to-speculative-decoding-for-reducing-latency-in-ai-inference/)
- [Exploring Speculative Decoding in vLLM on AMD GPUs \| vLLM Blog](https://vllm.ai/blog/2026-08-23-speculative-decoding-amd-gpus)
- [\[2211.17192\] Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
- [\[2302.01318\] Accelerating Large Language Model Decoding with Speculative Sampling](https://arxiv.org/abs/2302.01318)
- [\[2305.09781\] SpecInfer: Accelerating Generative Large Language Model Serving with Tree-based Speculative Inference and Verification](https://arxiv.org/abs/2305.09781)
- [\[2401.10774\] Medusa: Simple LLM Inference Acceleration Framework with Multiple Decoding Heads](https://arxiv.org/abs/2401.10774)
- [\[2402.02057\] Break the Sequential Dependency of LLM Inference Using Lookahead Decoding](https://arxiv.org/abs/2402.02057)
- [\[2404.19124\] Accelerating Production LLMs with Combined Token/Embedding Speculators](https://arxiv.org/abs/2404.19124)
- [\[2404.19737\] Better & Faster Large Language Models via Multi-token Prediction](https://arxiv.org/abs/2404.19737)
- [\[2401.15077\] EAGLE: Speculative Sampling Requires Rethinking Feature Uncertainty](https://arxiv.org/abs/2401.15077)
- [\[2406.16858\] EAGLE-2: Faster Inference of Language Models with Dynamic Draft Trees](https://arxiv.org/abs/2406.16858)
- [\[2503.01840\] EAGLE-3: Scaling up Inference Acceleration of Large Language Models via Training-Time Test](https://arxiv.org/abs/2503.01840)
- [\[2503.09573v3\] Block Diffusion: Interpolating Between Autoregressive and Diffusion Language Models](https://arxiv.org/abs/2503.09573v3)
- [\[2602.06036\] DFlash: Block Diffusion for Flash Speculative Decoding](https://arxiv.org/abs/2602.06036)
- [\[2607.05147\] DSpark: Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation](https://arxiv.org/abs/2607.05147)

# To-Read
- [Jane Street Blog - Using group theory to explore the space of positional encodings for attention](https://blog.janestreet.com/using-group-theory-to-explore-positional-encodings-attention/)
- [\[2511.05963\] Next-Latent Prediction Transformers Learn Compact World Models](https://arxiv.org/abs/2511.05963)
- [\[2605.27734\] Learn from your own latents and not from tokens: A sample-complexity theory](https://arxiv.org/abs/2605.27734),
- [\[2606.06479\] Pretraining Recurrent Networks without Recurrence](https://arxiv.org/abs/2606.06479)
- [\[2604.12946\] Parcae: Scaling Laws For Stable Looped Language Models](https://arxiv.org/abs/2604.12946)
- [\[2606.18206\] Fixed-Point Reasoners: Stable and Adaptive Deep Looped Transformers](https://arxiv.org/abs/2606.18206)
- [The Annotated Kolmogorov-Arnold Network (KAN) \| Alex L. Zhang](https://alexzhang13.github.io/blog/2024/annotated-kan/)
- [\[2511.05963\] Next-Latent Prediction Transformers Learn Compact World Models](https://arxiv.org/abs/2511.05963)
- [State of RL for reasoning LLMs \| A. Weers](https://aweers.de/blog/2026/rl-for-llms/)
- [RLHF Book: Reinforcement Learning from Human Feedback and LLM Post-Training](https://rlhfbook.com/)
- [NanoGPT Pro — Multi-Architecture NanoGPT Training & Evaluation Suite](https://yfz.ai/blog/nanogptpro/)
- [\[2512.07805\] Group Representational Position Encoding](https://arxiv.org/abs/2512.07805)
- [The Smol Training Playbook - a Hugging Face Space by HuggingFaceTB](
- https://huggingface.co/spaces/HuggingFaceTB/smol-training-playbook)
- [\[2505.24832\] How much do language models memorize?](https://arxiv.org/abs/2505.24832): Got ICML honorable mention.

# Tools
- [Paste a Hugging Face model id. Get a living map of the network — no weights downloaded.](https://modelmap.cc/)