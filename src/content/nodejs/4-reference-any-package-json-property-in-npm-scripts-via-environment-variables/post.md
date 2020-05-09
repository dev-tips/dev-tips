Title: Reference any package.json property in npm scripts via environment variables

-----

Date: 1589020097

-----

Description: Both the npm CLI and Yarn allow to create any kind of custom properties and expose them as environment variables for use within in your custom scripts (or Node.js applications).

-----

Authors: rasshofer

-----

Text:

To illustrate this, let’s take the simple example of an npm script from (reference: nodejs/pass-custom-command-line-arguments-to-npm-scripts text: the last post) which utilized (npm: http-server). Next to having that simple HTTP server, we use (npm: cypress) to run a few tests on this site the server is delivering.

```json
{
  "scripts": {
    "start": "http-server build -p 8080",
    "test": "cypress run --env host=http://localhost:8080"
  }
}
```

You may be looking for a way how to move that duplicated port `8080` definition into some kind of central place so you only have to maintain it in a single place.

Both the npm CLI and Yarn allow to create custom properties in your `package.json` and expose all of those properties/options (even nested ones) as environment variables prefixed with `npm_package_` to your custom scripts.

This lets you set any value in `package.json` which can be picked up and accessed as environment variables in your scripts of that same `package.json` file.

```json
{
  "scripts": {
    "start": "http-server build -p $npm_package_appConfig_port",
    "test": "cypress run --env host=http://localhost:$npm_package_appConfig_port"
  },
  "appConfig": {
    "port": 8080
  }
}
```

Please note that this is not limited to custom properties—all properties are available as environment variables, like the following examples demonstrate.

- `$npm_package_name`
- `$npm_package_scripts_start`
- `$npm_package_appConfig_port`

Due to the fact that those variables are »real« environment variables, you can also access these values within your Node.js application via `process.env` (e.g. `process.env.npm_package_name`)—but, of course, only when being executed via a script in your `package.json` (e.g. `npm start`).

## Get a list of all environment variables

The commands `npm run env` and `yarn run env` print all variables present in a package and available to the scripts at runtime. As this also contains the package properties prefixed with `npm_package_`, running e.g. `npm run env | grep "npm_package_"` gives you a list of all environment variables generated from your `package.json` properties.

## Pitfalls

As aforementioned examples demonstrate, nesting levels in `package.json` are represented by underscores (`_`) in the environment variable names. As underscores are common in key names of JSON properties, this opens up the risk to overlapping variable names resulting of different input structures. Let’s have a look at the following example.

```json
{
  "scripts": {
    "start": "echo $npm_package_config_app_name"
  },
  "config": {
    "app": {
      "name": "Test"
    }
  },
  "config_app": {
    "name": "Demo"
  }
}
```

What would you expect `$npm_package_config_app_name` (i.e. running `npm start` or `yarn start`) to be? You may have guessed it: while npm prints `Demo` (i.e. the last definition), Yarn prints `Test` (i.e. the first definition). To prevent confusion between developers using different tools, you should make sure to prevent such overlapping names at any cost.
