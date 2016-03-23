require('dotenv').config({silent: process.env.NODE_ENV === 'production'}) // load config from .env or environment
const express = require('express')
const app = express()
const giffy = require('./giffy')
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
  app.use(express.static(__dirname + '/dist', {maxAge: 3600}))
}

var recent_submissions = []

app.get('/api/latest/imagesearch', (request, response) => {
  response.json(recent_submissions)
})

app.get('/api/imagesearch/:searchString', function search(request, response) {
  // response.json({ q: request.query.q })
  const RESULTS_PER_PAGE = 25
  const MAX_LEN_HISTORY = 40
  const offset = request.query.page ? request.query.page * RESULTS_PER_PAGE : 0
  const shortQuery = typeof request.params.searchString === 'string' ? request.params.searchString.substring(0, MAX_LEN_HISTORY) : ''
  recent_submissions = [{ term: shortQuery,
                          when: new Date()},
                        ...recent_submissions]

  if (recent_submissions.length > 10) {
    recent_submissions.length = 9
  }

  giffy.search({searchString: request.params.searchString,
                offset})
      .then( results => {
        response.json(
          results.map( result => {
            return {
              url: result.images.fixed_height.url,
              thumbnail: result.images.fixed_width_still.url,
              context: result.source,
              snippet: result.description
            }
          }
        ))
      })
})

module.exports = app
