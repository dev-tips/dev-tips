Title: Speeding up sites and apps by using just-in-time preloading for faster page transitions

-----

Date: 1586651456

-----

Authors: rasshofer

-----

Description:

Make your site/app more engaging by preloading pages before users click on links or once links are within the viewport, making them perceived to load instantly.

-----

Text:

Several household names of our industry like Google, Amazon, Mozilla, Yahoo, and Walmart analyzed and found large drops in traffic and conversion rate if pages took long to load. For example, Amazon found that removing 100 milliseconds of latency improved sales by 1%[^MakeDataUseful].

However, latency on the web can be hard to overcome. A simple way to »cheat« that latency is just-in-time preloading, i.e. prefetching pages right before users will visit them.

## How it works

Before users visit links (i.e. they hover their mouse over that link or start touching their display before releasing it) as well as once links are visible within the viewport, the target links may be preloaded immediately, ensuring that the browser already silently loads specified target pages and stores them in its cache—thus improving the perceived performance for the user.

Technically, the native link prefetching mechanism of browsers can be utilized for this.

```html
<link rel="prefetch" href="https://dev-tips.com/authors">
```

(npm: instant.page) is one example of a library that provides this functionality as a drop-in solution. It detects once the user is hovering a link or starts touching it and generates and appends the respective `<link rel="prefetch">` HTML element to the document head.

(npm: quicklink) is an alternative that prefetches links during idle time based on what is in the user’s viewport. In addition, it’s very careful to be responsible with prefetching by utilizing `window.requestIdleCallback()` and the network information from `navigator.connection` to detect e.g. users with enabled data-saving mode.

## Challenges / Pitfalls

- Some links like logout/edit/delete links shall be excluded as they may cause trouble when being opened unconsciously (see e.g. [instant.page’s blacklisting options](https://instant.page/blacklist))
- Keep your servers’ bandwidth/CPU in mind to prevent unused requests and stop preloading once your infrastructure is busy or throttle preloading to a few requests per second
- Be respectful of the users’ connection and preferences (e.g. data-saving mode)
- Keep server-side analytics tools in mind to prevent prefetched pages from being counted like a page view (client-side tools like Google Analytics usually are fine as client-side JavaScript is not executed for such prefetched documents)
- Prefetching pages for/within single page applications (SPAs) may not make too much sense without additional configuration/customization as those applications wouldn’t do full page transitions anyway
- Decide whether you want to load only internal links (i.e. same origin) or external links as well

## Conclusion

You may ask yourself what approach/library to use for your site/app. It depends, of course. Usually, a user takes around 300 milliseconds from hover to click. Thus, if your server is not able to respond within this timespan, your users most likely won’t notice any difference. In that case preloading links depending on the viewport instead of hover may make more sense.

## Addendum

[^MakeDataUseful]: [Greg Linden – Make Data Useful](https://web.archive.org/web/20081221042625/http://home.blarg.net/~glinden/StanfordDataMining.2006-11-29.ppt)
