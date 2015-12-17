'use strict'

/* global describe */
/* global it */

let path = require('path')

let packager = require('./../index')

let expect = require('chai').expect
let deepEqual = require('deep-equal')

let source = path.join(__dirname, 'test-songs')
let destination = __dirname

const EXPECTATION = {
  'Foo': {
    'Bar': {
      'artist': 'Foo',
      'name': 'Bar',
      'source': '\ntest\n',
      'spam': 'eggs'
    }
  }
}

describe('packager', () => {
  it('should output correctly', () => {
    let result = packager.run(source, destination)
    expect(deepEqual(EXPECTATION, result)).to.equal(true)
  })
})
