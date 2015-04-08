Title: Complex/variable object keys in JavaScript

-----

Date: 1428528413

-----

Contributors: rasshofer

-----

Text:

While it’s pretty easy to use regular keys within objects in JavaScript, you may need to use complex keys (e.g. variable keys) from time to time. Using square bracket notation, that just as easy as regular keys.

```js
var demo = {};

demo.a = 'Easy peasy';

demo['b'] = 'Same thing in square bracket notation';

var test = 'a b c';

demo[test] = 'Variable key';
```

The code above results the following object.

```json
{
    "a": "Easy peasy",
    "b": "Same thing in square bracket notation",
    "a b c": "Variable key"
}
```
