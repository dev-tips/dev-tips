Title: Do not use fat arrows just because of "this"!!  

-----

Date: 1416232914299

-----

Contributors: meandmax

-----

Text:

For a long time I didn`t understand how ``=>`` or ``->`` functions really work in coffescript and used always ``=>`` just because I used this (@) in a class function. So I decided to digg a little deeper and really look into some things.

So first let`s have a look how a simple class with a ``->`` and a ``=>`` function in coffescript is compiled to javascript:

## coffeescript

```javascript
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

## compiled javascript

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

So both functions are attached to the prototype of A. So let`s have a look what is happening when we replace the ``->`` arrow to a ``=>``.

## coffeescript

```javascript
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

## compiled javascript

```javascript
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

So the difference is little, but very important. Now we bind the context of the class to the function and therefore if we use this (@) in the function, the function always gets executed in the context of the class instance. So as I can see, the important questions that we have to ask before using a single vs. a fat arrow function are:

#### Do we using this (@) in the function.
#### More importantly do we want to execute the function in a different scope.  
So let`s play around with a typical example where we call a function in a different scope:

## coffeescript

```javascript
class A

    constructor: () ->
        @name = 'coffescript'
        numbers = [1, 4, 9]
        @values = numbers.map(@funcA)
        console.log(@values)

    funcA: () ->
        return @name

a = new A
```

This will break because funcA is a ``->`` function and we call the function in the context of the map function. 

## compiled javascript

```javascript
class A

    constructor: () ->
        @name = 'coffescript'
        numbers = [1, 4, 9]
        @values = numbers.map(@funcA)
        console.log(@values)

    funcA: () =>
        return @name

a = new A
```

As we bind the context of the class to the function with the =>, it doesn´t matter where and how we call the function. Now the function is always executed with the context of the class instance.

Mentioned in a very good article called [Understanding Fat Arrows (=>) in CoffeeScript](http://webapplog.com/understanding-fat-arrows-in-coffeescript/), a good rule of thumb might be:

"use ``=>`` when we need @ to be the object in which method is written; use ``->`` when we need ``this (@)``  to be the object in which method is executed."

Here is another very good example about context and scope in coffeescript. Let`s have a look whats ``this``:

## coffeescript

```javascript
class A
    constructor: () ->
        a = () -> console.log(@)
        a()

a = new A()
```

Here the output will be the window as we opened a new scope by declaring a ``->`` function in the constructor of class A.

## coffeescript

```js
class A
    constructor: () ->
        a = () => console.log(@)
        a()

a = new A()
```

Here the output will be the object A. That`s because with the fat arrow we bound the context of the class A instance to the anonymous function.

So my conclusion is: before just using single or fat arrows, you have to ask yourself the two important questions mentioned above. If you can answer these two questions, you know already your way to go.
