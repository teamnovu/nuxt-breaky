const { resolve } = require('path')

module.exports = function(moduleOptions) {
  const defaults = {
    enabled: true,
    enableInProd: false,
    position: 'bottom-right',
  }

  const options = {
    ...defaults,
    ...this.options.breaky,
    ...moduleOptions,
  }

  const templates = ['Breaky.vue', 'TransitionExpand.vue']

  if (
    options.enableInProd ||
    (process.env.NODE_ENV === 'development' && options.enabled)
  ) {
    this.addPlugin({
      src: resolve(__dirname, 'plugin.js'),
      fileName: 'nuxt-breaky.js',
      ssr: false,
      options,
    })

    templates.forEach((name) => {
      this.addTemplate({
        src: resolve(__dirname, name),
        fileName: name,
      })
    })

    console.info('Breaky plugin added')
  }
}

module.exports.meta = require('../package.json')
