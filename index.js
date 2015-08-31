'use strict';

var _ = require('lodash');
var glob = require('glob');
var normalizeNewline = require('normalize-newline');
var gray = require('gray-matter');

var path = require('path');
var fs = require('fs');

var GRAY_MATTER_CONFIG = {
  delims: ['===', '===']
};

var run = function(sourceDir, destinationDir) {

  var files = glob.sync('*.songdown', {cwd: sourceDir});
  var output = {};

  _.each(files, function(file) {
    var splitName = file.split(' - ');
    var artist = splitName.shift();
    var name = splitName.join(' ').replace(/\.songdown$/, '');

    var location = path.join(sourceDir, file);
    var source = normalizeNewline(fs.readFileSync(location).toString());

    var matter = gray(source, GRAY_MATTER_CONFIG);

    // Remove front matter from the source so it doesn't appear to the user.
    source = matter.content;

    var obj = {
      artist: artist,
      name: name,
      source: source
    };

    _.merge(obj, matter.data);

    if (!output[artist]) {
      output[artist] = {};
    }

    output[artist][name] = obj;
  });

  fs.writeFileSync(path.join(destinationDir, 'songs.json'), JSON.stringify(output, null, 2));
  return output;
};

module.exports.run = run;
