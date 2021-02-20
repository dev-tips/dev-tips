Title: Why generic type parameters are called »T« and why you should not use these short names

-----

Date: 1613815300

-----

Description: Most generic type parameters are simply called »T« (or »E« or »K« or »V« or »P« or any other one-letter name) which leads to highly unreadable types. Instead, you can (and should!) use proper descriptive type names for generic type parameters.

-----

Authors: rasshofer

-----

Text:

You may have seen TypeScript type definitions like `type Maybe<T> = T | void`. Those are »generics«, i.e. types that abstract from the specific type and allow to build (type-safe) container types that can hold any type/object. In this example, any other type can be passed to `Maybe` (e.g. `Maybe<User>` or `Maybe<number>`).

The question is: what does the `T` stand for in `Maybe<T>`?

`<T>` is an abbreviation for `<Type>` and there are several other quite usual abbreviations in use across the TypeScript landscape (and other programming languages which support generics).

- `T` is meant to be a generic `Type`
- `E` is meant to be an `Element` (e.g. `Array<E>` as a list of elements)
- `K` is `Key` (in a `Map<K, V>`)
- `V` is `Value` (as a return value or mapped value in `Map<K, V>`)
- `P` is `Property` (or `Props` in the React world)

If you know that, reading these generic types is easy. What most developers don’t know and consider is that you don’t have to use these abbreviations. You can also simply use proper descriptive type names for generic type parameters.

`type Maybe<Type> = Type | void` works exactly the same as `type Maybe<T> = T | void`.

Thus, I highly recommend to not use cryptic abbreviations anymore but such descriptive type names instead. It’s a lot more readable.
