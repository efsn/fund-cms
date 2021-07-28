module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '75',
          ie: '10',
        },
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-proposal-unicode-property-regex',
      {
        useUnicodeFlag: false,
      },
    ],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib'
      },
      'ant',
    ],
    ['@babel/plugin-syntax-dynamic-import']
  ],
}
