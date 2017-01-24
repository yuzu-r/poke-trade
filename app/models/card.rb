class Card < ActiveRecord::Base
  belongs_to :user

  scope :offered, -> {select('id, deck_id, user_id')
                        .where('is_available = true and is_active = true')}

  def self.collection(user)
    cards = user.cards.where(:is_active => true).pluck(:deck_id, :is_available, :id)
    puts "cards: #{cards}"
    collection_info = []
    cards.each do |c|
      card_hash = {}
      card_from_deck = DECK.find{|h| h[:number].to_i === c[0]}
      puts "c: #{c}, card_from_deck = #{card_from_deck}"
      card_hash[:name] = card_from_deck[:name]
      card_hash[:source] = card_from_deck[:source]
      card_hash[:available] = c[1]
      card_hash[:id] = c[2]
      collection_info.push(card_hash)
    end
    return collection_info
  end
end
