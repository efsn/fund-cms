process.env.NODE_ENV = process.env.NODE_ENV || 'prod'
const webpack= require('webpack')
const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = (...p) => path.resolve(__dirname, '../', ...p)


const commonConfig = require('./webpack.common')
const config = require(`../config/${process.env.NODE_ENV}.env`)

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: './',
    filename: 'js/[name].[contenthash:5].js',
    chunkFilename: 'js/[name].[contenthash:5].chunk.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
      chunkFilename: 'css/[name].[contenthash:5].chuck.css',
      // ignoreOrder: true,
    }),
    new CopyWebpackPlugin([resolve('manifest.json')]),
    new CompressionWebpackPlugin({
      test: /\.(js|css|ttf|jpg|jpeg|png)$/i,
      threshold: 10240,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
      },
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
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
  module: {
    rules: [
      {
        test: /\.(less|scss|css)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'global',
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {}
          },
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

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(commonConfig, prodConfig)
