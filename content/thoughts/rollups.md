---
title: "Making Sense of Rollups"
date: 2022-10-03T10:00:00-07:00
tags:
- tech
- seed
---

> The butterfly sailed on the breeze
> 
> Past a field of barbed wire trees
> 
> Where golden dragons chased around
> 
> Pampered poppies on the ground

First of all, let's give you a banger to listen along this wild ride that I had while going deep and deep in this amazing rabbit hole of Rollups. The song is [Nine Cats](https://open.spotify.com/track/6M6S6DhGZZzmtTjP1iPvxb?si=d35d13e8c74e40ae) from Porcupine Tree. I listen to them quite often as Prog Rock is one of my favorite genres to listen, it's pretty wild yet sounds soothing to my ears.

## Let's Dive in!

Modular Stack divided the monolithic state of a blockchain into four main parts:

1. Data Availability (DA): making state and transaction data available to consumers cheaply and quickly
2. Consensus: agreement over the transactions included in a block and their ordering
3. Settlement: can vary between different implementations, but mainly refers to settling/validating of transactions on the chain through verifying/arbitrating proofs.
4. Execution: computation of previous state → transaction → new state

**Economic security** refers to large amount of monetary value locked into the layer that is being secured by the network. In the end, the most economical secure layer will accrue the most value as that's where most of the premium and profit resides.

## Different Rollups

![1_Modular-Stacks](thoughts/images/1_Modular-Stacks.jpeg)

There are [four](https://twitter.com/apolynya/status/1511623759786307586) main kinds into which Rollups can be categorised:

1. Smart Contract Rollups: they use already decentralised, economic secure L1 for settling through the use of smart contracts for arbitrating proofs.
2. Enshrined Rollups: in-protocol rollup which doesn't rely on smart contracts and is built into the L1 spec itself.
3. [[thoughts/sovereign-rollups|Sovereign Rollups]]: doesn't use another L1 for settling, and only use another DA layer for data and ordering. These type of rollups have full control over their stack and can outperform other alt-L1s.
4. Validium / Celestiums: these use off-chain DA solution for cheap DA and settle proofs on other external chain.

## Why Rollups?

Because Ethereum in it's older monolithic form was not designed to scale for the demand of thousands of transactions in a second and thus, rollups provide a better environment for apps to exist, with better transaction pricing and scalability. And also provide better grounds for research and technological advancements to take place which can't happen in a monolithic system.

Any system that wants to house many high valued assets has to capture the monetary premium in the form of fees or MEV to guarantee the economic security. Many believe that to be the settlement layer as that's where a transaction validity gets finalised.

Rollups use proofs to verify their transactions on the base layer and these come in two different forms:

1. [[thoughts/fraud-proofs|Fraud Proofs]]: in case of ORUs
2. Validity Proofs: in case of ZKRs

## Rollup fees

![14_Smart-Contract-Rollups.jpeg](thoughts/images/14_Smart-Contract-Rollups.jpeg)

In its current form i.e. pre *EIP-4844* and *Danksharding*, each rollup is essentially a *Smart Contract Rollup,* which posts its transaction data (in case of ORUs, ZKRs don't need to post complete transaction data), state roots along with proof data to L1 in the form of calldata to smart contracts. These SCRs have fixed cost in terms of state commitments and proofs that they submit and variable costs in the transaction data along with proposers signatures in case of ORs.

> Note: ZKRs don't need to submit transaction data and ORUs does is in case of fraud in ORUs, transaction data is needed to check the fraud but ZKRs along with validity proofs prove that the state diffs are valid. Thus, ZKRs post validity proofs every time to L1.

Optimism currently uses two smart contracts at L1 that sequencer and proposer post to:

1. Canonical Transaction Chain contract: append-only logs of transactions submitted by sequencer.
2. State Commitment Chain contract: state roots proposed by the proposers for each transactions in CTC.

Posting to both of these contracts incur a cost to L2s. Although most of these contracts will be archived sooner than later as Ethereum eyes its bigger upgrades and Rollups also upgrades to better infra in the form of ***bedrock*** for Optimism and ***Nitro*** for Arbitrum. Better DA layer, separate EIP-1559 fee market for rollup data will get rid of the smart contracts.

![8_Value-Flows.jpeg](thoughts/images/8_Value-Flows.jpeg)

But with EIP-4844 and Danksharding looming, DA supply will overshoot and better compression from rollups as well will scale the TPS metric to an absurd amount. This brings to the question of value accrual as the value acquired as a DA layer won't be much if the DA supply isn't fully exhausted.

|              | Target DA Bandwidth | Target Useful Data per block |
| ------------ | ------------------- | ---------------------------- |
| EIP-4844     | 83.33 KB/s          | 1 MB                         |
| Danksharding | 1.33 MB/s           | 16 MB                        |

With Danksharding, Ethereum as a DA layer will be able to provide 1.33 MB/s data bandwidth with maximum economic security. Current Eth blocks average around 90KB with calldata being 10 KB of this. Rollups eventually want to optimise for 14 bytes/tx which with 1.33 MB/s bandwidth amounts for 100k sweet sweet TPS. Although, this should be kept in mind that these are best case numbers in a hyper-optimised rollup environment that will be implemented in a very long time horizon.

## MEV in a modular stack

With MEV-Boost running in production with several relayers and in-protocol PBS as part of roadmap, this makes most of the MEV value to accrue to L1 base layer. Similarly, in a rollup environment, sequencers try to bid for block with maximum value from searchers which accrues most of the value to rollup layer. This is still a research area, with how much of the value that will get accrued to L1 DA/settlement layer or L2 stack. MEV value can get leaked to DA layer if it censors or delays settlement layer blocks.

Celestia wants a small part of a bigger pie here due to optimising for the DA layer.

## Attacks on DA Layer

### 33% Attack

This leads to liveness failure in tendermint consensus and is a slashable event in Gasper consensus which leads to inactivity leak until the protocol can finalise again.

### 67% Attack

There are certain validity condition in the consensus protocols such that even if 100% of the validators are dishonest, they can't just print native tokens out of nothing as the honest nodes won't accept the transactions and protocol can be forked using social consensus.

Attacks that can happen if 67% of the protocol is malicious are:

1. Double signing
2. Data withholding
3. Fraud proofs censorship

Thus, both DA and settlement layer is susceptible to frauds. Eventually, only that stack wins which accrues the most value i.e. most economically secure. Every layer has to be designed such that participants can capture a value of the transaction for self-sustaining environment otherwise, it leads to more centralisation. And, as it is put now, DA layer doesn't accrue much of the transactional value and it will be the case for a long time in the future.

## Rollup Stack

### SC Settlement Rollup & SC Recursive rollup

One question that comes to mind is why does Rollup has to use Ethereum as its Settlement layer? Because it's an economic secure network which behaves as an apt settlement layer due to its isolated execution environment that can arbitrate proofs submitted by the rollup. The smart contracts on Ethereum also serves as trust-minimised two way bridges between the rollup and the L1. It's trust minimised as *rollups operators* (proposers, sequencers, provers, challengers) due to the means of smart contracts doesn't need any third party to submit batches to the L1 and it's two way because L1 smart contracts receive block headers along with proofs and thus behaves as a light client.

Starkware wants to create recursive smart contract rollups on top of Starkware L2, where L2 behaves as a settlement layer for L3s and more use-specific applications can be deployed as L3s on top of L2s. L2s verifier contract receives many validity proofs from L3s and recursively combines it into one proof and submit to L1.

### Enshrined Rollups

ERs are what rollups would have looked like if an L1 supports them from the start, i.e. in-protocol support for verifying state changes. Currently, to verify if a state is valid, full nodes have to run all the transactions. Perfect game would be when the blocks or rollup batches have proofs attached and state validity could be proven. A single zkEVM which could verify the SNARK submitted with each block for state validity.

As the name mentions, ERs are currently a theoretical concept, meant to be part of the L1 itself in the spec rather deployed on top of smart contracts. So,

- How does rollups settle to L1?

   Full Nodes doesn't have to run all the transactions unless there's a fraud proof in case of ORUs, much better case in case of ZKRs where no re-execution happens due to provers providing validity proof with each batch.

- Other thing that comes to mind is how will the in-protocol proofs would look like?

   The simplest way for an L1 to support proofs within consensus layer is to re-execute the transactions with pre and post state roots. A zkEVM would get SNARK with every block as a sidecar or on-chain depending on the implementation.

- What performance upgradation does in-house proof proving could provide?

   With weak statelessness already part of the roadmap, full nodes wouldn't have to execute every transaction to check state validity due to SNARK coming with every block leading to simpler consensus logic. Removing compute bottleneck and statelessness reducing disk I/O also helps in raising the block gas limit. And bandwidth resource increases according to the Nielsen's Law. Also light clients can filter invalid state roots due to SNARKs much more quickly than fraud proofs.

**Step 2** would be to deploy parallel zkEVMs ERs. These parallel ERs can verify separate SNARKs and then can settle to one main settlement rollup, performing like execution shards but better.

![24.-Enshrined-Rollups_00288-1.jpeg](thoughts/images/24.-Enshrined-Rollups_00288-1.jpg)

zkEVMs ERs have several benefits:

1. **Social Alignment**: Follows social consensus
2. **Secure**: No upgrade keys required
3. **Economic**: maximum value accrual to ETH
4. **Gas Efficient**: less gas cost as directly arbitrating proofs instead via SCs

Disadvantages:

1. Slow: has to go through vigorous protocol update phases
2. Pre-Confirmations: Harder pre-confirmations as no centralised sequencers
3. Less VM innovation
4. Increased builder cost: more specialised builders that are able to verify the SNARK.

There are many arguments against zkEVM shards ERs potentially harming SCRs and innovation happening on it. Users wouldn't feel as comfortable using a private SCR and would instead choose a more embedded, easily verifiable ER, thus weakening these SCRs.

This could potentially lead to a rollup leaving L1 for their own to gain a bigger piece of the pie and gain more control over its users and stack. In my opinion, rollups doing this are just scared of competition, looking for profit and maximalism rather than what blockchains as a tool stands for and, that is, social coordination. ERs and SCRs could easily go hand-in-hand, with SCR housing the innovations in the ecosystem and ERs becoming the efficient, trust-minimised settlement layer.

DA on its own doesn't accrue much value to the base layer, high-value transactions and massive liquidity is needed to attract more premium and value to the participants and that is achieved by being the best settlement layer. This could be achieved using zkEVM ERs. A successful settlement layer would only benefit the SCRs building on top, as more monetary premium leads to economic security and more trust a user has on the rollup. Rollups breaking away from the base layer would have to again fight the same battle of network effects, decentralisation, retaining users with fragmented liquidity and much lesser scaling options which is the whole point of rollup economics.

Ethereum as a base layer shouldn't just focus on rollups, but housing as many participants as possible with apps like Uniswap, Aave running and doing massive defi transactions on L1, SCRs, ERs.

Validiums/Celestiums that use other chains as DA layers suffers from trust assumptions as there are two options for DA, off-chain and on-chain. Off-chain options could be fast and cheap but lacks sufficient decentralisation and On-chain options like Celestia could be a better option but if it goes down so does your chain relying on it for DA. Thus, rollups settling on same chain for DA and settlement avoid these issues as if Ethereum gets 51% attacked and reverts, so does the rollup settling to it. There are benefits that validiums provide that depends on the use case of data availability modes.

> Settlement alone then largely provides network effects, while DA adds on full security. These network effects are safely optimised by sharing DA.

### Sovereign Rollups

These are another class of [[thoughts/sovereign-rollups|Rollups]] that doesn't settle to any other external layer and only use them for DA and transaction ordering.

## Questions

- What do we really mean by a settlement layer?
- Does DA layer need economic security or its function is just to provide data cheaply and quickly?
- Atomic cross-chain MEV?
- Danksharding and EIP-4844 specs
- IVG
- ZK Bridging
- Cevmos
- statelessness

## Readings

- [[posts/Optimistic Rollups|ORUs]]
- [The Complete Guide to Rollups - Delphi Digital](https://members.delphidigital.io/reports/the-complete-guide-to-rollups)
- [Understanding rollup economics from first principles](https://barnabe.substack.com/p/understanding-rollup-economics-from)
- [l2Beat](https://l2beat.com/scaling/tvl/)
- [Modular war on Twitter](https://twitter.com/dystopiabreaker/status/1531102983894597632￼)
- [EF Reddit AMA Enshrined Rollups](https://www.reddit.com/r/ethereum/comments/vrx9xe/comment/if11ljm/?utm_source=share&utm_medium=web2x&context=3)
- [Sovereign Rollup Chains](https://blog.celestia.org/sovereign-rollup-chains/)
- [Fraud Proofs Explainer](https://medium.com/infinitism/optimistic-time-travel-6680567f1864)