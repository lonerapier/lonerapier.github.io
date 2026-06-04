---
title: "Signed Data"
tags:
- exploring
---

Starting with HTTP message signatures, a la. [RFC 9421](https://www.rfc-editor.org/rfc/rfc9421.html)
- Why the need for HTTP message signatures?
	- because TLS guarantees integrity and authentication for single hop messages, but normal interaction on internet between any end client and server includes multiple middle machines.
	- object based web signatures like JSON web signatures are more complicated and expensive to compute.
- What does HTTP signed messages allow?
	- attaches a selective disclosure signature on raw HTTP data.

> [!Question] "Strict canonicalization rules ensure that the verifier can verify the signature even if the message has been transformed in many of the ways permitted by HTTP.". Explain this better.
> Canonicalization rules determine how component data will be structured to form the signature base, and this prevents any tampering of signatures during HTTP reordering, addition, or removal of headers allowed by HTTP.

HTTP data that goes through multiple intermediaries might not have the same raw bytes required to verify the MAC associated with the ciphertext. So, directly signing the complete data won't allow the same flexibility for applications. Rather, message signatures can be created on selective data based on user requirements. To create signatures on selective data, one needs to define the boundaries of what's secure and not.

- How to define signature base?
- Algorithms that can be used to generate signatures
- How to attach signature data and on what fields signature was created to the HTTP message.

Things that has to be provided by applications to use or create HTTP signatures:
- set of fields to create signature on
- structure of fields
- means of retrieving the data required to verify the signature
- allowed signature algorithms
- means to verify that algorithm used to verify signature is actually valid and can be applied
- means to reject messages signed using other algorithms
- set of error codes that the verifier returns to the signer in case of failure

HTTP message components: Signer and Verifier should be able to determine what components together forms the signature base.
- Serialization of component field and value prevent any misinterpretation of fields and done in following manner:
```
Host: www.example.com
Date: Tue, 20 Apr 2021 02:07:56 GMT
X-OWS-Header:   Leading and trailing whitespace.
X-Obs-Fold-Header: Obsolete
    line folding.
Cache-Control: max-age=60
Cache-Control:    must-revalidate
Example-Dict:  a=1,    b=2;x=1;y=2,   c=(a   b   c)

=======================================================================================================================================

"host": www.example.com
"date": Tue, 20 Apr 2021 02:07:56 GMT
"x-ows-header": Leading and trailing whitespace.
"x-obs-fold-header": Obsolete line folding.
"cache-control": max-age=60, must-revalidate
"example-dict": a=1,    b=2;x=1;y=2,   c=(a   b   c)
```
- Serialization of different HTTP components follow different rules.
	- HTTP Fields: field name is lowercase, different values for same field name combined by "," or " ".
	- includes some boolean flags for serialization of:
		- `sf`: structured fields
		- `key`: select single key-value from a structured field
		- `bs`: Byte sequence
		- `req`: component value of response derived from request that triggered this response
		- `tr`: field value taken from trailers of the message
- Derived Components: any field values not explicitly present in the response are added as derived components. Example: `status`, `target-uri`, `scheme`, `authority`, `method`.
	- Can be taken from request, response, or both.
- signature parameters: algorithm, key size, alg response serialization, tag, expiry, nonce.
- signature base: canonicalised HTTP message components that are the input to signature algorithm.
```
signature-base = *( signature-base-line LF ) signature-params-line
signature-base-line = component-identifier ":" SP
    ( derived-component-value / *field-content )
    ; no obs-fold nor obs-text
component-identifier = component-name parameters
component-name = sf-string
derived-component-value = *( VCHAR / SP )
signature-params-line = DQUOTE "@signature-params" DQUOTE
     ":" SP inner-list
```

Security:
- Can signature be replayed? If the signature base of two different http response are same, can the signature generated be same as well, considering the algorithm is same too?
	- Nonce is the perfect counter to this. Signer uses a different nonce for each new signature will deter any replay attacks. Moreover, signer should include most of the message in the signature so that base is different.
	- Can digest of the message be included with the nonce? This should even work with empty base.
- Signature Collision?
- Multi-signature attack: attacker modifies/adds one of the signature in a multi-signature response. How does the verifier handle it?
- is message content included as message component in base?
	- Message digest is added, but need to be verified separately.

## Comparison with SXG



## References

- [RFC 9421: HTTP Signed Message](https://datatracker.ietf.org/doc/html/rfc9421)
- [SXG: Signed Exchanges](https://developers.cloudflare.com/speed/optimization/other/signed-exchanges/)
- [Andrew Lu, "Sign Everything"](https://www.andrewclu.com/sign-everything)