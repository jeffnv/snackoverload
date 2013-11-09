class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @rep = (rand * 10000).ceil
  end
  
  def index
    @users = User.all
  end
end
