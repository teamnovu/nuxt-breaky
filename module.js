const { resolve } = require('path')

export default function nuxtBreaky(moduleOptions) {
  const { breaky = {} } = Object.assign({}, this.options)

  Object.assign(breaky, moduleOptions)

  const defaults = {
    enabled: true,
  }

  const { enabled, ...config } = Object.assign({}, defaults, breaky)

  if (process.env.NODE_ENV === 'development' && enabled) {
    this.addPlugin({
      src: resolve(__dirname, 'plugins/plugin.js'),
      ssr: false,
    })
    console.info('Breaky plugin added')
  }
}

module.exports.meta = require('./package.json')
