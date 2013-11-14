Snackoverload.Views.Comments = Backbone.View.extend({
  initialize: function(options){
    this.commentable_type = options.commentable_type;
    this.commentable_id= options.commentable_id;
  },
  template: JST['comments/comments'],
  
  render:function(){
    var $comments = $(this.template({
      commentable_type: this.commentable_type,
      commentable_id: this.commentable_id
    }));
    debugger
    this.collection.each(function(comment){
      var $commentList = $comments.find('.comments-list');
      var renderedContent = JST['comments/comment']({comment: comment})
      $commentList.append(renderedContent)
    })
    this.$el.html($comments);
    return this;
  },
    
  
});