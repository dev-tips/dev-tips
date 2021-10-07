Title: AMD

-----

Alias: Asynchronous Module Definition

-----

Description: A standard for loading JavaScript libraries or modules asynchronously on client-side.

-----

Authors: rasshofer

-----

Text:

AMD is a way to implement JavaScript modules that are loaded asynchronously while being able to depend on other libraries or modules.

```js
define(['jquery', 'something'], function ($, something) {
  // Define the module value by returning a value
  // `jquery` and `something` are dependencies of this module
  return function () {
    // Do something
  };
});
```

AMD was primarily developed for the client-side (i.e. browser) only, not for backend purposes. RequireJS is the most prominent implementation of the AMD method.
