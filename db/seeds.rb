# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#      t.string  :name
#      t.integer :card_number
#      t.string  :card_id
#     t.string  :image_url

cards = Deck.create([
  {name: 'Gyarados', card_number: 6, card_id: 'base1-6', image_url: 'https://s3.amazonaws.com/pokemontcg/base1/6.jpg'},
  {name: 'Dugtrio', card_number: 19 , card_id: 'base1-19', image_url: 'https://s3.amazonaws.com/pokemontcg/base1/19.jpg'},
  {name: 'Growlithe', card_number: 28 , card_id: 'base1-28', image_url: 'https://s3.amazonaws.com/pokemontcg/base1/28.jpg'},
  {name: 'Ivysaur', card_number: 30 , card_id: 'base1-30', image_url: 'https://s3.amazonaws.com/pokemontcg/base1/30.jpg'},
  {name: 'Squirtle', card_number: 63 , card_id: 'base1-63', image_url: 'https://s3.amazonaws.com/pokemontcg/base1/63.jpg'}
  ])