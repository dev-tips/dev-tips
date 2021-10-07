Title: OAuth

-----

Alias: Open Authorization

-----

Description: A protocol that enables secure authorization of web services or mobile applications without having to disclose user credentials (e.g. passwords) to third-party providers.

-----

Authors: rasshofer

-----

Text:

The protocol uses token-based authorization and authentication. The process for obtaining a token is called »flow«. Using OAuth, a user can allow a third-party application to access data stored at another service. No secret details of the access authorization need to be disclosed to the third-party application for this purpose.

## Roles

OAuth recognizes a total of four different roles. These roles are:

* Resource Owner
* Resource Server
* Client
* Authorization Server

The _Resource Owner_ is the user who wants to allow a third party access to their resources. The protected resources of the user are stored on the _Resource Server_. The Resource Server can grant access to the resources to others using tokens. The _Client_ is the third-party provider trying to gain access to the protected resources. The client itself can be e.g. a web application or a mobile app. Finally, the _Authorization Server_ is responsible for authenticating the user and issuing the access tokens. Often, the _Authorization Server_ and the _Resource Server_ are run together on one platform.

## Grant types

OAuth 2.0 specifies four grant types (sometimes also called »flows«) where each grant type has a use case for which it is particularly well suited:

1. **Authorization Code Grant** = »classic« web applications that can establish a connection to the Authorization Server on the server-side without the user being able to read/intercept it
2. **Implicit Grant** = single-page applications where no secure (non-interceptible) connection between application and the Authorization Server is possible
3. **Client Credentials Grant** = machine-to-machine communication where no user is involved (e.g. microservices which identify themselves to each other with an obtained token)
4. **Resource Owner Credentials Grant** = should generally not be used at all as the end user’s username and password are exchanged for tokens
