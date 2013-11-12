Snackoverload.Views.QuestionList = Backbone.View.extend({
  template: JST['questions/question_list'],
  render: function(){
    var $questions = $("<div class=\"question-list\"></div>");
    var that = this;
    
    this.collection.each(function(question){
      
      var $question = $('<div class="question"></div>');
      $question.html(that.template({question: question}));
      
      var $tags = $question.find('.question-tags');
      question.get('tags').each(function(tag){
        $tags.append(JST['tags/tag']({tag: tag}))
      })
      
      var $asker = $question.find('.question-asker');
      var user = question.get('asker');
      $asker.append(JST['users/user']({user: user}))
      $asker.append(moment(question.get('created_at')).fromNow())
      $questions.append($question);
    })
    this.$el.html($questions);
    return this;
  }
})