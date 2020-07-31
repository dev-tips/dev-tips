Title: Orphan branches in Git

-----

Date: 1596195248

-----

Description: Usually, there is only one commit in a repository with no predecessor: the first one. Every now and then, you may need an empty branch in your repository, i.e. a new branch with no previous commits and no history that is not forked from any other branch.

-----

Authors: rasshofer

-----

Text:

You can create a new empty orphan branch in an existing repository without any commits or ancestors by running the following command (where `some-new-branch-name` is the name of the new isolated branch).

```sh
git checkout --orphan some-new-branch-name
```

Next, you’ll have to clean up the remaining files using the following command.

```sh
git rm -rf .
```

You may be confused why there is the need for cleaning up files if it’s »orphaned« as it should not have any committed files at all.

There are no committed files, but the files from the previous branch (from where the new orphan branch was checked out) are still there and staged. You can reset/undo this (i.e. deleting the existing files) by running the aforementioned command.

(image: example.png)

A characteristic example for the use of orphan branches is the `gh-pages` branch on GitHub where static project websites like documentation is stored/hosted and which usually has nothing in common with the actual source code of the project. Thus it doesn’t make sense to share the Git history and keep the page source in an orphan branch instead.

Another use case could be developing a new major version of a project (e.g. combined with a full rewrite and/or change of technology) where it’d not make too much sense to build on top of the existing Git history but instead start work in an orphan branch and later switch that orphan branch with the `master`/`main` branch (i.e. by renaming the respective branches). This way, both histories can be kept for future reference or parallel work.
