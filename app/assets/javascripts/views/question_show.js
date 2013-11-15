Snackoverload.Views.QuestionShow = Backbone.View.extend({
  events:{
    "click .vote": "vote",
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
    
    $questionComments.html(questionCommentsView.render().$el);
    
    var answersView = new Snackoverload.Views.Answers({
      collection: this.model.get('answers'),
      questionID: this.model.id,
    });
    this.$el.find('.answers').append(answersView.render().$el)
    return this;
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