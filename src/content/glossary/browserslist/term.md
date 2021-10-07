Title: Browserslist

-----

Description: A format for specifying a set of target browsers to be used by tools like Autoprefixer and Babel that moves the focus from specific browsers to general queries.

-----

Authors: rasshofer

-----

Text:

For example, (term: Babel) includes required polyfills automatically based on Browserslist definitions when using their (npm: @babel/preset-env) preset to achieve automatic compatibility with the desired target browser.

The list can be stored e.g. in a dedicated `.browserslistrc` file, the `browserslist` key in `package.json` in the current directory or parent directories, or the `BROWSERSLIST` environment variable.

To debug a Browserslist query, the (npm: browserslist) CLI can be used.

```sh
npx browserslist "last 2 version, >5%"
```
