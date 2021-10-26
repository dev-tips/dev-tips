Title: Anonymize author names for historical commits in Git

-----

Date: 1635280171

-----

Description: When handing off a repository (e.g. to another company), you may want or need to pay attention to privacy concerns like names and email addresses of developers in the repository history. Using rebasing, you can anonymize author names in a quick and automated way.

-----

Authors: rasshofer

-----

Text:

Let’s take (github: vuejs/petite-vue) as an example. Using a custom log format, we can briefly confirm the current commits and their respective author information and timestamps.

```sh
git log --pretty=format:"%h / %an / %ae / %ad"
```

(image: git-log-before.png)

As you can see, there are several names and email addresses in there which we may want to anonymize and obfuscate.

Using Git’s native rebase functionality, you can rewrite the history starting with a specific commit or starting with the very first root commit and amend every commit. However, please be aware that amending a commit also results in a new commit hash being generated, thus commit hash references (e.g. in commit messages) may not work as expected anymore.

The following command rebases all commits down to the initial root commit and applies the amendment (i.e. changing the author’s name and email address) to each commit.

```sh
export GIT_COMMITTER_NAME="Jane Doe"
export GIT_COMMITTER_EMAIL="jane@example.com"
git rebase -i --root --rebase-merges -x "git commit --amend --author=\"Jane Doe <jane@example.com>\" -C HEAD"
```

You may wonder what `GIT_COMMITTER_NAME` and `GIT_COMMITTER_EMAIL` is about.

In Git, there’s a distinction between the author and the committer of a commit. When person A creates a patch and sends it to person B, who then applies it, author and committer are diverging. An author is the person who created the change and thus the patch. A committer is the person who applied that patch. For regular commits, this difference usually is non-existent and the same person.

When anonymizing, both the author and committer names shall be obfuscated. As you’re the person who is doing the rebasing, your currently configured Git user would be used as committer for all commits accordingly otherwise. The `-C HEAD` option ensures that the respective commit’s meta data is adapted and used.

You’ll be presented with an editor where you can review and confirm the commit range.

(image: confirmation.png)

Now, Git will pick every single commit and run the specified amendment for each commit.

(image: rebasing.png)

After rebasing completed successfully, you can check the log again (by using aforementioned command) and will see that the commit messages and timestamps remained untouched but the authors/committers were anonymized and commit hashes changed.

(image: git-log-after.png)

It’s also possible to change the author/commiter for a subset of commits by specifying the last respective commit hash to be excluded (instead of `--root`). The following command rebases all commits down to commit `59232d7` (excluding) and applies the amendment.

```sh
export GIT_COMMITTER_NAME="Jane Doe"
export GIT_COMMITTER_EMAIL="jane@example.com"
git rebase -i 59232d7 --rebase-merges -x "git commit --amend --author=\"Jane Doe <jane@example.com>\" -C HEAD"
```

In case you want to include the specified commit, you simply need to add a `^` suffix to the commit hash.

```sh
export GIT_COMMITTER_NAME="Jane Doe"
export GIT_COMMITTER_EMAIL="jane@example.com"
git rebase -i 59232d7^ --rebase-merges -x "git commit --amend --author=\"Jane Doe <jane@example.com>\" -C HEAD"
```
