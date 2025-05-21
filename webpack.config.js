const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '' // Убрал слеш для корректных путей
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i, // Объединил все стилевые файлы
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/test.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css' // Убрал хеши для простоты отладки
    }),
  ],
};