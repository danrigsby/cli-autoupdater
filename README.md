# cli-autoupdater
<p align="center">
  <a href="https://circleci.com/gh/danrigsby/cli-autoupdater">
    <img src="https://circleci.com/gh/danrigsby/cli-autoupdater.svg?style=svg" alt="build status" />
  </a>
  <a href="https://npmjs.org/package/cli-autoupdater">
    <img src="https://img.shields.io/npm/v/cli-autoupdater.svg" alt="npm version" />
  </a>
  <a href="https://github.com/danrigsby/cli-autoupdater/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/cli-autoupdater.svg" alt="license" />
  </a>
  <a href='https://coveralls.io/github/danrigsby/cli-autoupdater?branch=master'>
    <img src='https://coveralls.io/repos/github/danrigsby/cli-autoupdater/badge.svg?branch=master' alt='Coverage Status' />
  </a>
</p>

Autoupdating library for node based cli tools

**Some Possible Use Cases**

## Installation
``` sh
# npm
npm install cli-autoupdater --save

# yarn
yarn add cli-autoupdater
```

## Usage
`autoupdater` is called by passing in the "options" object and a Promise is returned. The result is a `boolean` value representing if an update was performed or not.

``` javascript
autoupdater(require('../package.json');).then((updated) => {
  if (updated) {
    // The application was updated, so exit
    console.log('You may rerun the last command');
    process.exit();
  } else {
    // No update occurred, so just run the application
    run(); // Or whatever your application usually does here
  }
}).catch((e) => {
  // An error has occurred so
  console.log(e);
  process.exit()
});
```

You could pass in your own configuration object or just use your `package.json` file. The fields in use are:
``` json
{
  "name": "myApp",
  "version": "1.0.0",
  "autoupdater": {
    "updateMessage": "Would you like to update now?",
    "checkCommand": "npm show myApp version",
    "installCommand": "npm install -g myApp",
    "promptUser": true
  }
}
```
All `autoupdater` options are completely optional and usually the defaults are good enough.

The autoupdater simply looks at the `version` and compares it to the `version` in npm.  If there is a newer version, the user is prompted to update.  If `promptUser` is `false`, then the update is automatic.

## License
`cli-autoupdater` is licensed under the [MIT License](LICENSE).
