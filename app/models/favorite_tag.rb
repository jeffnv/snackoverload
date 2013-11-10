class FavoriteTag < ActiveRecord::Base
  attr_accessible :tag_id, :user_id
  validates :tag_id, :user_id, :uniqueness => true
  validates :tag_id, :uniqueness => {scope: :user_id}
  
  belongs_to :user
  belongs_to :tag
  
end
