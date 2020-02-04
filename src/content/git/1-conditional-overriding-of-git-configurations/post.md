Title: Conditional overriding of Git configurations for single and multiple repositories

-----

Date: 1580857143

-----

Description: How to change configuration properties like your Git user when working in different contexts for no more accidental commits with the wrong name or email address.

-----

Authors: rasshofer

-----

Text:

Have you ever created or cloned a Git repository for work on your personal machine or vice-versa, and accidentally made a commit with the global Git email? It happens to the best of us.

In general, Git stores its configuration properties within the global configuration file `~/.gitconfig` in your home directory. Sometimes you may want to change your configuration for specific projects/repositories, e.g. if you’re working within different contexts like private projects vs. work projects vs. university projects.

## Single repository

All you need to do is adding your intended configuration to `.git/config` within the respective repository. For example, to change your name or email address for commits, simply add the following contents within that configuration file.

```ini
[user]
  name = John Doe
  email = j.doe@work.com
```

(You can also simply run `git config user.name "John Doe"` and `git config "user.email j.doe@work.com"` within the repository.)

Because `.git/config` is not part of the versioning (but actually its configuration—who would have thought), this change is only in place for your local repository clone.

## Multiple repositories

However, if you’re having multiple affected repositories, this is quite time-consuming and has to be done for each and every repository individually. The good news: there is a more scalable way! Using Git’s [conditional includes](https://git-scm.com/docs/git-config#_conditional_includes), you can override your global configuration for specific path patterns within `~/.gitconfig` in your home directory.

```ini
# ~/.gitconfig

[user]
  name = John Doe
  email = john.doe@gmail.com

[includeIf "gitdir:~/Repositories/work-*/"]
  path = ~/.gitconfig-work

[includeIf "gitdir:~/University/Code/"]
  path = ~/.gitconfig-university
```

This tells Git to load the Git configuration file at `~/.gitconfig-work` for all repositories within `~/Repositories` starting with the prefix `work-` (e.g. `work-cart-api` or `work-assets`) while `~/.gitconfig-university` is loaded for all repositories within the directory `~/University/Code`. For every other repository, the global default configuration will be used.

The respective conditional configuration files could look like as follows.

```ini
# ~/.gitconfig-work

[user]
  email = j.doe@work.com
```

```ini
# ~/.gitconfig-university

[user]
  name = John Michael Doe
  email = john.doe@university.edu
```

(Git also supports the keyword `gitdir/i` instead of `gitdir` which will match the provided pattern case-insensitively.)

You can verify whether your desired configuration is used by running `git config user.name` or `git config user.email` within your respective repository.
