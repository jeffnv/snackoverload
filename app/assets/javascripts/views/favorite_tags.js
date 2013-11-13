Snackoverload.Views.SidebarTags = Backbone.View.extend({
  initialize:function(){
    this.listenTo(this.collection, "add remove change", this.render);
  },
  template: JST['tags/sidebar_tags'],
  
  render: function(){
    var that = this;
    that.$el.html(this.template())
    this.collection.each(function(tag){
      that.$el.append(JST['tags/tag']({tag: tag}))
    })
    return this;
  },
  
});