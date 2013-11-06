class CreateQuestionTaggings < ActiveRecord::Migration
  def change
    create_table :question_taggings do |t|
      t.integer :tag_id, :null => false
      t.integer :question_id, :null => false

      t.timestamps
    end
    add_index :question_taggings, :tag_id
    add_index :question_taggings, :question_id
  end
end
