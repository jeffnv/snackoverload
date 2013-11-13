Snackoverload.Routers.SnackRouter = Backbone.Router.extend({
  routes: {
    "":"questionIndex",
    "tags/:id":"tagShow",
    "tags":"tagIndex",
    "users":"userIndex",
    "questions/:id": "questionShow",
    "about": "about"
  },
  
  initialize: function(options){
    this.$main = options.$main;
    this.$sidebar = options.$sidebar;
  },
  
  tagShow: function(id){
    var questions = Snackoverload.questions.byTagId(parseInt(id));
    var listView = new Snackoverload.Views.QuestionList({
      collection: questions
    });
    
    var tagView = new Snackoverload.Views.SidebarTags({
      collection: Snackoverload.favoriteTags
    });
    
    this.switchMainView(listView);
    this.switchSideBarView(tagView);
  },
  
  questionIndex: function(){
    var tagView = new Snackoverload.Views.SidebarTags({
      collection: Snackoverload.favoriteTags
    });
    
    var listView = new Snackoverload.Views.QuestionList({
      collection: Snackoverload.questions
    });
    
    this.switchSideBarView(tagView);
    this.switchMainView(listView);
  },
  
  snackIndex: function(){
    var tagView = new Snackoverload.Views.SidebarTags({
      collection: Snackoverload.favoriteTags,
    });
    
    var listView = new Snackoverload.Views.QuestionList({
      collection: Snackoverload.questions
    });
    
    this.switchSideBarView(tagView);
    this.switchMainView(listView);
  },
  
  tagIndex: function(){
    var tagView = new Snackoverload.Views.SidebarTags({
      collection: Snackoverload.favoriteTags,
    });
    
    var listView = new Snackoverload.Views.TagsIndex({
      collection: Snackoverload.tags
    });
    
    this.switchSideBarView(tagView);
    this.switchMainView(listView);
  },
  
  userIndex: function(){
    
    var mainView = new Snackoverload.Views.UsersIndex({
      collection: Snackoverload.users
    });
    
    this.switchMainView(mainView);
    this.switchSideBarView();
  },
  
  about: function(){
    var mainView = new Snackoverload.Views.About();
    this.switchMainView(mainView);
    this.switchSideBarView();
  },
  
  questionShow: function(id){
    var question = Snackoverload.questions.get(id);
    var mainView = new Snackoverload.Views.QuestionShow({model: question});
    this.switchMainView(mainView);
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
    
    this._currentSidebar = null;
    if(view){
      this.$sidebar.html(view.render().$el);
    } else {
      this.$sidebar.html('');
    }
  },
});