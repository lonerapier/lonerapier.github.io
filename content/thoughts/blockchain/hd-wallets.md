---
title: "Key Derivation"
date: "2024-04-30T00:00:00Z"
tags:
- blockchain
- cryptography
---

## Mnemonics

Introduced in [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

[Mnemonics](https://learnmeabitcoin.com/technical/keys/hd-wallets/mnemonic-seed/) are 12-24 word phrase that is generated using entropy and is used to create master key of an account used during HD account creation. Words are generated from a list of [2048](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt) words and are chosen using entropy generated during mnemonic creation. 

Path for creating a 15 words, with each word of 11 bits due to number of words being 2048, i.e. $2^{11}$.

- create a large random number of depending upon number of words in mnemonic, with more words being more secure. To create a 15 word mnemonic, you need 165 bit random bit string called **final entropy**, `11*15=165`.
- calculate **checksum** of entropy by hashing using SHA256 and take first `CS` bits of hash. Append this checksum to `ENT` to create final entropy. Divide it into chunks of 11 bits to create mnemonic word list.
	- Why division by 32? Because every 1 bit checksum for each 32 bit value results in a total 33 bit value divisible by 11 bits.
	```
	CS = ENT / 32
	MS = (ENT + CS) / 11
	
	|  ENT  | CS | ENT+CS |  MS  |
	+-------+----+--------+------+
	|  128  |  4 |   132  |  12  |
	|  160  |  5 |   165  |  15  |
	|  192  |  6 |   198  |  18  |
	|  224  |  7 |   231  |  21  |
	|  256  |  8 |   264  |  24  |
	```
- Mnemonic is then generated into a seed that can be used to create HD wallets using BIP32. PBKDF2 with SHA512 is used as hashing function for creating the seed.

![mnemonic-to-seed](https://i.imgur.com/R5WxqEE.png)

## Mnemonic seed to Master private key

[BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) implements [Hierarchical Derivation wallets](https://learnmeabitcoin.com/technical/keys/hd-wallets/) that can be used to generate billions of addresses from a single master private key in an hierarchical manner.

- To calculate master private key from mnemonic seed: `HMAC-SHA512("Bitcoin seed", mnemoic_seed)`. Produces a 64 byte output. 
	- First 32 bytes are used as private key and latter 32 bytes are used as chaincode to extend the private key to generate children nodes.
- To derive public key from private key, Bitcoin uses `secp256k1` [[elliptic-curves|EC]] and just perform `y=xG`.
- Child keys are derived from master private key by hashing extended private key with an index again and again.

### [Extended Keys](https://learnmeabitcoin.com/technical/keys/hd-wallets/extended-keys/)


