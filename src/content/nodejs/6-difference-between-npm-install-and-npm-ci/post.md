Title: Difference between »npm install« and »npm ci«

-----

Date: 1601226848

-----

Description: While »npm install« resolves the dependency tree afresh and installs the latest versions (matching the specified version ranges), »npm ci« can be seen as a »simplified« version that installs exactly what is specified in »package-lock.json« in a fast(er) manner.

-----

Authors: rasshofer

-----

Text:

This has the big advantage of making sure that once a package lock file is committed and maintained, all developers and build systems will use the same version of all packages.

It solves the usual »works on my machine« errors and is helpful to reduce errors due to some packages not caring about proper semantic versioning and potentially releasing breaking changes e.g. as patch versions.

`npm install` will install all dependencies. If you use `^` or `~` in the version specification of a dependency, npm may not install the exact version you specified but the next best matching patch/minor release version. It will also update the `package-lock.json` file if there are changes such as installing a new dependency.

`npm ci` first will wipe the entire `node_modules` directory of a project (to ensure a clean installation) and then installs all dependencies exactly as specified in the `package-lock.json` file without being re-resolved. This also makes the installation process particularly fast(er). Unlike `npm install`, `npm ci` will never change the `package-lock.json` file.

If the version of a dependency in `package-lock.json` doesn’t match the corresponding specification in `package.json` (e.g. because `package.json` was changed manually) the `npm ci` command throws an error. Likewise, if there is no `package-lock.json` present, an error is thrown. Thus, to generate or update the `package-lock.json` file, the `npm install` command must still be used by developers.

To take advantage of the better build reproducibility and higher speed builds with `npm ci`, the `package-lock.json` file should be created, maintained, and versioned in the source code version control (e.g. Git). From there, other developers as well as CI environments (or any other involved build system/stage) is able to generate reproducible builds.
