Title: DTO

-----

Alias: Data Transfer Object

-----

Description: General objects for transporting data between layers in multi-tier applications.

-----

Authors: rasshofer

-----

Text:

The focus here is on transports via networks. This means that DTO objects must be serializable and combine data to be transferred in a new object to reduce the number of remote method calls and reduce the load on the network.

Primarily, DTOs are used to provide suitably prepared data for user interfaces. This data is often highly denormalized, contains information from multiple domain objects, and is based on the requirements of individual use-cases or consumers.
