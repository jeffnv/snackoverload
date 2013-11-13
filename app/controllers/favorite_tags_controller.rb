class FavoriteTagsController < ApplicationController
  def index
    @tags = current_user.favorite_tags
  end
  
  def create
    @favorite_tag = FavoriteTag.new(user_id: current_user.id)
    @favorite_tag.tag_id = params[:favorite_tag][:tag_id]
    if @favorite_tag.save
      render json: @favorite_tag
    else
      render json: @favorite_tag.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    tag_id = params[:id]
    user_id = current_user.id
    @favorite_tag = FavoriteTag.find_by_tag_id_and_user_id(tag_id, user_id)
    if @favorite_tag
      @favorite_tag.delete
      render json: @favorite_tag    
    else
      render json: "favorite tag not found".to_json
    end
  end
end
