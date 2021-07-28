const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const dllConfig = require('./webpack.dll.config')

function genDllReferences() {
  return Object.keys(dllConfig.entry).map(
    name =>
      new webpack.DllReferencePlugin({
        manifest: require(path.join(__dirname, '../static', `${name}.manifest.json`)),
      }),
  )
}

function loadDllAssets() {
  return fs
    .readdirSync(path.resolve(__dirname, '../static'))
    .filter(filename => filename.match(/.dll.js$/))
    .map(filename => filename)
}

module.exports = {
  loadDllAssets,
  genDllReferences,
}
