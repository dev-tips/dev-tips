Title: Get all unique/distinct values in a JavaScript array

-----

Date: 1605398268

-----

Description: To remove duplicates and get unique values from an array, we can use the »Set()« class, which creates a representation of the array with unique values from the existing array.

-----

Authors: rasshofer

-----

Text:

Let’s take the following list of names as an example. `Janet` is a duplicate in there.

```js
const list = [
  'George',
  'Janet',
  'Emma',
  'Eve',
  'Charles',
  'Janet',
  'Tracey',
];
```

Using `Set`, we can convert that array to a `Set` object that stores unique values.

```js
const unique = new Set(list);
```

As you can see, the duplicate `Janet` is removed.

(image: set.png)

However, the `Set` object is no array and thus usual array methods such as `.forEach()` or `.map()` won’t work. To fix this, you can convert the set back to an array by generating a new array based on the set using `Array.from()`.

```js
const unique = Array.from(new Set(list));
```

(image: array-from-set.png)

Of course, you can also use the spread operator.

```js
const unique = [...new Set(list)];
```

(image: spread-operator-set.png)
