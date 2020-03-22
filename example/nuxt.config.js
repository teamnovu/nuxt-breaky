const { resolve } = require('path')

module.exports = {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false,
  },
  modules: [
    { handler: require('@nuxtjs/tailwindcss') },
    { handler: require('../') },
  ],
  breaky: {
    enabled: true,
    enableInProd: false,
    position: 'bottomRight',
  },
  tailwindcss: {
    exposeConfig: true,
  },
}
