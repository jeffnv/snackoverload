Snackoverload.Collections.Answers = Backbone.Collection.extend({
  model: Snackoverload.Models.Answer,
  url: function(){
    return '/answers/' + this.get('question_id');
  },
});