Title: Arity

-----

Description: The number of arguments a function expects/supports.

-----

Authors: rasshofer

-----

Text:

In JavaScript, the arity of a function can be determined using its `length` property.

As an example, the following function has an arity of 3.

```js
const getFullName = (firstName, middleName, lastName) => {
  return `${firstName} ${middleName} ${lastName}`;
};
```

`getFullName.length` returns `3` accordingly.

This way, you can implement differing behaviour depending on the type of e.g. callback function that was passed. For example, (npm: express) uses function arity to distinguish regular middleware functions from middleware functions for error handling: these are defined in the same way as other middleware functions, except that error handling functions have four arguments instead of three. The following example visualizes this logic.

```js
const getMiddlewareType = (callbackFunction) => {
  if (callbackFunction.length === 4) {
    return 'Error handler';
  }
  return 'Regular middleware';
};
```

```js
// Returns "Error handler"
getMiddlewareType((err, req, res, next) => {
  /* NOOP */
});
```

```js
// Returns "Regular middleware"
getMiddlewareType((req, res, next) => {
  /* NOOP */
});
```
