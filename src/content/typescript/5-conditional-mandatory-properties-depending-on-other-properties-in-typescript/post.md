Title: Conditional mandatory properties depending on other properties in TypeScript

-----

Date: 1634551962

-----

Description: Learn how you can facilitate union types to implement types where the necessity of specific properties can be defined depending on other properties in the same type.

-----

Authors: rasshofer

-----

Text:

Let’s take the following example: we’d like to have a type that optionally accepts the property `animate` of type `boolean`. If it's set to `true`, we want to ensure that the properties `animationType` and `animationDelay` are mandatory as well. If it’s set to `false` (or left out completely), these properties shall not be mandatory.

We can achieve this by facilitating an union type that covers both these points of view.

```ts
type WithAnimation = {
  animate: true;
  animationType: 'fadeIn' | 'slideIn';
  animationDelay: number;
};

type WithoutAnimation = {
  animate?: false;
};

type Example = WithAnimation | WithoutAnimation;
```

`WithAnimation` covers the happy path of `animate` set to `true` while `WithoutAnimation` covers the `false` and `undefined` case. `Example` represents an union of both possibilities.

The following example wouldn’t pass as `animate` is `true` but `animationType` and `animationDelay` aren’t defined.

```ts
const example: Example = {
  animate: true,
};
```

On the contrary, the following examples would pass as expected as all respective mandatory fields are provided.

```ts
const example: Example = {
  animate: true,
  animationType: 'fadeIn',
  animationDelay: 123,
};
```

```ts
const example: Example = {
  animate: false,
};
```

```ts
const example: Example = {};
```
