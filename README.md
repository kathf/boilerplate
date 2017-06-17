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

For example, to use [eslint-plugin-compat]](https://github.com/amilajack/eslint-plugin-compat) for browser compatability using browserslist:

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

## Creating and running scripts

Most Node projects provide a `start` command. This is (or should be) the entry point to a Node application.

If there is no `start` entry in your `package.json`, npm will run node `server.js` (if there is a file called server.js in the root of your directory).
To add the start script to your application, add a `start` entry to the field `scripts` in your `package.json`.
```
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
$ npm stop
$ npm restart
$ npm start
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



# Working on a project

## Yarn

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
$ yarn
```
or
```
$ yarn install
```

Each command will automatically update your `package.json` and `yarn.lock` files.
