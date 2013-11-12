window.Snackoverload = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //set up collection
    //on success for fetch, do this stuff
    Snackoverload.favoriteTags = new Snackoverload.Collections.Tags();
    Snackoverload.questions = new Snackoverload.Collections.Questions();
    
    var favePromise = Snackoverload.favoriteTags.fetch();
    var questionPromise = Snackoverload.questions.fetch();
    
    $.when(favePromise, questionPromise).then(function(){
      Snackoverload.router = new Snackoverload.Routers.SnackRouter({
        $main: $('#main'),
        $sidebar: $('#sidebar')
      });
      Backbone.history.start();
    });
  }
};