var express = require('express'),
    app = express(),
    mongo = require('mongodb'),
    mongoServ = new mongo.Server('localhost', 27017, {auto_reconnect: true}),
    stuff = new mongo.Db('stuff', mongoServ),
    port = 3000;

// Simple config since this is just a demo.
app.configure(function() {
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
});

app.get('/', function(req, res) {
  
  var body = "Hi there!";

  res.setHeader('Content-type', 'text/plain');
  res.setHeader('Content-length', body.length);
  res.end(body);

});

app.get('/things', function(req, res) {
  
  // Get data and return; easy, right?
  var things = stuff.collection('things');

  var cursor = things.find();

  cursor.toArray(function(err, docs) {
    
    if ( err ) {
      return res.json(500, { error: 'FAIL: '+err });
    }

    return res.json(200, { things: docs });
  
  });

});

app.listen(port);
console.log('Listening on port '+port);