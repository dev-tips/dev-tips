Title: Passing arguments to another function in JavaScript

-----

Date: 1428527874

-----

Contributors: rasshofer

-----

Text:

If you want to pass arguments to another function in JavaScript, you can use `.apply()` to have the same access to `arguments`.

```js
function a() {
    b.apply(this, arguments);
}

function b() {
    console.log(arguments);
}

a('Lorem', 'ipsum');​
```
