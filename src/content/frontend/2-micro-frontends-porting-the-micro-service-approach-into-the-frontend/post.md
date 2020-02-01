Title: Micro-frontends: porting the micro-service approach into the frontend

-----

Date: 1550921954

-----

Authors: rasshofer

-----

Highlight: true

-----

Text:

The functionality of Web applications is growing steadily, and collaborative work of multiple teams on a common codebase may become kind of impractical quite fast. Collaboration could be efficient though, if the teams were able to work scalable and largely autonomous of each other while still keeping the technical complexity low and ensuring high future evolvability. You may already suspect which buzzword is targeted here?

## Micro-services

Micro-services got (and still get) a lot of traction but are a topic in particular in the backend so far. The idea behind this architecture pattern describes dividing abstract problems into small solutions (i.e. »services«) that each implement exactly one small functionality, largely corresponding to the Unix philosophy.

> Do one thing, and do it well.

In doing so, services are connected with each other in a way that the result is an arbitrarily complex software. Micro-services are characterized by being easy to replace and/or recreate within a short amount of time and also have the characteristic of being developed exclusively by dedicated teams. A team may be responsible for the development of multiple micro-services though, e.g. in case the services are technically related.

Incidentally, micro-services are fully isolated from other services and processes. This allows, in principle, each micro-service to use a different framework or even a completely different programming language.

## Micro-frontends

Unfortunately, frontend development hasn’t fully taken advantage of the benefits that micro-services offer yet, causing huge and monolithic frontend code bases that consume several backend APIs and are both blocking the backend regarding releases and difficult to maintain/evolve.

By applying the micro-service concept, such frontend monoliths can be divided into smaller pieces/blocks (which will be dubbed »fragments« subsequently). However, keeping the desire for autonomous and cross-functional teams in mind, it’s not simply about dividing a monolith into different pages, but about dividing into different functionalities/jurisdictions.

The term »micro-frontends« for this technique has been coined by [ThoughtWorks’ Technology Radar](https://www.thoughtworks.com/radar/techniques/micro-frontends).

## Benefits of micro-frontends

### Independent and isolated development

Self-contained fragments are implemented and deployed by standalone and self-organized teams in their own release cycles. This allows frontend developers to work on features proficiently and jointly with their backend counterparts and deploy distinct parts of the website/application independently, reducing the risk of conflicts, bugs, or deployment delays. In addition, this facilitates scaling of development teams and ensures evolvability of the website/application.

As a result, this allows to choose the ideal technology stack for each service, facilitates development in parallel on large projects, and increases testability.

Incidentally, the »two pizza rule« (credited to Amazon’s founder Jeff Bezos) applies here as well: Never have a standalone feature team where two pizzas couldn’t feed the entire group. Generally speaking, this limits the team size to 6-8 people per service.

### Simplified testing and experimentation

Dividing a website/application into standalone and interchangeable fragments provides a solid foundation for running A/B tests (or multivariate tests) simply by switching one or multiple fragments. This facilitates trying out both new features and newer technologies (like new frameworks or libraries) at a low risk and without rewriting large parts of the website/application.

Such a continuously experiment-driven development approach reduces the risk of wasted development efforts due to parts of the developed software having only little or no value to customers by iteratively testing product and service assumptions that are critical to the success of the website/application.

### Reliability and fault tolerance

The independence of micro-frontends pays off in the event of an outage as an error in a fragment is supposed to not affect other fragments and the website/application can still render meaningful output, even if one or multiple fragments have failed or timed out.

## Challenges of micro-frontends

### Separation of fragments

There is neither a generic definition for the scope of a fragment nor a rule of thumb on how to divide a website/application into fragments. A single fragment may reflect simply a subpage of a multi-page system or narrowly a single UI component. This separation affects the micro-frontend architecture approach as well as the choice of the technology stack.

### Communication between fragments

Sometimes, decoupled fragments need to communicate with each other and interchange information and react on it. For example, an online shop application consisting of a product list fragment and a cart fragment (among others) may require the cart fragment to be updated as soon as a product in the product list fragment is added to the cart. The common approach for this is using the (reference: frontend/using-the-publish-subscribe-pattern-and-a-shared-event-bus-to-decouple-frontends text: publish/subscribe pattern and a shared event bus), further supporting autonomy in choosing technology stacks for fragments as long as there are standardized incoming and outgoing events.

### Consistent look and feel

In order to present a consistent look and feel across fragments and pages, it’s endorsed to introduce a common UI components library. Differing frontend technology stacks (i.e. frameworks and libraries) make this even more complicated as the reusable components have to be provided in different formats/implementations (e.g. for both React and Vue). A set of standard tools might help to mitigate this, driving the development towards a similar direction.

### Performance

Aggregating multiple fragments impacts the overall page performance and requires dedicated devotion. Multiple fragments imply that several files need to be loaded and initialized. Accordingly, the fragments are required to be performant on their own and delivered frontend assets (i.e. JavaScript and CSS) have to be kept to a minimum, both in quantity and in size.

### High initial costs and increased operating costs

Building micro-services on both the frontend and the backend side introduces significant architectural complexity, requiring deeper initial analysis to understand how the application can be divided into smaller fragments and how everything integrates with each other in the end. Since this requires teams to »own« their fragment end-to-end, the learning curve may be steep and development speed may become a bit slow initially while increasing confidence and extent of knowledge in the long term. As the micro-frontend approach requires each fragment to run on its own infrastructure, operating costs may increase as well.

## Micro-frontend approaches

### Multiple (single-page) applications using different paths

Defining an application’s different subpages as fragments seems simple but obvious. Aggregation is taking place through relative links between fragments, brought together by a reverse proxy which maps URL paths (i.e. namespaces like `/shop` or `/my-account`) to the micro-services or takes care of routing subdomains to the appropriate micro-services.

(image: verticals.svg)

When navigating through these different parts/pages, the user is doing »real« page reloads, loading and initializing the respective fragment/application of each subpage for each subpage. This involves the risk of developing shared components (such as header or footer) several times and needs to be tackled, for example, by providing such shared fragments using a single service (e.g. a CMS). In addition, communication between the fragments can only be realized via backend systems.

### Multiple (single-page) applications + XHR / AJAX

While user interfaces are quite complex and rich nowadays, the previous approach prevents mixing/combining different services within a single page. A potential solution for this and an extension to the aforementioned approach could be to use XHR/AJAX, i.e. fetching the snippets from other services and inserting them asynchronously on the current page (like a cart summary within the navigation bar).

```html
<div id="cart">…</div>
<link href="https://cdn.demo.app/cart.css" rel="stylesheet">
<script src="https://cdn.demo.app/cart.bundle.js"></script>
```

Using a unified response scheme (e.g. JSON) allows to make referencing/handling HTML, CSS, and JavaScript easier.

```json
{
  "html": "<div id=\"cart\">…</div>",
  "css": "#cart { … }",
  "js": "https://cdn.demo.app/cart.bundle.js"
}
```

However, XHR/AJAX causes SEO issues regarding crawlability of injected contents.

### Frames

The idea of ​​using isolated (inline) frames to embed parts of websites/applications in another is quite old but offers the advantage of encapsulated DOM trees for each frame/fragment and thus zero technology incompatibilities. (And just because it’s old-fashioned doesn’t mean that it’s not a valid idea.)

(image: aggregated.svg)

However, this independence results in a reduction of both overall performance and usability and introduces new UI restrictions, e.g. how to open a centralized modal from within a frame. In addition, SEO and crawlability is even more of an issue compared to the XHR/AJAX approach. Communication between the fragments may be realized via backend systems or HTML5’s `window.postMessage` API, similar to an event bus.

### Transclusion / Edge Side Includes (ESI)

Submitted to the W3C for approval in August 2001, the ESI language is quite old as well and represents a markup language for assembly of dynamic Web content (like fragments) on edge level. It’s implemented by some caching proxy servers, Varnish being one of them, and CDN providers, but no accepted standard in general. Server Side Includes (SSI) won’t work in this case as SSI does not accept remote URLs, only local file paths.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo</title>
  </head>
  <body>
    <esi:include src="http://header-service.example.com/" />
    <esi:include src="http://checkout-service.example.com/" />
    <esi:include src="http://navigator-service.example.com/" alt="http://backup-service.example.com/" />
    <esi:include src="http://footer-service.example.com/" />
  </body>
</html>
```

This transclusion approach introduces possible technology incompatibilities and side-effects as multiple micro-services are aggregated and distributed within a single DOM. However, this problem may be solved by applying proper namespacing/scoping within the fragments and new standards like [Web components](https://www.webcomponents.org/), allowing to create new custom, reusable, and encapsulated HTML tags based on innovations like Shadow DOM, Custom Elements, and HTML Imports. Communication between the fragments should be realized using a shared event bus to ensure loose coupling.

### Project Mosaic (Tailor / Skipper / Innkeeper)

[Tailor](https://github.com/zalando/tailor) could be described as some kind of successor of ESI while only being one of many software components of Zalando’s [Project Mosaic](https://www.mosaic9.org/). Just like ESI, Tailor is a layout service that composes pre-rendered markup on the server-side and the way templates are implemented is quite similar.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Demo</title>
  </head>
  <body>
    <fragment src="http://header-service.example.com/"></fragment>
    <fragment src="http://checkout-service.example.com/" primary></fragment>
    <fragment src="http://navigator-service.example.com/" fallback="http://backup-service.example.com/"></fragment>
    <fragment src="http://footer-service.example.com/" async></fragment>
  </body>
</html>
```

Taking advantage of Node.js streams, the library fetches the fragments asynchronously, assembles their response streams, and outputs the final output stream. It’s possible to prioritize the fragments above the fold while lazy loading fragments below the fold asynchronously (i.e. via XHR). Regardless of synchronicity, each fragment is able to provide its own JavaScript and CSS, passed as URLs in HTTP headers and interpreted and injected by Tailor automatically.

However, these templates are quite static. Coming back to the aforementioned online shop application, most likely there would be some kind of dynamic URLs for e.g. product detail pages that need to be mapped/routed to the appropriate Tailor template while passing on the relevant information (i.e. the product ID).

- `/` → `home.html`
- `/products/blue-shirt` → `product-detail-page.html`

[Skipper](https://github.com/zalando/skipper) takes over this routing to the static Tailor templates and is part of Project Mosaic as well. It’s an extendable reverse proxy with the ability to select routes based on properties (e.g. path, method, host, headers, cookies) and to modify the HTTP requests and responses with filters that are independently configured for each route. The routing configuration may be passed as static files or RESTful APIs (via [Innkeeper](https://github.com/zalando/innkeeper); also a part of Project Mosaic).

```
api_cart:
  PathRegexp("/api/cart.*")
  -> setResponseHeader("Access-Control-Allow-Credentials", "true")
  -> setResponseHeader("Access-Control-Allow-Origin", "*")
  -> modPath("^/api", "")
  -> "http://api-cart";

api_products:
  PathRegexp("/api/products.*")
  -> setResponseHeader("Access-Control-Allow-Origin", "*")
  -> modPath("^/api", "")
  -> "http://api-products";

home:
  Path("/")
  -> modPath(".*", "/home")
  -> "http://tailor";

products:
  Path("/products")
  -> modPath(".*", "/product-overview-page")
  -> "http://tailor";

details:
  Path("/products/:slug")
  -> modPath(".*", "/product-detail-page")
  -> "http://tailor";

cart:
  Path("/your-cart")
  -> modPath(".*", "/cart")
  -> "http://tailor";

confirmation:
  Path("/thank-you")
  -> modPath(".*", "/confirmation")
  -> "http://tailor";
```

Within the example configuration above, Skipper is not only routing requests to the layout aggregator but also to backend APIs. Due to Tailor’s nature of returning composed HTML pages, any kind of API (which most likely are returning JSON) or static files (which most likely are BLOBs) need to circumvent Tailor and be passed directly to the appropriate backend services.

Similar to ESI, this approach introduces possible technology incompatibilities and side-effects as well due to multiple micro-services being aggregated and distributed within a single DOM. Again, proper namespacing/scoping and new standards like [Web components](https://www.webcomponents.org/) allow to prevent this. Communication between the fragments should likewise be realized using a shared event bus to ensure loose coupling.
