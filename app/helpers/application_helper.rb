module ApplicationHelper
  def avatar_url(user)
      gravatar_id = Digest::MD5::hexdigest(user.email).downcase
      "http://gravatar.com/avatar/#{gravatar_id}.png"
  end
  
  def random_rep
    (rand * 1000000).ceil
  end
end
