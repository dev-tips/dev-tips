# Frontend-Development.com

> Tips, Tricks, and Techniques on Frontend Development

[Frontend-Development.com](http://frontend-development.com/) aims to become a collection of tiny code snippets and tutorials that not only show what HTML, CSS, and JS can do, but also describe best practices and principles every good developer should know and understand. It’s about teaching the audience using small and compressed pieces of information (i.e. code snippets) on very specific tasks. Feel free to contribute!

## Getting started

1. `git clone https://github.com/rasshofer/frontend-development`
2. `cd frontend-development`
3. `npm install` (or `yarn install`)
4. `npm run build`

If you want to run the site locally, that’s pretty easy, thanks to [Caddy](https://caddyserver.com/).

```sh
caddy
```

You’ll be able to access your local instance via [http://localhost:1337/](http://localhost:1337/).

Besides the `npm run build` task, there is `npm run dev` as well, which does exactly the same but additionally starts watching the file system for changes and rebuilds every time a change occurs.

The `master` branch gets deployed to GitHub Pages automatically via Travis CI. You can find the deployed version of this site at http://frontend-development.com/.

## Contributing

Well, that’s easy! First, head over to the [GitHub](https://github.com/rasshofer/frontend-development) repository and fork it. Then make your contributions, and send a pull request. Please note that writing articles and hacking on the Frontend-Development.com source are two different things. Therefore, please send separate pull requests according to what you’ve done. It will be helpful to use distinct branches in your fork to accomplish that.

## Writing articles

If you find out that there’s no article on a specific topic you are currently into, but there should be one, go ahead and write about it! Here are some guidelines for you to keep in mind. Note that these guidelines will be applied to review your article and to give you hints in the PR comments on what’s missing.

While Frontend-Development.com itself is released under the MIT license, all articles are published under [CC-BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0/).

### Primer

- **The `cms` style.** If you’ve never worked with the [cms](https://www.npmjs.com/package/cms) package before, check out its [»Managing content« documentation](https://www.npmjs.com/package/cms#user-content-managing-content) in order to get started.

- **Markdown format.** If that’s new for you, there’s an excellent [Markdown guide](https://guides.github.com/features/mastering-markdown/) by GitHub.

### Guidelines

- **Choose a short, but descriptive headline.**

- **Be distinct and precise.** Your article should be readable within two to three minutes and should only contain what’s needed to concisely describe your chosen topic, no more, no less. The reader should be able to get the idea, but not always wants to know the whole story.

- **Refer to other resources when needed.** Going into detail is honourable. But before writing too much, it’s almost always better to refer to external resources that one may consume later.

- **Use a neutral style of writing.** Frontend-Development.com is a community project. That means anyone can provide content by writing new articles as well as improving existing ones. We kindly ask you to write in a neutral style to maintain a common style of writing across the site.

- **Show some respect.** If you did not invent a certain programming feature you are writing about, but you know that someone else deserves credit, do not hesitate to include the inventor’s name (even if it’s just a nickname/username!) and link to her/his blog and/or GitHub profile.

- **If you want, you may add your name to the contributors list.** Feel free to add your GitHub username to the `Contributors` field (= comma-separated list) in your `post.md` to be listed on the site’s [contributors list](http://frontend-development.com/contributors/).

- **When it’s online: spread the word!**

## License

Copyright (c) 2017 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
