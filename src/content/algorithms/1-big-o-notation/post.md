Title: »Big O« notation

-----

Date: 1622920294

-----

Description: How the notation works, what it is used for, and examples for the most common time complexities (constant, linear, logarithmic, quadratic, and exponential) in JavaScript.

-----

Authors: rasshofer

-----

Text:

The »Big O« notation is used to describe the performance (i.e. the speed as well as the size of memory used) and complexity (i.e. the number of operations) of an algorithm based on the number of operations. It allows to make statements about how performant an algorithm is when the number of processed data increases and how the algorithm compares to other algorithms on a high level of abstraction. Algorithms can be compared independently of implementation details such as programming language, compiler, and hardware properties.

Most algorithms have a main parameter (math: n), which specifies the number of elements of the data set to be processed. The most common complexities are as follows.

- Constant: (math: O|LEFT_PARENTHESIS|1|RIGHT_PARENTHESIS|)
- Linear: (math: O|LEFT_PARENTHESIS|n|RIGHT_PARENTHESIS|)
- Logarithmic: (math: O|LEFT_PARENTHESIS|log n|RIGHT_PARENTHESIS|)
- Quadratic: (math: O|LEFT_PARENTHESIS|n^2^|RIGHT_PARENTHESIS|)
- Exponential: (math: O|LEFT_PARENTHESIS|2^n^|RIGHT_PARENTHESIS|)

However, one should keep in mind that the »Big O« notation is only meaningful when the number of (math: n) elements is very high.

## Constant – O(1)

This is the best possible value/performance. It means that the algorithm always takes the same time, regardless of how much data has to be processed.

The following example demonstrates this. We want to get the first item of an array. It doesn’t matter how big the input size is, it always takes the exact same amount of runtime to find that first element in the array.

```ts
const isFirstItemEmpty = (items: string[]): boolean => {
  return items[0] === '';
};
```

(image: constant.svg bordered: true)

## Linear – O(n)

This algorithm has a good performance. Its performance grows in direct proportion to the size of the processed input data set. For example, doubling the amount of processed data leads to a doubling of the required time resp. the amount of computations.

The following example demonstrates this. We’re looping over an array to check for a value in there. The more elements there are in that array, the longer it will take to finish looping over it.

```js
const isEmptyString = (item: string): boolean => {
  return item === '';
};

const hasEmptyItem = (items: string[]): boolean => {
  let result = false;
  items.forEach(item => {
    // `checkSomething` is executed for each item in the array
    if (isEmptyString(item)) {
      result = true;
    }
  });
  return result;
};
```

(image: linear.svg bordered: true)

Of course, in real life, you’d use someting like `.some()` instead of `.forEach()` to stop after the first item that matches the intended condition and not waste loop iterations after that first match. The aforementioned example perfectly demonstrates how the »Big O« notation always examines the worst-case performance scenario, i.e. it’ll always assume the upper limit where the algorithm will perform the maximum number of iterations.

## Quadratic – O(n^2^)

This algorithm is slow. A doubling of the processed data leads to a quadrupling of the runtime. A common example for this are algorithms that use 2 (or more) nested loops, i.e. looping over an array and comparing the current element with all other elements in that same array for each loop iteration. It’s looping over all (math: n) elements and for each and every element it loops over the (math: n) elements again. This ends up being (math: n × n), which can be written as (math: n^2^).

While (math: O|LEFT_PARENTHESIS|n^2^|RIGHT_PARENTHESIS|) represents an algorithm where its performance is directly proportional to the square of the size of the processed data, any level of nested iterations is possible and will result in (math: O|LEFT_PARENTHESIS|n^3^|RIGHT_PARENTHESIS|), (math: O|LEFT_PARENTHESIS|n^4^|RIGHT_PARENTHESIS|), (math: O|LEFT_PARENTHESIS|n^5^|RIGHT_PARENTHESIS|), …, (math: O|LEFT_PARENTHESIS|n^m^|RIGHT_PARENTHESIS|) depending on the amount/depth of nesting.

```ts
const containsDuplicates = (items: string[]): boolean => {
  let result = false;
  // Outer loop iterating over all items
  for (let outer = 0; outer < items.length; outer++) {
    // Inner loop iterating over all items again for each item of the outer loop
    for (let inner = 0; inner < items.length; inner++) {
      // Don’t consider the item being compared with itself as duplicate
      if (outer !== inner && items[outer] === items[inner]) {
        result = true;
      }
    }
  }
  return result;
};
```

(image: quadratic.svg bordered: true)

Again, in real life, you’d use someting like `.some()` instead of `for` or use an early `return` statement to break the loop iterations once a match has been found. The aforementioned example again is supposed to demonstrate how the »Big O« notation always examines the worst-case performance scenario.

## Logarithmic – O(log n)

This is a pretty good value. This type of algorithm splits the size of the processed input data into half iteratively on each loop iteration, i.e. each loop halves the search range of the next loop. This way, even with a large amount of processed data, such an algorithm is still pretty fast. A common example is binary search.

(image: logarithmic.svg bordered: true)

The bigger the input size gets, the smaller the difference in runtime will be.

The idea of binary search is to first select the middle item and to check whether the searched value is in the left or right half of the list. For this to work, the prerequisite for the binary search procedure is that the array is sorted. Then it continues with the half in which the item is located and continues to split/slice until the value is found (or the end of the list is reached).

```ts
const binarySearch = (haystack: number[], needle: number): number => {
  let lower: number = 0;
  let upper: number = haystack.length - 1;

  while (lower <= upper) {
    const middle = lower + Math.floor((upper - lower) / 2);

    if (haystack[middle] === needle) {
      // Found a match at the current position
      return middle;
    } else if (middle > needle) {
      // Continue with the left half of the list
      upper = middle - 1;
    } else {
      // Continue with the right half of the list
      lower = middle + 1;
    }
  }

  // If we get here we tried to look at an invalid sub-list which means the number isn’t in our list
  return -1;
};
```

By the way: actually, the complexity is (math: O|LEFT_PARENTHESIS|k × log n|RIGHT_PARENTHESIS|) where (math: k) is the runtime of the comparison operation. When comparing primitive data types such as numbers as shown above, (math: k = 1), so the runtime of the binary search for numbers is (math: O|LEFT_PARENTHESIS|1 × log n|RIGHT_PARENTHESIS|) and can be shortened to (math: O|LEFT_PARENTHESIS|log n|RIGHT_PARENTHESIS|). When comparing strings or lists, (math: k) depends on their length.

## Exponential – O(2^n^)

These algorithms should be avoided. If an algorithm’s complexity is (math: O|LEFT_PARENTHESIS|2^n^|RIGHT_PARENTHESIS|), its runtime doubles with each addition to the processed input data set. For example, while 4 items would take (math: 2^4^ = 16) seconds, 5 items already take (math: 2^5^ = 32) seconds, and 6 items take (math: 2^6^ = 64) seconds, and so on and so forth. The algorithm starts harmless enough but grows extremely fast and reaches extraordinarily large proportions very quickly and for a fairly small value of (math: n) as the runtime gets doubled after every addition.

(image: exponential.svg bordered: true)

An illustrative example of an (math: O|LEFT_PARENTHESIS|2^n^|RIGHT_PARENTHESIS|) algorithm/function is the recursive calculation of Fibonacci numbers. (The following exemplary implementation starts with (math: 0) instead of (math: 1) as in Fibonacci’s original definition.)

```ts
const fibonacci = (n: number): number => {
  if (n < 1) {
    return 0;
  }

  if (n < 2) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};
```

Here, (math: O|LEFT_PARENTHESIS|2^n^|RIGHT_PARENTHESIS|) is not about the resulting Fibonacci numbers but the amout of computations based on (math: n). Running that function for (math: n = 1) to (math: n = 100), you’ll notice it slowing down quickly.

```ts
for (let n = 0; n <= 100; n++) {
  console.log(`${n} = ${fibonacci(n)}`);
}
```

Again, by using techniques like memoization or implementing it as an iterative function, the runtime and complexity of aforementioned `fibonacci` function can be improved/reduced and it’s implemented like this for demo purposes only.

## Conclusion

All in all, the following graph shows a comparison of all complexities for (math: n).

(image: comparison.svg bordered: true)
