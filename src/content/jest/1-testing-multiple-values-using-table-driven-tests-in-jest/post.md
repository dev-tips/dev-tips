Title: Testing multiple values using table-driven tests in Jest

-----

Date: 1620553496

-----

Description: How table-driven tests in Jest can help you avoiding writing boilerplate for similar test cases.

-----

Authors: rasshofer

-----

Text:

`describe.each` simplifies test suites that work with different data but test the same function.

```js
describe.each([
  { a: 1, b: 2, expected: 3 },
  { a: 3, b: 4, expected: 7 },
  { a: -5, b: -6, expected: -11 },
])('add($a, $b)', ({ a, b, expected }) => {
  it(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

In addition, you can use tagged template literals to do the same thing.

```js
describe.each`
  a     | b     | expected
  ${1}  | ${2}  | ${3}
  ${3}  | ${4}  | ${7}
  ${-5} | ${-6} | ${-11}
`('add($a, $b)', ({ a, b, expected }) => {
  it(`returns ${expected}`, () => {
    expect(add(a, b)).toBe(expected);
  });
});
```

(However, it’s usually easier to use a plain array of objects.)

In Jest’s CLI output, the table is executed and represented as standalone test cases.

(image: jest-output.png)
