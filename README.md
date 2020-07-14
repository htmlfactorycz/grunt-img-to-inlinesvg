# grunt-img-to-inlinesvg

> Replace svg images with inline svg during grunt build process

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-img-to-inlinesvg --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-img-to-inlinesvg');
```

## Attention !!!

Plugin only replace content and does not care about optimalization of svg icons. You have to optimize svg before to inline them. Use SVGO plugin.

## The "img_to_inlinesvg" task

### Overview
In your project's Gruntfile, add a section named `img_to_inlinesvg` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  img_to_inlinesvg: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.svgFileLimit
Type: `Number`
Default value: `10`

A number value that is used to limit svg file size. If file size will be bigger than this limit, image will be skipped and will not be inlined.

#### options.assetsDir
Type: `String`
Default value: ``

If you will use absolute path `/path/to/image.svg` you can specify directory to replace `/` to `options.assetsDir`.

### Usage Examples

```js
grunt.initConfig({
  img_to_inlinesvg: {
    options: {
      svgFileLimit: 10,
      assetsDir: "",
    },
    files: {
      'dest/index.html': ['src/index.html'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
