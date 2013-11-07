class Answer < ActiveRecord::Base
  include Commentable
  include Votable
  attr_accessible :answerer_id, :body, :question_id
  belongs_to :question
  belongs_to :answerer, foreign_key: :answerer_id, class_name: 'User'
end
