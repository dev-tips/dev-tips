Title: Prevent links in standalone web apps to be opened in Mobile Safari under iOS

-----

Date: 1405158480

-----

Contributors: rasshofer

-----

Text:

iPhones, iPads, and iPods offer the opportunity to integrate Web apps (including an icon) just like conventional, native apps on the home screen. Those Web apps are then started in a standalone mode and behave optically just like real apps. However, a bad feature of iOS for Web app development is that links in such Web apps (which actually are simply websites that are displayed in full screen mode) automatically open in Mobile Safari—that is, the standalone app closes and switches to the Safari app. Annoying. You can use the following snippet of JavaScript (include it at the bottom of your HTML site) to prevent this.

```javascript
var a = document.getElementsByTagName('a');
for (var i = 0; i < a.length; i++) {
    a[i].onclick = function() {
        window.location = this.getAttribute('href');
        return false;
    }
}
```

If you’re using jQuery in your Web app, you can use the following, much-shorter version of the snippet.

```javascript
$(document).on('click', 'a[href]', function(event) {
    event.preventDefault();
    window.location = $(this).attr('href');
});
```
