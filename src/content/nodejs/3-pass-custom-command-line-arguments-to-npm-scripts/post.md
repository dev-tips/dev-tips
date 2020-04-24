Title: Pass custom command-line arguments to npm scripts

-----

Date: 1587755265

-----

Description: You may have noticed that simply appending arguments/parameters (e.g. port numbers) to npm run script commands doesn’t work out of the box. Using a double dash makes it work.

-----

Authors: rasshofer

-----

Text:

To illustrate this, let’s take a simple script utilizing (npm: http-server) as an example.

```json
{
  "scripts": {
    "start": "http-server build",
  }
}
```

Now, when trying to start the server on dynamic ports, you may assume you can just append the necessary argument `-p 1234` to the command as follows.

```sh
npm start -p 1234
```

However, you’ll notice that nothing happens—respectively that the server will simply start on its default port, not the port you specified.

## So, why is that?

The npm CLI itself also accepts arguments and parameters like `-s` in `npm start -s` for running in silent mode. However, a referenced/utilized script could also provide support for a `-s` argument. Thus the issue/problem npm is facing here is to separate and distinct whether a passed argument is intended for the npm CLI itself or the utilized script.

## Solution

The npm CLI allows to pass additional arguments and parameters to utilized scripts by passing them after a double dash (`--`) as follows.

```sh
npm start -- -p 1234
```

npm now appends that content to the script before executing it, resulting in the following overall command.

```sh
http-server build -p 1234
```

Please be aware that npm will just append the arguments to the script and not pass it to each script you’re using in a chained command. So if you’re using multiple commands within a single script (e.g. combined via `&&`), the arguments will simply be appended to the end of your script, resulting in the arguments being used by the last command of that script only.

## Differences between npm and Yarn

When using Yarn as your package manager, you can directly specify parameters without that extra double dash (`--`).

```sh
yarn start -p 1234
```

When you pass the arguments using a double dash nevertheless, Yarn even warns you and informs you about this fact.

```txt
From Yarn 1.0 onwards, scripts don't require "--" for options to be forwarded.
In a future version, any explicit "--" will be forwarded as-is to the scripts.
```
