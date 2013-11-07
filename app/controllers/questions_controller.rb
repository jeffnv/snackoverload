class QuestionsController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
  def index
    #initially all the questions, later all the users tags
    @questions = Question.all
  end
  
  def new
    @question = Question.new
    @tags = Tag.all
  end
  
  def create

    @question = Question.new(params[:question])
    @question.tag_ids = params[:tags]
    @question.asker_id = current_user.id
    
    if (params[:new_tags_string])
      new_tags = params[:new_tags_string].split(', ')
      new_tags.each do |tag|
        @question.tags << Tag.new(name: tag)
      end
    end
    if @question.save
      redirect_to questions_url
    else
      @tags = Tag.all
      flash.now[:errors] = @question.errors.full_messages
      render :new
    end
  end
end
