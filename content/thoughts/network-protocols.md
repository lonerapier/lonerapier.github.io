---
title: "Network Protocols"
date: 2024-09-06:12:00:00
tags:
- technical
- network
---

# TCP
Necessary reading:
- [TCP][tcp-rfc] protocol.



# Websockets
Necessary reading:
- Websockets [RFC6455](https://datatracker.ietf.org/doc/html/rfc6455)
- [wsapi](https://websockets.spec.whatwg.org//)

Notes:
- Bidirectional network over an insecure channel
	- uses port `80` for regular `ws` and `443` for ws using TLS, i.e. `wss`
- Client Handshake -> Server handshake
- After handshake succeeds, both can exchange data in units called "messages".
- "Messages" can be broken into one or more "frames" over the network.
- Each frame has an associated type:
	- UTF-8 text
	- Binary
	- Control frames: carries protocol level signaling
- Layer over TCP that does:
	- adds web origin model for browsers
		- i.e. only a web socket client with correct handshake headers can connect to a websocket server
	- coexist with an HTTP server, i.e. ports
	- adds framing based mechanism for packets over TCP
	- minimal closing handshake
- Handshake:
	- Before sending the client handshake, client establishes a secure TCP connection with the server with certain requirements. Optionally TLS, if the websocket uses TLS.
	- after the connection, client sends handshake containing the URI, and upgrade headers.
	- server parses the handshake, checks requirements, adds a websocket security reply header, and sends server handshake to client.
- Frames:
	- Why? for arbitrary length messages
	- no need for intermediaries to setup a buffer for all messages
	- need to received in same order as sent by sender
	- client, if using TLS, need to sent all data masked using masking key
```
							0                   1                   2                   3
							0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
						 +-+-+-+-+-------+-+-------------+-------------------------------+
						 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
						 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
						 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
						 | |1|2|3|       |K|             |                               |
						 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
						 |     Extended payload length continued, if payload len == 127  |
						 + - - - - - - - - - - - - - - - +-------------------------------+
						 |                               |Masking-key, if MASK set to 1  |
						 +-------------------------------+-------------------------------+
						 | Masking-key (continued)       |          Payload Data         |
						 +-------------------------------- - - - - - - - - - - - - - - - +
						 :                     Payload Data continued ...                :
						 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
						 |                     Payload Data continued ...                |
						 +---------------------------------------------------------------+
```
- Security aspects:
	- Non-browser client: server checks `Origin` header to prevent communication with untrusted client.
	- client authentication using cookies, TLS.
	- use of SHA-1: only for compression.

Questions:
- Is it two TCP connections underlying the abstraction?
	- How does SYN-ACK happens, isn't this 2 times more networking overhead?
- "At the time of writing of this
   specification, it should be noted that connections on ports 80 and
   443 have significantly different success rates, with connections on
   port 443 being significantly more likely to succeed, though this may
   change with time.", Section 1.8
- "some TLS cipher mechanisms don't provide connection confidentiality.", Section 10.6
# UDP
Necessary reading:
- [RFC768](https://www.rfc-editor.org/rfc/rfc768)

# QUIC
Necessary reading:
- [RFC9000](https://www.rfc-editor.org/rfc/rfc9000.html)
- [QUIC \| Cloudflare](https://cloudflare-quic.com/)

# HTTP
- HTTP/1
- HTTP/1.1: `keep-alive` connections
- HTTP/2: streams
- HTTP/3: QUIC
	- [HTTP/3: the past, the present, and the future](https://blog.cloudflare.com/http3-the-past-present-and-future/)

[tcp-rfc]: <https://www.ietf.org/rfc/rfc9293.html>
