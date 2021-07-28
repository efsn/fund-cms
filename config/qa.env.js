const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"qa"',
    },
    outputPath: path.resolve(__dirname, '../dist'),
  },
}
