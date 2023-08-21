---
title: "Sovereign Rollups"
date: 2022-10-03T10:00:00-07:00
tags:
- tech
- seed
---

![28_Sovereign-Rollups.jpeg](thoughts/images/28_Sovereign-Rollups.jpg)

SRs are other type of rollups that doesn't use other L1 as settlement layer but just use external DA and consensus layer. Settlement is handled within the rollup with their own clients. Full Nodes and Light Clients are used to sample DA and fraud/validity proofs for verification. Celestia is a solution in this direction which wants to be the go-to layer for cheap DA, giving sovereignty to chains. A rollup that uses another chain as settlement layer is bounded by the consensus rules of that chain, and doesn't have complete control over its changes. SR nodes verify the correct canonical chain for themselves, relying just for data on the external layer. The trust minimised two-way bridge converts to a one-way bridge for SRs as no verification is happening from the base layer.

One major drawback of having a chain that can fork endlessly even with minority is that it hurts composability. Apps that rely on other apps for their functionality would also have to fork and follow the new rollup chain which is not feasible in a bigger ecosystem and is quite pointless if the apps prefer the older chain, then you are just left with a new fork which no one is using. Thus, SRs make more sense for specific and single purpose DApps. DeFi is the most significant use case for decentralised applications at the moment and most of it relies on other apps for composability and yields, it wouldn't make much sense for apps to just spin up their own rollup chain to have sovereignty away from the base layer.

One advantage that SRs flex is the flexibility of having their own execution environments tailored for the specific use case rollup chain is designed for. This is not the case with ERs or SCRs that only supports base layer native execution environment for arbitrating proofs.

# Fraud Proofs in SRs

![30_IVG.jpeg](thoughts/images/30_IVG.jpg)

- Non-Interactive: simple flavour of proofs where the challenger submits the claim and the light clients execute the transactions completely to check if the claim is true.
- Interactive: Challenger submits claim and responder responds to defend themselves. These entities play a **Interactive Verification Game** (IVG) with a referee.

There are two methods to distribute FPs over the network:

- P2P layer: distributed via nodes to other nodes, faster light client finality, no censoring by L1 miners/validators.
- On-chain inclusion

Celestia is a dirty ledger that means it doesn't check for validity and there's no concept of finality and just focuses on putting the data out there. Now, if a challenger wants to prove a Tx is an invalid transaction, it needs to have all the related transactions that could prove the malicious transaction is invalid and thus, this again brings us to the same place of archival nodes having to store all of the transactions. To mitigate this, weak subjectivity assumption is introduced. SCRs challengers has to keep the transaction data for the challenging period while SRs challengers now need to keep the data for the weak subjectivity period.

IVG also introduces synchrony assumptions where all the light clients have to be connected to the honest challengers in order to distribute proofs. Thus, SRs are likely to use single round FPs as light clients can then participate in the distribution of proofs.

# Bridging in SRs

SRs do add additional design considerations over bridging as the settlement is happening on the rollup side and not on the base layer.

There can be two types of bridges:

- Committee-based: A validator set of source chain attest to the validity of a block that is being used by another chain. Not trust-minimised as committee can steal funds. IBC is an example of this.
- Proof-based: Trust-minimised bridging where SRs can verify each other's state using proofs, much more complex than other types.

   Two types of bridging settlement here:

   - P2P settlement: where light clients are embedded in the chain and receive proofs over P2P network. Both SRs have bridging contract allowing for lock-and-mint mechanism.
   - On-chain settlement: both rollups run light clients as smart contracts. proofs and transaction data stored on-chain in these contracts.

   Two types of upgrade mechanisms possible:

   - Static Bridging: In which the rollup $SR_A$ doesn't support $SR_B$'s execution environment and has to support it node software upgrades. Now, if $SR_B$ forks, $SR_A$ has to fork itself to support $SR_A$ execution environment again. Thus, social consensus or governance is needed to add bridge.
   - Dynamic bridging: rollup's support each other execution environment, thus not needed to fork and can support other's proofs directly.

   Two types of bridging possible in SRs:

   - Pairwise Bridging: every rollup has a bridge to every other rollup which means $N^2$ bridges for N rollups.
   - Hub-and-Spoke model: a central hub SR which aggregates all the liquidity and communication from all the rollups. Similar to what Cosmos Hub wants to be.

# Aggregated ZK Bridging

Problem: $SR_1 - SR_2$ through $SR_N$

1. An aggregate prover would receive proofs off-chain $SR_2 - SR_N$, runs a light client for each chain.
2. Combines proofs into one aggregated proof and includes it in a smart contract on-chain.
3. $SR_1$ verifies proof in the same amount of time it would take to verify one proof.

# ETH Sovereign Rollups

Would be in effect when Ethereum implements data blobs carrying transactions which makes ETH to be used as a DA layer.

Tradeoffs:

- Better liveness: gasper can retain liveness in 33% attack
- Better economic security
- slower finality
- More overhead: no DAS in ethereum yet, thus can't run light clients and need to run full nodes.

# Celestia Sovereign Settlement Rollup & SC Recursive Rollup

![32_SSRSCR.jpeg](thoughts/images/32_SSRSCR.jpeg)

SRs are specially designed for recursive rollups to live on top of. These recursive rollups use SRs for shared settlement establishing a two-way trust minimised bridge between the layers. Submits proofs, state updates and transaction data to SRs, which then batches these rollup blocks and post them to Celestia.

This reduces a lot of bridging overhead found in legacy SRs where $N_2$ bridges exist for each pair of rollups. Thus, this creates $N$ trust minimised bridges to communicate with a shared settlement layer. One could argue a restrictive more specific settlement layer that only allows specific operations to perform on top of or a general purpose settlement layers. A specific settlement layer would be cheap and easier to set up with less complexities but also comes at a UX degrade of not having many use-cases like DeFi pooling, dAMMs, etc.

But a separate settlement layer could pose more challenges for censorship and force transaction inclusion which is supported in SCRs. Participants can leave rollup to post their transaction to L1 anytime just trading off the cheap fees, or sequencers are forced to include transactions within a certain time period which will get decentralised with more sequencers joining eventually.

But how do you do this with shared SRs? If settlement layer is censoring a rollup, then there needs to be a way to submit transactions directly to DA layer and skip settlement layer altogether.

Liveness risks are still associated as liveness failure of settlement layer will render the rollup useless, but not in the case of sequencers failure of rollup itself, as then you can settle to settlement layer directly.

# Readings

- [Rollups as Sovereign Chains](https://blog.celestia.org/sovereign-rollup-chains/)
