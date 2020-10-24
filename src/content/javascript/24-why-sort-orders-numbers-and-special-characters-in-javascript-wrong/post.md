Title: Why .sort() orders numbers and special characters in JavaScript wrong

-----

Date: 1603539708

-----

Description:

By default, the sort() method orders values as strings alphabetically and in ascending order. While this works well for simple ASCII strings, it will result in invalid orders for numbers or strings with special characters like umlauts or accents.

-----

Authors: rasshofer

-----

Text:

To understand how `.sort()` works, let’s have a look at a few examples.

```js
['George', 'Janet', 'Emma', 'Eve', 'Charles', 'Tracey'].sort();
// = ['Charles', 'Emma', 'Eve', 'George', 'Janet', 'Tracey']
```

Sorting simple strings works fine and the resulting array is as expected.

```js
['Cäcilia', 'Janet', 'Èmma', 'Eve', 'Charles', 'Jörg', 'Julian'].sort();
// = ['Charles', 'Cäcilia', 'Eve', 'Janet', 'Julian', 'Jörg', 'Èmma']
```

Sorting real-world strings with special characters like umlauts or characters with accents mixes up the default `.sort()` implementation. Usually, »Èmma« would be coming before »Eve« and »Jörg« would be between »Janet« and »Julian«.

```js
[1, 25, 100, 3000].sort();
// = [1, 100, 25, 3000]
```

The same »misbehaviour« is true for sorting numbers. Usually, »25« would be coming between »1« and »100« but the sorting order seems to be completely mixed up.

## Why?

The reason for this bumpy sorting is that `.sort()` by default uses the UTF codepoints of values to compare values with each other.

Let’s convert the strings to such codepoints to see, what’s going on.

```js
const encoder = new TextEncoder();
encoder.encode('Cäcilia'); // [67, 195, 164, 99, 105, 108, 105, 97]
encoder.encode('Janet'); // [74, 97, 110, 101, 116
encoder.encode('Èmma'); // [195, 136, 109, 109, 97]
encoder.encode('Eve'); // [69, 118, 101]
encoder.encode('Charles'); // [67, 104, 97, 114, 108, 101, 115]
encoder.encode('Jörg'); // [74, 195, 182, 114, 103]
encoder.encode('Julian'); // [74, 117, 108, 105, 97, 110]
```

For »Èmma« and »Eve«, `195` (= first character of »Èmma«) is greater than `69` (= first character of »Eve«), so according to this logic, »Èmma« comes after »Eve«. As `195` is the highest value for the first character of all names in that array in general, »Èmma« is sorted to the very end of the list.

For »Jörg«, »Janet«, and »Julian«, `195` (= second character of »Jörg«) is greater than `97` (= second character of »Janet«) and `117` (= second character of »Julian«), so »Jörg« is sorted after »Julian«.

Let’s do the same analysis for the number example as well.

```js
const encoder = new TextEncoder();
encoder.encode(1); // [49]
encoder.encode(25); // [50, 53]
encoder.encode(100); // [49, 48, 48]
encoder.encode(3000); // [51, 48, 48, 48]
```

`50` (= first character of »25«) is greater than `49` (= first character of both »1« and »100«), so »25« is sorted after »100« erroneously.

## How to fix

To sort numbers, a so-called »comparator function« can be specified. Comparator functions are actually kind of easy and have 3 expected kinds of return values. This makes sense as the comparator function takes 2 values and compares them with each other – naturally, there’s 3 potential outcomes of such a comparison.

- A is smaller than B → negative number (e.g. `-1` or `-123`)
- A is greater than B → positive number (e.g. `1` or `123`)
- A is equal to B → zero (i.e. `0`)

How the comparator function comes to one of these 3 possible return values is the job of the custom implementation. Let’s implement a comparator function to sort numbers properly.

```js
[1, 20, 100, 3000].sort((a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
});
// = [1, 20, 100, 3000]
```

Now the sorting order is looking good. For numbers, this can even be shortened to a simple mathematical subtraction.

```js
[1, 20, 100, 3000].sort((a, b) => a - b);
// = [1, 20, 100, 3000]
```

This works because the W3C specification only mandates negative and positive values and subtracting a greater number from a smaller number leads to a negative remainder and thus negative return value, subtracting a smaller number from a greater number leads to a positive remainder and thus positive return value, and subtracting identical numbers results in 0.

To sort strings with characters from languages other than English, the `localeCompare` method can be used to compare these strings so that they are displayed in the correct/expected order.

```js
['Cäcilia', 'Janet', 'Èmma', 'Eve', 'Charles', 'Jörg', 'Julian'].sort((a, b) => {
  return a.localeCompare(b);
});
// = ['Cäcilia', 'Charles', 'Èmma', 'Eve', 'Janet', 'Jörg', 'Julian']
```

It’s important to keep in mind that `localeCompare` actually is nothing but a pre-defined comparator function that also simply returns a number indicating whether a string comes before, or after, or is the same as the given string in sort order.

If you want to be able to sort both strings and numbers, the `localeCompare` can be configured to do so as well.

```js
[1, 20, '10', 100, 'Eve', 3000, 'Jörg', 'Èmma'].sort((a, b) => {
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
});
// = [1, '10', 20, 100, 3000, 'Èmma', 'Eve', 'Jörg']
```

(As `localeCompare` is a `String` method, we need to convert the numbers to strings first – that’s what `String(a)` and `String(b)` in the example above is about.)
