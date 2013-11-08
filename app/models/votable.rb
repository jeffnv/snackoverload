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
end