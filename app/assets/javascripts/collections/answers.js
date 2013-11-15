Snackoverload.Collections.Answers = Backbone.Collection.extend({
  model: Snackoverload.Models.Answer,
  url: function(){
    return '/answers/' + this.get('question_id');
  },
  
  chosenAnswer: function(){
    var chosen = false;
    var answer = this.findWhere({chosen: true});
    return answer ? answer : false;
  },
});