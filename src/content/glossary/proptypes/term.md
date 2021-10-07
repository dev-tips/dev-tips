Title: PropTypes

-----

Description: An extension for React that can be used to make the props of React components type-safe. They form a good base for increasing the quality of the code of React applications and for detecting errors in a simpler and target-oriented way.

-----

Authors: rasshofer

-----

Text:

While being exposed as part of the (term: React) core module originally, PropTypes is nowadays available as standalone package (npm: prop-types). It consists of different validators that allow to specify what type specific props of a component are supposed to have. It’s available both for React’s class components and functional components. The following examples show how to check/validate that the type of prop `name` is `string` and present.

```jsx
import React from 'react';
import PropTypes from 'prop-types';

class Demo extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}, how are you?</h1>;
  }
}

Demo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Demo;
```

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const Demo = ({ name }) => <div>Hello {name}, how are you?</div>;

Demo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Demo;
```

In case a PropTypes typing is violated, an error message is logged in the client console.

(image: proptypes-validation-error.png)

While the aforementioned demos use the rather simple `PropTypes.string` validator, (npm: prop-types) provides a lot of different validators that can be found in the package documentation.

Compared to e.g. (term: TypeScript) typings, PropTypes are checked during runtime instead of compile-time. In general, compile-time typing checks should be preferred compared to runtime checks.
