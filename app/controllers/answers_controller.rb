class AnswersController < ApplicationController
  before_filter :authenticate_user!
  def create
    @answer = Answer.new(params[:answer])
    @answer.question_id = params[:question_id]
    @answer.answerer_id = current_user.id
    
    unless @answer.save
      flash[:errors] = @answer.errors.full_messages
    end                        
    @question = Question.find(params[:question_id])
    render 'questions/show'    
    
  end
end
