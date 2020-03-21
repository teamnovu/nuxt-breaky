const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const defaults = {
    enabled: true
  }

  const options = {
    ...defaults,
    ...this.options.breaky,
    ...moduleOptions
  }

  if (process.env.NODE_ENV === 'development' && options.enabled) {
    this.addPlugin({
      src: resolve(__dirname, 'plugin.js'),
      fileName: 'nuxt-breaky.js',
      ssr: false,
      options
    })
    this.addPlugin({
      src: resolve(__dirname, 'Breaky.vue'),
      fileName: 'Breaky.vue',
      ssr: false,
      options
    })
    console.info('Breaky plugin added')
  }
}

module.exports.meta = require('../package.json')