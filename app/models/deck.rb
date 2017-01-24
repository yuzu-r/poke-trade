class Deck < ActiveRecord::Base

=begin
  def self.list
    full_deck = Pokemon::Card.where(set: 'Base Set 2')
      .where(supertype: 'pokemon')
      .all
    deck = []
    full_deck.each do |c|
      card_hash = {}
      card_hash[:name] = c.name
      card_hash[:number] = c.number      
      deck.push(card_hash)
    end
    sorted_deck = deck.sort_by { |k| k["number"].to_i }
    return sorted_deck
  end
=end
end
