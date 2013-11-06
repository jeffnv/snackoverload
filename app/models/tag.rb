class Tag < ActiveRecord::Base
  attr_accessible :name
  has_many :question_taggings
end
