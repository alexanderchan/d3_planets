const fetch = require('node-fetch')
const qs = require('qs')

const GIFFY_API_KEY = 'dc6zaTOxFJmzC'
const GIFFY_SEARCH_URL = 'http://api.giphy.com/v1/gifs/search'

const SLUG_REGEX = /(.*)-/
function slugToDescription(slug) {
  if (!slug) {
    return
  }
  const hyphenDesc = slug.match(SLUG_REGEX)
  if (!hyphenDesc) {
    return slug
  }
  if (hyphenDesc.length >= 1) {
    return hyphenDesc[1].replace(/\-/g, ' ')
  }
  return slug
}

function search({searchString, offset, limit, rating}) {
  const queryParams = {
    api_key: GIFFY_API_KEY,
    q: searchString,
    offset,
    limit,
    rating
  }
  const queryString = qs.stringify(queryParams)
  return fetch(GIFFY_SEARCH_URL + '?' + queryString)
        .then(resp => {
          if (resp.status !== 200) {
            throw resp
          } else {
            return resp.json()
          }
        }).then(result => {

          return result.data.map( line => {
            return Object.assign({}, line, {description: slugToDescription(line.slug)})
          })
        })
}

module.exports = { search, slugToDescription }
