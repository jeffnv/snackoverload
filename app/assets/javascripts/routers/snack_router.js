Snackoverload.Routers.SnackRouter = Backbone.Router.extend({
  routes: {
    "":"questionIndex"
  },
  
  initialize: function(options){
    this.$main = options.$main;
    this.$sidebar = options.$sidebar;
  },
  
  questionIndex: function(){
    var tagView = new Snackoverload.Views.SidebarTags({
      collection: Snackoverload.favoriteTags,
    });
    
    var listView = new Snackoverload.Views.QuestionList({
      collection: Snackoverload.questions
    });
    
    this.switchSideBarView(tagView);
    this.switchMainView(listView);
  },
  
  switchMainView: function(view){
    if(this._currentMainView){
      this._currentMainView.close();
    }
    
    this._currentMainView = view;
    this.$main.html(view.render().$el);
  },
  switchSideBarView: function(view){
    if(this._currentSidebar){
      this._currentSidebar.close();
    }
    
    this._currentSidebar = view;
    this.$sidebar.html(view.render().$el);
  },
});