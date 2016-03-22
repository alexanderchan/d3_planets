'use strict';

var app = require('./app.js');
var port = process.env.PORT || 8080;

app.listen(port, function () {
  return console.log('listening on port:' + port);
});