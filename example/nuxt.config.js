const { resolve } = require('path')

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/nuxt-breaky/',
        },
      }
    : {}

module.exports = {
  ...routerBase,

  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  generate: {
    devtools: true,
    dir: resolve(__dirname, 'dist'),
  },
  render: {
    resourceHints: false,
  },
  modules: [
    { handler: require('@nuxtjs/tailwindcss') },
    { handler: require('../') },
  ],
  breaky: {
    enabled: true,
    enableInProd: process.env.DEPLOY_ENV === 'GH_PAGES',
    position: 'bottomRight',
    colorScheme: 'auto',
  },
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: './assets/css/tailwind.css',
    exposeConfig: true,
  },
  purgeCSS: {
    content: [
      resolve(__dirname, '../lib/**/*.scss'),
      resolve(__dirname, '../lib/**/*.js'),
      resolve(__dirname, '../lib/**/*.vue'),
      resolve(__dirname, 'pages/**/*'),
    ],
  },
}
