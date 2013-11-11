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
  
User.create!(email: "example@example.com", password: "asdfasdf", 
  password_confirmation: "asdfasdf", remember_me: true)
#create 3 questions
Question.create!(asker_id: 1, body: "Where is a good place to get a good hot dog? I am looking for something fancy with lots of goodies on it and a nice frosty beer to wash it down. My location is on Market Street in San Francisco near the UN Plaza. Can someone help me? Please?", title: "Hot Dogs On Market?");

Question.create!(asker_id: 1, body: "I have a party tonight and all my guests are vegan. What can I cook for them that they won't mind eating? I don't want to just heat up a bunch of floppy tofu dogs. I want to impress these people! What do I do?", title: "Vexed by Vegan Victuals");
Question.create!(asker_id: 3, body: "I want to make a birthday cake for my son, but he has a few allergies. He is allergic to soy, lactos, flour, gluten, nuts, shellfish, fruit, meat, vegetables, and water? Does anyone have a good birthday cake recipe that won't make the little guy sick?", title: "Birthday cake challenge");
#create 2 tag
ta = Tag.create!(name: 'allergies')
tr = Tag.create!(name: 'restaurants')
tv =Tag.create!(name: 'vegan')
tc = Tag.create!(name: 'cake')
tb = Tag.create!(name: 'birthday')
tbs = Tag.create!(name: 'bad son')
th = Tag.create!(name: 'hot dogs')
tn = Tag.create!(name: 'trying to be nice')
#tag each question, two tags for one
Question.find(1).tags << tr
Question.find(1).tags << th 
Question.find(2).tags << tv
Question.find(3).tags << tb
Question.find(3).tags << tbs
Question.find(3).tags << ta
Question.find(3).tags << tc
Question.find(2).tags << tn
Question.find(3).tags << tn
#Answer one question, other user
Question.find(1).answers << Answer.new(answerer_id: 2, body: "I would recomment show dogs on the corner of Market and 6th. Or not 6th but whatever 6th is on the other side of market. Taylor maybe? Anyway that place is off the chain!")
#comment on question and answer
Answer.first.comments << Comment.new(body: "great answer!", commenter_id: 2)

#vote on questions
Question.first.votes << Vote.new(value: 1, voter_id: 1)
Question.first.comments << Comment.new(body: "amazing question!",  commenter_id: 2)