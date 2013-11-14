Snackoverload.Views.QuestionShow = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model.get('comments'), "add remove sync", this.render);
  },
  events:{
    "click .vote": "vote",
    "submit .comment-form": "comment"
  },
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
  
  vote: function(event){
    if(Snackoverload.currentUserId){
      var my_id = Snackoverload.currentUserId;
      var that = this;
      var upButton = $('.vote.up')
      var downButton = $('.vote.down')
      var up = $(event.currentTarget).data('type') === "upvote";
      var votableString = $(event.currentTarget).data('votable');
      var votableType = votableString.split('_')[0];
      var votableID = parseInt(votableString.split('_')[1]);
      var votesURL = "votes";
      var newVote = {vote: {
        votable_type: votableType,
        votable_id: votableID,
        value: up ? 1 : -1
      }};
    
  
      console.log(newVote);
      $.ajax({
        type: "PUT",
        url: votesURL,
        data: newVote,
        success: function(score){
          var allVotes = that.model.get('votes');
          var myVote = allVotes.findWhere({voter_id: my_id});
          if(myVote){
            myVote.set('value', score.new_vote);
          }
          else{
            allVotes.add(new Snackoverload.Models.Vote({
              voter_id: my_id,
              votable_type: votableType,
              votable_id: votableID,
              value: score.new_vote,
              
            }))
          }
          
          that.model.set('score', score.score);
          that.render();
      
        }
      })
    }else{
      //not logged in
    }

  }, 
  
  comment: function(event){
    event.preventDefault();    
    var commentModel = new Snackoverload.Models.Comment($(event.target).serializeJSON().comment);
    var that = this;
    commentModel.save({}, { 
      success: function (model) {
        console.log('asdfasdf')
        console.log(model)
        that.model.get('comments').add(model);
      }
    })
  },
  
  getCurrentUserVote: function(){
    if(Snackoverload.currentUserId) {
      var votes = this.model.get('votes');
      var my_vote = votes.findWhere({voter_id: Snackoverload.currentUserId });
        if(my_vote){
          return my_vote.get('value');
        }
    }
    return 0;
  },
});