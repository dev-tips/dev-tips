Title: Ensuring reliable typings using TypeScript’s type guards

-----

Date: 1614542500

-----

Description: Learn how type guards allow distinguishing and narrowing union types and ensure reliable typings of third-party data (e.g. from APIs).

-----

Authors: rasshofer

-----

Text:

While »type guard« may sound complex and fancy initially, TypeScript already has some built-in type guards such as `typeof` or `instanceof` which you may have used before without thinking too much about it. Whenever you’re using an union type (e.g. `string | number` or `Person | Company`) in your code, TypeScript needs to know the exact typing in a specific scope, e.g. when using a method that is only supported for one of the types of the union.

When consuming data from a (third-party) API, you’re basically facing the same challenge: you’ll receive data and most likely you’re not able to confidently ensure that the data you receive is exactly what you expect and may represent with a TypeScript type internally. Sure, you may negotiate API contracts with the other party but still you’d want to prevent runtime errors as good as possible if the API nevertheless returns data differing from the agreed typing contract as errors always can happen.

To allow such type detection/validation, TypeScript uses type guards. These are expressions and functions that check values of unknown typing, perform checks (at runtime) to detect and identify the type of that value, and to tell TypeScript internally that it can be confident that the value is of a certain type for a certain scope.

### typeof

`typeof` is actually inherited from plain JavaScript and provides basic information about the type of values at runtime. It may already help in distinguishing different types to implement different behaviour.

```ts
const formatPrice = (price: string | number): string => {
  if (typeof price === 'number') {
    // TypeScript knows that `price` is a number in here
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  }
  // TypeScript knows that `price` has to be a string here
  return price;
};
```

(Please keep in mind that `typeof null` (reference: javascript/typeof-null-object text: returns »object«), so just using `typeof` may not necessarily be enough to be type-safe.)

## Array.isArray

As `typeof` returns `object` for arrays (as all arrays are objects), you may want to use `Array.isArray()` instead for identifying arrays. This way, TypeScript will derive the fact that some value is an array in the respective scope.

```ts
const sayHello = (audience: string | string[]): string => {
  if (Array.isArray(audience)) {
    // TypeScript knows that `audience` is an array in here
    return `Hello ${audience.join(', ')}`;
  }
  // TypeScript knows that `audience` has to be a string here
  return `Hello ${audience}`;
};
```

### instanceof

Working with classes and/or interfaces, `instanceof` may be most helpful to distinguish different classes that implement the same interface or extend the same class. It allows to determine whether or not a type is of a particular constructor function.

```ts
class Person {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class Company {
  public companyName: string;

  constructor(companyName: string) {
    this.companyName = companyName;
  }
}
```

```ts
const getName = (obj: Person | Company): string => {
  if (obj instanceof Person) {
    // TypeScript knows that `obj` is `Person` in here
    return `${obj.firstName} ${obj.lastName}`;
  }
  // TypeScript knows that `obj` has to be `Company` here
  return obj.companyName;
};
```

## Custom user-defined type guards

Especially with third-party data, you may want to run a type guard check on the received data to detect whether prerequisites are given for TypeScript to assume the respective type.

```ts
type Post = {
  id: number;
  title: string;
  text: string;
};

const isValidPost = (input: unknown): input is Post => {
  return (
    typeof input === 'object' &&
    input !== null &&
    Object.prototype.hasOwnProperty.call(input, 'id') &&
    Object.prototype.hasOwnProperty.call(input, 'title') &&
    Object.prototype.hasOwnProperty.call(input, 'text')
  );
};
```

`input is Post` is the important piece in there. Instead of returning `boolean`, this function will tell TypeScript whether the input parameter is of type `Post`. As this check will be executed during runtime, it needs to return a `boolean` value but for TypeScript, it’s more than that in regard to the typing during compilation.

Using that type guard, fetched data can be validated and TypeScript will automatically derive that it’s of type `Post` in the scope of the check.

```ts
const example = fetchPost();

if (isValidPost(example)) {
  // TypeScript now can be confident that this is a valid post
  // Thus `title` can be accessed/used
  console.log(example.title);
}
```

The core idea/concept of such type guards is »duck typing«, based on a poem by the American writer James Whitcomb Riley. Instead of analyzing a bird, we’re simply doing the exact same thing with unknown values or unions in TypeScript.

> When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck.

Of course, simply checking for the existence of the properties (e.g. via the `hasOwnProperty` method shown above) may not be sufficient. It’s up to you how detailed you want to check the input, e.g. not only check the existence of properties but also their typing (e.g. that `id` is indeed a `number` and `title`/`text` is indeed a `string`). Without narrowing and casting, you may not be able to access properties such as `id`, `title`, or `text` of type `object`.

Type guards can also be combined to represent complex data structures, e.g. by building on top of each other.

```ts
const isValidPostList = (input: unknown): input is Post[] => {
  return Array.isArray(input) && input.every(item => isValidPost(item));
};
```

Of course, custom user-defined type guards may not only be used for unknown data but also for distinguishing regular union types.

```ts
type SomeThing = {
  name: string;
};

type SomeOtherThing = {
  name: string;
  type: 'SomeThing';
};

const isSomeThing = (
  input: SomeThing | SomeOtherThing,
): input is SomeThing => {
  return (
    Object.prototype.hasOwnProperty.call(input, 'type') &&
    'type' in input &&
    input.type === 'SomeThing'
  );
};
```
