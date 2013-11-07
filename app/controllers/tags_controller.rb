class TagsController < ApplicationController
  def index
    @COLCOUNT = 3
    @tags = Tag.all
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.tagged_questions
  end
end
