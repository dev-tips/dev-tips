Title: Minification

-----

Description: Minimization removes unnecessary characters from the code without changing the functionality. This can significantly reduce the size of requested resources (such as CSS, images, or JavaScript files). Common side effects of minimization include variable names shortened to one character and comments and spaces removed.

-----

Authors: rasshofer

-----

Text:

Consider the following JavaScript code.

```js
const firstName = 'Jane';
const lastName = 'Doe';
const fullName = `${firstName} ${lastName}`;

const sayHello = name => console.log(`Hello, ${name}!`);

sayHello(fullName);
```

By minimizing, the code can be shortened as follows by using e.g. (npm: terser).

```js
o;o="Jane Doe",console.log(`Hello, ${o}!`)
```

In addition to simply removing e.g. comments and unnecessary spaces, parameters/variable names are renamed to shorter identifiers as well and sometimes removed/resolved in-place.

Unlike client-side JavaScript, with Node.js you don’t necessarily have to worry about optimizing source code as the source code is available on the server where it runs without any transfer of code over a network connection.
