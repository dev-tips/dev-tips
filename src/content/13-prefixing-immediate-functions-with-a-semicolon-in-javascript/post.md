Title: Prefixing immediate functions with a semicolon in JavaScript

-----

Date: 1428525792

-----

Contributors: rasshofer

-----

Text:

As your scripts may be used together with some other scripts you can’t influence/change, you should always prefix your immediate functions with a semicolon—here’s why.

Let’s assume the following function is stored within `vendor.js`…

```js
var someVendorFunction = function () {
    console.log(arguments);
}
```

…and your own scripts (wrapped in a immediate function) are stored within `app.js`…

```js
(function (window, undefined) {
    window.app = {};
})(window);
```

As the variable declaration within `vendor.js` is missing a semicolon at its end (e.g. as a result of minification or by relying on JavaScript’s semicolon insertion), your function gets directly appended to the incomplete variable declaration, resulting in an error.

> `Uncaught TypeError: undefined is not a function`

As you’re not able to control scripts that get concatenated together with your scripts, the best way to prevent such errors is to prefix your immediate functions with a semicolon.

```js
;(function (window, undefined) {
    window.app = {};
})(window);
```
