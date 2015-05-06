var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: './showcase',
  output: {
    path: __dirname + '/dist',
    publicPath: '/dist/',
    filename: 'showcase.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?loose&optional=es3.memberExpressionLiterals',
        include: [
          path.join(__dirname, 'src'),
          /retail-ui\/components/,
          /esprima\.js$/, // Need memberExpressionLiterals for IE8.
        ],
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {test: /\.less$/, loader: 'less-loader'},
      {test: /\.(woff|eot)$/, loader: "file-loader"}
    ]
  },
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      ui: 'retail-ui/components'
    },
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new ExtractTextPlugin('showcase.css'),
    new webpack.PrefetchPlugin('react'),
  ]
};
