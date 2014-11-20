/*!
 * JS-Tricks main script
 */

(function (w, d) {
  // Touch detection ( ͡ᵔ ͜ʖ ͡ᵔ)
  // @see http://localhost:8080/detect-touch-devices-using-javascript
  if('ontouchstart' in window) {
    var htmlEl = d.getElementsByTagName('html')[0];
    var htmlElClasses = htmlEl.className;
    htmlEl.className += (htmlElClasses.length ? ' ' : '') + 'touch';
  }

  // Add "language-*" classes to <pre> elements
  d.addEventListener('DOMContentLoaded', function () {
    Array.prototype.forEach.call(d.querySelectorAll('pre > code'), function (node) {
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
})(window, document);
