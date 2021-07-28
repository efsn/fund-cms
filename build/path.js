const path = require('path')

module.exports = function() {
  const basePath = [__dirname, '../']
  const args = Array.prototype.slice.call(arguments)
  return path.join.apply(null, basePath.concat(args))
}
