class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable_id, :commentable_type, :commenter_id
end
