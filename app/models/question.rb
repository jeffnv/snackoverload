class Question < ActiveRecord::Base
  include Commentable
  include Votable
  attr_accessible :asker_id, :body, :title
  validates :asker_id, :body, :title, presence: true
  
  has_many :answers
  has_many :question_taggings
  has_many :tags, through: :question_taggings, source: :tag
  
  belongs_to :asker, foreign_key: :asker_id, class_name: 'User'
  
  def as_json(*args)
    hash = super(*args)
    hash.merge!({
      "confirmed" => confirmed?,
      "answered" => answered?,
      "score" => score,
    })
  end
  
  def confirmed?
    self.answers.where(chosen: true).count > 0 
  end
  
  def answered?
    self.answers.count > 0
  end
end
