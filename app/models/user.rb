class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body
  
  has_many :questions, foreign_key: :asker_id
  has_many :answered_questions, foreign_key: :answerer_id, class_name: 'Answer'
  has_many :favorite_tags
  has_many :tags, through: :favorite_tags, source: :tag
  
  def gravatar_url
      gravatar_id = Digest::MD5::hexdigest(self.email).downcase
      "http://gravatar.com/avatar/#{gravatar_id}.png"
  end
  
  def rep
    (rand * 1000000).ceil
  end
  
  def as_json(*args)
    hash = super(*args)
    hash.merge!({
      "gravatar_url" => gravatar_url,
      "rep" => rep
    })
  end
  
end
