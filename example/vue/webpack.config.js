const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './main.js',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: [
      'node_modules',
      '/Users/tom/Projects/nuxt-breaky/node_modules/nuxt-edge/bin/node_modules',
      '/Users/tom/Projects/nuxt-breaky/node_modules/nuxt-edge/node_modules',
      '/Users/tom/Projects/nuxt-breaky/node_modules',
      '/Users/tom/Projects/node_modules',
      '/Users/tom/node_modules',
      '/Users/node_modules',
      '/node_modules',
    ],
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.(sa|sc|c){1}ss$/i,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'example/vue',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'example/vue/index.html',
    }),
    new VueLoaderPlugin(),
  ],
}
