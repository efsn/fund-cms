const path = require('path')
const webpack = require('webpack')
// const fs = require('fs')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const merge = require('webpack-merge')
// const lessToJs = require('less-vars-to-js')
// const antdThemeVariables = lessToJs(
//   fs.readFileSync(path.join(__dirname, '../src/styles/variables.less'), 'utf8')
// )

const commonConfig = require('./webpack.common')

const getProxyTargetByEnv = (env) => {
  switch (env) {
    default:
      return 'http://127.0.0.1:3000'
  }
}

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    open: true,
    hot: true,
    port: 3002,
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: getProxyTargetByEnv(process.env.PROXY_ENV),
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      async: false,
    }),
    new webpack.ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|less|css)?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 50,
            },
          },
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              // modifyVars: antdThemeVariables,
            },
          },
        ],
      },
    ],
  },
}

module.exports = merge(commonConfig, devConfig)
