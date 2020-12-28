const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 666
  },
	module: {
  	rules: [
  		{
      	test: /\.scss$/,
      	use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          },
          {
	          loader: 'sass-loader',
	          options: {
	            outputStyle: 'expanded',
              sourceMap: true
	          }
	        }
      	]
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin({
      appendScriptTag: true
    })
  ],
});