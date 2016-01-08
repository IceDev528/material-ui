const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  //Entry point to the project
  entry: [
    path.join(__dirname, '/src/app/app.jsx'),
  ],
  //Webpack config options on how to obtain modules
  resolve: {
    //When requiring, you don't need to add these extensions
    extensions: ['', '.js', '.jsx', '.md', '.txt'],
    alias: {
      //material-ui requires will be searched in src folder, not in node_modules
      'material-ui/lib': path.resolve(__dirname, '../src'),
      'material-ui': path.resolve(__dirname, '../src'),
    },
    //Modules will be searched for in these directories
    modulesDirectories: [
      // We need /docs/node_modules to be resolved before /node_modules
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, 'src/app/components/raw-code'),
      path.resolve(__dirname, 'src/app/components/markdown'),
    ],
  },
  devtool: 'source-map',
  //Configuration for server
  devServer: {
    contentBase: 'build',
  },
  //Output file config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js',  //Name of output file
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/src/www/index.html'),
    }),
    //Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www/css', to: 'css'},
      {from: 'www/images', to: 'images'},
    ], path.resolve(__dirname, 'src')),
  ],
  externals: {
    fs: 'fs', // To remove once https://github.com/benjamn/recast/pull/238 is released
  },
  module: {
    //eslint loader
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [path.resolve(__dirname, '../src')],
        exclude: [
          path.resolve(__dirname, '../src/svg-icons'),
        ],
      },
    ],
    //Allow loading of non-es5 js files.
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, 'src/app/components/raw-code'),
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, 'src/app/components'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  eslint: {
    configFile: '../.eslintrc',
  },
};

module.exports = config;
