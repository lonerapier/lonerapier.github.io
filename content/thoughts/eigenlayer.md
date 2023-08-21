---
title: "EigenLayer"
date: 2023-01-25T10:00:00-00:00
tags:
- tech
- seed
---

# Why EigenLayer?

Permissionless composability only on the dapp layer and not on other stack in decentralised trust networks like Bitcoin and Ethereum. If someone wants to provide her own DA layer or oracle, she has to build her own trust and economically secure network.

-   What other stack means? Blockchains are divided into different stacks like consensus, p2p networks, execution, DA, Dapps. These stacks sit together to form a network which can provide certain functionalities to an end user.

# What EigenLayer?

So, the idea is to borrow the trust already established in the popular decentralised trust network like Bitcoin and Ethereum and leverage that to provide middleware infrastructure and other services. Most of the validators in a network are sitting idle most of the time and only attesting to the blocks proposed in a slot. Through EigenLayer, these validators can opt in to provide more services to the consumer, in-turn taking more risks for better rewards.

# How EigenLayer?

EigenLayer requires two things: Incentive Mechanisms and Full Programmability, and the largest trust network providing this, is Ethereum. Ethereum has Proof of Stake, which contains incentives for positive and negative behaviour, that EigenLayer uses to add more conditions on validators when providing services. EigenLayer takes permissionless custody of the stakers trying to provide the service and introduce additional slashing conditions based on the service’s requirements.

-   How EigenLayer takes custody of the service provider?


	There are two ways current Ethereum staking infrastructure behaves:


	1.  Liquid Staking: Big Staking pools like Coinbase, Lido, RocketPool provides LSD for your position as a validator set.
	2.  Native Staking: Individual stakers provide 32ETH to start validating the network.


	EigenLayer introduces two types of re-staking using Smart Contracts:


	3.  Liquid Restaking: LSD’s are deposited in a smart contract, giving it permission to slash the staker on detection of a slashable event committed by the staker.
	4.  Native Restaking: Withdrawal address is set to EigenLayer’s smart contract address, which allows the SC to withdraw on staker’s behalf on any malicious event.

# Where EigenLayer?

1.  Developer Feasibility: Gives developers access to a huge, economically secure network which they can leverage to build service on top.
2.  DA layer: Only require 80 KB/s bandwidth to start staking on Ethereum, but these validators have orders of magnitude higher bandwidth waiting to be utilised. EigenDA as solution provides higher order data availability service.
3.  Fast finality
4.  MEV management
5.  Trustless bridges

# EigenLayer?

1.  Smart Contract Risk The current solution is to have a two layer decision-making process where Smart contract detect the event and initiate a slashing event, and a committee of human intelligence reviewing the event and, after some delay, vetoing it.
2.  Overleveraging Staking Risk Each new DApp built on Ethereum increases its ecosystem value, but not necessarily the staked value. This increases the amount of profit associated with each attack, but the second order effects of this is more fees flows to the stakers through the usage of these dapps and that’s what EigenLayer aims to solve. It wants to deepen the programmability of the protocol so that developers can specify exactly what they want from each node, resulting in much more efficient protocols in addition to more risk.

# Resources

- [How EigenLayer Unlocks Infrastructure Innovation](https://www.youtube.com/watch?v=p5YZP7YXVIA)
- [How EigenLayer supercharges ETH](https://www.youtube.com/watch?v=O-uzBSevklk)
