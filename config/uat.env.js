const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"uat"',
    },
    outputPath: path.resolve(__dirname, '../dist'),
  },
}
