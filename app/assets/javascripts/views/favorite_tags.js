Snackoverload.Views.SidebarTags = Backbone.View.extend({
  initialize:function(){
    this.listenTo(this.collection, "add remove change", this.render);
  },
  template: JST['tags/sidebar_tags'],
  
  render: function(){
    var that = this;
    that.$el.html(this.template());
    if(this.collection.length > 0){
      this.collection.each(function(tag){
        that.$el.append(JST['tags/tag']({tag: tag}))
      })
    } else{
      that.$el.append('Would go here if you had some! Hover over a tag to add it to favorites!');
    }

    return this;
  },
  
});