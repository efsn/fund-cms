const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"',
    },
    bundleAnalyzerReport: process.env.bundle_analyzer_report,
    outputPath: path.resolve(__dirname, '../dist'),
  },
}
