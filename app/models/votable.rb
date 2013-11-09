module Votable
  extend ActiveSupport::Concern
  
  included do
    has_many :votes, as: :votable
  end

  #score
  def score
    self.votes.sum('value')
  end
  
  def upvotes
    self.votes.where('value = 1').count
  end
  
  def downvotes
    self.votes.where('value = -1').count
  end
  
  def vote_for_user(user)
    if(user)
      my_vote = self.votes.find_by_voter_id(user.id)
      return my_vote.value if my_vote
    end

    0
  end
  
end