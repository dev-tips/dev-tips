Title: Feature branch deployment and preview environment in GitLab CI

-----

Date: 1648589087

-----

Description: GitLab’s built-in environment capabilities facilitate feature branch deployments of both static applications (e.g. SPAs, Storybook, SSG) and dynamic applications.

-----

Authors: rasshofer

-----

Text:

The following example demonstrates a GitLab CI configuration for installing and building a Node.js project (e.g. a React SPA) and deploying it to an AWS S3 bucket for review.

The `deploy` job takes the `build` job’s built artifacts and uploads them to the S3 bucket while the `destroy` job takes care of cleaning up once a merge request gets merged and the deployed feature branch is not necessary anymore.

```yaml
image: node:16-slim

stages:
  - install
  - build
  - deploy
  - destroy

variables:
  npm_config_cache: '$CI_PROJECT_DIR/.npm'

install:
  stage: install
  script:
    - npm ci
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - .npm
  artifacts:
    paths:
      - node_modules
    expire_in: 1 hour

build:
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    paths:
      - build
    expire_in: 1 hour

deploy:
  stage: deploy
  image: python:3-alpine
  dependencies:
    - build
  script:
    - pip install awscli
    - aws s3 sync ./build s3://$S3_BUCKET_NAME/$CI_COMMIT_REF_SLUG --acl public-read --cache-control no-cache
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    on_stop: destroy
    url: https://$S3_BUCKET_NAME.s3.eu-central-1.amazonaws.com/$CI_COMMIT_REF_SLUG/index.html

destroy:
  stage: destroy
  image: python:3-alpine
  environment:
    name: review/$CI_COMMIT_REF_SLUG
    action: stop
  when: manual
  variables:
    GIT_STRATEGY: none
  except:
    - main
  script:
    - pip install awscli
    - aws s3 rm s3://$S3_BUCKET_NAME/$CI_COMMIT_REF_SLUG --recursive
```

(`$CI_COMMIT_REF_SLUG` is a predefined variable of GitLab CI that contains the branch/tag name in lowercase, shortened to 63 bytes, and with everything except `0-9` and `a-z` replaced with a hyphen and without leading/trailing hyphen, making it perfect for URLs.)

GitLab now shows the respective environment link (»View app«) within each merge request.

(image: gitlab-merge-request-environment-link.png bordered: true)

Of course, this is adaptable to any programming language, tooling stack, and hosting environment.
