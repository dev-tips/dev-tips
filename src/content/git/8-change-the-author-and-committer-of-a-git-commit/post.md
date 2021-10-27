Title: Change the author and committer of a Git commit

-----

Date: 1635316110

-----

Description: Git allows to set/change the name and email address of both the author and committer of a commits. This can be helpful if you need to commit someone else’s work.

-----

Authors: rasshofer

-----

Text:

The following command sets both the author and committer to a custom specified name and email address when creating a commit.

```sh
GIT_COMMITTER_NAME="Jane Doe" GIT_COMMITTER_EMAIL="jane@example.com" git commit --author="Jane Doe <jane@example.com>" -m "Implement something"
```

In Git, there’s a distinction between the author and the committer of a commit. An author is the person who created the change while a committer is the person who applied that change.

For regular commits, this difference usually is non-existent and the same person, which is why the same name and email address is used above.

In real life, you would/should use your own name and email address for the committer role as you’re the person that persists/applies the work of someone else.
