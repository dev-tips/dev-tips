Title: Writing BEM selectors in SCSS

-----

Date: 1608458518

-----

Description: SCSS allows to implement BEM naming conventions while keeping a clean structure. But is it really a good idea to take this shortcut?

-----

Authors: rasshofer

-----

Text:

The »BEM« methodology focuses on the block name itself and uses it as the main anchor for all selectors of elements and modifiers within that block. To prevent you from typing the block name over and over again, you may think about using SCSS’s parent selector `&` instead.

```scss
.article {
  &__meta {
    color: green;
  }
}
```

However, if you want to make use of SCSS’s nesting to structure the SCSS source code, using `&` means you’ll be extending the respective parent, ending up in invalid (reference: css/grandchild-elements-in-bem text: grandchild elements).

```scss
.article {
  &__meta {
    &__date {
      &__time {
        color: red;
      }
    }
  }
}
```

The aforementioned example represents the generic tree structure of the different contents but ends up in the following CSS.

```css
.article__meta__date__time {
  color: red;
}
```

To fix this, you may want to create a cache variable that references the root block.

```scss
.article {
  $component: #{&};

  #{$component}__meta {
    #{$component}__date {
      #{$component}__time {
        color: red;
      }
    }
  }
}
```

This results in the following CSS. As you can see, the resulting selector is now nested and thus has a quite (reference: css/cssplexity-applying-complexity-metrics-to-a-non-programming-language text: high and unnecessary specificity).

```css
.article .article__meta .article__date .article__time {
  color: red;
}
```

However, using SCSS’s `@at-root` rule, you could fix this issue.

```scss
.article {
  $component: #{&};

  #{$component}__meta {
    #{$component}__date {
      @at-root #{$component}__time {
        color: red;
      }
    }
  }
}
```

This results in the following CSS.

```css
.article__time {
  color: red;
}
```

Nevertheless, it’d be easier to simply prevent deeply nested elements in the first place.

```scss
.article {
  $component: #{&};

  #{$component}__meta {
    …
  }

  #{$component}__date {
    …
  }
  
  #{$component}__time {
    color: red;
  }
}
```

## Don’t do this

While using SCSS’s `&` parent selector may sound/seem like a nice way to prevent writing/updating the block name over and over again, this approach complicates debugging as you won’t be able to simply search your project for a CSS selector you saw in production (e.g. an erroneous CSS selector seen in the browser’s dev tools).

For example, searching for `.article__time` in the project would not match the SCSS source. You’d need to search for `__time` only, potentially resulting in search results with other blocks which also use `__time` somewhere.

Don’t use SCSS’s `&` selector for generating BEM class names.
