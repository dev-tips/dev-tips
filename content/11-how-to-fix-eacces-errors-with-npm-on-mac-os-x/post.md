Title: How to fix »EACCES« errors with npm on Mac OS X

-----

Date: 1424021107

-----

Contributors: rasshofer

-----

Text:

If you installed Node.js and npm using root permissions, you might end up with some nasty `npm ERR! Error: EACCES` errors as soon as you’re trying to install packages from npm. Consequently, you need to prefix your `npm` commands using `sudo` every time you want to install a package—which is anything but ideal. It seems that those problems are a result of using the .pkg installer provided on the Node.js website.

So, instead of running `sudo npm install …` each and every time, you can address the underlying issue by changing the permissions/ownership of two directories on your machine.

```shell
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```

Now you should be able to use `npm` without `sudo`.
