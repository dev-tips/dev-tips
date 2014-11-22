Title: Don’t use fat arrows in CoffeeScript just because of »this«

-----

Date: 1416665724

-----

Contributors: meandmax

-----

Text:

Lots of people don’t really get how `=>` or `->` functions in CoffeeScript work and simply use `=>` just because of the use of `this` (`@`) in a class function. In order to clarify the difference, one needs to dig a little deeper and look into some things.

So first let’s have a look how a simple class with a `->` and a `=>` function in CoffeeScript is compiled to JavaScript.

```coffeescript
class A

    constructor: () ->
        @funcA()
        @funcB()

    funcA: () ->
        return 'funcA'

    funcB: () ->
        return 'funcB'

a = new A
```

A simple class in CoffeeScript with two functions called by the constructor when the class is instantiated.

```javascript
var A, a;

A = (function() {
  function A() {
    this.funcA();
    this.funcB();
  }

  A.prototype.funcA = function() {
    return 'funcA';
  };

  A.prototype.funcB = function() {
    return 'funcB';
  };

  return A;

})();

a = new A;
```

Both functions are attached to the prototype of `A`. So let’s have a look what is happening when we replace the `->` arrow with the `=>` arrow.

```coffeescript
class A

    constructor: () ->
        @funcA()
        @funcB()

    funcA: () =>
        return 'funcA'

    funcB: () =>
        return 'funcB'

a = new A
```

What CoffeeScript does with fat arrows is: it uses the apply function to create a new function where the context of the class instance is bound to the function. Therefore the function has always the same context, no matter where it gets called.

```js
var A, a,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

A = (function() {
  function A() {
    this.funcB = __bind(this.funcB, this);
    this.funcA = __bind(this.funcA, this);
    this.funcA();
    this.funcB();
  }

  A.prototype.funcA = function() {
    return 'funcA';
  };

  A.prototype.funcB = function() {
    return 'funcB';
  };

  return A;

})();

a = new A;
```

The difference may be tiny, but very important. Now, we bind the context of the class to the function and therefore if we use `this` (`@`) in the function, the function always gets executed in the context of the class instance.

The important questions that we have to ask before using a single vs. a fat arrow function are:

**1. Shall we use `this` (`@`) in the function?**  
**2. More importantly: do we want to execute the function later possibly in a different scope?**

If both questions answered with yes, then a `=>` functions could be the right choice.

Let’s play around with a typical example where we call a function in a different scope.

```coffeescript
class A

    constructor: () ->
        @name = 'CoffeeScript'
        numbers = [1, 4, 9]
        @values = numbers.map(@funcA)
        console.log(@values)

    funcA: () ->
        return @name

a = new A
```

This will break because `funcA` is a `->` function and we call the function in the context of the `map` function where `@name` won’t be defined.

```js
class A

    constructor: () ->
        @name = 'CoffeeScript'
        numbers = [1, 4, 9]
        @values = numbers.map(@funcA)
        console.log(@values)

    funcA: () =>
        return @name

a = new A
```

As we bind the context of the class to the function using `=>`, it doesn’t matter where and how we call the function. Now, the function is always executed with the context of the class instance.

Mentioned in a very good article called »[Understanding Fat Arrows (=>) in CoffeeScript](http://webapplog.com/understanding-fat-arrows-in-CoffeeScript/)«, a good rule of thumb might be:

**- Use `=>` when we need @ to be the object in which method is written**  
**- Use `->` when we need `this` (`@`)  to be the object in which method is executed.**

Here is another very good example about context and scope in CoffeeScript. Let’s have a look what `this` is.

```coffeescript
class A
    constructor: () ->
        a = () -> console.log(@)
        a()

a = new A()
```

The output will be the window as we opened a new scope by declaring a `->` function in the constructor of class `A`.

```coffeescript
class A
    constructor: () ->
        a = () => console.log(@)
        a()

a = new A()
```

The output will be the object `A`. That’s because we bound the context of the class `A` instance to the anonymous function using the fat arrow.

So, the conclusion is: before just using single or fat arrows, you have to ask yourself the two important questions mentioned above. If you can answer these two questions, you already know your way to go.
