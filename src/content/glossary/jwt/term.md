Title: JWT

-----

Alias: JSON Web Token

-----

Description: A way for exchanging messages/claims in secured environments between applications in a standardized manner and based on JSON. It ensures the authenticity and integrity of messages and optionally encrypts sensitive data.

-----

Authors: rasshofer

-----

Text:

A JWT can be decoded and read by anyone. The token consists of three parts: header, payload, and signature. Since the payload contains all the necessary information, no further queries are required for authentication. This is especially useful for scaling stateless backend architectures. The payload is not encrypted, but valid signatures can only be created if a defined secret is known. Each time a token is received, an integrity check must verify the validity of the signature. This ensures that the token has not been modified or manipulated. After that, its payload can be classified as trustworthy.

The validity period of the token can be limited by including time-related claims such as `iat` (i.e. issue date/time), `nbf` (i.e. »not before« date/time), and `exp` (i.e. expiration date/time). While an expired JWT is still valid, it’s not possible to manipulate its data without destroying its signature, causing the server-side integrity check to reject the token.

In general, implementations are available for a large numbers of platforms and programming languages. [JWT.io](https://jwt.io/) is an online tool for debugging JWTs while doing any validation and debugging purely on client-side.

(image: jwt-io.png bordered: true)

While JWTs are primarily used in single sign-on (SSO) scenarios to authenticate users, they are generally suitable for all areas where data needs to be signed/verified. As tokens are stateless and not stored/managed in a database, revoking token is basically impossible. A common solution is blacklisting and short token validity periods.
