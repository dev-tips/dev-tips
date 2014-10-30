Title: Override JavaScript functions

-----

Date: 1409921460

-----

Contributors: rasshofer

-----

Text:

It‘s very easy to override functions in JavaScript. You simply assign another function to the function name.

```javascript
var myFunction = function() {
    // do something...
};
```

```javascript
myFunction = function() {
    // do something different...
};
```

But it’s also possible to extend the existing function in order to execute something before or after the existing function.

```javascript
myFunction = (function() {
    var oldMyFunction = myFunction;
    return function() {
        // do something before...
        oldMyFunction.apply(this, arguments);
        // ...and after
    }
})();
```

The new variable `oldMyFunction` is required as the function would call itself over and over again otherwise. By using `apply()` and the `arguments` array, you don’t have to worry about the parameters as all passed parameters will be looped through.

This code definitely won’t win any beauty contests and may not be simple to understand, but may be useful for extending module code.
