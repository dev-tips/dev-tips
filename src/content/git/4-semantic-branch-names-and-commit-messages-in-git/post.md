Title: Semantic branch names and commit messages in Git

-----

Date: 1596886448

-----

Description: See how a small change to your commit message style and branch names can make it easier to write automated tools on top of them, like automated releases or changelogs.

-----

Authors: rasshofer

-----

Text:

Git does not restrict or predefine the format of Git commit messages and the naming of branches. This fact and challenge was also described in the »Write good commit messages« section of our (reference: git/best-practices-for-git text: »Best practices for Git« post).

This description (of what happened in a work process) is unfortunately often put in second place. As a result, developers usually just use a format they feel comfortable with or huge team-internal debates are started, i.e. whether there needs to be a lot or a little amount of commits and what form of commit messages shall be used.

The de facto standard [Conventional Commits](https://www.conventionalcommits.org/) is what most developers and teams usually can agree on and basically describes a set of simple rules that apply to writing commit messages. Having agreed on such a convention in a team, the team members should find a uniform structure in the commit messages after a short familiarization period.

## Why follow the »Conventional Commits« standard?

Due to the strict structure and classification of changes when following these conventions and by utilizing tools like (github: lerna/lerna text: Lerna) or (github: conventional-changelog/conventional-changelog text: conventional-changelog), developers and teams can generate releases (e.g. new package versions) or changelogs automatically based on their commit messages, saving them from manual toil. For example, when using automated releases, the following mapping can be applied for semantic versioning of these new releases in an automated fashion.

- `fix: do something` causes a patch release (e.g. `1.0.0` → `1.0.1`)
- `feat: do something` causes a minor release (e.g. `1.0.0` → `1.1.0`)
- a `BREAKING CHANGE:` annotation causes a major release (e.g. `1.0.0` → `2.0.0`)

In addition, when creating a commit, every developer has to decide which type/scope to use. Simply by asking this question, one should be able to recognize commits that are too large and need to be split into several dedicated commits. This prevents several parts, components, or modules of a project from being changed in a single commit which would make traceability, cherry-picking, and reverting much harder.

## »Conventional Commits« in a nutshell

Changes are made within branches using small and clear commits. Commits are supposed to encapsulate related code changes and to have commit messages that reflect a summary of the changes made in natural language according to the following pattern.

```txt
<type>(<scope>)<!>: <subject>

<body>

<footer>
```

### `<type>` (required)

Only the following types are to be used.

- `build` = adjustment of build tools or external dependencies
- `chore` = generic maintenance (i.e. no product functionality change)
- `ci` = modification of Continuous Integration (CI) configurations/scripts
- `docs` = changes to the documentation
- `feat` = new feature for the end user (i.e. not a new feature for build script)
- `fix` = bug fix for the end user (i.e. not a fix to a build script)
- `perf` = source code adjustment that improves performance
- `refactor` = refactoring product code (neither fixes a bug nor adds a feature)
- `revert` = undo previous commits
- `style` = code formatting or code style adjustment (i.e. no product functionality change)
- `test` = implementation of missing or adjustment of existing test (i.e. no product functionality change)

### `<scope>` (required)

To provide additional contextual information, a scope may be provided next to a commit’s type. This could be the name of the affected module, i.e. the name of a package in a mono repository or part of the project.

### `<!>` (optional)

Next to having `BREAKING CHANGE:` in its footer (see below), a commit message can also have an appended `!` after the type/scope to indicate that it includes a breaking change.

Using `BREAKING CHANGE:` (potentially in addition) is recommended, though, as it allows to add further details/description on the breaking change.

### `<subject>` (optional but highly recommended)

- English
- Imperative, present tense (i.e. »change« instead of »changed« or »changes«)
- Short description (~50 characters is the soft limit)
- First letter is lowercased
- Skip the full stop (`.`)

Always think about this sentence following the prelude »use/apply this commit to {SUBJECT}«, e.g. »apply this commit to _fix overlapping flyout in main navigation_«.

### `<body>` (optional)

- English
- Imperative, present tense (i.e. »change« instead of »changed« or »changes«)
- Motivation for the change
- Contrasts its implementation with previous behavior

### `<footer>` (optional)

- References to ticket systems
- Emphasize breaking changes
  - Short description of the change
  - Justification
  - Migration notes
  - Examples of states before and after the change

## Extending »Conventional Commits« to branch names

Borrowing Conventional Commits's types and scopes/subjects, a simple naming pattern for branch names can be defined. Each change is implemented within its own branch, forking off the current `main`/`master` branch and following the pattern below.

Naming pattern: `<type>/<subject>`

## Examples

### New feature

Branch: `feat/button`

```txt
feat(button): implement support for icons

Fixes #123
```

This correlates with a minor release (`v0.X.0`)  in semantic versioning.

### Bugfix

Branch: `fix/icon-link`

```txt
fix(icon-link): reduce spacing between link label and icon
```

This correlates with a patch release (`v0.0.X`)  in semantic versioning.

### Breaking change

Branch: `feat/navigation`

```txt
feat(navigation)!: implement new navigation

BREAKING CHANGE: The props of the new navigation are incompatible with the previous navigation
```

This correlates with a major release (`vX.0.0`) in semantic versioning.

## Challenges

When getting started with using a rule set such as Conventional Commits, the effort may seem unnecessary and disproportionate. Determining the type/scope of commits may require too much mental overhead. However, after a short time, developers have to think much less about how they want to classify their commit messages and will start to create clearly separated and clean commits in a quite natural manner.

These days, a lot of projects (blindly) use merge-squash branching, i.e. only a single »tidy« commit message (made out of a vast amount of changes/commits during development) lives on in the codebase after merging a branch.

This approach may not work combined with commit message conventions as all changes are owned by the developer who merges the respective branch (in case several developers are working in the same branch) and everything is sandwiched into a single commit instead of consolidating related things into standalone commits.

Depending on the used tool, the last commit message of a branch may decide whether the new release/version will be a major, minor, or patch release, so developers have to think carefully about this fact and must not commit e.g. a breaking change as minor.

Having fast-paced branches with a single commit may eventually solve both issues.
