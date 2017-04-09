Title: Consynchronous Assurency: How to achieve quasi-concurrency with Array.prototype.forEach

-----

Date: 1428532092

-----

Contributors: fza

-----

Text:

One of the most important concepts in JavaScript is asynchronous programming. The standard model for this technique looks like this:

```javascript
doSomething(some, args, function (error, result) {
  /* callback */
});
```

Basically, when you call `doSomething()`, there is no actual return value. Instead, the results are passed as an argument to a provided lambda function. Whenever you used `setTimeout()`, all you did is an exercise in asynchronous programming.

Side note: At least in Node.js, all callbacks are assumed to have a signature where the `error` argument comes first. And really, your code should comply with that unwritten law.

However, there is a common »problem«: Asynchronous code does not imply concurrency, where a multitude of »code frames« (i.e. threads) is executed in quasi-parallel. JavaScript doesn’t know threads. What it can do, is letting you create different code frames, which are executed independently, i.e. with said `setTimeout()`, which you can use to decouple a block of code from your current execution frame. But at any time only one of these frames is active.[^Threads]

A typical example where concurrency might be useful is [`array.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach). Suppose you want to do quite complex, time consuming computations by iterating over each item in an array. First attempt:

```javascript
arr.forEach(function (val, idx) {
  /* super complex code goes here */
});
```

What happens is that each item in the array is processed in order, but not concurrent. At all times, there is only one instance of the lambda function running, each handling one item after another. The real problem comes from the fact that `forEach()` blocks, just like the following piece of code, which is old as hell:

```javascript
for (var i = 0; i < arr.length; i++) {
  /* ... */
}
```

Now, how can we combine the two concepts, concurrency and asynchronicity, so that code like this doesn’t block? Well, just wrap your lambda in another lambda, that calls `setTimeout()`:

```javascript
arr.forEach(function (val, idx) {
  setTimeout(function () {
    /* actual code goes here */
    console.log('foo ' + idx);
  }, 0);
});

console.log('bar');
```

That code will always output »bar« first, thus the interpreter directly continues with the main code path and calls your lambdas later. Notice that it is perfectly legal to have a timeout value of zero milliseconds, meaning that the function is called as soon as possible. While there is no guarantee that all array items are processed in order (most times they are), at least your code becomes responsive again.

There was once the idea of [`setImmediate()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate), which does exactly the same as `setTimeout(func, 0)`—but the equality of both approaches is the reason why it’s unlikely we may ever see it in the wild.[^setImmediate]

[^Threads]: Well, it is not absolutely true. With the [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) you can sort of mimic thread-like behavior in the browser, but it’s often an overkill approach. In Node.js there is the [Cluster](https://nodejs.org/api/cluster.html) core module.

[^setImmediate]: `setImmediate()` is currently available in IE10 and Node.js. The latter also knows the `process.nextTick()` method, which again is used to decouple parts of code and is said to be more efficient.
