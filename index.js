'use strict'

let _ = require('lodash')
let glob = require('glob')
let normalizeNewline = require('normalize-newline')
let gray = require('gray-matter')

let path = require('path')
let fs = require('fs')

const GRAY_MATTER_CONFIG = {
  delims: ['===', '===']
}

module.exports.run = (sourceDir, destinationDir) => {
  let files = glob.sync('*.songdown', {cwd: sourceDir})
  let output = {}

  _.each(files, (file) => {
    let splitName = file.split(' - ')
    let artist = splitName.shift()
    let name = splitName.join(' ').replace(/\.songdown$/, '')

    let location = path.join(sourceDir, file)
    let source = normalizeNewline(fs.readFileSync(location).toString())

    let matter = gray(source, GRAY_MATTER_CONFIG)

    let obj = {
      artist,
      name,
      source: matter.content
    }

    _.merge(obj, matter.data)

    if (!output[artist]) {
      output[artist] = {}
    }

    output[artist][name] = obj
  })

  fs.writeFileSync(path.join(destinationDir, 'songs.json'), JSON.stringify(output, null, 2))
  return output
}
