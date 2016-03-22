'use strict';

require('dotenv').config({ silent: process.env.NODE_ENV === 'production' }); // load config from .env or environment
var express = require('express');
var app = express();
var giffy = require('./giffy');
/* -------------------------------------------------------------
* Use webpack for the dev environment and the dist for prod
* -------------------------------------------------------------*/
if (process.env.NODE_ENV === 'development') {
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpack = require('webpack');
  var webpackConf = require('../webpack.config.js');
  webpackConf.entry = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'].concat(webpackConf.entry);
  webpackConf.output.path = '/';
  console.log('Running webpack dev middleware');

  var compiler = webpack(webpackConf);
  app.use(webpackMiddleware(compiler, {}));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(__dirname + '/dist', { maxAge: 3600 }));
}

app.get('/search', function search(request, response, next) {
  // response.json({ q: request.query.q })
  var RESULTS_PER_PAGE = 25;
  var offset = request.query.page ? request.query.page * RESULTS_PER_PAGE : 0;

  giffy.search({ searchString: request.query.q,
    offset: offset }).then(function (results) {
    return results.map(function (result) {
      return {
        url: result.images.fixed_height.url,
        description: result.description

      };
    });
  });
});

module.exports = app;