module ApplicationHelper

  
  def random_rep
    (rand * 1000000).ceil
  end
   
   def create_guest_user
     u = User.create(:email => "foodie_#{rand(999999)}@eat.mmm")
     u.save(:validate => false)
     sign_in(u)
     u
   end
end
