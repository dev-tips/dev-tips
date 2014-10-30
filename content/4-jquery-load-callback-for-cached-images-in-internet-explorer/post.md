Title: jQuery’s .load() callback for cached images in Internet Explorer

-----

Date: 1405169640

-----

Contributors: rasshofer

-----

Text:

jQuery’s `.load()` function is often used if a callback function is required be executed as soon as an element is completely loaded. This is gladly used for loading images completely at first and processing certain attributes of an image (e.g. its width and height) afterwards. However, Microsoft’s Internet Explorer doesn’t execute the callback if images are cached already.

While often appending a random number (to prevent caching) is recommended for this known issue, there’s a much more resource-efficient trick: simply set the src attribute of an image after the definition of its .load() function.

```javascript
$('img').load(function() {
    // do something
}).attr('src', '/new-image-source.jpg');
```
