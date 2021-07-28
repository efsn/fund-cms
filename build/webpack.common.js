const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const getRootPath = require('./path')
const dllHelper = require('./dllHelper')
const envConfig = require(getRootPath(
  'config',
  `${process.env.NODE_ENV || 'dev'}.env`
))

module.exports = {
  entry: {
    main: [
      './src/index.tsx',
    ],
  },
  output: {
    path: envConfig.build.outputPath,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'less'],
    alias: {
      config: getRootPath('config', `${process.env.NODE_ENV}.env` || 'dev.env'),
      '@ant-design/icons/lib/dist$': path.resolve('src/icons.ts'),
      '@': path.resolve('src'),
    },
  },
  plugins: [
    // ...dllHelper.genDllReferences(),
    // new CopyPlugin([
    //   { from: 'static', to: '.' },
    // ]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      favicon: 'favicon.ico',
      envConfig,
    }),
    // new HtmlIncludeAssetsPlugin({
    //   assets: dllHelper.loadDllAssets(),
    //   append: false,
    // })
  ],
  performance: {
    hints: false,
  },
  optimization: {
    moduleIds: "hashed",
    usedExports: true,
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
  },
  stats: { children: false },
  module: {
    rules: [
      {
        test: /\.font\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          {
            loader: 'webfonts-loader',
            options: {
              publicPath: './',
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              // onlyCompileBundledFiles: true,
              transpileOnly: true,
            },
          }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)?$/,
        include: [path.resolve(__dirname, '../src/assets/fonts')],
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[contenthash:5].[ext]',
        },
      },
      {
        test: /\.(jpe?g|svg|png|gif)?$/,
        exclude: [path.resolve(__dirname, '../src/assets/fonts')],
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'assets/images/[name].[contenthash:5].[ext]',
        },
      },
      // {
      //   test: /\.(xlsx|csv)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: 'assets/static/[name].[ext]',
      //   },
      // },
    ],
  },
}
