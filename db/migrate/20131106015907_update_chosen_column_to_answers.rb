class UpdateChosenColumnToAnswers < ActiveRecord::Migration
  def change
    change_table :answers do |t|
      t.change :chosen, :boolean, :null => false, default: false
    end
  end
end
