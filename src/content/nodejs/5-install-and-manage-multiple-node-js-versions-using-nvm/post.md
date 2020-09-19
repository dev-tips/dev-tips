Title: Install and manage multiple Node.js versions using »nvm«

-----

Date: 1600539248

-----

Description: »nvm« (»Node Version Manager«) is a bash script that allows to use and switch between multiple Node.js versions on the same machine in parallel in a comfortable manner.

-----

Authors: rasshofer

-----

Text:

When working on different projects in the fast-paced world of Node.js (where new releases are released every once in a while), switching between different Node.js versions on the same machine may be a difficult and/or annoying task.

nvm is the most popular way to install multiple Node.js versions.

## Installation

In order to make sure you’re installing the latest version, this tip doesn’t include specific instructions on how to install nvm. Instead, please follow the latest [»Installing and Updating« instructions](https://github.com/nvm-sh/nvm/tree/master#installing-and-updating) at (github: nvm-sh/nvm).

The installation consists of a shell script that clones the nvm repository to `~/.nvm` and attempts to add its initialization script to your profile file (i.e. `~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`) so you can use nvm in any terminal session.

After nvm is installed, you may need to restart your terminal session to make sure the newly added initialization of nvm is included and executed.

## Usage / Commands

Assuming you’re working in an old project which requires Node.js version 6, you first have to install that version, (re-)set the default to the currently used version (e.g. 10), and then use version 6 in the project.

```sh
nvm install 6
```

```sh
nvm alias default 10
```

```sh
nvm use 6
```

If you enter `nvm use 6`, Node.js 6 is used for the current session.

### View all available Node.js versions

```sh
nvm ls-remote
```

Once you have decided on a version, you can install it as follows.

### Install a specific version

```sh
nvm install 6
```

```sh
nvm install 12.18.4
```

You can also uninstall versions, e.g. if they are not needed anymore.

```sh
nvm uninstall 6
```

```sh
nvm uninstall 12.18.4
```

Please note that the version that was installed last is also the default version.

If you want to change the standard version afterwards, you can run `nvm alias default {VERSION}`, see below.

To use the Node.js version now, you have to tell nvm as follows.

### Use a specific version

```sh
nvm use 12.18.4
```

Now you can verify if the Node.js version is really used by using `node -v`.

### Create and remove aliases

If you don’t want to remember Node.js versions by their version numbers/ranges, you can also work with aliases and give name mappings to specific versions. In addition, nvm provides some predefined aliases, e.g. for LTS versions.

```sh
nvm alias example 10
```

You can also remove such custom aliases.

```sh
nvm unalias example
```

### View all installed Node.js versions

Currently installed versions on the system (including aliases) can be displayed as follows.

```sh
nvm ls
```

## .nvmrc file

In order to allow easy version switching, you can add a `.nvmrc` file (containing any version definition nvm understands) in the root directory of your projects. Other developers then simply have to run `nvm use` (without specifying a version as it will be extracted from the `.nvmrc` file) to switch to the right Node.js version. By using deep shell integrations as described below, they may not even need to run `nvm use` manually as nvm will take care of this automatically in directories that contain a `.nvmrc` file.

## Deeper Shell Integration

nvm offers deeper integration for common shells (e.g. `bash`, `zsh`, and `fish`) which calls `nvm use` automatically in a directory that contains a `.nvmrc` file. To set this up, please follow the latest [»Deeper Shell Integration« instructions](https://github.com/nvm-sh/nvm/tree/master#deeper-shell-integration) at (github: nvm-sh/nvm).

## Conclusion

If you use more than one version of Node.js, you should definitely install and use nvm.

Even if you want to stay with one version of Node.js for now, it might still be useful to install nvm due to the update effort then being much smaller (as you simply have to run `nvm install {VERSION}`).
