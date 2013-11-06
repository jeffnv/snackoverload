class Question < ActiveRecord::Base
  attr_accessible :asker_id, :body, :title
end
