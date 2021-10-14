# Dev Tips

> Tips, tricks, techniques, tutorials, and tidbits for software developers

[Dev Tips](https://dev-tips.com/) aims to become a collection of tips, tricks, techniques, tutorials, and tidbits that not only show what different programming languages, frameworks, libraries, and tools can do, but also describe best practices and principles every good software developer should know and understand.

It’s about teaching the audience using small and compressed pieces of information (i.e. summaries and code snippets) on very specific tasks and topics. All articles are short and sweet. Longer explanations are broken down whenever possible. Feel free to contribute!

## Getting started

1. `git clone https://github.com/dev-tips/dev-tips`
2. `cd dev-tips`
3. `npm ci`
4. `npm run build`

If you want to run the site locally, that’s pretty easy.

```sh
npm start
```

You’ll be able to access your local instance via <http://localhost:1337/>.

Besides the `npm run build` task, there is `npm run dev` as well, which does exactly the same but additionally starts watching the file system for changes and rebuilds every time a change occurs.

The `master` branch gets deployed automatically via Travis CI. You can find the deployed version of this site at <https://dev-tips.com/>.

## License

Copyright (c) 2021 [Thomas Rasshofer](https://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
