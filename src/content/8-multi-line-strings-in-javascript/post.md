Title: Multi-line strings in JavaScript

-----

Date: 1409920732

-----

Contributors: rasshofer

-----

Text:

When working with templates in JavaScript, you might need a simple way to work with multi-line strings. While there are several ways to achieve this, not every solution makes 100% sense. If you just need multi-lines within your code but not within the string itself, you may be familiar with the following way.

```javascript
var example = 'Lorem ipsum dolor sit amet' +
	'consetetur sadipscing elitr' +
	'sed diam nonumy eirmod tempor invidunt';
```

However, string upon string of concatenated JavaScript grows messy and ugly pretty quickly and is also a slow way to achieve the goal. The same goes for creating an array and joining it.

```javascript
var example = [
	'Lorem ipsum dolor sit amet',
	'consetetur sadipscing elitr',
	'sed diam nonumy eirmod tempor invidunt'
].join();
```

A solution many novice JavaScript developers aren‘t aware of is the following one.

```javascript
var example = 'Lorem ipsum dolor sit amet\
	consetetur sadipscing elitr\
	sed diam nonumy eirmod tempor invidunt';
```

Adding a backslash at the end of each line tells the JavaScript engine that the string will continue to the next line. Furthermore this second solution creates a string including line breaks within the string itself. But be warned: not every browser will insert line breaks at the continuance, while others will. Google’s JavaScript style guide [recommends to use string concatenation instead of escaping newlines](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Multiline_string_literals#Multiline_string_literals) because the latter isn’t part of ECMAScript. However, all of the above won’t bring you multi-line strings at all. It’s actually just line-continuation. Adjusting the solutions above by adding line-break characters does the job but makes the solutions even more messy and ugly.

```javascript
var example = 'Lorem ipsum dolor sit amet\n' +
	'consetetur sadipscing elitr\n' +
	'sed diam nonumy eirmod tempor invidunt';
```

```javascript
var example = [
	'Lorem ipsum dolor sit amet',
	'consetetur sadipscing elitr',
	'sed diam nonumy eirmod tempor invidunt'
].join('\n');
```

```javascript
var example = 'Lorem ipsum dolor sit amet\n\
	consetetur sadipscing elitr\n\
	sed diam nonumy eirmod tempor invidunt';
```

An initially confusing but working "trick" to solve this problem is wrapping the text within a block comment within an anonymous function.

```javascript
var example = (function() {/*
Lorem ipsum dolor sit amet
consetetur sadipscing elitr
sed diam nonumy eirmod tempor invidunt
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].trim();
```

The anonymous function is converted to a string and the content of the comment is extracted. While this does indeed work fine in the browser, it’s slower than string concatenation and mainly intended for use in node.js. The last way to create legible multi-line strings in JavaScript is to use templates.

```html
<script type="text/template" id="example">
Lorem ipsum dolor sit amet
consetetur sadipscing elitr
sed diam nonumy eirmod tempor invidunt
</script>
```

```javascript
var example = document.getElementById('example').innerHTML;
```

By setting the type to `text/template`, the `script` tag isn’t a script that the browser understands and thus the browser will simply ignore it. This allows you to put anything in there, which can then be extracted (see `var example`) later and used as a template. Note that ECMAScript 6 will have real multi-line strings by using backticks, known as a `NoSubstitutionTemplate` in the spec.

```javascript
var example = `Lorem ipsum dolor sit amet
consetetur sadipscing elitr
sed diam nonumy eirmod tempor invidunt`;
```
