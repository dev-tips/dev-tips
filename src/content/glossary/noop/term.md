Title: NOOP

-----

Alias: Null operator

-----

Description: A function that performs no operations and once invoked it returns »undefined«. Thus »noop« simply means »no operation«.

-----

Authors: rasshofer

-----

Text:

Basically, such a function be implemented as follows.

```js
const noop = () => {};
```

It can be useful when needing a fallback value/function in case e.g. a callback function wasn’t passed.

```js
const doSomething = (callback) => {
  const result = calculateResult();
  (callback || noop)(result);
}
```

As some (term: Linting text: linters) disallow empty function bodies, it’s best practice to simply put the comment `/* NOOP */` in the empty function body.

```js
const noop = () => { /* NOOP */ };
```
