module Votable
  extend ActiveSupport::Concern
  included do
    has_many :votes, as: :votable
  end
  
  #score
  #upvotes
  #downvotes
end