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
})(window, document);
