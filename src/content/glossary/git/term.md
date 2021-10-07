Title: Git

-----

Description: Git is a free software for distributed version control. It works with all common operating systems and is characterized by high efficiency. It allows versions of files to be managed in different locations without a central server.

-----

Authors: rasshofer

-----

Text:

Today, Git is the state-of-the-art solution for version management in software development (but also other industries) and is therefore increasingly used.

Classic version management is primarily known from software development, where it can be used to save different development statuses of projects and restore them in case of an emergency. However, versioning is not only used to create backup copies of individual advances, but also to enable decentralized and parallel development in teams on joint projects. In this case, version management acts as a central repository for the source code, from which the individual developers can obtain the current status of the project and into which the changes made can later be restored.

Where parallel and decentralized work is carried out, conflicts and overlaps between source code files and parts of the source code in the same file are bound to occur. For this purpose, version management systems merge the individual parts. If several developers are working on one and the same file, version management systems are usually capable of recognizing the respective changes and merging them in the repository – and if the automatic merging does not work (e.g. because identical lines of code have been edited), the conflict that has occurred can be resolved manually.

Git is by far not the only system for version control: other well-known and popular systems are »CVS« and its successor »SVN«. Two major features of Git are its efficiency and speed even for large projects with long project histories. In addition, Git does not require a central project server to work. Often, however, there is a central server (called »remote«) to which all developers push after completing their work. In doing so, each developer uploads the complete project (including its complete history) from the remote repository to their local environment (»working copy«). This decentralized approach ensures that the development process is fail-safe, since each developer always has the entire project at their disposal even if the central repository fails, and no distinction is made between local and remote development branches. This lack of a central instance constraint also allows developers to work exclusively for themselves locally on their own machine.
