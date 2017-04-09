Title: Difference between ».apply()«, ».call()« and ».bind()« in JavaScript

-----

Date: 1428534307

-----

Contributors: rasshofer

-----

Text:

When working with functions in JavaScript, the value of `this` and the functions’ arguments are important. `.apply()`, `.call()` and `.bind()` allow you to change `this` inside a function and pass arguments in different ways.

The difference between `.apply()` and `.call()` is that `.apply()` lets you invoke the function with arguments as an array while `.call()` requires the arguments to be listed explicitly.

A useful mnemonic for this is…

- **a**pply() for arguments as an **a**rray
- **c**all() for **c**omma-separated arguments

Let’s have a look at a simple example to understand what this means.

```js
function demo(name, age) {
    alert('My name is ' + name + ' and I am ' + age + ' years old');
}

demo('John', 25);

demo.apply(this, ['John', 25]);

demo.call(this, 'John', 25);
```

All three function calls above do exactly the same.  Both `.apply()` and `.call()` can be called on functions, which they run in the context (= the root scope in this case) of the first argument. Thus, you can use `.apply()` if you don’t know the number of arguments you’ll be passing or if the arguments are already in an array or array-like object (like the `arguments` object) and use `.call()` otherwise since there’s no need to wrap the arguments in an array.

Whereas `.bind()` is used when you want a function to later be called with a certain context—which is useful in events. While `.apply()` and `.call()` call the function immediately, `.bind()` creates and returns a new function that—when executed later—will have the correct context (= bound to a different `this`) set for calling the original function. This way you can maintain context in asynchronous callbacks and events.

```js
var pollute = function () {
    this.innerHTML = 'Demo';
};

document.getElementById('demo').addEventListener('click', function () {
  window.setTimeout(pollute.bind(this), 1000);
});
```

You can also append extra parameters after the first parameter and `.bind()` will pass those values into the original function before passing in the extra parameters you pass to the bound function.

```js
var sum = function (a, b) {
    return a + b;
};

var addTo = sum.bind(this, 123);

console.log(addTo(456)); // = 579
```
