Title: GraphQL

-----

Description: A query language for APIs and server-side runtime to execute queries using a type system.

-----

Authors: rasshofer

-----

Text:

Compared to e.g. (term: REST text: RESTful APIs), GraphQL allows to define what data a consuming system needs, trimming down the response to the required minimum, reducing large response sizes, and in the end saving bandwidth.

In addition, instead of making individual requests to different endpoints, GraphQL takes care of data aggregation on server-side and allows consuming applications to send a request complex data to a single origin and in a single request. The request contains a schema and tells the API exactly what data to return. Thus the API never returns more than requested. This makes GraphQL a choice for e.g. mobile applications.

GraphQL is not tied to a specific database or storage engine and uses JSON-like queries and returns responses in JSON. A GraphQL schema determines which data is available and how it is related. This defines data types and possible query methods.
