Title: Default arguments/parameters in JavaScript

-----

Date: 1405203372

-----

Contributors: rasshofer

-----

Text:

When designing your functions, it’s often helpful to be able to assign default values for arguments/parameters that aren’t passed later. Unlike programming languages like PHP, JavaScript doesn’t provide this functionality inherently. Undefined arguments are, well: `undefined`.

```javascript
var sayHello = function(name) {
    console.log('Hello, ' + name);
}
```

By using the shortcut computation of boolean expressions, you can define a default value for each argument which is assigned if the argument is originally undefined.

```javascript
var sayHello = function(name) {
    name = name || 'Nobody';
    console.log('Hello, ' + name);
}
```

While `sayHello('Peter')` still works, `sayHello()` (called without any arguments) would now result `Hello, Nobody`. Neat.
