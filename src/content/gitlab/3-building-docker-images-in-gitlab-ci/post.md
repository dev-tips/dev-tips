Title: Building Docker images in GitLab CI

-----

Date: 1618782234

-----

Description: While GitLab CI runners (usually) are running as Docker containers themselves, it’s possible and straightforward to build Docker images in GitLab CI pipelines and push them to either GitLab’s internal container registry or external registries like AWS ECR or GCR.

-----

Authors: rasshofer

-----

Text:

In order to be able to interact with Docker, you need to set the `DOCKER_HOST` variable in the respective job configuration and include DinD (»Docker-in-Docker«) as `service`.

## Example

The following example shows a basic job configuration for building a Docker image and pushing it to GitLab’s internal container registry.

```yaml
docker:
  image: docker
  services:
    - docker:18.09-dind
  variables:
    DOCKER_HOST: tcp://docker:2375
  before_script:
    - docker --version
  script:
    - docker build -t ${CI_REGISTRY_IMAGE} .
    - docker login -u "${CI_REGISTRY_USER}" -p "${CI_REGISTRY_PASSWORD}" "${CI_REGISTRY}"
    - docker push ${CI_REGISTRY_IMAGE}
```

GitLab exposes all necessary credentials (such as `CI_REGISTRY_USER` or `CI_REGISTRY_PASSWORD`) as environment variables out of the box. Neat.

If you want to push the Docker image to an external registry such as Amazon’s Elastic Container Registry (AWS ECR) or Google Cloud’s Container Registry, you’ll have to authenticate with the custom registry on your own.

## Pushing to Amazon Elastic Container Registry (AWS ECR)

The following example shows the job configuration for AWS ECR, making use of the [AWS CLI](https://aws.amazon.com/cli/) for authenticating with the registry. For this, you’ll have to provide custom environment variables as CI/CD variables/secrets.

```yaml
docker:
  image:
    name: amazon/aws-cli
    entrypoint: ['']
  services:
    - docker:18.09-dind
  variables:
    DOCKER_HOST: tcp://docker:2375
  before_script:
    - amazon-linux-extras install docker=18.09.9
    - aws --version
    - docker --version
  script:
    - docker build -t ${AWS_ECR_REPOSITORY} .
    - aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ECR_REPOSITORY}
    - docker push ${AWS_ECR_REPOSITORY}
```

## Pushing to Google Cloud Container Registry (GCR)

For GCR, it’s quite similar. The following example shows a `before_script` job configuration, making use of the [gcloud CLI/SDK](https://cloud.google.com/sdk/gcloud) for authenticating with the registry and configuring Docker to use that registry automatically. (Again, you’ll have to provide custom environment variables as CI/CD variables/secrets.)

```yaml
before_script:
  - gcloud auth activate-service-account "${GCLOUD_SERVICE_ACCOUNT}" --key-file=gcloud.json  --project "${GCLOUD_PROJECT}" --quiet
  - export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/gcloud.json
  - gcloud --quiet container clusters get-credentials ${CLUSTER_NAME} --zone ${GCLOUD_ZONE}
  - gcloud --quiet auth configure-docker
```

## Configuring Docker-in-Docker (DinD)

The value of `DOCKER_HOST` as well as the available/reasonable DinD version depends on your GitLab instance. For example, you may not need `DOCKER_HOST` at all for GitLab.com’s hosted version of GitLab. For your self-hosted runners/executors, it may be something like `tcp://docker:2375` or `tcp://localhost:2375`. If `DOCKER_HOST` is not configured but needed or misconfigured, you may see `Cannot connect to the Docker daemon at […]. Is the docker daemon running?` errors. In addition, Docker-in-Docker requires Docker’s privileged mode to work, which may be a significant security concern.
