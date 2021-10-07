Title: PostCSS

-----

Description: A framework for CSS tooling such as Autoprefixer or minifiers and post-processing that allows transforming CSS styles using plugins that can be combined.

-----

Authors: rasshofer

-----

Text:

It differs from Sass / SCSS as it’s not a »CSS template« language and pre-processor but rather a CSS »transformer« and post-processor. PostCSS takes valid CSS and transforms it. This happens through plugins that can be freely choosen and combined. These plugins contain rules and options that determine what should happen to the original CSS.

The most widespread among the PostCSS plugins are certainly (term: Autoprefixer) for adding vendor prefixes based on a pre-defined browser matrix, (npm: postcss-preset-env) for converting modern CSS into something legacy browsers can understand, and (npm: cssnano) for minifying and optimizing CSS.
