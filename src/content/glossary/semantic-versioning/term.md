Title: Semantic Versioning

-----

Description: Semantic versioning is used for most frameworks, libraries, and APIs. For package managers like npm, semantic versioning is mandatory to resolve dependencies correctly. But how to version semantically?

-----

Authors: rasshofer

-----

Text:

When using semantic versioning, the structure of a version number is described based on a version number consisting of `MAJOR.MINOR.PATCH`. The individual elements are incremented as follows.

- `MAJOR` is incremented when API incompatible changes are released
- `MINOR` is incremented when new functionality compatible with the previous API is released
- `PATCH` is incremented when changes include API-compatible (bug) fixes only

In addition, pre-release identifiers and build metadata are available as extensions to the `MAJOR.MINOR.PATCH` format.

The notes on when to increment which number refer to the API, the Application Programming Interface. An application is usually consumed by users, not by other software components, and therefore has no API.

Instead of the API compatibility, the compatibility of system requirements can be used for applications for versioning. `MAJOR` is increased if the system requirements have changed, for example, a newer operating system or an additional resource is required. If the system requirements remain the same and new functionalities have been added, `MINOR` is increased; if only bugs have been fixed, `PATCH` is increased.
