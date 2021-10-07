Title: Container

-----

Description: An application, all parts of the stack on which the applications runs, and all required dependencies packed in a executable manner in an isolated environment.

-----

Authors: rasshofer

-----

Text:

The base for containers are kernel namespaces (i.e. namespaces for processes), cgroups (i.e. resource constraints on process level) and container templates (i.e. convention of a directory structure). (term: Docker) and (term: Podman) are well-known implementations, runtimes, and ecosystems for containers, making containers more usable, accessible, and useful.

The goal of containers in real-life is the ability to run multiple processes and applications simultaneously on the same host. This enables better use of infrastructure and preservation of security as a consequence of working with separate systems.
