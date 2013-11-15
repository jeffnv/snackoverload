Snackoverload.Views.User = Backbone.View.extend({
  template: JST['users/user_profile'],
  render: function(){
    var content = this.template({user: this.model, rep: this.model.get('rep')})
    this.$el.append(content)
    return this;
  },
});