Title: Difference between caches and artifacts in GitLab CI

-----

Date: 1618059924

-----

Description: Working with different pipelines or multiple jobs in a single pipeline, GitLab CI’s caches and artifacts may have crossed your way. But what is the actual difference and when to use what?

-----

Authors: rasshofer

-----

Text:

The main difference between those two is quite simple.

- Caches allow subsequent pipelines and jobs in the same pipeline to use it and are supposed to speed up the same job across pipelines.
- Artifacts can’t be used in a different pipeline. Use artifacts to pass intermediate build results between stages of the same pipeline.

Caches need to be considered transient and potentially unavailable. For installing e.g. vendor packages using a package manager like npm, using caches is a totally valid choice: if there’s a cache available, it’s used, but if it’s not available (anymore), the package manager doesn’t break or stop – it simply has to download everything again. If there’s more than one matching GitLab runner, different pipelines may be executed by different GitLab CI runners. Caches are not shared across runners and caches not being available is hence rather common.

On the other hand, »artifacts« has two different use-cases: an artifact that needs to be passed between jobs (e.g. a built website between `build` and `deploy`) or something a human wants to download (e.g. a report or generated binary) in GitLab’s user interface.

(image: artifact-download.png bordered: true)

It’s basically the same thing, just different consumers. And for both cases, it would be a showstopper if the artifact was gone. Either the `deploy` job fails because there’s nothing to be deployed or the human user is not able to download what they need.

In general, caches aren’t supposed to pass files to subsequent stages of the same pipeline, only to subsequent pipelines of the same stage. Artifacts will be passed to subsequent stages of the same pipeline, and not to subsequent pipelines of the same stage.

## Example

Let’s take the following typical example where both caches and artifacts are used for the aforementioned responsibilities.

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
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules

build:
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    paths:
      - output.txt
    expire_in: 1 hour
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules

deploy:
  stage: deploy
  dependencies:
    - build
  script:
    - echo "Run deployment"
```

Next, let’s see how we can improve this example.

## Optimization #1: using the right pull policy to prevent unnecessary cache updates

Caches are shared. Every job will pull the cache and push the (potentially) updated version after executing the job. This means that every job fetches and uploads the cache (and thus potentially wastes time).

To fix this, you should describe the cache management explicitly and enable the `pull` policy (i.e. download cache without updating it) for jobs that only read from the cache.

```yaml
build:
  stage: build
  dependencies:
    - install
  script:
    - npm run build
  artifacts:
    paths:
      - output.txt
    expire_in: 1 hour
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - node_modules
    policy: pull
```

## Optimization #2: cache the package manager’s cache

Continuing with Node.js and npm as an example, instead of caching `node_modules` (the directory where all vendor dependencies are stored), you should consider caching Node.js’ cache directory instead. The simple difference is caching the downloaded `.tar.gz` files instead of thousands of small files in `node_modules` due to caching a large amount of small files not being the most performant approach.

By setting the environment variable `npm_config_cache`, you can define Node.js’ caching directory and point it to a local directory that is then cached by GitLab. In addition, that same path is referenced as cache path instead of `node_modules`.

```yaml
variables:
  npm_config_cache: '$CI_PROJECT_DIR/.npm'

install:
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - .npm
    policy: pull
```

In general, `npm ci` is preferred in CI environment as it respects the `package-lock.json` file and ensures consistent vendor dependencies. However, this command always purges all local packages by design, thus removes the `node_modules` directory upfront.

This emphasizes that caching `node_modules` may not make any sense as it would be purged by the clean install anyway.

## So, what to use?

It depends on what your intentions are.

If you want to speed up the subsequent pipelines of the same stage (e.g. `install`), use caches. As mentioned above, caches are for subsequent pipelines of the same stage, not subsequent stages of the same pipeline.

If you want to re-use stuff in subsequent stages of the same pipeline, use artifacts. Artifacts are the way to go to share files between stages of the same pipeline.

Actually, you may want to combine both caches and artifacts for the best experience: cache your package manager’s cache for speeding up the subsequent install jobs and then pass the installed vendor dependencies to subsequent stages/jobs that rely on them.

The following example visualizes this.

```yaml
image: node:12

stages:
  - install
  - build
  - deploy

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

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
      - output.txt
    expire_in: 1 hour

deploy:
  stage: deploy
  dependencies:
    - install
    - build
  script:
    - echo "Run deployment"
```

As `npm ci` will do a clean install and remove `node_modules`, we’re caching npm’s cache in the `install` job which will make sure subsequent pipelines which run `npm ci` will use the `.tar.gz` package archives from there instead of loading them over and over again from the registry. In addition, `node_modules` is stored as an artifact so it can be used by `build` and `deploy` later which depend on `install` and thus will get passed the artifact. `build` then adds an additional artifact for the generated output file so it can be used by `deploy` later which depends on both `install` and `build` and thus will get passed the artifacts of both preceding jobs. `deploy` now has both `node_modules` from `install` and `output.txt` from `build` and can take care of the deployment. After the first pipeline, the `install` job will be using the cache and should be faster than the very first pipeline with a cold cache.
