Title: Pragma

-----

Description: Transpilers like Babel or TypeScript convert JSX/TSX to plain JavaScript by transforming it to »React.createElement« function call. The name of the function is defined using a »pragma«.

-----

Authors: rasshofer

-----

Text:

It’s a way to define the underlying JavaScript which should be used to transpile JSX/TSX to JavaScript. As JSX/TSX has its origins in the React world, `React.createElement` is the default pragma of most transpilers like (npm: @babel/plugin-transform-react-jsx), setting a default pragma of `/* @jsx React.createElement */` automatically in the background.

```jsx
const Collection = ({ variant, links }) => {
  return (
    <div className={`collection collection--${variant}`}>
      {links.map(({ url, label }) => (
        <div key={url} className="collection__item">
          <Link to={url}>
            {label}
          </Link>
        </div>
      ))}
    </div>
  );
};
```

The JSX example above would be transpiled to the following plain JavaScript code.

```js
const Collection = ({
  variant,
  links
}) => {
  return React.createElement('div', {
    className: `collection collection--${variant}`
  }, links.map(({
    url,
    label
  }) => React.createElement('div', {
    key: url,
    className: 'collection__item'
  }, React.createElement(Link, {
    to: url
  }, label))));
};
```

A custom pragma can be defined using a `/* @jsx demo */` annotation comment at the beginning of the file. In this case, the custom function `demo` (which then needs to be defined resp. made available globally) would be used instead of `React.createElement`.

```js
/* @jsx demo */
const Collection = ({
  variant,
  links
}) => {
  return demo('div', {
    className: `collection collection--${variant}`
  }, links.map(({
    url,
    label
  }) => demo('div', {
    key: url,
    className: 'collection__item'
  }, demo(Link, {
    to: url
  }, label))));
};
```

This way, any kind of custom logic/rendering can be implemented based on JSX/TSX, allowing you to use it without React. For example, (term: Preact) is using JSX as well but a different pragma.

In general, a pragma method takes two parameters and a rest argument.

```js
createElement(tagOrComponent, attributes, ...children)
```

`tagOrComponent` is either a tag name for a native element (e.g. `div`) or a reference to another node/component/value in the JSX scope. `attributes` is an object consisting of key/value pairs that were passed to the element. `...children` is a rest argument collects the »rest« of the arguments into an array, i.e. an array of the children inside that tag. (These children are already processed with the custom pragma method beforehand automatically.)
