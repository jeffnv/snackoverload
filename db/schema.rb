# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131106005324) do

  create_table "answers", :force => true do |t|
    t.text     "body",        :null => false
    t.integer  "answerer_id", :null => false
    t.integer  "question_id", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "answers", ["answerer_id"], :name => "index_answers_on_answerer_id"
  add_index "answers", ["question_id"], :name => "index_answers_on_question_id"

  create_table "comments", :force => true do |t|
    t.text     "body",             :null => false
    t.integer  "commentable_id",   :null => false
    t.string   "commentable_type", :null => false
    t.integer  "commenter_id",     :null => false
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  add_index "comments", ["commentable_id"], :name => "index_comments_on_commentable_id"
  add_index "comments", ["commenter_id"], :name => "index_comments_on_commenter_id"

  create_table "question_taggings", :force => true do |t|
    t.integer  "tag_id",      :null => false
    t.integer  "question_id", :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "question_taggings", ["question_id"], :name => "index_question_taggings_on_question_id"
  add_index "question_taggings", ["tag_id"], :name => "index_question_taggings_on_tag_id"

  create_table "questions", :force => true do |t|
    t.string   "title",      :null => false
    t.text     "body",       :null => false
    t.integer  "asker_id",   :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "questions", ["asker_id"], :name => "index_questions_on_asker_id"
  add_index "questions", ["title"], :name => "index_questions_on_title"

  create_table "tags", :force => true do |t|
    t.string   "name",       :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0,  :null => false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "votes", :force => true do |t|
    t.integer  "value",        :null => false
    t.integer  "votable_id",   :null => false
    t.string   "votable_type", :null => false
    t.integer  "voter_id",     :null => false
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  add_index "votes", ["votable_id"], :name => "index_votes_on_votable_id"
  add_index "votes", ["voter_id"], :name => "index_votes_on_voter_id"

end
