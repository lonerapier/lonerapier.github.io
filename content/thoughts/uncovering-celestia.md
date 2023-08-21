---
title: "Uncovering Celestia"
date: 2022-10-03T10:00:00-07:00
tags:
- tech
- seed
---

> Privileged.
>
> A Chosen Few.
>
> Blessed With our time in Hell.

Another song today would be [Hourglass](https://open.spotify.com/track/2pd1Lm8Jsslf2VdWQv0Je8?si=5b90339ee6804f32) from Lamb of God. I discovered this band when I just started listening to Metal and was stealthily going around the woods but listening to this song just instils a strange sense of rage in you.

Anywas, these are my thoughts towards an amazing piece of tech, redesigning the [[thoughts/rollups|Rollups]] architecture from ground up, with several challenges in front of them.

# Let's Dive In

Current problems are Monolithic chains. Celestia answers what minimum a blockchain can do to provide shared security to other blockchains (rollups)?

> Celestia combines the best of both worlds: Ethereum’s Rollups with its shared security and Cosmos’s sovereign interoperable app-chains.

In a series of transactions, a blockchain cares about two things, *consensus* and *validity*.

**Validity** rules determine which transactions are considered valid to be included in the blockchain while **Consensus** rules determine the order of the valid transactions to be included.

Celestia uses [[thoughts/tendermint|Tendermint]] as its consensus protocol and is only responsible to enforce consensus rules. It doesn’t care about transaction validity nor is it responsible to execute them. Rollups on top of celestia monitor for transactions important for them, download and execute them accordingly.

![9448d3db-ignore.png](https://storage.googleapis.com/members-portal-bucket/uploads/2022/02/9448d3db-ignore.png)

Qn: If execution doesn’t happen on celestia core, then does every app running on top of celestia has to execute each transaction and how does that help solve scalability problems found in other monolithic chains?

# Scalability Bottleneck

Most common issue suffered by major blockchains is **state bloat,** i.e. growth of nodes storage requirements with each added transactions to the history. Solution to this problem is existence of light clients, which doesn't download complete block data but only the block header and represents 99% of the users.

Light clients, however are not able to tell if a tx is invalid or not as it doesn’t have the data and works under the assumption that consensus nodes are honest. As the state continues to increase, full nodes start decreasing and light nodes start increasing leading to more centralization around full nodes.

Fraud/Validity proofs negate the occurrence of this phenomenon as any light client can run these succinct proof to verify whether the contents of the blocks are valid or not.

# How Fraud/Validity Proofs Work

![02571c37-simplified-fraud-proof.png](https://storage.googleapis.com/members-portal-bucket/uploads/2022/02/02571c37-simplified-fraud-proof.png)

Full nodes can provide light nodes with just enough data for them to verify that a particular transaction in included in block or not. This happens using merkle trees, which can efficiently prove that a particular tx is included w/o requiring them to download the whole block. So, these full nodes can provide just a subset of data and these light clients can verify against that.

But for full nodes to generate *fraud/validity proofs*, they need access to complete block data to run these transactions. If a malicious miner withholds block data, then light client won’t notice and continue to follow the chain as full nodes won’t be able to provide any proofs for the invalidity of that block. Thus, **Data Availability** is a necessary condition for fraud/validity proofs to exist.

Celestia solved this problem by making data availability a necessary rule such that this can be enforced even by light nodes through `Data Availability Sampling (DAS)` .

# Data Availability Sampling

DAS is implemented in celestia using a technique called `Erasure Coding` , which is a data protection technique used at various places. Erasure coding to a data extends the data such that complete data can be recovered using just a fraction of the extended data.

Light nodes randomly sample small fixed-sized chunks of block data from the block and have probabilistic assurances that other chunks have been made available to the network.

![a4e60aab-eithercase.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/CD732BFD-616B-4A45-BDB8-132508E3914F_2/OKzZK6rzyYtwYyNf0SI2pK0Bpv03SG6uzxxRTPczC78z/a4e60aab-eithercase.png)

When light clients start sampling the chunks of data along with the merkle proofs of inclusion of data in the block, from the block producer, it has two options:

1. To make the data available, in which case enough light clients can request a significant amount of chunks such that full nodes can recover the whole block with that data.
2. Data is not available, in which case full nodes are not able to recover the block data and light clients stop following the chain as the sampling process was not completed.

This results in liveness failure of the blockchain and the nodes stop following the chain. DAS guarantees that data availability is the necessary condition for blockchain to resume block production with both full and light nodes under same security assumptions.

# How Much Can Celestia Scale

Some tradeoffs exist in DAS light nodes, i.e. the block header grow in proportion to the square root of block’s size. For any blockchain to scale, it means processing higher throughput → processing more transactions → either more blocks or larger blocks. Size of a block depends upon

- Amount of data that can be collectively sampled
- Target block header size a light node can process.

Now, the aha moment of light clients comes in play here. Running a light client is as easy as running an app on a mobile phone and thus, as the demand of the blockspace rises, more and more nodes join the network and network bandwidth to sample the data rises and thus block size rises with it. This means, unlike monolithic blockchains which starts to congest as demand rises, modular blockchain flourish and can easily support the rise in demand along with stable low fees.

The second part where the size of the block header rises with rise in block size can be compensated with the rise in bandwidth which makes it easier for celestia throughput to grow.

# Benefits

1. **Self-sovereign blockchains**

Self-sovereignity represents entity which has complete control of his/her data.

Current Ethereum rollups post tx data along with proofs to L1 in the form of smart contracts, thus there has to be a way of on-chain governance mechanisms. This is not fully secure and decentralised to operate a system trying to support loads of high amount of throughput and handling significant amount of value. Celestia differs here in the sense that it doesn’t make any sense of the data and simply stores valid transactions, its the rollups that has to make sense of the required data and thus, has to make its own canonical chain.

This makes it significantly easier for any rollup to perform hard/soft forks which are regarded as a threat to any current monolithic blockchains. These forks dilute the security of the network and reduces it’s users faith on the underlying. But Celestia rollups can freely change the algorithm it uses in its nodes to make sense of the data without any threat of security failure because the DA and consensus layer remains the same with all the valid transactions.

1. **Flexibility**

Since celestia can freely take the roles of DA and consensus layer for rollups, it is much easier for any rollup to have its own execution environment with native VMs specially made for their use case. Thus, the VM market becomes open for any players to spin up flexible execution environments.

1. **Effortless deployment**

Deploying a blockchain has become easier and easier with the passage of time and significant improvements in chain architectures. Cosmos’ SDK is the prime example of how much easier it is to spin up their own app chain without writing millions of lines of node codes.

Celestia takes it a step further with rollups not having to worry about the validators it needs to bootstrap a blockchain. New rollups can be deployed with the click of a button having same security assumptions as the oldest rollups on the network.

1. ### Efficient Resource pricing

In ethereum scenario, rollups post data on to L1 which charges gas for each byte that is stored on-chain. This is then susceptible to L1 gas variations and cause fee spikes in L2s as well. Celestia, however only charges for historical state data that is stored as blockspace in bytes per sec and active state execution is handled by each rollup environment. Thus, spikes in one environment doesn’t affect another.

1. **Trust minimised bridges**

L1 can’t communicate with each other as there are no ways for one chain to verify state of another chain as they can’t execute the fraud/validity proofs of each other. Whereas rollups can form trust minimised bridges with each other as they all share same security. Ethereum has access to all rollup data and can execute their proofs. This allows them to create trust minimised bridges or trusted bridges depending on the requirements of rollups.

1. **Faster and minimal governance**

Separation of stacks also separates the amount of required to execute any improvements proposals as each layer can focus on themselves and iterate faster and much more effectively without worrying about the DA or consensus layer.

1. **Decentralised block verification, not production**

It doesn’t matter if in the long run various external factors tend to make block production centralised if you have sufficient amount of verifiers that can easily verify validity of a chain and continue to uphold the consensus rules to make them an efficient trustless machines.

1. **Simplicity**

Celestia made simpler architectural decisions that let them reduce any unnecessary tech burden and let them iterate and develop faster.

# Challenges

1. Bootstrapping execution environments: celestia as DA layer has no use if there are no execution environments on top of celestia to take advantage of all the DA throughput.
2. Determining appropriate block sizes, although celestia has the property of scaling data sampling as more number of nodes join the network, but there are no mechanisms to determine number of light clients in the network. Also, light clients cannot be rewarded for data sampling processes, thus, has no incentives.

![cevmos-celestiums.png](https://res.craft.do/user/full/e83dd57b-d460-d205-2243-2f6ed8de496a/EF825D6C-48E0-46D5-85B6-F4FE7DBDD949_2/CfHFGvj6vjieQD4EScjkPaAlunvQm3o1bbkJDOGB3JQz/cevmos-celestiums.png)

1. Third, is the limitation of Celestia native token utility because DA layer is not where value accrual in a blockchain takes place. Value accrual in a blockchain occurs mostly at settlement layer as no that’t where state execution takes place. Celestia’s native token will have to be moved to settlement layer using trusted bridges.

# Questions

1. Details about erasure coding.
2. sparse merkle trees
3. light clients

# Readings

- [Pay Attention To Celestia - Delphi Digital](https://members.delphidigital.io/reports/pay-attention-to-celestia)
- [A note on data availability and erasure coding · ethereum/research Wiki](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)
- [https://arxiv.org/pdf/1809.09044.pdf](https://arxiv.org/pdf/1809.09044.pdf)
- [A note on data availability and erasure coding · ethereum/research Wiki](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)
