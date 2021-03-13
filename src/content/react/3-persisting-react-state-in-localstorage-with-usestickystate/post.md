Title: Persisting React state in localStorage with »useStickyState«

-----

Date: 1615596990

-----

Description: Learn how you can implement a custom React hook that serves as drop-in replacement for »useState« but persists any state update e.g. in localStorage.

-----

Authors: rasshofer

-----

Text:

Fundamentally, all we need is a hook that serves as a wrapper around React’s built-in `useState` and takes care of persisting changes.

```tsx
import { useEffect, useState } from 'react';
import { getItem, setItem } from './storage';

export const useStickyState = <T>(
  defaultValue: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = getItem<T>(key);
    return stickyValue ?? defaultValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
```

```tsx
const [items, setItems] = useStickyState<string[]>([], 'items');
```

As you can see, we’re basically proxying React’s `useState` but we’re reading the initial value from `localStorage` and whenever there’s a change to the value, we’re writing that update to `localStorage`. Thus, while React’s `useState` hook only takes a single argument (i.e. the default value), `useStickyState` takes two arguments: the initial value as-is and the storage key used for getting/setting the value persisted in `localStorage`.

(In the example above, (reference: javascript/fail-safe-localstorage-sessionstorage-in-javascript text: a fail-safe localStorage implementation) is used and thus imported.)
