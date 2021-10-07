Title: Linting

-----

Description: The process of performing a static code analysis to flag potential errors and suspicious sections of code. The source code gets checked, among other things, for syntactic/logical programming errors, uniform formatting, and the implementation of best practices.

-----

Authors: rasshofer

-----

Text:

When working alone on a project, this may not be of great importance, but when working in a team, linters such as ESLint or stylelint are essential. Code can be written well and ugly and both can lead to the desired result for the end user. The difference is that the ugly variant can no longer be deciphered (or only with a lot of time) by other developers (and sometimes even by yourself), and thus causes a lot of costs for updates and bugfixes.

Linters are the only way to ensure that all team members produce consistent code and can be enabled/included in both the local text editors for assistance/hints during development but ultimately should run in CI (term: Pipeline text: pipelines) to check the code for any kind of change.
