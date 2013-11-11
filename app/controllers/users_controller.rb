class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @rep = random_rep
  end
  
  def index
    @COLCOUNT = 2
    @users = User.all
  end
  
  def guest_log_in
    if user_signed_in?
      sign_out(current_user)
    end
    
    create_guest_user
    redirect_to root_url
  end
end
