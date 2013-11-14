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
    
    var questionCommentsView = new Snackoverload.Views.Comments({
      collection: this.model.get('comments'), 
      commentable_id: this.model.get('id'), 
      commentable_type: 'Question'
    });
    
    $questionComments.html(questionCommentsView.render().$el.html())
    this.$el.find('.answers').append(this.addAnswers(this.model.get('answers')).html())
    
    return this;
  },  
  
  addComments:function(klass, id, comments){
    var commentView = new Snackoverload.Views.Comments({collection: comments, commentable_id: id, commentable_type: klass})
    return commentView.render().$el;
  },
  
  
  addAnswers:function(answers){
    var that = this;
    var $answers = $('<div></div>')
    $answers.append( $(JST['answers/answers']({answers: answers})));
    
    var $answerlist = $answers.find('.answer-list');
    answers.each(function(answer){
      var $answer = $(JST['answers/answer']({answer: answer}));
      var answerCommentsView = new Snackoverload.Views.Comments({
        collection: answer.get('comments'), 
        commentable_id: answer.id, 
        commentable_type: "Answer"
      });

      $answer.find('.answer-comments').html(answerCommentsView.render().$el.html());

      $answerlist.append($answer);
    });
    
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
    var payload = $(event.target).serializeJSON().comment;
    var commentModel = new Snackoverload.Models.Comment(payload.comment);
    var type = payload.commentable_type;
    var id = payload.commentable_id;
    var that = this;
    commentModel.save({}, { 
      success: function (model) {
        that.commentList(type, id).add(model);
      }
    })
  },
  
  commentList: function(type, id){
    if(type == "Question"){
      return this.model.get('comments');
    } else {
      var answers = this.model.get('answers');
      var answer = answers.findWhere({id: parseInt(id)});
      return answer.get('comments');
    }
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