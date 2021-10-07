Title: JSX

-----

Description: An extension of the JavaScript programming language and fundamental concept of React, allowing HTML-like elements to be used seamlessly in JavaScript.

-----

Authors: rasshofer

-----

Text:

This way, JSX elegantly combines (display) logic with layout. It breaks with the widespread concept of strictly separating layout and logic. Many other UI frameworks define logic with a programming language, but layout with a template language.

The idea behind JSX, on the other hand, is to no longer separate by technology, but by responsibility. By no longer requiring a component to be combined from two entities, JSX helps to write self-contained components that are highly reusable.

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

(term: Transpiling text: Transpilers) like (term: Babel) convert JSX to plain JavaScript by transforming it to the proper `React.createElement` function call.

The name of that function can be customized/defined using the so-called (term: Pragma text: pragma).

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

Thus, JSX basically is just syntax sugar and way of writing the bumpy JavaScript code above in an elegant manner.
