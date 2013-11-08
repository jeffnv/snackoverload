class Vote < ActiveRecord::Base
  attr_accessible :value, :votable_id, :votable_type, :voter_id
  validates :votable_id, uniqueness: {scope: :voter_id}
  belongs_to :votable, polymorphic: true
  
  
  def self.get_old_vote(user_id, votable_type, votable_id)
    vote = self.find_by_voter_id_and_votable_type_and_votable_id(
    user_id,
    votable_type,
    votable_id)
    vote
  end
end
