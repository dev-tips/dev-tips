Title: Autoprefixer

-----

Description: A plugin for PostCSS which parses CSS and adds vendor prefixes based on a pre-defined browser matrix.

-----

Authors: rasshofer

-----

Text:

Autoprefixer uses (term: Browserslist), allowing to specify the targeted browsers using queries such as `last 4 version`. It’s based on data from [Can I Use](https://caniuse.com/) and adds, arranges, and deletes vendor prefixes for selectors, properties, and values in CSS rules according to these insights as postprocessing step.

(image: autoprefixer-online.png bordered: true)

For giving Autoprefixer a try, there’s an [online version](https://autoprefixer.github.io/) available as well.

By running `npx autoprefixer --info` in your project, you can also view what browsers are covered and what selectors, properties, and values are prefixed.

(image: autoprefixer-info.png)
