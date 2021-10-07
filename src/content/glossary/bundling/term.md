Title: Bundling

-----

Description: Bundling combines multiple files into a single file. This reduces the number of server requests required to render a web resource, such as a web page.

-----

Authors: rasshofer

-----

Text:

This is based on the fact that the smaller the number of files, the fewer HTTP requests need to be processed between the browser and the server or by the service that serves an application. This can increase the performance of the first page loading process. In general, you can create as many single bundles as you want/need, especially dedicated ones for CSS and JavaScript.

Unlike client-side JavaScript, with Node.js you don’t necessarily have to worry about bundling or optimizing source code because the source code is available on the server where it runs without any need for transferring code over a network connection. However, sometimes also Node.js applications are bundled in order to make e.g. AWS Lambda deployments easier.
