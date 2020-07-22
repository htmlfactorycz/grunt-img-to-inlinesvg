/*
 * grunt-img-to-inlinesvg
 * https://github.com/htmlfactorycz/grunt-img-to-inlinesvg
 *
 * Copyright (c) 2020 Vitalij Petráš
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var path = require('path');
  var url = require('url');
  var JSDOM = require('jsdom').JSDOM;

  grunt.registerMultiTask('img_to_inlinesvg', 'description', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      svgFileLimit: 10,
      assetsDir: "",
      selector: "img[inline]"
    });

    var created = {
      files: 0
    };

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Check that the source file exists
      if (f.src.length === 0) {
        // Print a success message.
        grunt.log.warn('File "' + f.dest + '" does not exist.');
        return;
      }

      // init dom
      var dom = new JSDOM(grunt.file.read(f.src));
      var doc = dom.window.document;

      grunt.verbose.writeln(('Reading: ').green + path.resolve(f.src.toString()));

      var all_images = doc.querySelectorAll(options.selector);
      if (all_images) {
        for (var i = 0; i < all_images.length; i++) {
          var image = all_images[i];
          var src = image.src;

          if (!src) {

          } else if (src.match(/^\/\//)) {

          } else if (!src.match(/.svg$/i)) {

          } else if (url.parse(src).protocol) {

          } else {
            var filePath = (src.substr(0, 1) === "/") ? path.resolve(options.assetsDir, src.substr(1)) : path.join(path.dirname(f.src.toString()), src);
            var fileExists = grunt.file.exists(filePath);

            if(fileExists){
              var fileContent = grunt.file.read(filePath);
              var fileSize = fileContent.length / 1024;

              if (options.svgFileLimit && fileSize > options.svgFileLimit) {
                grunt.verbose.writeln(('<svg>: ').blue + filePath + (' (skipped: ' + fileSize.toFixed(2) + ' KB > ' + options.svgFileLimit + ' KB)').yellow);
              } else {
                image.insertAdjacentHTML('beforebegin', fileContent);
                var svg = image.previousElementSibling;

                //set attributes from img to svg
                var atts = image.attributes;
                for (var index = 0; index < atts.length; index++) {
                  var attname = atts[index].nodeName;
                  if(attname !== 'src' && attname !== 'srcset' && attname !== 'sizes' && attname !== 'alt' && attname !== 'inline'){
                    svg.setAttribute(atts[index].nodeName, atts[index].value);
                  }
                  if(attname === 'alt' && atts[index].value !== "" && !svg.getAttribute('title')){
                    svg.setAttribute('title', atts[index].value);
                  }
                }
                svg.setAttribute('role', 'img');

                //remove img element
                image.remove();
              }
            }else{//fileExists = false
              grunt.verbose.writeln(('<svg>: ').blue + filePath + 'not found');
            }
          }
        }

        var html = dom.serialize();

        // Write the destination file.
        grunt.file.write(path.resolve(f.dest), html);
        created.files++;

        // Print a success message.
        grunt.verbose.writeln(('Created: ').green + path.resolve(f.dest) + '\n');
      }
    });

    if (created.files > 0) {
      grunt.log.ok(
        created.files + ' ' + grunt.util.pluralize(created.files, 'file/files') + ' created'
      );
    } else {
      grunt.log.warn('No files created.');
    }
  });

};
