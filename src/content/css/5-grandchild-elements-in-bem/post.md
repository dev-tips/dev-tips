Title: Grandchild elements in BEM

-----

Date: 1607788648

-----

Description: When using the »BEM« methodology for structuring CSS stylesheets, everything is tied to the »block«. This introduces the ever-present issue of how to handle deeply nested elements (also known as »grandchild elements«).

-----

Authors: rasshofer

-----

Text:

Here’s how many developers handle deeply nested elements with BEM.

```html
<article class="article">
  <div class="article__meta">
    <div class="article__meta__date">
      <time class="article__meta__date__time">December 12th 2020</time>
    </div>
  </div>
</article>
```

An important concept of BEM is that class names should never reflect the HTML tree structure as this makes the class names difficult to read and bloats the resulting HTML and CSS files.

Instead of chaining elements, focus on the block name itself and consider the grandchild elements as regular BEM elements.

```html
<article class="article">
  <div class="article__meta">
    <div class="article__date">
      <time class="article__time">December 12th 2020</time>
    </div>
  </div>
</article>
```
