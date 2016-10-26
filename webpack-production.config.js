var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: [path.join(__dirname, '/src/app/app.jsx')],
  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".scss"]
  },
  devtool: false,
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'  //Name of output file
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname,"src")),

    new ExtractTextPlugin("styles.css"),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/, //All .js and .jsx files
        loaders: ['babel'], //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract("style", "css!sass") 
      },
      {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      },
      { test: /\.(jpe?g|svg|jpg)$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  //Eslint config
  eslint: {
    configFile: '.eslintrc' //Rules for eslint
  },
};

module.exports = config;
