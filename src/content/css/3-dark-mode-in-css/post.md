Title: Dark mode in CSS

-----

Date: 1606639648

-----

Description: Ever since iOS and macOS introduced support for dark mode, it’s »socially acceptable« among users and thus it makes sense to bother with enabling it in websites and web applications. Using CSS variables, it’s kind of easy.

-----

Authors: rasshofer

-----

Text:

In general, dark mode in CSS is based on the media query `prefers-color-scheme: dark`. It queries the color scheme on operating system level.

Most likely you already know such `@media` queries, e.g. from implementing responsive designs. Responsive websites and applications respond to a variety of device characteristics and settings with the goal to adapt the layout to the different usage situations.

> Reflecting a user’s preference in regard to the preferred color scheme should be considered as a common part of the responsive design process, not as shenanigans.

Within that media statement, regular CSS selectors and declarations can be used and will be applied depending on the user settings on operating system level.

```css
body {
  background: #fff;
  color: #000;
}

h1,
h2,
h3 {
  color: #333;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #000;
    color: #fff;
  }

  h1,
  h2,
  h3 {
    color: #aaa;
  }
}
```

As you can see, this relies on overriding all affected elements/selectors and gets kind of messy with more comprehensive stylesheets. To take a short cut, you can simply use native CSS variables and configure those depending on the preferred color scheme.

```css
:root {
  --background-color: #fff;
  --text-color: #000;
  --highlight-color: #333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #000;
    --text-color: #fff;
    --highlight-color: #aaa;
  }
}

body {
  background: var(--background-color);
  color: var(--text-color);
}

h1,
h2,
h3 {
  color: var(--highlight-color);
}
```

Based on these global color variables, you can then implement the styling of elements.

(video: dark-mode-css-variables.mp4 width: 2160 height: 942 autoplay: true muted: true loop: true bordered: true)

## Dark mode using the CSS inversion filter

In case you need to enable dark mode in a simple and fast manner, the CSS inversion filter can be used to invert the color of the entire site/application.

Some elements like images may look strange when being inverted, so the filter must be applied again to `<img>` tags to »uninvert« the filter and achieve a decent result.

```css
@media (prefers-color-scheme: dark) {
  html { 
    filter: invert(100%); 
  }

  img { 
    filter: invert(100%); 
  }
}
```

However, this is a quick hack and you should use proper and dedicated variables for implementing a well-conceived dark design.

## Dark mode for images

To swap images with dedicated versions for dark mode, the `<picture>` element can also be used in combination with the aforementioned `prefers-color-scheme` media query.

```html
<picture>
  <source srcset="dark-version.jpg" media="(prefers-color-scheme: dark)" />
  <img src="light-version.jpg" alt="" />
</picture>
```

## Detecting/Using CSS dark mode in JavaScript

By utilizing `window.matchMedia`, the CSS media query can also be used for using the preferred color scheme in JavaScript.

```js
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
```
