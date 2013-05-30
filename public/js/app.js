App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.Store = DS.Store.extend({

  adapter: DS.RESTAdapter.extend({

    serializer: DS.RESTSerializer.extend({
      primaryKey: function(type) {
        return '_id';
      }
    })

  })

});

App.Thing = DS.Model.extend({

  title: DS.attr('string'),
  sid: DS.attr('string')

});

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    //return ['red', 'yellow', 'blue'];
    return App.Thing.find();
  }
});
