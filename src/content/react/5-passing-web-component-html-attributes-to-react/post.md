Title: Passing Web Component HTML attributes to React

-----

Date: 1636710717

-----

Description: When wrapping React into a native Web Component, you may want to pass HTML attributes of the custom element to your React component/application in order to work with these values.

-----

Authors: rasshofer

-----

Text:

The following implementation shows an extension of the base (reference: react/rendering-react-applications-as-native-web-components text: Web Component wrapping React). Here, a React context is used to make the configuration (resp. attributes) available within the whole application. Simply passing the properties to a single component (such as `<App />`) would work as well, of course.

By defining `defaultConfig`, we get both fallback values (in case not all expected attributes have been provided to the custom elemen) and we’re able to derive a list of keys that are supported and which need to be observed for changes.

```tsx
import { createContext, useContext } from 'react';

export type Config = {
  name?: string;
  variant: 'teaser' | 'inline';
};

export const defaultConfig: Config = {
  name: '',
  variant: 'inline',
} as const;

export const ConfigContext = createContext<Config | undefined>(undefined);

export const useConfig = (): Config =>
  useContext(ConfigContext) ?? defaultConfig;

```

Based on the React context defined above and the default configuration, the rendering part is moved out of the `connectedCallback` lifecycle callback method into the standalone helper method `renderReact` so it can be triggered initially and whenever HTML attributes are changed, appended, removed, or replaced. `connectedCallback` now only generates and injects the mount point and triggers the `renderReact` method initially.

```tsx
class DemoApplication extends HTMLElement {
  private mountPoint?: HTMLDivElement;

  renderReact() {
    const config = Object.entries(defaultConfig).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]:
          this.getAttribute(key) ??
          this.getAttribute(key.toLowerCase()) ??
          value,
      }),
      {} as Config,
    );

    if (this.mountPoint) {
      ReactDOM.render(
        <React.StrictMode>
          <ConfigContext.Provider value={config}>
            <App />
          </ConfigContext.Provider>
        </React.StrictMode>,
        this.mountPoint,
      );
    }
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    this.mountPoint = getMountPoint();
    shadowRoot.appendChild(this.mountPoint);
    this.renderReact();
  }

  static get observedAttributes() {
    return [
      ...Object.keys(defaultConfig),
      ...Object.keys(defaultConfig).map((key) => key.toLowerCase()),
    ];
  }

  attributeChangedCallback() {
    this.renderReact();
  }
}
```

For watching/observing the custom element’s attributes, we’re making use of the `attributeChangedCallback` lifecycle callback method. The browser will call this method for every change to attributes listed in the `observedAttributes` array which we fill with the list of keys we can derive from the default configuration by using `Object.keys()`. As lowercase attributes are recommended in HTML (and required for stricter document types like XHTML), both the keys as-is and lower-cased version of them are taken into consideration.

Now, using the (reference: react/consuming-react-contexts-via-custom-hook-instead-of-using-usecontext text: custom context hook) `useConfig` defined above can be used anywhere in the application to read the passed attributes.

```tsx
const { name, variant } = useConfig();
```

Neat.
