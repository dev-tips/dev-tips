Title: Class constructors without using "new" in JavaScript

-----

Date: 1405202280

-----

Contributors: rasshofer

-----

Text:

When creating a class constructor in JavaScript, you may prefer to allow its instantiation without using the new keyword—just like jQuery does with their `$()` factory function. Let’s assume the following class as a simple example.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
```

While var `jack = new Person('Jack', 32)` would work, `var jim = Person('Jim', 34)` doesn’t—so far. Actually `jim` would be simply `undefined` after the call. But even worse: if someone calls the constructor without using new, the global scope will be poluted by the two variables `name` and `age` as calling a function without specifying its context forces the browser to pass it in the global object (which is `window`). By checking whether the requested object is already an instance of the class, you can return a new instance if it isn’t or execute the actual constructor if it is.

```javascript
function Person(name, age) {
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
    } else {
        return new Person(name, age);
    }
}
```

Both var `jack = new Person('Jack', 32)` and `var jim = Person('Jim', 34)` would work now. The following way does exactly the same but is a bit shorter and handier.

```javascript
function Person(name, age) {
    if (!(this instanceof Person)) return new Person(name, age);
    this.name = name;
    this.age = age;
}
```