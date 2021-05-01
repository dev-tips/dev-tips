Title: GitLab CI YAML configuration linting

-----

Date: 1619888464

-----

Description: If you want to test the validity of a GitLab CI YAML configuration before committing it to the repository, GitLab provides a built-in linting tool that allows checking for syntax/logical errors.

-----

Authors: rasshofer

-----

Text:

You may have seen »_Found errors in your .gitlab-ci.yml_« error messages after adding changes to your GitLab CI configuration due to YAML syntax errors, typos, or wrong properties and ask yourself whether there’s a way to validate your CI configuration changes.

(image: gitlab-ci-yaml-error.png bordered: true)

To ease troubleshooting and prevent errors such as typos or invalid configuration properties in the first place, GitLab CI’s linting tool can be of great help. To access that »CI Lint« tool, navigate to »CI/CD« → »Pipelines« in your repository and choose »CI Lint«.

(image: gitlab-ci-lint.png)

Now, you can write/paste your CI configuration in there and validate it. GitLab also allows to emulate pipelines based on that configuration.

(image: gitlab-ci-lint-result.png bordered: true)
