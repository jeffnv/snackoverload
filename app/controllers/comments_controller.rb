class CommentsController < ApplicationController
  before_filter before_filter :authenticate_user!
  def create
    @comment = Comment.new(params[:comment])
    @comment.commenter_id = current_user.id
    
    if @comment.save
      render json: @comment
    else
      flash.now[:errors] = @comment.errors.full_messages
      render json: @comment.errors.full_messages
    end
    
  end
end
