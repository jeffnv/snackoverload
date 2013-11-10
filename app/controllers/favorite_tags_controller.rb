class FavoriteTagsController < ApplicationController
  def index
    @tags = current_user.favorite_tags
  end
end
