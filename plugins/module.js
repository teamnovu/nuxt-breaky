const { resolve } = require('path')

export default function nuxtBreaky(moduleOptions) {
  if (process.env.NODE_ENV === 'development' && moduleOptions.enabled) {
    this.addPlugin({
      src: resolve(__dirname, 'plugin.js'),
      ssr: false,
    })
    console.info('Breaky plugin added')
  }
}

module.exports.meta = require('../package.json')
