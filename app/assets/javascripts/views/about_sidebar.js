Snackoverload.Views.AboutSidebar = Backbone.View.extend({
  template: JST['etc/about_sidebar'],
  render: function(){
    var content = this.template({})
    this.$el.append(content)
    return this;
  },
});