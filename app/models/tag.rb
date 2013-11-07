class Tag < ActiveRecord::Base
  attr_accessible :name
  has_many :question_taggings
  has_many :tagged_questions, through: :question_taggings, source: :question
end
