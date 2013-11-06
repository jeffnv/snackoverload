class QuestionsController < ApplicationController
  before_filter :authenticate_user!, except: [:index]
  def index
    #initially all the questions, later all the users tags
    @questions = Question.all
  end
  
  def new
    @question = Question.new
  end
  
  def create
    @question = Question.new(params[:question])
    @question.asker_id = current_user.id
    if @question.save
      redirect_to questions_url
    else
      flash.now[:errors] = @question.errors.full_messages
      render :new
    end
  end
end
