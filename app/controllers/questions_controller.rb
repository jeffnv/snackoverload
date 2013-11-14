class QuestionsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]
  def index
    @questions = Question.includes(:tags, :votes, :asker, :answers, :comments)
    respond_to do |format|
      format.html
      format.json do
        render json: @questions, include: [ 
          :tags, 
          :votes, 
          :asker, 
          { :answers => { :include => [{ :comments => { :methods => [:commenter_email] }}, :answerer]}},
          { :comments => { :methods => [:commenter_email] }}
        ]
      end
    end
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
  
  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end
  
end
