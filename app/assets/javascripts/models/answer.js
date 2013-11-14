Snackoverload.Models.Answer = Backbone.Model.extend({
  urlRoot: '/answers',
  parse: function(data){
    data.comments = new Snackoverload.Collections.Comments(data.comments);
    return data;
  },
});