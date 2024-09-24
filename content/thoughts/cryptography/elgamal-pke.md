---
title: "El-Gamal Public Key Encryption"
date: 2024-06-15:12:00:00
tags:
- cryptography
---


Suppose there are two parties Alice and Bob with private keys: $a$ and $b$ in group $G$, then El-Gamal cryptosystem allows Bob to share a message $m$ as ciphertext and Alice to decrypt it.

Scheme $\Pi(\textsf{Gen,Enc,Dec})$:

- $\textsf{Gen}(1^{n})\to(\mathbb{G},g,q,h)$: Choose generator $g$, with order $q$. Choose $x\in\mathbb{Z}_{q}$, calculate $h=g^{x}$. $pk:=(g,q,h),sk:=(g,q,x)$.
- $\textsf{Enc}(pk,m)\to(c_{1},c_{2})$: Choose $y\in\mathbb{Z}_{q}$, then $c_{1}\leftarrow g^{y},c_{2}\leftarrow m\cdot h^{y}$.
- $\textsf{Dec}(sk,c)\to m$: compute $\frac{c_{2}}{c_{1}^{x}}=m\cdot \frac{g^{xy}}{g^{y^{x}}}=m$

El-Gamal PKC depends on DDH for it's hardness and any adversary who has oracle that decrypts ElGamal ciphertexts, can use it to solve Diffie-Hellman problem. Prove that, if DDH is hard relative to $\mathcal{G}$, then $\Pr[\textsf{PubK}^{\textsf{eav}}_{\mathcal{A},\Pi}(n)=1]\leq \frac{1}{2}+\text{negl}(n)$.

We'll show that scheme is EAV secure, and for PK scheme, all EAV secure schemes are CPA secure as well.
- Run a reduction experiment using adversary $\mathcal{A}'$ that simulates encryption oracle for $\mathcal{A}$, with input $(\mathbb{G},g,q,h_{1}=g^{x},h_{2}=g^{y},h_{3})$ where $h_{3}\leftarrow \{g^{z},g^{xy}\}$, where $z\leftarrow \mathbb{Z}_{q}$.
- Sets $pk=(\mathbb{G},g,q,h_{1})$. Runs $\mathcal{A}\to(m_{0},m_{1})$.
- Choose a uniform bit $b\in\{ 0,1 \}$, and output ciphertexts as $c_{1}=h_{2},c_{2}=m_{b}\cdot h_{3}$
- $\mathcal{A}$ outputs $b'\in\{ 0,1 \}$, $\mathcal{A}'$ outputs $b'$
- if $b'=b$, output 1, else 0

Now, there are two possibilities, $h_{3}=g^{xy}$ or $h_{3}=g^{z}$, let's analyse both:
- When $z\leftarrow\mathbb{Z}_{q}$, then view of $\mathcal{A}$ run as a subroutine by $\mathcal{A}'$ is identical to that of an experiment $\Pi'$, where $\mathcal{A}$ has no way of decrypting the ciphertext $c_{2}$, and can only guess the bit. Thus $\Pr[\mathcal{A}'(g,q,h_{1},h_{2},h_{3}=g^{z})=1]=\Pr[\textsf{PubK}^{\textsf{eav}}_{\mathcal{A},\Pi'}(n)=1]=\frac{1}{2}$.
- When $z\leftarrow\mathbb{Z}_{q}$, then view of $\mathcal{A}$ run as a subroutine by $\mathcal{A}'$ is identical to that of EAV experiment. Thus, $\Pr[\mathcal{A}'(g,q,h_{1},h_{2},h_{3}=g^{xy})=1]=\Pr[\textsf{PubK}^{\textsf{eav}}_{\mathcal{A},\Pi}(n)=1]$
- $\Pr[\mathcal{A}(\mathbb{G},q,g,g^{x},g^{y},g^{z})=1]-\Pr[\mathcal{A}(\mathbb{G},q,g,g^{x},g^{y},g^{xy})=1]\leq \text{negl}(n)$, we know from [[diffie-hellman|DDH assumption]].
- $\frac{1}{2}-\Pr[\textsf{PubK}^{\textsf{eav}}_{\mathcal{A},\Pi}(n)=1]\leq \text{negl}(n)$

