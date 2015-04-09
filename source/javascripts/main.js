/*!
 * JS-Tricks main script
 */

(function (win, doc) {
  // Touch detection ( ͡ᵔ ͜ʖ ͡ᵔ)
  // @see http://js-tricks.com/detect-touch-devices-using-javascript
  if ('ontouchstart' in win) {
    var htmlEl = doc.querySelector('html');
    var htmlElClasses = htmlEl.className;
    htmlEl.className += (htmlElClasses.length ? ' ' : '') + 'touch';
  }

  // Add "language-*" classes to <pre> elements
  doc.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(doc.querySelectorAll('pre > code'), function (node) {
      var parentNode = node.parentNode;
      var nodeClasses = node.className.split(' ');
      for (var i = 0; i < nodeClasses.length; i++) {
        if (nodeClasses[i].match(/^language-/)) {
          // Native IE9 support for ClassList would be a dream here...
          var parentNodeClassName = parentNode.className;
          parentNode.className += (parentNodeClassName.length ? ' ' : '') + nodeClasses[i];
          break;
        }
      }
    });
  });

  // Obfuscated email addresses
  var obfuscated = document.querySelectorAll('.obfuscated');
  for (var i = 0; i < obfuscated.length; i++) {
    var address = (obfuscated[i].innerText || obfuscated[i].textContent);
    var content = obfuscated[i].getAttribute('data-content') || address;
    obfuscated[i].innerHTML = '<a href="mailto:' + address.replace(/ AT /g, '@').replace(/ DOT /g, '.') + '">' + content.replace(/ AT /g, '@').replace(/ DOT /g, '.') + '</a>';
  }

  // Google Analytics
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-56248950-1', 'auto');
  ga('require', 'displayfeatures');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');

})(window, document);
