Title: Getting started with BEM

-----

Date: 1607279248

-----

Description: »BEM« is a methodology for structuring CSS stylesheets. It describes the relationship between elements using expressive CSS naming. Let’s have a look at what BEM is in detail and what its advantages are.

-----

Authors: rasshofer

-----

Text:

First things first: BEM is a way of writing CSS. It’s no library or something you can install. BEM helps with the specific naming and structuring of CSS class hierarchies and thus supports the development of semantically significant component structures by making classes transparent and understandable for other developers.

»BEM« is an abbreviation for »block«, »element«, and »modifier«. Individual structures in the DOM are named only with class names according to a certain pattern to make the code easier to read and more scalable.

The general pattern and naming convention for this is as follows. The common root class name/prefix `.block` makes it easy to recognize all related classes in both CSS and HTML.

- `.block` is the parent component
- `.block__element` is a child element of `.block`
- `.block--modifier` is a variant/version of `.block`

Of course, it’s also possible to have modifier classes on child elements.

`.block__element--modifier`

## Block

This defines standalone/logic elements on a page such as the following.

- Navigation
- Form
- Button

## Element

A part of a block such as the following that has no independent meaning and is semantically related to its block.

- Single items in navigation
- Individual elements in a form
- Icon in a button

## Modifier

A variant of a block or element such as the following. Use it to change e.g. appearance or behavior.

- Colors
- Sizes
