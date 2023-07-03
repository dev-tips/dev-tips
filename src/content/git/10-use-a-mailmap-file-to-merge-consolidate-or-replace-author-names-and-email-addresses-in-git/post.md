Title: Use a .mailmap file to merge, consolidate, or replace author names and email addresses in Git

-----

Date: 1688417763

-----

Description: A handy trick to unify multiple author identities (i.e. names and email addresses) and simplify tracking commits, especially in teams with different machines or Git clients.

-----

Authors: rasshofer

-----

Text:

When working with Git, each commit not only captures code changes but also attributes them to a specific author. By default, Git relies on its `user.name` and `user.email` configuration settings to generate the author information displayed in the commit logs later.

The name and email settings in Git are treated as plain text strings, allowing users to set them to their personal preference. However, Git considers these values to be case-sensitive. Consequently, »Jane« and »jane« would be recognized as distinct authors by Git. The situation worsens when the email address is also case-sensitive, leading to further discrepancies. And on top of case-sensitivity issues, people sometimes simply use different machines or different Git clients or change their name due to e.g. transitions or marriage.

```sh
git shortlog -se
```

```text
1  Jane Example <Jane@Example.com>
1  Jane Example <Jane@example.com>
2  Jane Example <jane@example.com>
1  John <max@test.de>
3  John Example <hi@test.io>
1  jane example <jane@example.com>
```

The underlying problem arises when you want to determine the number of commits made by a specific author, such as Jane. If Jane uses different machines or Git configurations, the commit log may contain multiple variations of their name and email. Even if they eventually synchronize the settings, all previous commits will retain the old values due to Git’s immutable nature. Consequently, every time you need to ascertain the authors of file changes, you would have to manually count the distinct variations.

But fortunately, there is a way to simplify this process using a so-called `.mailmap` file.

## Streamlining authors with .mailmap files

Git applies the configurations specified in the `.mailmap` file before displaying the output of any command. The `.mailmap` file itself follows a straightforward format.

```text
<NAME_YOU_WANT_TO_KEEP> <EMAIL_YOU_WANT_TO_KEEP> <NAME_YOU_WANT_TO_REPLACE> <EMAIL_YOU_WANT_TO_REPLACE>
```

For each project user with multiple author identities, you can add an entry in the `.mailmap` file. Begin by specifying the desired author information, followed by a space, and then the author information to be merged/consolidated/replaced.

For aforementioned inconsistencies, the `.mailmap` file looks as follows.

```text
Jane Example <jane@example.com> Jane Example <Jane@Example.com>
Jane Example <jane@example.com> Jane Example <Jane@Example.com>
Jane Example <jane@example.com> jane example <jane@example.com>
John Example <hi@test.io> John <max@test.de>
```

Or, as an example, assuming »John Doe« married and now is named »John Mustermann«, the `.mailmap` file could look as follows.

```text
John Doe <john.doe@gmail.com> John Mustermann <john.mustermann@gmail.com>
```

Upon running the `shortlog` command again, you’ll observe that each »real« author is now represented by a single entry.

```text
git shortlog -se
```

```text
5  Jane Example <jane@example.com>
4  John Example <hi@test.io>
```

This handy trick eliminates the need for rewriting (and thus distorting) the Git history, manual counting, or guesswork. Git conveniently provides you with the precise information you require. Simply update the file whenever a new combination arises, allowing everyone to focus on their work without worrying about Git misconfigurations.

And to prevent accidental commits with the wrong name or email address in the future, you can apply (reference: git/conditional-overriding-of-git-configurations text: conditional overriding of Git configurations for single and multiple repositories).
