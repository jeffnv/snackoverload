class Question < ActiveRecord::Base
  include Commentable
  include Votable
  attr_accessible :asker_id, :body, :title
  validates :asker_id, :body, :title, presence: true
  
  has_many :answers
  has_many :question_taggings
  has_many :tags, through: :question_taggings, source: :tag
  
  belongs_to :asker, foreign_key: :asker_id, class_name: 'User'
  
  
end
