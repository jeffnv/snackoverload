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
      new_score = @vote.votable_type.constantize.find(@vote.votable_id).score
      render json: {score: new_score}
    else
      render json: @vote.errors.full_messages
    end
    
  end
end

t.integer  "value",        :null => false
t.integer  "votable_id",   :null => false
t.string   "votable_type", :null => false
t.integer  "voter_id",     :null => false
t.datetime "created_at",   :null => false
t.datetime "updated_at",   :null => false