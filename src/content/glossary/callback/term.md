Title: Callback

-----

Description: Functions that are passed as parameter to another (usually asynchronous) function and that are executed once that function was executed.

-----

Authors: rasshofer

-----

Text:

JavaScript contains functions such as `setTimeout` and `requestAnimationFrame` that are executed asynchronously by default. Often, after an asynchronous function is executed, other functions are supposed to be executed as a consequence. For this, callback functions are used as arguments. In addition, callback functions are often written as anonymous functions.

```ts
window.setTimeout(() => {
  console.log('Callback');
}, 5000);
```

Traditionally, the first parameter of callback functions contains the error state, i.e. the `err` parameter contains information about an error if something went wrong or is falsy if everything went as expected. This allows handling of the result of the execution of the function.

```ts
import { readFile } from 'fs';

readFile('something.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```
