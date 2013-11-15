Snackoverload.Routers.SnackRouter = Backbone.Router.extend({
  routes: {
    "":"questionIndex",
    "tags/:id":"tagShow",
    "tags":"tagIndex",
    "users":"userIndex",
    "questions/:id": "questionShow",
    "about": "about",
    "users/:id": "userShow"
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
    

    this.switchMainView(listView);
    this.showFaveTags();
  },
  
  questionIndex: function(){

    
    var listView = new Snackoverload.Views.QuestionList({
      collection: Snackoverload.questions
    });
    

    this.switchMainView(listView);
    this.showFaveTags();
  },
  
  
  tagIndex: function(){

    
    var listView = new Snackoverload.Views.TagsIndex({
      collection: Snackoverload.tags
    });
    this.switchMainView(listView);
    this.showFaveTags();
  },
  
  userIndex: function(){
    
    var mainView = new Snackoverload.Views.UsersIndex({
      collection: Snackoverload.users
    });
    
    this.switchMainView(mainView);
    this.showFaveTags();
  },
  
  userShow: function(id){
    
    var mainView = new Snackoverload.Views.User({
      model: Snackoverload.users.get(id)
    });
    
    this.switchMainView(mainView);
    this.showFaveTags();
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
    
    this.showFaveTags();
  },
  
  
  switchMainView: function(view){
    if(this._currentMainView){
      this._currentMainView.close();
    }
    
    this._currentMainView = view;
    this.$main.html(view.render().$el);
  },
  
  showFaveTags: function(){
    if(Snackoverload.currentUserId){
      var tagView = new Snackoverload.Views.SidebarTags({
        collection: Snackoverload.favoriteTags,
      });
      this.switchSideBarView(tagView);
    }
    else{
      var aboutSidebar = new Snackoverload.Views.AboutSidebar();
      this.$sidebar.html(aboutSidebar.render().$el);
    }
  },
  
  switchSideBarView: function(view){
    if(this._currentSidebar){
      this._currentSidebar.close();
    }
    
    this._currentSidebar = null;
    if(Snackoverload.currentUserId){
      if(view){
        this.$sidebar.html(view.render().$el);
      } else {
        this.$sidebar.html('');
      }
    }
    else{
      var aboutSidebar = new Snackoverload.Views.AboutSidebar();
      this.$sidebar.html(aboutSidebar.render().$el);
    }
  },
});