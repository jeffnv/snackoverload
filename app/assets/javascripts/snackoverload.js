window.Snackoverload = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //set up collection
    //on success for fetch, do this stuff
    Snackoverload.favoriteTags = new Snackoverload.Collections.Tags([], {type: 'favorite'});
    Snackoverload.questions = new Snackoverload.Collections.Questions();
    Snackoverload.tags = new Snackoverload.Collections.Tags([], {type: 'all'});
    
    var favePromise = Snackoverload.favoriteTags.fetch();
    var questionPromise = Snackoverload.questions.fetch();
    var tagPromise = Snackoverload.tags.fetch();
    
    $.when(favePromise, questionPromise, tagPromise).then(function(){
      Snackoverload.router = new Snackoverload.Routers.SnackRouter({
        $main: $('#main'),
        $sidebar: $('#sidebar')
      });
      Backbone.history.start();
    });
  }
};