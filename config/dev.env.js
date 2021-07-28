const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"dev"',
    },
    outputPath: path.resolve(__dirname, '../dist'),
  },
}
