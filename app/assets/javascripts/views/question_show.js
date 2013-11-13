Snackoverload.Views.QuestionShow = Backbone.View.extend({
  template: JST['questions/question'],
  render: function(){
    this.$el.html(this.template({question: this.model}));
    this.$el.find('.vote-block').html(JST['questions/vote_block']({
      klass: "Question",
      id: this.model.id,
      my_vote: this.getCurrentUserVote(),
      score: this.model.get('score'),
    }));
    
    var $tags = this.$el.find('.question-tags');
    this.model.get('tags').each(function(tag){
      $tags.append(JST['tags/tag']({tag: tag}))
    })
    
    var $asker = this.$el.find('.question-asker');
    var user = this.model.get('asker');
    $asker.append(JST['users/user']({user: user}))
    $asker.append(moment(this.model.get('created_at')).fromNow())
    
    var $questionComments = this.$el.find("#question-comments");
    
    $questionComments.html(this.addComments(
      'Question', 
      this.model.id, 
      this.model.get('comments'))
    )
    
    this.$el.find('.answers').append(this.addAnswers(this.model.get('answers')).html())
    
    return this;
  },  
  
  addComments:function(klass, id, comments){
    var $comments = $(JST['comments/comments']({klass: klass, id: id}));
    
    comments.each(function(comment){
      var $commentList = $comments.find('.comments-list');
      var renderedContent = JST['comments/comment']({comment: comment})
      $commentList.append(renderedContent)
    })
    return $comments.html();
  },
  
  
  addAnswers:function(answers){
    var that = this;
    var $answers = $('<div></div>').append($(JST['answers/answers']({answers: answers})));
    var $answerlist = $answers.find('.answer-list');
    
    answers.each(function(answer){
      var $answer = $(JST['answers/answer']({answer: answer}));
      $answer.append(that.addComments("Answer", answer.id, answer.get('comments')));
      $answerlist.append($answer);
    })
    return $answers;
  },
  
  getCurrentUserVote: function(){
    if(Snackoverload.currentUserId){
      var votes = this.model.get('votes');
      for(var i = 0; i < votes.length; i++){
        if(votes[i].voter_id == Snackoverload.currentUserId){
          return votes[i].value
        }
      }
    }
    return 0;
  },
});