---
title: Graph Neural Networks
date: 2026-03-30
tags:
- machine-learning
- representation-learning
- graph-neural-networks
- graph-theory
- notes
---


# 1 GNN

**Representation**
- Node embedding: Each node embedded as a vector, and the entire graph represented as adjacency matrix $\mathbf{A}\in\mathbb{R}^{n\times n}$ and feature matrix (attribute vector) $\mathbf{X}\in\mathbb{R}^{n \times n}$
- Graph embedding: Entire graph represented as a vector.

**Properties**
- Permutation invariance (Graph embedding), $f(PAP^{T},PX)=f(A,X)$: Permuting the node embeddings and attribute vector has no effect on the output. When we want to predict anything about the entire graph, for example classifying a molecule, then we want the model to permutation invariant.
- Permutation equivariance (Node embedding), $f(PAP^{T},PX)=Pf(A,X)$: Permuting the node embeddings and attribute vector is equivalent to first applying the function, and then permuting. Or in other [words](https://datascience.stackexchange.com/questions/16060/what-is-the-difference-between-equivariant-to-translation-and-invariant-to-tr), translation of input features result in an equivalent translation of outputs, or permuting the adjancency matrix means the output of f is permuted in a consistent way.
- We need to satisfy either of the two: i.e. invariance or equivariance.

Why do we not represent a graph as an MLP?
Why do we not represent as a CNN? what are the similarities?
- Similarity: Locality, Weight Sharing, arbitrary input size
- Difference: Abstract shape

## 1.1 Message Passing

Take a graph: $\mathcal{G}=(V,E)$ along with a set of node features $\mathbf{X}\in \mathbb{R}^{d\times \lvert V\rvert}$, and generate node embeddings $z_{u},\ \forall u\in V$.

> [!question] what can node features be?
> Depends on the problem we're solving. For molecular graphs, this can be information for each atom in the molecule, for social graphs, information can be about each individual member in the graph. For no individual node features, input can still be statistics of the node in the graph, and can even contain some more information about the graph itself.
> To *break* permutation equivariance, we can assign positional encoding to each node, say as a one-hot vector encoding.

**Aggregate**: in each round k, each node aggregates the message (feature description) from its neighbours and update the weights. $m_{\mathcal{N}(v)}^{(k)}=\text{Agg}^{(k)}\left(\{ h_{u}^{(k-1)}:u\in \mathcal{N}(v) \}\right)$
- Initial embedding is set to be features of the node: $h_{u}^{(0)}=\mathbf{x}_{u},\ \forall u\in V$
- Differentiable, multiset function. Input being a set designs the graph as Permutation equivariant.
- Sum, Mean, Max/Min.
- $m_{\mathcal{N}(v)}^{(k)}=\text{MLP}_{2}\left( \sum_{u\in \mathcal{N}(v)}\text{MLP}_{1}(h_{u},h_{v}) \right)$: Universal approximation of multiset functions.
- Receptive field of the graph increases with each iteration, as more information further away from the node is aggregated.
- Messages from the neighbours can encode *structural information* like degree of the neighbour node, useful in problems like analysing molecular graphs. Or can also encode *feature-based* information from local neighbourhood of the graph analogous to how CNNs aggregate feature information from spatially-defined patches.

**Update**: $h_{v}^{(k)}=\text{Update}^{(k)}\left(h_{v}^{(k-1)},m^{(k)}_{\mathcal{N}(v)}\right)$.
- $h_{v}^{(k)}=\sigma\left(W_{\text{self}}h_{v}^{(k-1)}+W_{\text{neigh}}m_{\mathcal{N}(v)}^{(k)}+b^{(k)}\right)$, where $W_{\text{self}},W_{\text{neigh}}\in \mathbb{R}^{d^{(k)}\times d^{(k-1)}}$ and $b^{(k)}\in \mathbb{R}^{d^{(k)}}$

**Readout**: $h_{\mathcal{G}}=\text{READOUT}(\{ h_{v}^{(K)}:v\in \mathcal{G} \})$: Outputs a final result after K final iteration. Like pooling in CNNs.

We can also define a graph-level equation for aggregate and update, and we can even batch aggregate and update in one equation using self-loops:
$$
\begin{gathered}
\mathbf{H}^{(k)}=\sigma \left( \mathbf{A}\mathbf{H}^{(k-1)}\mathbf{W}_{\text{neigh}}^{(k)}+\mathbf{H}^{(k-1)}\mathbf{W}_{\text{self}}^{(k)} +\mathbf{b}^{(k)} \right) \\

\mathbf{H}^{(k)}=\sigma \left( (\mathbf{A+I})\mathbf{H}^{(k-1)}\mathbf{W}^{(k)} \right)
\end{gathered}
$$

Similarity to MLP with each node's weight being a vector instead of a scalar, and aggregate and update together forms the linear and pointwise layer. So actually, a GNN can learn much more than a simple MLP.

> [!question] Every iteration weight of single node gets updated using it's neighbour, but that d-dimensional vector will be saturated after many iterations? Will a single node embedding contain any meaningful information from its neighbourhood?
> **Over-smoothing**: Representation of all the nodes in the graph can become very similar to one another. This makes it impossible to build deeper GNN models.
>
> Formally, Define influence of a node's input feature $h_{u}^{(0)}=\mathbf{x}_{u}$ on the final layer embedding of all other nodes in the graph $h_{v}^{(K)},\ \forall v\in V$. For any pair of nodes u, v in the graph, influence of u on v is quantified using the Jacobian $I_{K}(u,v)=\mathbf{1}^{T}\left( \frac{\partial h_{v}^{(K)}}{\partial h_{u}^{(0)}} \right)\mathbf{1}$.
>
> Building deeper models can hurt performance of GNN models as with each added layer, information loss about local neighbourhood increases and learned embeddings are over-smoothed.
>
> More on the influence of self-update and deeper models can be found in [GRL book](https://www.cs.mcgill.ca/~wlh/grl_book/files/GRL_Book.pdf#page=66.28) and [Xu et. al.](https://proceedings.mlr.press/v80/xu18c/xu18c.pdf).

## 1.2 Generalisations

### 1.2.1 Aggregate

- Normalisation: Mean normalisation $m_{\mathcal{N}(u)}=\frac{\sum_{v\in \mathcal{N}(u)}h_{v}}{\lvert \mathcal{N}(u)\rvert}$ or symmetric normalisation $m_{\mathcal{N}(u)}=\frac{\sum_{v\in \mathcal{N}(u)}h_{v}}{\sqrt{\lvert \mathcal{N}(u)\mathcal{N}(v)\rvert}}$.
	- > [!question] Why does symmetric normalisation work better than mean?
	- Normalisation leads to loss of structural information, as is provably, less powerful than sum aggregation. Normalisation is more useful when feature information is more useful than structural information.
- Set pooling: Use a universal set function approximator that can approximate any permutation-invariant aggregator function: $m_{\mathcal{N}(v)}^{(k)}=\text{MLP}_{2}\left( \sum_{u\in \mathcal{N}(v)}\text{MLP}_{1}(h_{u},h_{v}) \right)$
- Janossy Pooling: Permutation sensitive function averaged over permutations
- Attention: $m_{\mathcal{N}(v)}=\sum_{u\in \mathcal{N}(v)}\alpha_{vu}h_{u}$: weighted aggregation. Is used to increase the inductive bias of the model with prior information about importance of neighbours.
- Multiple attention heads: Compute K distinct attention weights using independent parametrised attention layers. Aggregate all message by projection and concatenation.
	- $m_{\mathcal{N}(u)}=[a_{1}\oplus a_{2}\oplus\dots \oplus a_{K}]$
	- $a_{k}=W_{k}\sum_{v\in \mathcal{N}(u)}\alpha_{v,u,k}h_{v}$

### 1.2.2 Update

- Skip connections: Counter over-smoothing by directly preserving information from previous rounds of message passing.
	- $\text{Update}_{\text{concat}}(h_{u},m_{\mathcal{N}(u)})=[\text{Update}_{\text{base}}(h_{u},m_{\mathcal{N}(u)})\oplus h_{u}]$
	- $\text{Update}_{\text{interpolate}}(h_{u},m_{\mathcal{N}(u)})=[\alpha_{1}\text{Update}_{\text{base}}(h_{u},m_{\mathcal{N}(u)})\oplus \alpha_{2}h_{u}]$, where $\alpha_{1},\alpha_{2}\in [0,1]^{d}$ and $\alpha_{2}=1-\alpha_{1}$, and $\alpha_{1}$ can be learned jointly with other representations.
	- Due to the analogous properties of CNNs, concatenation and skip connection as described in [He et. al](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf) produces similar results.

### 1.2.3 Features and Relationships

- Edge attributes: $m_{\mathcal{N}(v)}=\sum_{u\in \mathcal{N}(v)}\text{MLP}^{(k)}\left(h_{u}^{(k-1)},h_{v}^{(k-1)},\mathbf{w}_{uv}\right)$
- Multi-relational: aggregation can depend on the relationship between nodes.

### 1.2.4 Generalised Message Passing

$$
\begin{align}
h_{(u,v)}^{(k)}&=\text{Update}_{\text{edge}}\left(h_{(u,v)}^{(k-1)},h_{u}^{(k-1)},h_{v}^{(k-1)},h_{\mathcal{G}}^{(k-1)}\right) \\
m_{\mathcal{N}(u)}&=\text{Aggregate}_{\text{node}}\left(\{ h_{(u,v)}^{(k)}\ \forall v\in \mathcal{N}(u) \}\right) \\
h_{u}^{(k)}&=\text{Update}_{\text{node}}\left(h_{u}^{(k-1)},m_{\mathcal{N}(u)},h_{\mathcal{G}}^{(k-1)}\right)\\
h_{\mathcal{G}}^{(k)}&=\text{Update}_{\text{graph}}\left(h_{\mathcal{G}}^{(k-1)},\{ h_{u}^{(k)}\ \forall u\in V \},\{ h_{(u,v)}^{(k)}\ \forall(u,v)\in E \}\right)
\end{align}
$$

Main improvement over baseline message passing is that during each iteration, the model generates a hidden edge embedding for all edges in the graph, and an overall graph embedding corresponding to the entire graph. This helps differentiate between edge and node level features and entire graph-level features. We can also define different loss functions for different type of embeddings, and tasks.

## 1.3 Approximation Theory

Graph Isomorphisms: Given two graphs $\mathcal{G}_{1},\mathcal{G}_{2}$, declare whether two graphs are *isomorphic*. Formally, we say two graphs with adjacency matrix $A_{1},A_{2}$ and feature matrix $X_{1},X_{2}$ are isomorphic if and only if there exists a permutation matrix P such that $PA_{1}P^{T}=A_{2}$ and $PX_{1}=X_{2}$. Or informally, when they have same structure but differ in ordering of nodes in their adjacency matrices.

> [!todo] GL test and [HOW POWERFUL ARE GRAPH NEURAL NETWORKS?](https://arxiv.org/pdf/1810.00826)

- Weisfeiler-Lehman isomorphism test
- Distinguishing capacity of GNNs

## 1.4 Problems I'm Seeing:
- A d-dimensional weight vector exists for each node in the graph, so the size scales with $\mathcal{O}(Nd)$. And number of edges will also mean that update function will be hard to compute, but is actually emabarrasingly parallel.
- How to choose depth K?
- How do you update the graph structure as you process more? Can we prune or connect more edges and nodes?

## 1.5 More Readings:
- [GRL Book](https://www.cs.mcgill.ca/~wlh/grl_book/files/GRL_Book.pdf)
- [geometric-gnn-dojo/geometric\_gnn\_101.ipynb at main · chaitjo/geometric-gnn-dojo · GitHub](https://github.com/chaitjo/geometric-gnn-dojo/blob/main/geometric_gnn_101.ipynb)
- [A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/)
