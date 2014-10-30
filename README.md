# JS-Tricks.com

> JS-Tricks.com provides tips, tricks, and techniques on JavaScript running on node.js and in the browser in the form of snippets and tutorials.

JS-Tricks.com aims to become a collection of tiny JavaScript snippets that not only show what JS can do, but also describe best practices and principles every good developer should know and understand. It’s about teaching the audience using small and compressed pieces of information (i.e. code snippets) on very specific tasks. 

Every JS developer once had to dig in [reference docs and guides](https://developer.mozilla.org/en/docs/Web/JavaScript) in order to learn how to code JavaScript. But these docs usually don’t include hints on how a specific feature is implemented the best way possible. Often we only head for code that just *works* without thinking about maintainability, performance, compatibility, and so on. We learn these things later on, often because we find out that code doesn’t work in a specific environment. Of course there is lots of information available on the [web](http://google.com/), especially [StackOverflow](http://stackoverflow.com/questions/tagged/javascript), and there are also [good](http://amzn.com/0596517742) [books](http://amzn.com/0596809484) that you should definitely read. Nonetheless we think it’s time to collect all the **small stuff**, which is learnt quickly, for everyone to look up [at a central place](http://js-tricks.com/).

That’s why [we](http://fapprik.com/) started JS-Tricks as an experiment on Tumblr. However, we quickly realized that Tumblr isn’t the best place to start a blog about coding with lots of code snippets. Thus we decided to move the blog to a file-based content management system in order to be able to manage the whole content community-driven on GitHub. Feel free to contribute!

## Getting started

	git clone --recursive https://github.com/fapprik/js-tricks.com
	cd js-tricks.com
	npm install gulp -g  # if not already installed on your system
	npm install
	gulp build

Note that you need to clone the repository recursively in order to include all required submodules as well. Moreover we make use of [Bower](http://bower.io/) and [gulp.js](http://gulpjs.com/) for frontend asset generation, concatenation, uglification, iamge minification etc., so don't forget to run `gulp build` at least once after cloning.

JS-Tricks.com is built using [PRONTO](http://prontocms.com/). If you want to run the site locally, that's pretty easy:

    php -S localhost:8080

If you prefer to use Apache or nginx, check out the [»Getting started« section on the PRONTO website](http://prontocms.com/docs/getting-started).

Besides the `gulp build` task, there is `gulp dev`, which does exactly the same but additionally starts watching the file system for changes and rebuilds every time a change occurs.

## Contributing

Well, that’s easy: simply head over to our [GitHub](https://github.com/fapprik/js-tricks.com) repository, fork it, make your contributions, and send a pull request. If you’ve never worked with PRONTO before, check out their [»Managing content« section](http://prontocms.com/docs/managing-content).

Feel free to add your GitHub username to the `Contributors` field (comma-separated list) to be listed on the site’s [contributors list](http://js-tricks.com/contributors).

## License

Copyright (c) 2014 [fapprik](http://fapprik.com/)  
Licensed under the MIT license.

See LICENSE for more info.
