Title: Generics

-----

Description: Data types with the possibility to abstract a data type from its underlying types by specifying type parameters. Also called »parameterized types«.

-----

Authors: rasshofer

-----

Text:

In the first typed programming languages (e.g. Pascal), developers had to define the same data structure for each data type that was supported over and over again. For example, a list of numbers, a list of characters, and a list of of dates is (basically) programmed in the same way: the algorithms for insertion, search, and deletion always run the same way.

Thus it was desirable to make the implementation of e.g. lists independent of their types. Additional variables for types, so-called type variables were introduced. These type variables represent unknown types at the time of the implementation. Only with the use of the type, classes, interfaces, or methods, these type variables are replaced by specific types.

`type Maybe<T> = T | void` is an example for generics in (term: TypeScript). Any type can be passed to `Maybe`, e.g. `Maybe<User>` or `Maybe<number>`.

This way, abstracted but type-safe programming can be ensured.
