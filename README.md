# Quickstart Summary

```
mkdir <project-name>
cd <project-name>
git init
yarn init

# pause to allow set up of package.json

yarn add webpack webpack-dev-server eslint --dev
yarn add babel-core babel-loader babel-preset-env --dev

mkdir src dist
touch src/index.js

echo '{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
' > .babelrc

echo '
node_modules/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist
' > .gitignore

echo '<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>XXX</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
' > index.html

echo 'v7.9.0' > .nvmrc

echo 'const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: __dirname,
    hot: true,
    publicPath: "/"
  }
};
' > webpack.config.js

./node_modules/.bin/eslint --init

# pause to set up eslint settings
# Add scripts to package.json manually
```

# Starting a new project

## Yarn

Yarn is a package manager for Javascript, so that code can be shared easily between developers and dependencies managed.

Code is shared through something called a package (sometimes referred to as a module). A package contains all the code being shared as well as a package.json file which describes the package.

npm is also a Javascript package manager, but yarn is preferred because it's faster and saves to package.json by default without needing `--save`.

To start a yarn project, do the following and then provide project details in the interactive console.

```
$ mkdir <project-name>
$ cd <project-name>
$ yarn init
```

This creates a `package.json` file, which is used to store info about your project - name of your project, the maintainers, where the source code lives, but most importantly what dependencies are needed to be installed for the project.

**Recommendation** Add browserslist to `package.json`.

This is used by a few different libraries to target a certain browser version across all your dependencies.

```
# package.json
{
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}
```

## Gitignore

Add a `.gitignore` file. 

You'll want to ignore node_modules at the very least! 

[Example Node .gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)

```
# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependencies
node_modules/
```

## Node version

Add an `.nvmrc` file, with the version of Node you are using (you can find out by running `node -v`).

```
6.10
```

## ESLint

Set up eslint. 

[Eslint](http://eslint.org/docs/user-guide/getting-started) can be used to enforce code conventions across projects, but for personal projects it works best for catching errors or antipatterns.

```
$ yarn add eslint --dev
```

You can initialise an eslint configuration file (generally `.eslintrc`) by running the following:
```
$ ./node_modules/.bin/eslint --init
```

For example, to use [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) for browser compatability using browserslist:

```
# .eslintrc
{
  "env": {
    "browser": true
  },
  "plugins": ["compat"],
  "rules": {
    "compat/compat": 2
  }
}
```

## Webpack

Webpack is a build tool that allows developers to use babel for transpiling, SASS for our styles, PostCSS for autoprefixing, uglification, minification and all the other things! The goal is to have all of the assets in your project be webpack's concern and not the browser's.

Webpack has two sets of functionality — Loaders and Plugins. 
- Loaders transform the source code of all asset files (css, png etc) into modules so that webpack understands them.
- Plugins perform actions on chunks of bundled modules (as opposed to loaders which execute transforms on a per-file basis). For example, there is a plugin called UglifyJS that minifies and uglifies the output of webpack.

To install `webpack` and `webpack-dev-server` as development dependencies:

```
$ yarn add webpack webpack-dev-server --dev
```

Create the webpack configuration file in the root of the project directory:

```
$ touch webpack.config.js
```

```
// webpack.config.js

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  }
}

```

`entry` tells webpack where to look to start building the dependency graph (the contextual root of your app).
`output` tells webpack where to bundle the application.

We can also add loaders and plugins here:

```
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // ...
  module: {
    rules: [    
      {test: /\.txt$/, include: "/src/", use: 'raw-loader'},
      {test: /\.css$/, include: "/src/", use: 'css-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    contentBase: __dirname,
    hot: true,
    publicPath: "/"
  }
};
```

Loaders go under `module.rules` and specify `test` (how to detect the file to apply that loader to) and `use`/`loader` for the loader name. You should always use include/exclude to restrict which files will be checked against `test`.

For plugins, you need to `require()` the plugin at the top and add it to the plugins array with 'new' (since it's possible to use a plugin multiple times in a config).

`devServer` can be used to configure the behaviour of `webpack-dev-server` when the webpack config is passed to webpack-dev-server CLI.

Add webpack scripts to `package.json`.

```
// package.json

scripts: {
  "start": "webpack-dev-server --open",
  "build": "webpack -p"
}

```

The flag `-p` stands for production, which minifies and uglifies the code without needing to include the plugins in the configuration.

Include the bundle file in your html:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>XXX</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

## Babel

Babel is a JS transpiler that converts new JS code (ES6 for example) into old ones.

To add it to your project along with the babel-loader (for use with webpack):

```
$ yarn add babel-core babel-loader --dev
```

Add the babel loader to `webpack.config.js`:

```
// webpack.config.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: "/src/",
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "env" ]
          }
        }
      }
    ]
  }
  // ...
}
```

```
// .babelrc

{
  "presets": ["env"]
}
```

Instead of using `.babelrc` you can specify babel config in `package.json`:

```
// package.json

{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

You can set babel to transpile to a specific javascript version using  `babel-preset-es2015` and setting `"presets": ["es2015"]`. But it's better to use `babel-preset-env` and then specify browser versions:

```
$ yarn add babel-preset-env --dev
```

```
// .babelrc

{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
```

# Working on a project

## Run the project

To run webpack dev server for hot reloading:

```
$ node_modules/.bin/webpack-dev-server --open
```

The `--open` flag, opens the url in the default browser.

Or just add this to your scripts in `package.json` and then you can use `npm start`.

The default url is `http://localhost:8080`.

## Yarn - Adding depedencies

To add a dependency:
```
$ yarn add [package]
$ yarn add [package]@[version]
$ yarn add [package]@[tag]
$ yarn add [package] --dev
```

Development dependencies are those that you need at some point in the development workflow but not while running your code (e.g. Babel or Flow).

Upgrading a dependency
```
$ yarn upgrade [package]
$ yarn upgrade [package]@[version]
$ yarn upgrade [package]@[tag]
```

Removing a dependency
```
$ yarn remove [package]
```

Installing all the dependencies of project
```
$ yarn    /    $ yarn install
```

Each command will automatically update your `package.json` and `yarn.lock` files.

## Creating and running scripts

Most Node projects provide a `start` command. This is (or should be) the entry point to a Node application.

If there is no `start` entry in your `package.json`, npm will run node `server.js` (if there is a file called server.js in the root of your directory).
To add the start script to your application, add a `start` entry to the field `scripts` in your `package.json`.

```
// package.json

"scripts": {
  "start": "node index.js"
}
```

To run the start script, simply type `npm start`.
You can use the above steps for the following:
```
$ npm start
$ npm test
$ npm stop
$ npm restart
```

The above scripts also support running scripts before and after the base script by using the prefixes pre and post.
```
npm start
    npm prestart
    npm start
    npm poststart
npm test
    npm pretest
    npm test
    npm posttest
npm stop
    npm prestop
    npm stop
    npm poststop
npm restart
    npm prerestart
    npm prestop
    npm stop
    npm poststop
    npm restart
    npm prestart
    npm start
    npm poststart
    npm postrestart
```

You can add and run any script you like. Note that the syntax changes slightly. If you add a script called foo, to execute it, you run it by executing npm run foo.

When creating npm scripts, a useful thing to remember is that npm run adds node_modules/.bin to the PATH.
