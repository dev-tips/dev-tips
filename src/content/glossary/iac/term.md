Title: IaC

-----

Alias: Infrastructure as Code

-----

Description: An approach/strategy to provisioning and configuration of the entire infrastructure (servers, storage, and network resources) in source code in both data center and cloud environments so that manual activities are hardly necessary anymore.

-----

Authors: rasshofer

-----

Text:

The goal of IaC is to simplify IT operations by reducing the time and effort required to provision, configure, update, and maintain services. Deploying infrastructures sometimes requires an entire department dedicated to it. In traditional data center infrastructure management, many manual processes and actions by system administrators are needed to deploy new or changed environments. In the long run, a lot of time is wasted building the same environment over and over again. Infrastructure as Code aims to address this problem.

With IaC, infrastructure configuration information is stored in standardized files that can be read by software that maintains the health of the infrastructure. This means that the infrastructure no longer has to be built in complex manual processes. Emerging issues should be quickly identified and resolved and all systems should be kept consistent and up-to-date. Teams benefit from improved productivity and reliability, ease of management, reduced risk, and high scalability while reducing the burden on their IT by eliminating manual configuration steps and promoting (term: DevOps) approaches.

Usually, the IaC definitions are maintained in version management systems just like the source code of the operated applications. This opens up the possibility of rollbacks and branching. Sometimes the IaC definitions are even part of the project repositories, facilitating different/matching infrastructure versions for respective software versions.

Examples: AWS CDK, AWS CloudFormation, Terraform, Chef, Puppet, Ansible
