Snackoverload.Views.TagsIndex = Backbone.View.extend({
  template: JST['tags/tags_index'],
  render: function(){
    this.$el.html(this.template({tags: this.collection, COLCOUNT: 3}))
    return this;
  }
});