Snackoverload.Collections.Tags = Backbone.Collection.extend({
  initialize: function(models, options){
    if(options && options.type){    
      this.queryString = "?type=" + options.type;
    }

  },
  model: Snackoverload.Models.Tag,
  url: function(){
    var path = '/tags';
    if(this.queryString){
      path += this.queryString;
    }
    return path;
  },
  
})