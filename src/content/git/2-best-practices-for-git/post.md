Title: Best practices for Git

-----

Date: 1594417025

-----

Description: Similar to craftsmanship, it is some special tricks that make tools really effective. This article will describe general tricks to get the best out of Git.

-----

Authors: rasshofer

-----

Text:

## Use branches

Branches are one of the most powerful and important features of Git: the fast and easy creation of (parallel) branches in development was one of the central requirements from the very beginning. They avoid chaos and mutual overwriting of code during parallel development.

For each new feature, bugfix, or idea, a new and independent branch should be created in which the feature, bugfix, or idea is implemented and merged into the master after completion. At no point in time development and experimentation is done within the `main`/`master` branch itself.

The `main`/`master` branch remains clean and represents the production version. After completion of a branch, a pull/merge request is sent to one or multiple responsible persons (usually other members of your team) and only they merge the branch into the `main`/`master` branch (or approve it for being merged by you yourself).

Any push/merge directly into the `main`/`master` branch is reversed without comment.

## Consolidate related things into commits

A commit should be the wrapper for changes that are related and belonging together. For example, if two different bugs are fixed, the changes should be packaged into two different commits, each of which is associated with a different bug. This makes it easier for other developers to track changes and to handle rollbacks/reverts in case of a bug. Squashing everything into a single commit is not always a good idea.

## Test changes before each commit

If a change is implemented, it must not be committed blindly assuming it is complete. Any code modification must be thoroughly tested beforehand to ensure that the change is complete and does not result in any unwanted side effects. This can be automated using Git hooks in case of doubt.

## Write good commit messages

Commits should start with a short summary of the changes made (~50-100 characters for orientation). It should also state what the motivation for the change was (e.g. providing a ticket) and what is different from the previous implementation. The wording should always use imperative present tense (»change« instead of »changed« or »changes«) to maintain consistency with the messages generated by Git’s merging tool.

If you’re having trouble to stick to this rule, just think about telling someone else that they need to use this commit to achieve something with a sentence starting with »use this commit to …« (e.g. »use this commit to _increase size for promo teasers on home page_«).

## Create commits as often as possible

Frequent committing of changes keeps commits small and manageable, and allows you to summarize related issues. It also makes it possible to share code changes more quickly and frequently with other developers in the same repository. This allows for faster/better committing of changes and avoids major merge conflicts.

## Do not commit half-finished code

Only completed code should be committed. This does not mean that a large feature needs to be completed before the changes are committed, quite the opposite: large changes should be divided into small and logical units, each of which is completed and committed separately. However, it doesn’t make sense to commit half-finished code at the end of the day, just so you can call it a day in good conscience.

If a clean working copy is needed (for example, to fix a freshly discovered bug), the previous work should not simply be committed, but kept in a safe place by Git’s stashing feature. Once the bug is fixed and the fix has been committed, the previous changes can be restored.

## Version control ≠ backup system

Having your own repository secured in the form of a remote repository is a nice side effect of using version control during development. However, version control should not be seen as a classic backup system: semantic and reasonable commits should be in focus, not stuffing files.
