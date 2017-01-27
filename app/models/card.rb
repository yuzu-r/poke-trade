class Card < ActiveRecord::Base
  belongs_to :user
    
  scope :offered, -> {select('id, deck_id, user_id')
                        .where('is_available = true and is_active = true')}

  def self.collection(user)
    # returns only cards that the user owns (active)
    cards = user.cards.select('deck_id, is_available, id, user_id').where(:is_active => true)
    card_info = cards.as_json
    card_info.each do |c|
      card_from_deck = DECK.find{|h| h[:number].to_i === c["deck_id"]}
      c[:source] = card_from_deck[:source]
      c[:name] = card_from_deck[:name]
      c[:owner] = user.username
    end
    return card_info.sort_by {|k| k[:name]}
  end

  def source
    card_from_deck = DECK.find{|h| h[:number].to_i === self.deck_id}
    card_from_deck[:source]
  end

  def name
    card_from_deck = DECK.find{|h| h[:number].to_i === self.deck_id}
    card_from_deck[:name]    
  end

  def self.trade_pool(user = nil)
    # returns all cards that are active that do not belong to the user
    # no user is also acceptable, because anyone can see available cards.
    # need to check the transactions for any that have as pending so can show them specially
    cards = Card.select("deck_id, user_id, id, is_available").where(:is_active => true)
    cards = user ? cards.where.not(:user_id => user.id) : cards
    pool_info = cards.to_a.map(&:serializable_hash)
    pool_info = pool_info.map(&:symbolize_keys)
    pool_info.each do |c|
      card_from_deck = DECK.find{|h| h[:number].to_i === c[:deck_id]}
      c[:source] = card_from_deck[:source]
      c[:name] = card_from_deck[:name]
    end
    return pool_info.sort_by {|k| k[:name]}
  end

  def self.idle_trades(user)
    # these are cards where the user is the proposer and is awaiting a response
    trades = user.trades_as_proposer.select('cards.deck_id, responder_id, trades.id as trade_id')
              .joins('inner join cards on cards.id = proposer_card_id')
              .where(status: 'pending')
    trades_info = trades.to_a.map(&:serializable_hash)
    trades_info = trades_info.map(&:symbolize_keys)
    trades_info.each do |t|
      card_from_deck = DECK.find{|h| h[:number].to_i === t[:deck_id]}
      t[:source] = card_from_deck[:source]
      t[:name] = card_from_deck[:name]
    end
  end

  def self.action_pending(user)
    # these are cards where the user is the responder needs to respond to trade offer
    trades = user.trades_as_responder.select('cards.deck_id, responder_id, trades.id as trade_id')
              .joins('inner join cards on cards.id = proposer_card_id')
              .where(status: 'pending')
    trades_info = trades.to_a.map(&:serializable_hash)
    trades_info = trades_info.map(&:symbolize_keys)
    trades_info.each do |t|
      card_from_deck = DECK.find{|h| h[:number].to_i === t[:deck_id]}
      t[:source] = card_from_deck[:source]
      t[:name] = card_from_deck[:name]
      puts "#{t}"
    end   
  end
end
