Title: GitOps

-----

Description: A concept that aims to further automate IT operations. An important core aspect is that the fully declarative management and versioned target state of an application is defined in Git, from development to deployment to maintenance.

-----

Authors: rasshofer

-----

Text:

GitOps considers Git repositories as the source of truth for defining the desired application state. Special software continuously compares this desired target state with the actual state on the infrastructure and ensures that the target state is established by automating updates to configuration when there are changes to deploy. The term »GitOps« suggests a certain relationship to (term: DevOps). However, the term DevOps refers to a rather abstract mentality of cooperation between formerly separate professional groups such as development and IT operations. GitOps, on the other hand, is much more specific and focuses on operations. Operations using GitOps nevertheless fits well with a DevOps mentality.

GitOps usually is implemented according to the Operator Pattern. An operator is a cloud-native application that supports the operation of other applications. A GitOps operator continuously checks the target state described in Git against the actual state of the cluster. When changes occur, the GitOps operator adjusts the cluster accordingly.
