Snackoverload.Views.About = Backbone.View.extend({
  template: JST['static/about'],
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});