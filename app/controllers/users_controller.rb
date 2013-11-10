class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @rep = random_rep
  end
  
  def index
    @COLCOUNT = 3
    @users = User.all
  end
end
