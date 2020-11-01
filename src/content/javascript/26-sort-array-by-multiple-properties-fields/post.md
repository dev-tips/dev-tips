Title: Sort an array by multiple properties/fields in JavaScript

-----

Date: 1604257908

-----

Description: Arrays can be sorted multi-dimensionally in JavaScript using a custom comparator function.

-----

Authors: rasshofer

-----

Text:

Knowing (reference: javascript/why-sort-orders-numbers-and-special-characters-in-javascript-wrong text: how sorting in JavaScript works in general), we can have a look at how multi-dimensional sorting can be implemented in a custom chained comparator function.

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
    first_name: 'Emma',
    last_name: 'Wong',
    age: 45,
  },
  {
    first_name: 'Eve',
    last_name: 'Holt',
    age: 33,
  },
  {
    first_name: 'Emma',
    last_name: 'Morris',
    age: 87,
  },
  {
    first_name: 'Tracey',
    last_name: 'Ramos',
    age: 67,
  },
  {
    first_name: 'Emma',
    last_name: 'Morris',
    age: 19,
  },
];
```

The basic idea is to chain comparators until one of them reaches a value not equal to zero. If the delta is either a negative number (i.e. A is smaller than B) or positive number (i.e. A is greater than B), this means that the values can be sorted on that level. But if the delta is `0`, that means the values are identical on the current level and the function needs to »fall back« to the next level in the comparison chain.

Assuming we’d like to sort the list above by `first_name` in ascending order, then `last_name` in ascending order (as fallback for identical first names), and finally the `age` in descending order (as fallback for identical first/last names).

```js
people.sort((a, b) =>
  a.first_name.localeCompare(b.first_name) ||
  a.last_name.localeCompare(b.last_name) ||
  b.age - a.age,
);
```

Due to `0` being (reference: javascript/truthy-and-falsy-values-in-javascript text: a falsy value), `||` would go on to the next comparison for comparisons where both values are equal. Thus `||` gives `first_name` priority over `last_name` and `last_name` over `price`.
