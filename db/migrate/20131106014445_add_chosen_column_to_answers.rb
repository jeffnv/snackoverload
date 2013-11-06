class AddChosenColumnToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :chosen, :boolean
  end
end
