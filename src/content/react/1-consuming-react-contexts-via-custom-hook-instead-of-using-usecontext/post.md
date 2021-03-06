Title: Consuming React contexts via custom hook instead of using »useContext«

-----

Date: 1615024900

-----

Description: If you want to have a sprinkle of syntactic sugar in your project and bring the simplicity of React hooks into your own logic, you can consume a React context using a custom hook.

-----

Authors: rasshofer

-----

Text:

All you need to do is implementing a custom hook that wraps the `useContext` call in it.

```ts
import { createContext, useContext } from 'react';

export const ThemeContext = createContext<Theme>('default');

export const useTheme = () => useContext(ThemeContext);
```

Now you don’t have to import `useContext` and `ThemeContext` anymore but only `useTheme`.

```tsx
import { useTheme } from '../hooks';

const Demo: FC = ({ children }) => {
  const theme = useTheme();
  return <div style={{ color: theme.primary }}>{children}</div>;
};
```

This also allows you to wrap and abstract any custom logic on top of that (e.g. consuming different contexts conditionally based on a property of the custom hook), if required.
