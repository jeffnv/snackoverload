Snackoverload.Views.Comments = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, "add remove", this.render)
  },
  
  events:{
    "submit .comment-form": "comment",
    "click .hey-dylan": "test"
  },
  
  test: function(event){
    alert('asdf');
  },
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
    this.collection.each(function(comment){
      var $commentList = $comments.find('.comments-list');
      var renderedContent = JST['comments/comment']({comment: comment})
      $commentList.append(renderedContent)
    })
    this.$el.html($comments);
    return this;
  },
  
  comment: function(event){
    event.preventDefault();    
    var payload = $(event.target).serializeJSON();
    var commentModel = new Snackoverload.Models.Comment(payload.comment);
    var type = payload.commentable_type;
    var id = payload.commentable_id;
    var that = this;
    
    commentModel.save({}, { 
      success: function (model) {
        that.collection.add([model]);
        that.render();
      }
    })
  },
    
  
});