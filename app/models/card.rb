class Card < ActiveRecord::Base
  belongs_to :user

  scope :offered, -> {select('id, deck_id, user_id')
                        .where('is_available = true and is_active = true')}

  def self.collection(user)
    card_number_array = user.cards.where(:is_active => true).pluck(:deck_id, :is_available)
    card_number_string = card_number_array.join('|')
    cards = Pokemon::Card.where(set: 'Base Set 2')
      .where(supertype: 'pokemon')
      .where(number: card_number_string)
      .all
    collection_info = []
    cards.each_with_index do |c, index|
      card_hash = {}
      card_hash[:name] = c.name
      card_hash[:source] = c.image_url
      card_hash[:available] = card_number_array[index][1]
      collection_info.push(card_hash)
    end
    return collection_info
  end
end
