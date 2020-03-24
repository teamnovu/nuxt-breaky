const { resolve } = require('path')

module.exports = function(moduleOptions) {
  const defaults = {
    enabled: true,
    enableInProd: false,
    colorScheme: 'auto',
    position: 'bottomRight',
  }

  const options = {
    ...defaults,
    ...this.options.breaky,
    ...moduleOptions,
  }

  const coreTemplates = [
    'components/Breaky.vue',
    'components/TransitionExpand.vue',
    'components/CurrentScreenIcon.vue',
    'assets/scss/mixins/color-scheme.scss',
  ]
  const templates = ['components/BreakyNuxt.vue']

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

    coreTemplates.forEach((name) => {
      this.addTemplate({
        src: require.resolve('@teamnovu/vue-breaky-core/lib/' + name),
        fileName: name,
      })
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
