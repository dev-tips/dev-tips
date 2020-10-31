Title: Sort an array of objects by property in JavaScript

-----

Date: 1604139108

-----

Description: How to sort an array of objects by a property in JavaScript using a custom comparator function.

-----

Authors: rasshofer

-----

Text:

Now that we know (reference: javascript/why-sort-orders-numbers-and-special-characters-in-javascript-wrong text: how sorting in JavaScript works in general), we can have a look at implementing a custom comparator function for sorting an array of objects by a property value.

```js
const people = [
  {
    first_name: 'George',
    last_name: 'Bluth',
    age: 34,
  },
  {
    first_name: 'Janet',
    last_name: 'Weaver',
    age: 19,
  },
  {
    first_name: 'Tracey',
    last_name: 'Ramos',
    age: 67,
  },
];
```

We can now simply apply the known comparisons based on the different property types (i.e. numbers vs. strings).

```js
people.sort((a, b) => a.age - b.age);
```

```js
people.sort((a, b) => {
  return a.first_name.localeCompare(b.first_name);
});
```

Easy.
