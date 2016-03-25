const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const autoprefixer = require('autoprefixer')

const prodplugins = process.env.NODE_ENV === 'production' ?
                      [
                      new webpack.optimize.DedupePlugin(),
                      new webpack.DefinePlugin({
                        'process.env': {
                          'NODE_ENV': JSON.stringify('production')
                        }
                      }),
                      ] : []

const devplugins = process.env.NODE_ENV !== 'production' ?
                  [
                    // Webpack 1.0
                    new webpack.optimize.OccurenceOrderPlugin(),
                    // Webpack 2.0 fixed this mispelling
                    // new webpack.optimize.OccurrenceOrderPlugin(),
                    new NpmInstallPlugin({
                    // cacheMin: 999999  // --cache-min=999999 (prefer NPM cached version)
                    // registry: "..."   // --registry="..."
                    // save: true,       // --save
                    saveDev: true,    // --save-dev
                    saveExact: true,  // --save-exact
                    }),
                  new webpack.HotModuleReplacementPlugin(),
                  new webpack.NoErrorsPlugin(),
                 ] : []

module.exports = {

  entry: [__dirname + '/src/index.js'],

  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx$)/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', '!css!postcss?browsers=last 2 versions'),
        // loader: ExtractTextPlugin.extract('style!css!autoprefixer?browsers=last 2 versions'),
      },
      {
        test: /\.scss$/,
        // loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss?sourceMap!sass?sourceMap'),
      },
      // {
      //     test: /\.less$/,
      //     loader: ExtractTextPlugin.extract('style', '!css!less')
      // }
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192',
      }, // inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test:/\.m4a$/,
        loader: 'file?name=[path][name].[ext]'
      }
    ],
  },

  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
  ],

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    alias: {
      // 'react': __dirname + '/node_modules/react',
      // 'react-dom': __dirname + '/node_modules/react-dom'
    },
    extensions: ['', '.json', '.js', '.scss'],
  },
  plugins: [
    ...devplugins,
    new ExtractTextPlugin('styles.css', { allChunks: true }),
    new HtmlWebpackPlugin({ // Also generate a test.html
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
    }),
    ...prodplugins,
  ],

  devtool: '#cheap-module-source-map', // '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './dist',
  },
}
