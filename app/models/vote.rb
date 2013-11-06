class Vote < ActiveRecord::Base
  attr_accessible :value, :votable_id, :votable_type, :voter_id
end
