Title: »Truthy« and »falsy« values in JavaScript

-----

Date: 1428522382

-----

Authors: rasshofer

-----

Text:

The terms »truthy« and »falsy« are an essential feature (not a bug!) of the JavaScript language, stating that values aren’t just `true` when talking about »truthy« neither just `false` when talking about »falsy«. What’s meant is that values coerce to `true` or `false` when evaluated in a boolean context. Thus, something which evaluates to `true` is truthy and something which evaluates to `false` is falsy.

Let’s have a look at a simple function to test a value for its truthiness/falsiness.

```js
function checkTruthiness(value) {
    console.log(value ? 'Truthy' : 'Falsy');
}
```

This function takes the `value` parameter and evaluates it in a boolean context (= the condition of the ternary `if`-statement). As a result, all of the following values are truthy values.

```js
checkTruthiness(true);

checkTruthiness({});

checkTruthiness([]);

checkTruthiness('Lorem ipsum');

checkTruthiness(1.23);

checkTruthiness(new Date());
```

While there are a lot of truthy values in JavaScript, there are actually only six falsy values. Thus, memorizing that list is the easiest way to tell whether a value is truthy or falsy.

```js
checkTruthiness(false);

checkTruthiness(null);

checkTruthiness(undefined);

checkTruthiness(NaN);

checkTruthiness(0);

checkTruthiness('');
```

Looking for an example where truthiness/falsiness is actually helpful? Assuming you want to make sure a user name is set before you’re saving the user to your database, you could do a explicit check on all single possibilities manually…

```js
if (user.name !== undefined && user.name !== null && user.name !== '') {
    users.push(user);
}
```

…or you make use of the falsiness of those values.

```js
if (user.name) {
    users.push(user);
}
```

However, there some caveats to keep in mind.

- If `0` as an username was meaningful, your user wouldn’t be able to register as `0` evaluates to `false`. Or if a user has to specify how many children he/she has, `if (user.children) { … }` would exclude all people who validly specified the information but don’t having any children.
- Truthiness isn’t the same as `== true`. While `if (expression) { … }` checks for truthiness, `x == y` uses conversions to determine equality. It’s not exactly the same concept and the algorithm for loose equality is much more complicated than for truthiness.
- It’s possible to explicitly wrap a primitive (string, number, null, undefined, boolean) in an object, making it truthy. For example, while `0` is falsy, `new Number(0)` is truthy. An even scarier example is `new Boolean(false)` which is also truthy.
