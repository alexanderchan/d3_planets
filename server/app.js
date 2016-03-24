require('dotenv').config({silent: process.env.NODE_ENV === 'production'}) // load config from .env or environment
const express = require('express')
const app = express()
const giffy = require('./giffy')
const path = require('path')

/* -------------------------------------------------------------
* Use webpack for the dev environment and the dist for prod
* -------------------------------------------------------------*/
if (process.env.NODE_ENV === 'development') {
    const webpackMiddleware = require('webpack-dev-middleware')
    const webpack = require('webpack')
    var webpackConf = require('../webpack.config.js')
    webpackConf.entry = [ 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000' ].concat(webpackConf.entry)
    webpackConf.output.path = '/'
    console.log('Running webpack dev middleware')

    const compiler = webpack(webpackConf)
    app.use(webpackMiddleware(compiler, { }))
    app.use(require('webpack-hot-middleware')(compiler))

} else {
  const STATIC_PATH = path.resolve(__dirname + '/../dist')
  console.log(STATIC_PATH)
  app.use(express.static(STATIC_PATH, {maxAge: 3600}))
}

module.exports = app
