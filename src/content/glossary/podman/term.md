Title: Podman

-----

Alias: Pod Manager

-----

Description: An open-source software that enables containerization of applications and popular alternative to Docker initiated by RedHat.

-----

Authors: rasshofer

-----

Text:

While Docker has quickly earned its position as the hobbyhorse for managing containers, it recently changed their license and plans, making it pricey for some consumers. Podman is positioning itself as an open-source replacement for Docker and advertising that its commands and flags are compatible/identical with Docker and the replacement is smooth, simplifying the migration from Docker to Podman.

However, the way Docker and Podman are implemented differs significantly. Some of the biggest differences which have brought Docker heavy criticism over the years is the fact that Docker uses a client (`docker`) and a server/daemon (`dockerd`) for running the containers and for a long time was running containers as root user, raising security concerns. Although this is now old news, Podman didn’t need a server/daemon and implemented a rootless way of working from the beginning.
