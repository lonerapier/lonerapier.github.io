---
title: "TLS"
date: 2024-06-24:12:00:00
tags:
- technical
- network
---

Protocol used at internet to transport bits of information securely using [[signatures#PKI]].

TLS cipher suite's components:
- [[diffie-hellman|key establishment]] (typically a Diffie-Hellman variant or RSA)
- authentication (the certificate type)
- [[symmetric-cryptography|confidentiality]] (a symmetric cipher)
- [[hash-functions|integrity]] (a hash function)

## [TLS 1.2][tls12]



## [TLS 1.3][tls13]

- Best [explanation](https://tls13.xargs.org/)
- [A Detailed Look at RFC 8446 (a.k.a. TLS 1.3)](https://blog.cloudflare.com/rfc-8446-aka-tls-1-3/)
- [why use TLS 1.3](https://www.cloudflare.com/en-gb/learning/ssl/why-use-tls-1.3/)


[tls12]: <https://datatracker.ietf.org/doc/html/rfc5246>
[tls13]: <https://datatracker.ietf.org/doc/html/rfc8446>