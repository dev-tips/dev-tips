Title: Don’t use fat arrows in CoffeeScript just because of »this«

-----

Date: 1416665724

-----

Contributors: meandmax

-----

Text:

New Coffeescript programmers usually struggle with understanding the differences between `->` and `=>` function definitions. In order to clarify this common case of confusion, it helps to look at how such functions are compiled down to JavaScript.

```coffeescript
class A

    constructor: () ->
        @funcA()
        @funcB()

    funcA: () ->
        return 'funcA'
        
    funcB: () =>
        return 'funcB'

a = new A
```

```javascript
var A, a,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

A = (function() {
  function A() {
    this.funcB = __bind(this.funcB, this);
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

By using `->`, `funcA` is simply attached to the prototype of class `A`. When using fat arrows, however, CoffeeScript casts a shadow around the original function, using `apply()` to glue it to the class instance. Therefore such functions always have the same `this` (`@`) context, no matter where they are called. The difference may be tiny, but very important. In order to find out when to use which arrow style, two questions need to be asked:

1. **Do you use `this` (`@`) in the function?**  
2. **Do you want to execute the function later, possibly from a different scope?**

If both questions were answered positive, then using `=>` is the right choice.

A typical example might look like this:

```coffeescript
class A

    constructor: () ->
        @name = 'CoffeeScript'
        @values = [1, 4, 9].map(@funcA)
        console.log(@values)

    funcA: () ->
        return @name

a = new A
```

This will break because `funcA` is implemented with `->` and the function is called in the context of `map`, where `@name` won’t be defined. By using `=>`, it doesn’t matter where and how to call the method as its context is permanently bound to the object:

```coffeescript
class A

    constructor: () ->
        @name = 'CoffeeScript'
        @values = [1, 4, 9].map(@funcA)
        console.log(@values)

    funcA: () =>
        return @name

a = new A
```

Mentioned in the article »[Understanding Fat Arrows (=>) in CoffeeScript](http://webapplog.com/understanding-fat-arrows-in-CoffeeScript/)«, a good rule of thumb might be:

* **Use `=>` when you want `@` to be the object in which the method is defined.**  
* **Use `->` when you want `@` to be the object in which the method is executed.**

Another interesting example, that deals with context and scope in CoffeeScript, shows why the differentiation keeps being important even in tiny scripts: 

```coffeescript
class A
    constructor: () ->
        a = () -> console.log(@)
        a()

a = new A()
```

The output will be the `window` object because a new scope is being created by declaring a `->` function in the constructor of class `A`. A better approach would be to bind the method’s context to the object using a fat arrow: 

```coffeescript
class A
    constructor: () ->
        a = () => console.log(@)
        a()

a = new A()
```

Before using single or fat arrows, one has to ask the two important questions mentioned above in order to find out which arrow style fits best.