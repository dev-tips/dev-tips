Title: Transpile old ES5 code to latest ECMAScript using Lebab

-----

Date: 1585953695

-----

Description:

By doing the exact opposite of what Babel does, Lebab modernizes your code while keeping refactoring efforts low by transpiling your old ES5 code to latest ECMAScript.

-----

Authors: rasshofer

-----

Text:

You may have some old-fashioned projects implemented in ES5 and there’s nothing wrong about that, really. But maybe you’d like to lift it to the latest ECMAScript standards to make use of cool new features like block-scoped constructs `let` and `const`, arrow functions, default parameters, template literals, multi-line strings, or destructuring.

[Lebab](https://github.com/lebab/lebab) (= »Babel« written backwards) is a project that could save you a lot of manual maintenance in doing so. It’s available as npm package (npm: lebab) (i.e. both a command line utility and a programmatic API) and as a [web-hosted version](https://lebab.unibtc.me/editor) for playing around with it.

To give an example, the following ES5 code…

```js
var demo = function (a, b) {
  return Math.pow(a, b);
};
```

…can be converted to the following up-to-date ECMAScript with Lebab automatically.

```js
const demo = (a, b) => a ** b;
```

Sweet.

## Usage

```sh
npx lebab input.js -o output.js --transform arrow
```

Lebab’s maintainers recommend to apply one transformation at a time in order to analyze what exactly the transformations does and what its limitations are, apply it to your code, and inspect the resulting diff carefully. If you’d still like to perform multiple transformations at a time, you can do so by specifying the preferred transformations separated by a comma.

```sh
npx lebab input.js -o output.js --transform let,exponent,arrow,arrow-return
```

If you’d like to transform not only a single file but several files at once, you can specify a glob pattern using the `--replace` parameter. The files will be overwritten (thus »replace«) with their transformed versions, so make sure to keep a backup or use it in a versioned setup where you can roll back to the original versions in case a transformation went wrong.

```sh
npx lebab --replace 'src/js/*.js' --transform arrow
```

Lebab also provides a programmatic JavaScript API. In order to use this API, import and call the `transform` function and specify an array of transformations to run.

```js
const { transform } = require('lebab');

const { code, warnings } = transform(
  `
    var demo = function (a, b) {
      return Math.pow(a, b);
    };
  `,
  ['let', 'exponent', 'arrow', 'arrow-return'],
);

console.log(code); // The transpiled code
console.log(warnings); // Warnings if something went wrong
```

Easy.

## Conclusion

You may not trust everything that comes out of Lebab blindly and still may have to take care of lifting your code to the latest ECMAScript standards by yourself, but it’s definitely a good way to get started initially.
