Title: REST

-----

Alias: RESTful API

-----

Description: Neither a protocol nor a standard but an approach to communication between client and server in networks based on HTTP methods, URIs, and formats such as JSON or XML.

-----

Authors: rasshofer

-----

Text:

REST doesn’t specify in detail how compliant services are implemented. An important point in the architecture is the statelessness of servers. This means that when a request is made, the client must explicitly send along all relevant data for processing this request. Ideally, the complete session context should reside with the client. This has several advantages, including scalability, since the server doesn’t have to manage data that goes beyond a request.

In practice, the REST paradigm is preferably implemented via HTTP. Services are addressed via URLs/URIs. The HTTP methods (e.g. `GET`, `POST`, `PUT`, and `DELETE`) specify which operation a service should perform.

- `GET` requests data from the server
- `POST` transmits data to the server
- `PUT` changes existing data on the server
- `DELETE` deletes existing data on the server
