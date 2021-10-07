Title: Codemod

-----

Description: A code snippet that transforms existing source code programmatically. This allows to apply larger amounts of changes without having to go through files manually and thus can be used for automated code refactoring.

-----

Authors: rasshofer

-----

Text:

Typical use cases are implementing changes due to deprecated functionalities, cleaning up code (e.g. renaming variables, removing unused code, or removing debugging statements like `console` calls), or detecting secrets/passwords in files. Some libraries and frameworks even provide Codemod transformations to help upgrade a codebase when a feature is deprecated.

[astexplorer.net](https://astexplorer.net/) is a great web-based tool to run codemods, conveniently combining all necessary views (i.e. original code, AST, applied codemod, and resulting code) in one window.

(image: astexplorer-codemod.png bordered: true)

The example above uses (npm: recast) as parser and (npm: jscodeshift) as transformer and represents a simple/stupid codemod: reversing the characters of names of identifiers (e.g. variable/method names). (npm: jscodeshift) is an exemplary tool for running codemods over JavaScript/TypeScript files.
