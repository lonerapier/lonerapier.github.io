---
title: Speculative Decoding
date: 2026-09-03
tags:
  - machine-learning
  - inference
---


- Eagle
	- Eagle series pushes a step further in complexity spectrum and operates at the feature level. Rather than predicting the next token, EAGLE hypothesizes that *feature sequences exhibit more regularity* and attaches a lightweight autoregressive drafter predicting the next feature. This skips the complexity that arrives from training separate prediction heads as in Medusa. Draft layer (autoregressive head) consisting takes the embedding of the predicted token (from the base model at the start or the last draft candidate), along with the features of the previous generated token. The autoregressive head predicts the next feature. The LM head as per the feature, predicts the distribution. The distribution is then used to sample the next token. The predicted feature and sampled token are concatenated, and added as input for the next autoregressive draft phase.
- Eagle-2
	- Observes that acceptance of draft candidates, besides the position also depends on the context. Static draft trees generated for verification is same for all context ($s_{1}$ position generates 2 tokens, $s_{2}$ generates 3). Generating dynamic draft trees by obtaining confidence scores from the draft model greatly improves acceptance rates. Using the confidence score from draft model is fine because draft model is well-calibrated, and approximates acceptance rates from the target distribution. This enables EAGLE head to chain obvious outputs into longer predicted sequences, dynamically adjusting the length as per the context.
- Eagle-3
	- **Drops feature prediction** in favor of direct token prediction, simplifying the EAGLE's loss function in the process. Moreover, instead of using just the final hidden layer representation which are extremely focused on next-token and forces the drafter heads to re-derive the context, EAGLE fuses the feature representations from the target model's decoder layers and directly predicts the next feature using a lightweight autoregressive prediction head. Simulating multi-step generation by feeding draft models its own output at training time minimises the training/inference gap which the paper refers to as *training-time test*. Uses dynamic draft trees from EAGLE-2 to propose multiple chained continuations, and efficient parallel tree attention from EAGLE to effectively prune invalid tree branches in one parallel pass.
- EAGLE refines the speculative decoding procedure at every level (context, prediction, verification), but is still autoregressive, and suffers from diminishing gains as the draft length grows.
- MTP
- DFlash: Using a block-dLLM to denoise a block in arbitrary manner while generating blocks autoregressively.
- DSpark

Next things:
- Hands on tutorial for speculative decoding using rejection sampling approach
- Switch to DFlash style diffusion models
- **Alignment**: How draft models are aligned with target?
- **Distillation**: How much can draft models be compressed?

# References

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
- [DFlash 2: Keep Drafting Parallel — Inco AI](https://inco.ai/blog/dflash2/)
