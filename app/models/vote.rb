class Vote < ActiveRecord::Base
  attr_accessible :value, :votable_id, :votable_type, :voter_id
  validates :votable_id, uniqueness: {scope: :voter_id}
  belongs_to :votable, polymorphic: true
  
  

end
