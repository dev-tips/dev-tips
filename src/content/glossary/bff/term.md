Title: BFF

-----

Alias: Backend for Frontend

-----

Description: An approach of implementing APIs where each client has its own dedicated API that exactly meets its needs. This way, clients get exactly what they wants with a single API call, latency is low, and bandwidth utilization is optimal.

-----

Authors: rasshofer

-----

Text:

While this approach can be used for greenfield projects as well, it’s usually adapted for extending the functional scope of existing systems. This can be technical enhancements such as the need for accessing existing APIs via new channels like native apps, voice skills, or chat bots. Or if new functionality is required and must interact with existing systems. Here, BFFs represent specialized API layers to avoid generalistic and extensive API layers.

The number of APIs for various channels/clients that need to be created (and, of course, be kept maintained) may be underestimated, though. Changes of business logic usually means all BFFs have to me updated to reflect that change in case the logic isn’t part of a consumed, generic backend/API.
