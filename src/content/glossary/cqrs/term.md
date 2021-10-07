Title: CQRS

-----

Alias: Command Query Responsibility Segregation

-----

Description: When multiple applications use a database that can’t meet each application-specific requirement, the CQRS architecture pattern helps by separating write and read accesses so that they are separated from each other and executed on different databases.

-----

Authors: rasshofer

-----

Text:

The system is divided into reading and writing instances. If a client wants to do something that changes data, it issues commands. A write instance decides whether the desired changes can be made and acts accordingly. If the client needs data, it requests it from a read instance through a query. The instance then returns the desired data in the form of a (term: DTO).

A special feature of the pattern is that each of the two sides conceptually has its own data source. In the case of relational databases, a denormalized data model is used on the read side, while the write side operates on normalized data. The translation from one model to the other is provided by a separate component that delivers changes to the read instances.

At this point, possibilities in terms of scalability already become clear: if you actually separate the data sources, the sides scale independently of each other. The overall share of the workload of queries is usually higher than that of commands. The challenges in terms of scaling thus lie more on the read side and less on the write operations.
