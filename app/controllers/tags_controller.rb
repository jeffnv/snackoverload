class TagsController < ApplicationController
  def index
    if(params[:type])
      if(params[:type] == 'favorite')
        @tags = current_user ? current_user.tags : Tag.includes(:favoriting_users, :tagged_questions)
      elsif(params[:type] == 'all')
        @tags = Tag.includes(:favoriting_users, :tagged_questions)
      end
    else
      @tags = Tag.includes(:favoriting_users, :tagged_questions) 
    end
    
    @COLCOUNT = 3
    respond_to do |format|
      format.html
      format.json {render json: @tags}
    end
  end

  def show
    @tag = Tag.find(params[:id])
    @questions = @tag.tagged_questions
  end
end
