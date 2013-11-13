Snackoverload.Models.Question = Backbone.Model.extend({
  parse: function(data){
    data.asker = new Snackoverload.Models.User(data.asker);
    data.tags = new Snackoverload.Collections.Tags(data.tags);
    data.answers.forEach(function(answerJSON){
      answerJSON.comments = new Snackoverload.Collections.Comments(answerJSON.comments);
    });
    data.answers = new Snackoverload.Collections.Answers(data.answers);
    data.comments = new Snackoverload.Collections.Comments(data.comments);
    data.votes = new Snackoverload.Collections.Votes(data.votes);
    return data;
  }
});