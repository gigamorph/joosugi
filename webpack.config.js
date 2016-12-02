//var VersionFile = require('webpack-version-file-plugin');
var BannerWebpackPlugin = require('banner-webpack-plugin');
var path = require('path');
var npmPackage = require('./package');

function header() {
  return '// Joosugi version ' + npmPackage.version + '\n// ' + 
    'Build: ' + new Date() + '\n\n';
}

module.exports = {
  debug: true,
  entry: {
    joosugi: './src/js/main.js',
  },
  output: {
    path: './dist',
    filename: 'joosugi.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      /*exclude: /node_modules/,*/
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'es2017']
      }
    }]
  },
  plugins: [
    new BannerWebpackPlugin({
      chunks: {
        joosugi: {
          beforeContent: header()
        }
      }
    })
  ]
};
