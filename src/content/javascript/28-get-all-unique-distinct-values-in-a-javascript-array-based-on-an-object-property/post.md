Title: Get all unique/distinct values in a JavaScript array based on an object property

-----

Date: 1605954448

-----

Description: To remove object duplicates based on a property and get unique values from an array, using the »Set()« class won’t work and a custom implementation is necessary.

-----

Authors: rasshofer

-----

Text:

Let’s take the following list of people as an example. The name `Janet` is a duplicate in there.

```js
const list = [
  {
    name: 'George',
    age: 56,
  },
  {
    name: 'Janet',
    age: 34,
  },
  {
    name: 'Charles',
    age: 12,
  },
  {
    name: 'Janet',
    age: 89,
  },
  {
    name: 'Tracey',
    age: 67,
  },
];
```

As using `Set` won’t work for non-primitive array items, you need to implement a custom function that handles the filtering.

The underlying logic is to filter an array (which is what `.filter()` is doing) and check whether the current item’s index in the array is the same one as the very first index/occurrence (which is what `.findIndex()` is returning).

If that’s the case, it’s the first item in the list and the function will catch both unique values and the first occurrence of duplicates. If it’s not the case, that means the current item is a duplicate as one of the preceding items has the exact same value.

```js
list.filter((file, index, self) => {
  return self.findIndex((item) => item.name === file.name) === index;
});
```

(image: filter-result.png)
