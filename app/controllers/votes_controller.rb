class VotesController < ApplicationController
  def update
    new_vote_value = params[:vote][:value].to_i
    @vote = Vote.get_old_vote(
      current_user.id, 
      params[:vote]['votable_type'],
      params[:vote]['votable_id'])
      
    if(@vote)
      if(@vote.value == new_vote_value)
        @vote.value = 0
      else
        @vote.value = new_vote_value
      end
    else
      @vote = Vote.new(params[:vote])
      @vote.voter_id = current_user.id
    end
    
    if @vote.save
      votable_type = @vote.votable_type.constantize
      votable_instance = votable_type.find(@vote.votable_id)
      new_score = votable_instance.score
      render json: {score: new_score, new_vote: @vote.value}
    else
      render json: @vote.errors.full_messages
    end
    
  end
end
