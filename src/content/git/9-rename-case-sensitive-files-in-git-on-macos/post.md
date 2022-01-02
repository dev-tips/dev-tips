Title: Rename case-sensitive files in Git on macOS

-----

Date: 1641156789

-----

Description: As macOS is case-insensitive, simply renaming a file won’t be recognized as a change in Git. This can be handled by using »git mv« instead.

-----

Authors: rasshofer

-----

Text:

If you rename a file on macOS, macOS displays the newly-cased filename but Git doesn’t see any changes (if you only change the case).

(image: mv.png)

To ensure Git also recognizes that change, you need to use `git mv` instead of `mv` (or renaming the file in Finder) to rename the file.

(image: git-mv.png)

This only works for files under version control of Git – which makes sense as it’s only relevant for files that Git already knows/watches.
