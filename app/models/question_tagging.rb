class QuestionTagging < ActiveRecord::Base
  attr_accessible :question_id, :tag_id
  belongs_to :question
  belongs_to :tag
end
