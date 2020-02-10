Title: Node.js package names are case-sensitive

-----

Date: 1580757712

-----

Authors: rasshofer

-----

Text:

A buddy of mine just blundered into this trap/pitfall while including jQuery into a project. Both (npm: jQuery) and (npm: jquery) do exist in npm’s registry. While the latter is the one he was looking for, he snapped the former (due to »jQuery« being the official notation). This caused a lot of (reasonable) confusion.

In its earliest days, npm allowed packages to include any URL-safe character in their names, including upper and lower case. Since 2013, it’s not possible to create new packages with upper-case letters in the name anymore, but packages with upper-case letters in their names are still in the registry and still in use (due to backward compatibility reasons).

While npm’s main motivation was to restrain typosquatting (i.e. providing a package for malicious purposes with a very similar name), these packages also cause problems if you’re installing them on case-insensitive file systems (such as the file systems on most macOS computers if not configured differently). For example, it’s not possible to install both the `jquery` and `jQuery` package at the same time. Both will be listed within `package.json`, but only one version can exist on the file system (i.e. the package installed last).
