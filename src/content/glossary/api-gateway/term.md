Title: API Gateway

-----

Description: A central access point for incoming and outgoing traffic that handles/routes all requests to backend services and takes care of logging, usage billing, traffic control, authentication, security, monitoring, and analytics while doing so.

-----

Authors: rasshofer

-----

Text:

API gateways decouple API clients and services. They act as some kind of reverse proxy and take requests from clients and routing them to different backend services based on patterns such as URLs or request parameters.

However, API gateways can also be more sophisticated and pull together the necessary resources for a request in order to issue them in the form of a single and unified response to the requesting client.

Due to being the central access point for all incoming and outgoing traffic, secondary topics such as logging, usage billing, traffic control, authentication, security, monitoring, and analytics are implemented once and centrally within the gateway instead of individually per API or service for providing an unified experience.
