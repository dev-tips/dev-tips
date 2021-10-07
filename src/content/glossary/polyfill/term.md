Title: Polyfill

-----

Description: A script or code block written in JavaScript that can be used to add functionality to a browser or engine that is missing but exists in newer browsers/engines. Polyfills are mainly used to fix or minimize compatibility problems between browsers.

-----

Authors: rasshofer

-----

Text:

Polyfills usually extend or override global JavaScript prototypes, allowing to use the added functionality as if it’s built-in. Usually a polyfill checks if it needs to add something or whether the intended functionality is already available and provided natively by the browser/engine.

The following example demonstrates a very basic polyfill for the `.startsWith()` method of strings which was added as part of (term: ES text: ES2015) and needs to be polyfilled for ES5 browsers/engines.

```js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
```

(npm: core-js) is a well-known library for ready-to-use polyfills for all sorts of features and functionalities. Based on this, for example, (term: Babel) includes required polyfills automatically based on (term: Browserslist) definitions when using their (npm: @babel/preset-env) preset.
