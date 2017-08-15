(() => {

  const lazyLoader = new LazyLoad();

  const originalErrorHandler = window.onerror;

  const reportError = (body) => {
    if (window.ga) {
      ga('send', 'exception', {
        exDescription: Object.keys(body).map((key) => `${key} = ${JSON.stringify(body[key])}`).join(' | ')
      });
    }
  };

  window.onerror = (errorMessage, url, lineNumber, columnNumber, errorObject) => {

    reportError({
      type: 'Error',
      message: errorMessage,
      url: url,
      line: lineNumber,
      column: columnNumber,
      error: errorObject
    });

    if (typeof originalErrorHandler === 'function') {
      return originalErrorHandler(errorMessage, url, lineNumber, columnNumber, errorObject);
    }

    return false;

  };

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-97110317-1', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');

})();
