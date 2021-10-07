Title: IIFE

-----

Alias: Immediately Invoked Function Expression

-----

Description: A self-executing function that gets called immediately after its declaration.

-----

Authors: rasshofer

-----

Text:

Usually, IIFEs are used to create a scoping context, i.e. a context in which all variables and function definitions are scoped within. This allowed to create a »shield« under which the functions and variables aren’t visible externally or globally outside of the wrapped function.

An IIFE can be written both with the calling brackets (i.e. `()`)  on the outside or the calling brackets inside of the wrapping brackets

```js
(() => {
  // Do something
})();
```

```js
(() => {
  // Do something
}());
```

While it’s quite common to write IIFEs anonymously (i.e. without a function name), named IIFEs are also possible.

```js
(function something() {
  // Do something
})();
```
