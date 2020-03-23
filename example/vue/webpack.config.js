const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './main.js',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
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
