Title: Autoboxing

-----

Description: The automatic conversion of a primitive data type such as »int« or »float« into the corresponding wrapper class such as »Integer« and »Float«.

-----

Authors: rasshofer

-----

Text:

If an application expects a wrapper class but is called with a primitive data type, the primitive data type is automatically converted to its wrapper class. The same happens if a primitive data type is expected but a wrapper class is passed – the wrapper class then is converted to a primitive data type automatically.

This is necessary due to generic classes like `List` or `Map`. These can’t be created with primitive data types but only with an object-oriented type. Trying to create a list with a primitive data type (such as `int` or `float`) will fail already at compile time.

Autoboxing is applied when a primitive value is passed to a method that expects an object-oriented type or when a primitive value is assigned to a variable of an object-oriented type.

»Autounboxing« refers to the the opposite: the automatic conversion of a wrapper class into its corresponding primitive data type. It’s used when an object is passed to a method that expects a primitive type or when an object is assigned to a variable of a primitive type.
