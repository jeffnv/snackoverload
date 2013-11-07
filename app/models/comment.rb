class Comment < ActiveRecord::Base
  attr_accessible :body, :commentable_id, :commentable_type, :commenter_id
  
  belongs_to :commentable, polymorphic: true
  belongs_to :commenter, foreign_key: :commenter_id, class_name: 'User'
end
