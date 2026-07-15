
# Introduction

We've been working so far with continuous space $\mathbb{R}^{d}$ where we learned to predict mean posterior $\mathbb{E}[\mathbf{x}_{0}|\mathbf{x}_{t}]$, score or the noise itself. But in discrete space, the same strategy fails to hold.

- Why? Because there is no means to add continuous noise to a discrete input, so you might not get a valid input after adding random noise to data.
- Why should we care about discrete data in the first place? Well, because unlike images or audio, some modalities like text, molecules can be represented using a finite discrete vocabulary, and are more suited to be represented in discrete space.

# First Approach

Let's talk about some naïve first approaches.

> [!question] *What if we convert the text to an embedding vector, add gaussian noise, and perform diffusion in embedding space?*
>

# D3PM

# MDLM

# CTMC

