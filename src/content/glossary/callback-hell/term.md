Title: Callback Hell

-----

Description: Interconnected anonymous callback functions that have a very strong coupling to each other and become correspondingly difficult to maintain.

-----

Authors: rasshofer

-----

Text:

The following example visualizes a callback hell of nested callbacks. When formatting and indenting the source code, an optical pyramid pattern emerges.

```ts
import { access, constants, readFile, writeFile } from 'fs';

access('something.txt', constants.F_OK, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  readFile('something-else.txt', 'utf8', (err2, data) => {
    if (err2) {
      console.error(err2);
      return;
    }
    doSomething(data, (err3, data2) => {
      if (err3) {
        console.error(err3);
        return;
      }
      writeFile('something-else.txt', data2, (err4) => {
        if (err4) {
          console.error(err4);
          return;
        }
        console.log('The file has been saved.');
      });
    });
  });
});
```

JavaScript’s promises are supposed to solve this issue. However, once you find a `then` inside the handler function of another `then`, you actually start building up promise hells/pyramids, thus missing all the advantages of promises. Instead, you should create a chain of promises that build on each other. This is much more readable and debugging is also easier.

Using `async`/`await` allows to write the source code in an even more readable manner. It’s based on promises and hides the asynchronous nature of operations. The execution of the code is nevertheless still paused at each step until the operation is completed.
