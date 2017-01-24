full_deck = Pokemon::Card.where(set: 'Base Set 2')
  .where(supertype: 'pokemon')
  .all
deck = []
full_deck.each do |c|
  card_hash = {}
  card_hash[:name] = c.name
  card_hash[:number] = c.number
  card_hash[:source] = c.image_url  
  deck.push(card_hash)
end
DECK = deck.sort_by { |k| k[:name] }
