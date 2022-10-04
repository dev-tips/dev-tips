Title: Sharing/Extending configuration between GitLab CI jobs

-----

Date: 1619256861

-----

Description: Have you ever wanted to execute a GitLab CI job for multiple environments and copied blocks of YAML several times?
YAML anchors, extending, and hidden keys to rescue!

-----

Authors: rasshofer

-----

Text:

Assuming you want to have repeatable parts in your GitLab CI configuration, the YAML language itself has you covered. YAML’s anchors and extending allow you to reuse parts of your GitLab CI job configuration and extend on them.

To prevent GitLab CI from executing such shared blocks as jobs themselves, using hidden keys defined by using a dot (`.`) in front of key names in YAML makes sure that GitLab recognizes those blocks as templates and doesn’t execute them.

## Example

The following example demonstrates how a job configuration is shared for 3 environments (`dev`, `staging`, and `production`) and how 3 dedicated CI jobs are created based on it using anchors, extending, and hidden keys.

Then, variables specific for each environment are defined in addition to that shared part.

```yaml
image: node:12

stages:
  - install
  - build
  - deploy

install:
  stage: install
  script:
    - npm ci
  artifacts:
    untracked: true
    expire_in: 1 hour

.build: &build
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    untracked: true
    expire_in: 1 hour

build-dev:
  <<: *build
  variables:
    REACT_APP_API_ENDPOINT: https://api-dev.example.com

build-staging:
  <<: *build
  variables:
    REACT_APP_API_ENDPOINT: https://api-staging.example.com

build-production:
  <<: *build
  variables:
    REACT_APP_API_ENDPOINT: https://api.example.com
```

`&build` is the YAML anchor, `.build` is the hidden key, and `<<: *build` is the YAML extend.

(image: pipeline.png bordered: true)

## GitLab CI’s built-in extending

GitLab CI also offers an `extends` configuration property that allows to reuse configuration sections as an alternative to the YAML-native anchors/extending.

```yaml
.build:
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    untracked: true
    expire_in: 1 hour

build-production:
  extends: .build
  variables:
    REACT_APP_API_ENDPOINT: https://api.example.com
```

While this seems a little more flexible/readable, it’s proprietary and harder to debug as YAML can simply be parsed or converted to e.g. resulting JSON using tooling outside of GitLab CI.
