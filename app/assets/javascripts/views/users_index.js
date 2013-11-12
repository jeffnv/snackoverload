Snackoverload.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/users_index'],
  render: function(){
    this.$el.html(this.template({users: this.collection, COLCOUNT: 2}))
    return this;
  },
});