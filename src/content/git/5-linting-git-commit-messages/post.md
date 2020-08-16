Title: Linting Git commit messages

-----

Date: 1597566248

-----

Description: Complying with semantic commit messages and preventing commits like simply »Various adjustments« needs discipline. By using Git hooks via »Husky« and »commitlint«, you can automatically validate and lint commit messages before they’re saved and persisted.

-----

Authors: rasshofer

-----

Text:

In general, Git hooks allow to intervene before and after certain steps in the Git process and execute additional scripts, adjust files, or even abort commits. We can make use of this to enforce (reference: git/semantic-branch-names-and-commit-messages-in-git text: semantic commit messages).

The only problem with Git hooks is that they are living in the individual local `.git` directory and thus aren’t stored as part of the repository/project. Subsequently, each developer would have to make sure to set up the hooks properly on their side. (npm: husky) is doing exactly that and (npm: commitlint) makes sure that the commit messages correspond to the agreed convention.

The first thing to do is to install these two tools in the project.

```sh
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
```

(In the following example, the de facto standard [Conventional Commits](https://www.conventionalcommits.org/) is used as rule set. There are several configurations available, though, and it’s also possible to write a [custom configuration](https://github.com/conventional-changelog/commitlint/blob/5fd27fdcd2d88435257f888d832fc19c5bbc037f/docs/reference-configuration.md) tailored to personal needs.)

Next, you need to create a configuration file for Husky called `.huskyrc.json` in the root directory of the project so you’re able to register and handle custom Git hooks. The configuration looks as follows.

```json
{
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Now, the Git hook `commit-msg` will trigger Husky which will then execute the command `commitlint -E HUSKY_GIT_PARAMS`. The `-E HUSKY_GIT_PARAMS` part tells commitlint to check the message in the file at the path given by the environment variable `HUSKY_GIT_PARAMS` which is passed by Husky automatically, so this is the bridge between Husky intercepting the commit via Git hook and commitlint to verify the message.

In order for commitlint to work, it also needs a configuration file called `commitlint.config.js` in the root directory of the project with the following content.

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

This defines the most elementary configuration and tells commitlint to use the (npm: @commitlint/config-conventional) module. If needed, you could also enable or disable individual rules of such a preset in this configuration file.

The following example demonstrates a real-world example where we adjust the maximum length of the header, disallow empty scopes, and define a list of valid scopes – in this case, the list of valid scopes is automatically generated from the mono repository directory structure.

```js
const { basename, extname, dirname } = require('path');
const { sync } = require('globby');
const kebabCase = require('lodash.kebabcase');

const scopes = sync('packages/*/package.json', {
  cwd: __dirname,
}).map((file) => kebabCase(basename(dirname(file))));

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 140],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', scopes],
  },
};
```

If the project is now checked out and `npm install` is executed, Husky will install itself into the local `.git/hooks` directory and subsequently run the commands defined in its configuration file. Now, when trying to submit a commit with invalid commit mesage, the commit is aborted and the respective linting error is returned.

(image: commitlint-husky-commit-message-error.png)

Neat.
