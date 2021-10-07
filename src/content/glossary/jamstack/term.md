Title: JAMStack

-----

Description: An architecture for decoupling frontend and backend components. The frontend of the website is delivered as static HTML and detached from the content management of the site.

-----

Authors: rasshofer

-----

Text:

»JAMStack« is an acronym for »Javascript, APIs, and Markup«. A JAMStack application has no central server where the entire backend runs and on which the architecture of the frontend depends on. Instead, many independent but self-contained APIs are used.

This specialization results in small and maintainable modules that are usually paid for per execution and thus are cheaper than running everything in one large server application. A central element of the JAMStack is the prerendering of content coming from a (term: Headless CMS) during build time using a (term: SSG text: static site generator). The built static files are then deployed to a CDN.

This offers simplicity, performance, security, cost efficiency, and scalability.
