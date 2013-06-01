/*

Let's load up our dependencies: express and mongdodb.

Also, we'll set some useful variables.

*/
var express   = require('express'),
    mongo     = require('mongodb'),
    app       = express(),
    port      = 3000,
    mongoServ = new mongo.Server('localhost', 27017, {auto_reconnect: true}),
    stuff     = new mongo.Db('stuff', mongoServ);

/*

Simple config since this is just a demo. There's much more available as your express
application grows: sessions, logging, etc.

*/
app.configure(function() {

  // Where our static content lives: the public directory, within our current directory.
  app.use( express.static(__dirname+'/public') );

  /*

  NOTE: We have an index.html file living inside of our public/ directory, which express
  will use that by default!

  */

});

/*

But this is really what we want to see: data from MongoDB, served up to Ember/Ember Data.

*/
app.get('/things', function(req, res) {
  
  // Get data and return; easy, right?
  var things = stuff.collection('things'),
      cursor = things.find();

  cursor.toArray(function(err, docs) {
    
    if ( err ) {
      return res.json(500, { error: 'FAIL: '+err });
    }

    // JSON is a pretty standard return type for this case.
    return res.json(200, { things: docs });
  
  });

});

// Of course, last but not least, we need our server to listen to requests. :)
app.listen(port);
console.log('Listening on port '+port);