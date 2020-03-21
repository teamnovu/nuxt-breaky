const { resolve } = require('path')

module.exports = {
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
  },
  tailwindcss: {
    exposeConfig: true,
  },
}
