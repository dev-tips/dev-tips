Title: I see some JavaScript scripts using »!0« and/or »!1« occasionally. What does that mean exactly?

-----

Date: 1405159440

-----

Authors: rasshofer

-----

Asker: Anonymous

-----

Answer:

Those are shortcuts for `true` and `false`, making use of JavaScript’s logical NOT operator (the exclamation point) and the fact that JavaScript uses weak typing, meaning that `0`, `false` and `null` all mean the same in comparisons unless you force JavaScript to compare the type as well (by using `===`). Using this knowledge, you can shorten `true` using `!0` and `false` using `!1`.
