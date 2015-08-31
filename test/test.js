'use strict';

var path = require('path');

var packager = require('./../index');

var deepEqual = require('deep-equal');

var source = path.join(__dirname, 'test-songs');
var destination = __dirname;

var EXPECTATION = {
  "Foo": {
    "Bar": {
      "artist": "Foo",
      "name": "Bar",
      "source": "\ntest\n",
      "spam": "eggs"
    }
  }
};

var result = packager.run(source, destination);

if (deepEqual(EXPECTATION, result)) {
  console.log('All good!');
  process.exit(0);
} else {
  console.error('Error!');
  process.exit(1);
}
