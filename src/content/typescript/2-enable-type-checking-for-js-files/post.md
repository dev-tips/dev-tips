Title: Enable type checking for .js files

-----

Date: 1612719020

-----

Description: By using the »@ts-check« comment/annotation in your plain JavaScript, you can turn on TypeScript’s type checking without actually moving the file to TypeScript.

-----

Authors: rasshofer

-----

Text:

Building on top of (reference: typescript/adding-typescript-typing-to-intellisense-in-js-files text: adding TypeScript typing via JSDoc comments for improved IntelliSense) in JavaScript files, you can also enable proper type checking for plain `.js` files using the comment/annotation `// @ts-check`. Let’s take the following function as an example.

```js
/**
 * @param {string} title
 * @param {number} id
 * @returns string
 */
const getPostSlug = (title, id) => {
  return `${title.toLowerCase()}-${id}`;
};

console.log(getPostSlug('Test', 123));
console.log(getPostSlug(123, 'Test'));
```

While IntelliSense already works and helps during development, the last line would cause a runtime exception due to a `number` being used where a `string` is expected (and `number` not having a `toLowerCase()` method).

By adding the line `// @ts-check` to the beginning of the `.js` file, TypeScript checking is enabled for that file, making you aware of that issue.

(image: typescript-error-reporting.png)

Of course, you can import any TypeScript typing for complex typing just as you would do in `.ts` files, e.g. of Webpack configuration files (i.e. `import('webpack').Configuration` in the following example).

```js
// @ts-check
const path = require('path');
const { merge } = require('webpack-merge');

const { getCommonConfig } = require('../../webpack.common.config');

/**
 * @param {string} env
 * @param {import('webpack').CliConfigOptions} argv
 * @return {import('webpack').Configuration}
 */
const config = (env, argv) => {
  const commonConfig = getCommonConfig(env, argv);

  return merge(commonConfig, {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    node: {
      __dirname: false,
    },
    target: 'node',
  });
};

module.exports = config;
```

This is especially useful for files where moving them to proper `.ts` files (such as `webpack.config.js`) may require bigger adjustments of the build process.
