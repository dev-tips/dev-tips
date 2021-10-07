Title: Ponyfill

-----

Description: While Polyfills patch native browser/engine APIs, ponyfills export the same functionality as a regular module and thus are considered free of side effects and not affecting the environment.

-----

Authors: rasshofer

-----

Text:

Usually, (term: Polyfill text: polyfills) extend or override global JavaScript prototypes and/or built-ins, affecting any code running in that environment. This may become especially problematic once a polyfill is not 100% compliant to its specification (which sometimes simply is impossible) and thus causing inconsistencies and bugs that are hard to analyze and debug.

For example, (npm: object-assign) is a ponyfill for the `Object.assign()` method which was added as part of (term: ES text: ES2015) and needs to be provided for ES5 browsers/engines.

To use the ponyfill, you’d have to import it (e.g. via `const objectAssign = require('object-assign')`) and then use it. It doesn’t override the prototype of `Object` and would not be available out of the box (as used to from polyfills).
