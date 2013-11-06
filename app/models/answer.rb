class Answer < ActiveRecord::Base
  attr_accessible :answerer_id, :body, :question_id
end
