# grunt-start-webdriver

> _only_ starts the selenium webdriver

There are several plugins out there that will launch an instance of selenium-webdriver for you, but it is usually for a
specific purpose. I was setting up a protractor auto-test workflow using grunt, and really only wanted a task that would
start the webdriver, block until it was ready to accept connections, and then leave it running in the background until
the grunt process finished.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-start-webdriver --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-start-webdriver');
```

## The "start_webdriver" task

### Overview
In your project's Gruntfile, add a section named `webdriver` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  webdriver: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.debug
Type: `boolean`
Default value: `false`

selenium webdriver is fairly verbose in its output, so it is hidden by default. Setting `debug` to true will pipe the
output to the console.

#### options.startCommand
Type: `String`
Default value: `'webdriver-manager start'`

Set this value to customize how selenium is started. The default assumes the presence of protractor on the path, and uses
the `webdriver-manager` script (which it provides).

### Usage Examples

#### Default Options

```js
grunt.initConfig({
  webdriver: {
    options: {},
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  webdriver: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- v0.0.1 - initial

## License
Copyright (c) 2014 Matt Briggs. Licensed under the MIT license.
