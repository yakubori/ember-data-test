App = Ember.Application.create({
  // This can be useful during development. The logs will appear in the console.
  LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend({

  adapter: DS.RESTAdapter.extend({

    /* 

    We get an '_id' column from Node, pushed up the stack from MongoDB.

    Rather than making modifications do the data server-side, we can tell an Ember Data
    model which key we want to use for its own 'id' key by simply extending the adapter
    (DS.RESTAdapter) and subsequently its serailizer (DS.RESTSerializer).

    */
    serializer: DS.RESTSerializer.extend({
      primaryKey: function(type) {
        return '_id';
      }
    })

  })

});

// Other than the aforementioned issue with the 'id' key, our model is simple.
App.Thing = DS.Model.extend({

  title: DS.attr('string'),
  sid: DS.attr('number')

});

// Notice the default static-data return was commented out in favor of our full-cycle
// example. The data will render inherently using in the index view, in index.html.
App.IndexRoute = Ember.Route.extend({
  model: function() {
    //return ['red', 'yellow', 'blue'];
    return App.Thing.find();
  }
});
