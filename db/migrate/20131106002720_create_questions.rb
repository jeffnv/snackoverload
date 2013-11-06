class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, :null => false
      t.text :body, :null => false
      t.integer :asker_id, :null => false

      t.timestamps
    end
    add_index :questions, :title
    add_index :questions, :asker_id
  end
end
