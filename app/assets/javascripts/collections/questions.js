Snackoverload.Collections.Questions = Backbone.Collection.extend({
  model: Snackoverload.Models.Question,
  url: '/questions',
  byTagId: function(tagId){
    var filtered = this.filter(function(question) {
        return question.get('tags').pluck('id').indexOf(tagId) != -1;
      });
    return new Snackoverload.Collections.Questions(filtered);
  },
  
  byUserId: function(userId){
    var filtered = this.filter(function(question) {
        return question.get('asker').pluck('id').indexOf(userId) != -1;
      });
    return new Snackoverload.Collections.Questions(filtered);
  },

});