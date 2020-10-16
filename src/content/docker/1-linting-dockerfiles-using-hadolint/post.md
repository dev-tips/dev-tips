Title: Linting Dockerfiles using hadolint

-----

Date: 1602842206

-----

Description: To detect Dockerfile faults, »hadolint« is an useful and opinionated linter checking Dockerfiles for best practices and validating inline Bash code inside »RUN« instructions.

-----

Authors: rasshofer

-----

Text:

(github: hadolint/hadolint) applies static code analysis by parsing the Dockerfile into an AST and performs/checks opinionated rules on top of that. By using (github: koalaman/shellcheck), it’s also capable of linting Bash code inside `RUN` instructions in the Dockerfile.

The easiest way to run hadolint on most platforms is [its online version](https://hadolint.github.io/hadolint/) or running it as Docker container by piping a Dockerfile to the `docker run` command as follows.

```sh
docker run --rm -i hadolint/hadolint < Dockerfile
```

## Demo

To see what hadolint is capable of, let’s take the following very basic, straightforward `Dockerfile` as an example for giving hadolint a try.

```dockerfile
FROM node

ADD . /app

RUN cd /app && npm i

RUN SOMETHING=node_modules && rm -rf "$SOMETHING/*"

CMD npm start
```

hadolint detects four potential improvements.

(image: hadolint-results.png bordered: true)

```txt
Dockerfile:1 DL3006 warning: Always tag the version of an image explicitly
Dockerfile:3 DL3020 error: Use COPY instead of ADD for files and folders
Dockerfile:5 DL3003 warning: Use WORKDIR to switch to a directory
Dockerfile:7 DL3059 info: Multiple consecutive `RUN` instructions. Consider consolidation.
Dockerfile:7 SC2115 warning: Use "${var:?}" to ensure this never expands to /* .
Dockerfile:9 DL3025 warning: Use arguments JSON notation for CMD and ENTRYPOINT arguments
```

Errors are clustered with the namespace key `DL` (= hadolint error) or `SC` (= ShellCheck error). All validated rules and practices are documented in detail in [hadolint’s README](https://github.com/hadolint/hadolint/blob/b40ea643f79cb4075dbaa72aae77969bed09f01a/README.md#rules) as well as [hadolint’s Wiki](https://github.com/hadolint/hadolint/wiki) on GitHub.

Let’s adapt the suggestions and improve the `Dockerfile` accordingly.

```dockerfile
FROM node:12

COPY . /app

WORKDIR /app

RUN npm i && \
    SOMETHING=node_modules && \
    rm -rf "${SOMETHING:?}/*"

CMD ["npm", "start"]
```

## Configuration

In case you don’t agree with one or more of these opinionated rules, you can specify the ignored rules and trusted registries using a YAML configuration file called `.hadolint.yaml`.

```yaml
ignored:
  - DL3006
  - DL3025
trustedRegistries:
  - docker.io
```

## Conclusion

If you’re having a `Dockerfile` in your repository, it’s highly recommended to include hadolint as a pre-commit hook or even better in your [CI/CD pipeline](https://github.com/hadolint/hadolint/blob/b40ea643f79cb4075dbaa72aae77969bed09f01a/docs/INTEGRATION.md#continuous-integration), e.g. as follows for GitLab CI.

```yaml
hadolint:
  stage: lint
  image: hadolint/hadolint:latest-debian
  script:
    - hadolint path/to/your/Dockerfile
```

In addition, there are also lots of [editor integrations](https://github.com/hadolint/hadolint/blob/b40ea643f79cb4075dbaa72aae77969bed09f01a/docs/INTEGRATION.md#editors) available which support in writing better Dockerfiles during development.
