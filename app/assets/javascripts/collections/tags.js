Snackoverload.Collections.Tags = Backbone.Collection.extend({
  model: Snackoverload.Models.Tag,
  url: '/tags?type=favorite'
  
})