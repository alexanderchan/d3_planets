'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fetch = require('node-fetch');
var qs = require('qs');

var GIFFY_API_KEY = 'dc6zaTOxFJmzC';
var GIFFY_SEARCH_URL = 'http://api.giphy.com/v1/gifs/search';

var SLUG_REGEX = /(.*)-/;
function slugToDescription(slug) {
  if (!slug) {
    return;
  }
  var hyphenDesc = slug.match(SLUG_REGEX);
  if (!hyphenDesc) {
    return slug;
  }
  if (hyphenDesc.length >= 1) {
    return hyphenDesc[1].replace(/\-/g, ' ');
  }
  return slug;
}

function search(_ref) {
  var searchString = _ref.searchString;
  var offset = _ref.offset;
  var limit = _ref.limit;
  var rating = _ref.rating;

  var queryParams = {
    api_key: GIFFY_API_KEY,
    q: searchString,
    offset: offset,
    limit: limit,
    rating: rating
  };
  var queryString = qs.stringify(queryParams);
  return fetch(GIFFY_SEARCH_URL + '?' + queryString).then(function (resp) {
    if (resp.status !== 200) {
      throw resp;
    } else {
      return resp.json();
    }
  }).then(function (result) {

    return result.data.map(function (line) {
      return _extends({}, line, { description: slugToDescription(line.slug) });
    });
  });
}

module.exports = { search: search, slugToDescription: slugToDescription };