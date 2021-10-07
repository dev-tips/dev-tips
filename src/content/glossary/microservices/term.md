Title: Microservices

-----

Description: An architecture approach that splits an application into small and independently deployable services, each of which performs a small task. This allows to work independently of each other and contributing its own part to the overall product.

-----

Authors: rasshofer

-----

Text:

The term »microservice« is not defined. It’s an architectural style for modularizing complex applications and software. A monolithic application puts all its functionality into a single process and scales by replicating the monolith on multiple servers. A microservices architecture divides a software system into a large number of small systems which work together by putting each element of functionality into a separate service and scales by distributing these services and across servers, replicating as needed.

A single microservice encapsulates a self-contained functionality and is developed and operated independently. The development of a single service can be done in the most suitable programming language for the service. Different teams or developers can work independently on manageable and independent parts of the software. At best, a development team works on its service in their individual schedules and is largely decoupled from other teams, i.e. the developed services can be put into production independently of each other. Each service ideally provides a technology-independent API for collaboration with other microservices.

This increases innovation by being able to experiment with new and disruptive technologies more easily and reducing repetitive work due to automation, resulting in improved speed-to-market of new features.

For complex applications, microservices may pay off over time but it takes a while to offset the high investment upfront required to do it.
