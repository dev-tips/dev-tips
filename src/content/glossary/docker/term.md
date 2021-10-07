Title: Docker

-----

Description: An open-source software that enables containerization of applications by storing them and their dependencies in images that can be moved between systems. In a Docker container, the packaged application can be executed using a special engine.

-----

Authors: rasshofer

-----

Text:

Docker offers a simple way to package and deliver applications in Linux containers, promoting containerization as the new virtualization. It combines several techniques to do this. Instead of a full virtual machine, Docker uses Linux containers (»LXC«). They use the same Linux kernel while processes, file systems, and network are separate. However, a container has a completely self-contained Linux installation with all the utilities it needs. An LXC has almost no overhead compared to the simple processes.

The Docker engine creates the interface between the host’s resources and the running containers and allows to run multiple containers simultaneously on the same host. Due to virtualization, it’s possible to use the Docker Engine, which was originally developed for Linux systems, on other operating systems such as macOS or Windows.

Docker uses special images as file systems. These can contain, for example, a simple Debian installation and can also be »stacked«. The container searches for files in all images. If software such as Node.js or a custom application is to be run in a container, only the changes compared to a basic Debian installation need to be saved for this container.

Docker containers are created based on Docker images. Docker Hub is a SaaS offering for sharing and managing application stacks in the form of images.
