var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {

  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.jsx')
  ],

  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".scss"]
    //node_modules: ["web_modules", "node_modules"]  (Default Settings)
  },

  devServer:{
    contentBase: 'src/www',  //Relative directory for base of server
    devtool: 'eval',
    hot: true,        //Live-reload
    inline: true,
    port: 3000,        //Port Number
    host: '0.0.0.0'    //'localhost'  //Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      {from: 'www'}
    ], path.resolve(__dirname, "src")),

    new ExtractTextPlugin("styles.css"),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {

    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        //loaders: ['babel'],
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
      },
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'], //react-hot is like browser sync and babel loads jsx and es6-7
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
      // { 
      //   test: /\.(jpe?g|png|gif|svg|jpg)$/,
      //   loader: 'url?limit=10000'
      //   //loader: 'url-loader?limit=8192'
      // }
    ]
  },

  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;