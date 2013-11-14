Snackoverload.Views.Answers = Backbone.View.extend({
  initialize: function(options){
    this.questionID = options.questionID;
  },
  template: JST['answers/answers'],
  events:{
    "submit #answer-form": "addAnswer"
  },
  render: function(){
    var that = this;
    
    this.$el.html(this.template({
      answerCount: this.collection.length,
      questionID: this.questionID,
    }));
    var $answerlist = this.$el.find('.answer-list');
    this.collection.each(function(answer){
      var $answer = $(JST['answers/answer']({answer: answer}));
      var answerCommentsView = new Snackoverload.Views.Comments({
        collection: answer.get('comments'), 
        commentable_id: answer.id, 
        commentable_type: "Answer"
      });
      
      $answer.find('.answer-comments').html(answerCommentsView.render().$el);

      $answerlist.append($answer);
    });
    
    return this;
  },
  
  addAnswer: function(event){
    event.preventDefault();
    var payload = $('#answer-form').serializeJSON();
    var newAnswer = new Snackoverload.Models.Answer(payload.answer);
    var that = this;
    newAnswer.save({},{success:function(model){
      
      that.collection.add(model);
      that.render();
    }});
  },
  
});