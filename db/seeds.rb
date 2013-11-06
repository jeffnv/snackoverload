# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#create 2 users
User.create!(email: "bob@bob.com", password: "asdfasdf", 
  password_confirmation: "asdfasdf", remember_me: true)
  
User.create!(email: "jim@jim.com", password: "asdfasdf", 
  password_confirmation: "asdfasdf", remember_me: true)
#create 3 questions
Question.create!(asker_id: 1, body: "how do I make kava?", title: "question1");
Question.create!(asker_id: 1, body: "how do I make guac?", title: "question2");
Question.create!(asker_id: 2, body: "kava + guac?", title: "question3");
#create 2 tag
Tag.create!(name: 'kava')
Tag.create!(name: 'guacamole')
#tag each question, two tags for one
Question.find(1).tags << Tag.first
Question.find(2).tags << Tag.last
Question.find(3).tags << Tag.last
Question.find(3).tags << Tag.first
#Answer one question, other user
Question.find(1).answers << Answer.new(answerer_id: 2, body: "water and blender")
#comment on question and answer
Answer.first.comments << Comment.new(body: "great answer!", commenter_id: 2)

#vote on questions
Question.first.votes << Vote.new(value: 1, voter_id: 1)