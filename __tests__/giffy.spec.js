require('dotenv').config({silent: true}) // load config from .env or environment
const assert = require('chai').assert
const giffy = require('../giffy.js')

describe('giffy', () => {
  it('should parse out a description', () => {
    assert(giffy.slugToDescription('this-old-man-i23u2iu32i') === 'this old man')
  })

  it('should return 25 results from the search', () => {
    return giffy.search({searchString: 'taylor swift'}).then(results => {
      assert(results.length === 25)
    })
  })

  it('should return a limited results from the search', () => {
    return giffy.search({searchString: 'taylor swift', limit: 5}).then(results => {
      assert(results.length === 5)
    })
  })
})
