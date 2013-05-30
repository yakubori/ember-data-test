var express = require('express'),
    app = express(),
    port = 3000;

app.get('/', function(req, res) {
  var body = "Hi there!";

  res.setHeader('Content-type', 'text/plain');
  res.setHeader('Content-length', body.length);
  res.end(body);
});

app.listen(port);
console.log('Listening on port '+port);