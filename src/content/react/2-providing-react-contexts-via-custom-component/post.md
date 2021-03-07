Title: Providing React contexts via custom component

-----

Date: 1615140690

-----

Description: If you want to have a sprinkle of syntactic sugar in your project and implement a context with custom logic in/around it, you can provide the context using a custom component.

-----

Authors: rasshofer

-----

Text:

You can simply wrap the context provider component in your custom component and implement any additional custom logic in/around it.

```tsx
export const ThemeContext = React.createContext<Theme | Tokens>('default');

export const ThemeProvider: FC<{
  theme?: Theme;
  tokens?: Tokens;
}> = ({ theme, tokens, children }) => {
  const value = tokens ?? theme;
  return value ? (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  ) : null;
};
```

Now you can simply use `<ThemeProvider>` with different properties.

```tsx
<ThemeProvider theme="demo">
  <Button />
</ThemeProvider>
```

```tsx
<ThemeProvider tokens={{ primary: '#f00' }}>
  <Button />
</ThemeProvider>
```
