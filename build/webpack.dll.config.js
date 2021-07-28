const path = require('path')
const webpack = require('webpack')
const package = require('../package.json')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const dependencies = Object.keys(package.dependencies) || []

module.exports = {
  mode: 'production',
  // The request context of the manifest cache file (default is the webpack execution environment context)
  context: process.cwd(),
  devtool: 'source-map',
  entry: {
    vendor: dependencies.filter((dependency) => !['antd'].includes(dependency)),
  },
  output: {
    path: path.join(__dirname, '../static'),
    filename: '[name].dll.js',
    libraryTarget: 'var',
    library: '_dll_[name]_[hash]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(__dirname, '../static', '[name].manifest.json'),
      name: '_dll_[name]_[hash]',
    }),
    new CompressionWebpackPlugin({
      test: /\.(js|css|ttf|jpg|jpeg|png)$/i,
      threshold: 10240,
    }),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            hoist_funs: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
}
