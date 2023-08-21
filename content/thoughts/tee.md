---
title: "TEE"
date: 2023-01-15T12:40:00-07:00
tags:
- tech
- seed
---

## Why?

Data is a really precious commodity in an environment where most of the decisions are taken based on information. Trusted Execution Environments give us the capability of executing application code with secrets in an environment where not even the host system can access the secrets and determine the access patterns. Most of the data processing has been moved from local systems to cloud providers in a remote physical location. Any security breach at these remote systems compromises users' secrets and can thus, confidential computing is required which reduces TCB and attack surfaces to a minimum.

## Use cases 

1. Any personal data like Medical Records, Biometrics
2. Password Manager
3. Encryption keys

These data items in vocabulary of trusted execution environment are called ***secrets***. Even though there are ways of encrypting the data when it's getting transported, or static data in the server, but any processing on the data needs to happen on raw and unencrypted one. There are countless incidents where local systems or remote servers have been compromised, exposing the data to an attacker.

> [!info] 
> A term that we'll come back to often is **Trusted Computing Base (TCB)**. It refers to the hardware and software components of a system that are required to run a particular program/software securely. It comprises of the OS, BIOS, firmware, drivers, software dependencies, etc. Any breach of security in TCB can compromise the executing program and reveal the secrets. 
>
> Larger TCB means larger surface of area for attacks and more trust in the underlying components.


## SGX

SGX(Software Guard Extensions) is a technology which models the Trusted Execution Environment capabilities on hardware. Hence, making it easier to run programs in an encrypted hardware memory region on RAM. This includes protection from adversarial entity even with control of OS, BIOS. 

- Production level enclaves doesn't allow debuggers.
- The memory region created for enclave is encrypted and unadressable from outside of trusted part of the application. No cpu instructions like calls, jump, register manipulation or stack manipulation cannot be used to enter the memory inside the enclave region.
- Even if any malicious party is successful in tapping into the DRAM modules would only gain encrypted garbage. 
- Memory encryption is randomly changed periodically, i.e. every power cycle.
- Any external attempt at accessing the memory inside the enclave is denied. 

This gives protection from a variety of threats:

1. Compromised Operating Systems
2. Kernel Exploits
3. Untrustworthy cloud services

### Enclave

Program is run inside an encrypted region called **Enclave**. This is made possible by extending x86 architecture with new instruction sets. Enclaves provide confidentiality and integrity of the data inside the enclave through the use of **Enclave Page Cache** (EPC), which the system reserves at boot time. [^1]

![memory-structure-enclave](thoughts/images/memory-structure-enclave.png)

Enclaves are secure compartments but have boundaries to determine trusted and untrusted part of the application. Trusted Part contains the sensitive piece or secrets of the enclave's code and untrusted part containing other parts of the program. The enclave memory is a volatile memory that gets removed whenever system goes to sleep, machine is destroyed, or application exits. 

SGX has two calls used to communicate between the two parts:

1. OCalls: Trusted -> Untrusted
2. ECalls: Untrusted -> Trusted

> [!hint]
> what if we need secrets of our applications between successive builds of our enclave, generating the secrets every time would be a waste of the resources. That's why we need a way to securely transfer secrets between enclaves. This is done using **Data sealing**.

### Data sealing

The main aim of SGX is to not let raw secrets spill out of the enclave, and many misunderstand enclaves to be blackboxes where nothing is accessible. Rather, it's possible to encrypt data in the enclave using the encryption keys with one of the two policies defined in SGX:

1. ***MRENCLAVE***: sealing happens on the enclave using the key derived specific to that particular enclave, and can only be decrypted on the same enclave, on the same machine.
2. ***MRSIGNER***: sealing happens using key specific to the developer signing key on the system, and thus unsealing of data occurs when accessed by other enclave started by the same developer signing key.

> [!hint]
> how I as a user can be sure that there is no adversary manipulating the untrusted system and data integrity is intact. Attestation helps any entity to verify the integrity of the enclave and untrusted party to gain trusted party's trust.  

### Remote attestation

Remote attestation is an independent and untrustworthy party, namely prover(enclave) verifying to a trusted entity, namely verifier, the current state of the enclave to gain the relying party's trust. Can be done in two ways, Hardware-based and Software-based. A simple software-based example could include, prover sending memory hash after the execution of an application and the verifier verifying that the execution has indeed happened correctly and that no tampering has been done with the data.[^2]

1. Software-based RA is when the prover provides proof of its correct state
2. Hardware-based RA is the use of specialised memory regions inside the hardware that makes it difficult to tamper the secrets.

After the prover has attested to the remote party that it is indeed running the correct application on a SGX enabled processor in an enclave, both parties can then continue with exchanging information and secrets with each other. This is how secrets are supplied inside the enclave using secure channels.

Intel provides a pseudo-filesystem[^3] inside enclave as `/dev/attestation` which exposes all the necessary files related to attestation for local or remote verifiers.

Let's understand attestation flow used in SGX:

![epid-based-attesation](thoughts/images/epid-based-attestation.png)[^4]

1. Application requests report data from `/dev/attestation/user_report_data` which internally calls `EREPORT` hardware-instruction call to write enclave report.
2. Calls `/dev/attestation/quote`, reads `/dev/attestation/user_report_data`, sends to Quoting Enclave.[^]
3. Quoting enclave reads the EPID key provided by Provisioning Enclave at the time of deployment.
4. Provisioning Enclave fetches EPID key from Intel Provisioning Service, which is a remote trusted server by Intel.
5. Quoting enclave generates quote along with report from the `/dev/attestation/report`, and sends to enclave.
6. Enclave sends the quote to the remote verifier on request.
7. Verifier sends the quote to Intel Attestation service that checks whether the quote was generated by the enclave or not and sends the result back to verifier.
8. Verifier then verifies the quote metadata and SGX enclave measurements against local measurements like the policies MRENCLAVE and MRSIGNER are the ones that the user knows, are the architectural enclaves up to date, the quoting enclave's identity is correct. 

Data Center Attestation Primitives are attestation services that doesn't utilise Intel's attestation service instead have their own ECDSA attestation certificates in a remote data center. Also the Quoting Enclave doesn't talk with Provisioning Enclave but with Provisioning Certificate Enclave which in turn calls Intel Provisioning Certificate service to get the attestation collateral.[^]

![dcap-based-attestation](thoughts/images/dcap-based-attestation.png)

These certificates are cached at remote verifier and the remote user doesn't need to check with Provisioning service each time a quote arrives, and then periodically fetched to update.

### Example

Password Manager

Secrets:

1. Vault file
2. account passwords
3. account info
4. primary key
5. encryption key

1. Encrypted vault file using an encryption key derived 
2. User's master key is derived from passphrase which is generated using KDF that uses SHA256.
3. Primary key used to encrypt passwords is generated randomly using RDSEED instruction

1. 

### Tradeoffs

1. Enclave Transitions: ECalls and OCalls b/w the different parts of the program inflict severe overhead on the performance due to security checks done at the boundary. Not all system calls are allowed inside enclave, thus OCalls are executed.
2. EPC limit: Each enclave has a fixed size, and is divided in pages. Any enclave that exceeds the EPC's size limit has to be swapped out to DRAM and is encrypted in doing so. This induces an overhead of approx 3x.
3. Due to the confidentiality of the data involved, the program has to be designed very carefully. Unoptimised designs lead to poor performance and prone to many attacks.[^5]

## LibOS

The program needs to be modified in order to make it compatible to run inside SGX environment. LibOSes help here as they allow to run unmodified programs inside the SGX environments.

> [!note] Common things to keep in mind:
> 1. It's all about secrets and efficient communication b/w enclaves
> 2. 

## Resources

- [https://01.org/sites/default/files/documentation/intel_sgx_developer_guide_pdf.pdf](https://01.org/sites/default/files/documentation/intel_sgx_developer_guide_pdf.pdf)
- [https://sgx101.gitbook.io/sgx101/sgx-bootstrap/sealing](https://sgx101.gitbook.io/sgx101/sgx-bootstrap/sealing)
- [https://blog.quarkslab.com/overview-of-intel-sgx-part-2-sgx-externals.html](https://blog.quarkslab.com/overview-of-intel-sgx-part-2-sgx-externals.html)
- [Remote Attestation](https://encyclopedia.pub/entry/7912)
- [sgx.fail](https://sgx.fail)
- [SGXoMeter](https://www.ibr.cs.tu-bs.de/users/mahhouk/papers/eurosec2021.pdf)
- [Quote verification with Intel SGX DCAP](https://www.intel.com/content/www/us/en/developer/articles/technical/quote-verification-attestation-with-intel-sgx-dcap.html)
- [establish an SGX enclave](https://medium.com/magicofc/establish-an-intel-sgx-enclave-c6208f820ff9)
- [difference b/w trusted computing and confidential computing](https://stackoverflow.com/questions/63335341/what-is-the-difference-between-trusted-computing-and-confidential-computing)
- [Intel SGX Demystified](https://medium.com/obscuro-labs/intel-sgx-demystified-757a242682a3)

[^1]: How does the Enclave provide integrity of data? What does it mean to provide integrity?
[^2]: What are the attacks that are possible due to poor design?
[^3]: pseudofs is a virtual file system where files are generated virtually on the fly when it's used by system calls like open, read, write, close, etc.
[^4]: How can ZK Proofs help here? Or does it not even require zk proofs?
[^5]: Source: [Gramine docs](https://gramine.readthedocs.io/en/stable/attestation.html)
[^6]: Don't understand what these provisioning certificates are.