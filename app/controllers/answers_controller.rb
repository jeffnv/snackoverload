class AnswersController < ApplicationController
  before_filter :authenticate_user!
  def create
    @answer = Answer.new(params[:answer])
    @answer.question_id = params[:question_id]
    @answer.answerer_id = current_user.id
    
    if @answer.save
      render json: @answer, :include => [:answerer,{ :comments => { :methods => [:commenter_email] }}]
    else
      render json: @answer.errors.full_messages, status: :unprocessable_entity
    end 
  end
end
