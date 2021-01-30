Title: Fail-safe localStorage and sessionStorage in JavaScript

-----

Date: 1612009220

-----

Description: Checking whether »window.localStorage« or »window.sessionStorage« is defined isn’t enough. Some browsers like iOS Mobile Safari in private mode may still throw exceptions.

-----

Authors: rasshofer

-----

Text:

Having an in-depth review of the issue with Mobile Safari on iOS, you’ll see that it provides fully compliant interfaces for `window.localStorage` and `window.sessionStorage` but simply throws an error when trying to save anything due to it keeping available storage space at zero.

```txt
QuotaExceededError (DOM Exception 22): The quota has been exceeded.
```

While latest versions of Mobile Safari don’t throw exceptions anymore (but clear the storage after a few days if the user doesn’t interact with the associated website/application instead), this illustrates that you shouldn’t take storage being available (and usable) for granted.

To handle all environments across versions, platforms, and individual user preferences in a safe manner, you can implement/use a function that detects whether `localStorage` or `sessionStorage` is both supported, available, and usable – or, instead, you simply implement a tiny abstraction layer that wraps the interactions into `try`/`catch` and is capable of providing respectively useful fallback values.

```js
export const getItem = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key) ?? 'null') ?? undefined;
  } catch {
    return undefined;
  }
};

export const setItem = (key, value) => {
  try {
    return window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* NOOP */
  }
};

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* NOOP */
  }
};
```

As you can see, you can simply use these abstracted functions as a drop-in replacement for the native methods.

In addition, this allows to add support for complex data structures (such as objects) and a sprinkle of TypeScript typing on top. (However, you may want to consider using/adding type guards for ensuring that the data from the storage actually matches the specified type.)

Having this abstraction in-place, it also facilitates/simplifies to implement a fallback to e.g. cookies (e.g. via (npm: js-cookie)) or adding namespacing (such as your company/team/application name) to the storage keys to prevent accidential interference with other scripts that work with the local/session storage as well and may use the same keys.

```ts
const getNamespacedKey = (key: string): string =>
  ['my-custom-prefix', 'something-else', key].join(':');

export const getItem = <T>(key: string): T | undefined => {
  try {
    return (JSON.parse(
      window.localStorage.getItem(getNamespacedKey(key)) ?? 'null',
    ) ?? undefined) as T | undefined;
  } catch {
    return undefined;
  }
};

export const setItem = (key: string, value: any): void => {
  try {
    return window.localStorage.setItem(
      getNamespacedKey(key),
      JSON.stringify(value),
    );
  } catch {
    /* NOOP */
  }
};

export const removeItem = (key: string): void => {
  try {
    window.localStorage.removeItem(getNamespacedKey(key));
  } catch {
    /* NOOP */
  }
};
```
