Snackoverload.Views.QuestionList = Backbone.View.extend({
  initialize:function(){
    this.listenTo(this.collection, "add remove change", this.render);
  },
  events: {
    "click .tag-popover-fave": "favoriteTagClicked",
  },
  template: JST['questions/question_list'],
  render: function(){
    var $questions = $("<div class=\"question-list\"></div>");
    var that = this;
    
    this.collection.each(function(question){
      
      var $question = $('<div class="question"></div>');
      $question.html(that.template({question: question}));
      
      var $tags = $question.find('.question-tags');
      question.get('tags').each(function(tag){
        var $tag = JST['tags/tag']({tag: tag});
        $tags.append($tag);
      })
      
      var $asker = $question.find('.question-asker');
      var user = question.get('asker');
      $asker.append(JST['users/user']({user: user}))
      $asker.append(moment(question.get('created_at')).fromNow())
      $questions.append($question);
    })
    this.$el.html($questions);
    this.$el.find('.tag').popover({html: true, trigger: 'hover', delay: {show: 250, hide: 1000}})
    return this;
  },
  
  favoriteTagClicked: function(event){
    var checkbox = $(event.currentTarget);
    var id = checkbox.data('id');
    var adding = checkbox.prop('checked');
    var that = this;
    if(adding){
      $.ajax({
        type: "POST",
        url: "favorite_tags",
        data: {favorite_tag: {tag_id: id}},
        success: function(tag){
          Snackoverload.favoriteTags.add(Snackoverload.tags.findWhere({id: tag.tag_id}));
          that.render();
        }
      })
    }else{
      $.ajax({
        type: "DELETE",
        url: "favorite_tags/" + id,
        success: function(tag){
          Snackoverload.favoriteTags.remove(Snackoverload.tags.findWhere({id: tag.tag_id}));
          that.render();
        }
      })
    }
  },
})