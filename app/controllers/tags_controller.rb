class TagsController < ApplicationController
  def index
    @COLCOUNT = 4
    @tags = Tag.all
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.tagged_questions
  end
end
