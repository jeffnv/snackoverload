class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :value, :null => false
      t.integer :votable_id, :null => false
      t.string :votable_type, :null => false
      t.integer :voter_id, :null => false

      t.timestamps
    end
    add_index :votes, :votable_id
    add_index :votes, :voter_id
  end
end
