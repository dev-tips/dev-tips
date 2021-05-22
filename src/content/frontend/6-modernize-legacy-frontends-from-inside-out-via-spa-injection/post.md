Title: Modernize legacy frontends from inside-out via SPA injection

-----

Date: 1621726209

-----

Description: By embedding a new single-page application (SPA) into a legacy website or application and slowly expanding its functionality, you can modernize frontends from inside-out.

-----

Authors: rasshofer

-----

Text:

Instead of wrapping the legacy system and absorbing it, the new SPA is injected into the existing landscape of legacy systems and slowly expands in functionality while relying on data and functionality of the legacy systems until it completely takes over.

While the most recent [ThoughtWorks Technology Radar](https://www.thoughtworks.com/en/radar/techniques/spa-injection) coined the term »SPA injection« for this approach for the first time, its main idea has been used before and can be considered as the first step towards a more flexible and stable (reference: frontend/micro-frontends-porting-the-micro-service-approach-into-the-frontend text: micro-frontend architecture).

## Integration / Orchestration / Transclusion

The parent page (e.g. a CMS page) acts as integrator and controls the pages and the integration of SPAs into the old pages. Blank content blocks may be added to the CMS where the SPA render containers with their (externally hosted) SPAs will be loaded and rendered.

(image: spa-injection.svg)

The main complexity of transclusion arises from throwing HTML content from different sources into a common DOM without any isolation. While plain DOM container elements can be used for rendering the SPA, using native Web Components is the way to go as it allows to work with Custom Elements and a native Shadow DOM, encapsulating the injected SPA from the existing legacy landscape and providing additional flexibility with responsive layouts (as opposed to using inline frames). This makes sure that developers don’t have to make assumptions about the environment such as, for example, the CSS and JavaScript present in the integrator itself or other fragments on the same page.

Within the native Web Components wrapper, any framework or library can be used, such as React, which can be (reference: react/rendering-react-applications-as-native-web-components text: rendered as native Web Components) easily.

## Configuration / Data

The injected SPA fragment can be configured via HTML attributes/properties from within the blank CMS content block. This means the integrating system needs to provide the ability to maintain the configuration and passing it to the SPA element.

```html
<demo-application category="XYZ123"></demo-application>
```

```html
<demo-application name="Jane Doe" email="jane@example.com"></demo-application>
```

Taking aforementioned (reference: react/rendering-react-applications-as-native-web-components text: React example), these HTML attributes/properties could be provided to the React application using a dedicated context in React by providing a default configuration, using its keys as allowed attribute names to fetch the actual runtime configuration via `getAttribute()`, and passing the determined values to the context provider.

```tsx
const config = Object.entries(defaultConfig).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: this.getAttribute(`data-${key}`) ?? value,
  }),
  {} as Config
);
```

```tsx
ReactDOM.render(
  <React.StrictMode>
    <ConfigContext.Provider value={config}>
      <App />
    </ConfigContext.Provider>
  </React.StrictMode>,
  mountPoint
);
```

(You may want to implement support for `attributeChangedCallback()` as well in case the configuration/attributes are supposed to be mutable.)

Besides the configuration, required data should be consumed and provided from/to a dedicated backend for frontend (BFF). This abstraction layer allows to exchange systems and data sources while keeping the data model for the frontend agnostic. Especially when superseding the legacy landscape, backend systems may be replaced and adjusted.

## Communication

Communication with the integrating legacy page (or other injected fragments) takes place via a shared (reference: frontend/using-the-publish-subscribe-pattern-and-a-shared-event-bus-to-decouple-frontends text: event bus) on client-side using (reference: frontend/imperative-vs-declarative-events text: declarative event names).

## Assets

Any transclusion-relevant assets have to be considered as part of the respective providing system and self-contained. Thus the SPA itself is responsible for providing, loading, and injecting all necessary styles and assets during runtime.

## Client-side vs. server-side integration

SPA injection usually takes place solely in the client during runtime while not strictly blocking server-side injection/integration. Whether client-side or server-side integration makes sense usually depends on business requirements, mostly SEO.

However, setting up server-side rendering within the SPAs, fetching that HTML response, and loading it in the initial integrator server response usually requires large adjustments of the integrator while it’s easier to implement blank blocks/templates that load and inject the SPA on client-side. Thus, SPA injection is, by nature, not the best approach to use for pages where SSR or SEO are required and highly relevant.
