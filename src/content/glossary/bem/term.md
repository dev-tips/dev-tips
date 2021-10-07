Title: BEM

-----

Alias: Block/Element/Modifier

-----

Description: A methodology for structuring CSS stylesheets. It describes the relationship between elements using expressive CSS naming.

-----

Authors: rasshofer

-----

Text:

BEM helps with the specific naming and structuring of CSS class hierarchies and thus supports the development of semantically significant component structures. Individual structures in the DOM are named only with class names according to a certain pattern to make the code easier to read and more scalable.

The general pattern and naming convention for this is as follows. The common root class name/prefix `.block` makes it easy to recognize all related classes in both CSS and HTML.

- `.block` is the parent component
- `.block__element` is a child element of `.block`
- `.block--modifier` is a variant/version of `.block`

Of course, it’s also possible to have modifier classes on child elements.

`.block__element--modifier`
