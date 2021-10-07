Title: TypeScript

-----

Description: A superset of JavaScript, i.e. an implementation of ECMAScript but extending JavaScript with additional features such as types.

-----

Authors: rasshofer

-----

Text:

Type safety primarily supports the developer and thus results in higher code quality, although in the end the resulting code is still executable in as-is JavaScript environments as types are stripped during compilation. It also allows to compile to an (almost) arbitrary target ECMAScript definition (i.e. JavaScript version) such as ES5 which is supported by pretty much all browsers. It can be configured in the compiler options (i.e. a file called `tsconfig.json`). The TypeScript compiler requires information about the »shape« of imported files and modules which are `.d.ts` files (i.e. »type definition« files) or JSDoc annotations.
