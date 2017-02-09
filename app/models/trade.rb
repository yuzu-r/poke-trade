class Trade < ActiveRecord::Base
  belongs_to :proposer, class_name: "User"
  belongs_to :responder, class_name: "User"
  # to-do: validate that the proposer card and responsder card are available

  def self.cancel(cancel_trade_params)
    trade = Trade.find_by(id: cancel_trade_params[:trade_id])
    if trade
      if cancel_trade_params[:user_id] == trade.responder_id || 
        cancel_trade_params[:user_id] == trade.proposer_id
        trade.update_attributes(status: 'rejected')
        proposer_card = Card.find(trade.proposer_card_id)
        proposer_card.update_attributes(is_available: true)
        if trade.responder_card_id
          responder_card = Card.find(trade.responder_card_id)
          responder_card.update_attributes(is_available: true)
        end
        return true
      else
        # user is invalid for this trade cancel
        return false
      end
    else
      # trade not found
      return false
    end
  end

  def self.accept(accept_trade_params)
    trade = Trade.find_by(id: accept_trade_params[:trade_id])
    if trade
      if accept_trade_params[:user] == trade.responder ||
        accept_trade_params[:user] == trade.proposer
        trade.update_attributes(status: 'accepted', 
          responder_card_id: accept_trade_params[:responder_card_id])
        proposer_card = Card.find(trade.proposer_card_id)
        responder_card = Card.find(accept_trade_params[:responder_card_id])
        proposer_card.update_attributes(is_available: false, is_active: false)
        responder_card.update_attributes(is_available: false, is_active: false)
        return true
      else
        # user is not valid for this trade
        return false
      end
    else
      # can't find trade_id
      return false
    end
  end

  def self.bundle (responder)
    # get the trades that user has an action to take (they are responding to trade)
    # for each trade, they need to see the proposer's available cards
    # this can be got from Card.collection(t.proposer)    
    trades = responder.trades_as_responder
              .select('cards.deck_id, trades.id, proposer_id,proposer_card_id').where(status: 'pending')
              .joins('inner join cards on cards.id = proposer_card_id')
    # this needs to join with card on deck_id          
    trade_bundle = []
    trades.each do |t|
      cards = Card.collection(t.proposer)
      trade_info = t.as_json
      trade_info[:cards] = cards
      trade_info[:proposerName] = User.find_by(id: t.proposer.id).username
      trade_info[:desiredCardName] = DECK.find{|h| h[:number].to_i == t[:deck_id]}[:name]
      trade_bundle.push(trade_info)
    end
    return trade_bundle
  end

  def self.past_trades(user)
    trades_as_proposer = user.trades_as_proposer
              .select('proposer_id,proposer_card_id, responder_id, responder_card_id, updated_at')
              .where(status: 'accepted')
              .order(:updated_at)
    tp_bundle = []
    trades_as_proposer.each do |tp|
      tp_info = {}
      proposer_deck_id = Card.find(tp[:proposer_card_id]).deck_id
      responder_deck_id = Card.find(tp[:responder_card_id]).deck_id
      tp_info[:user_card_name] =  DECK.find{|h| h[:number].to_i == proposer_deck_id}[:name]
      tp_info[:partner_card_name] =  DECK.find{|h| h[:number].to_i == responder_deck_id}[:name]
      tp_info[:trade_date] = tp[:updated_at].to_formatted_s(:long)
      tp_bundle.push(tp_info)
    end
    trades_as_responder = user.trades_as_responder
              .select('proposer_id, proposer_card_id, responder_id,responder_card_id, updated_at')
              .where(status: 'accepted')
              .order(:updated_at)
    tr_bundle = []
    trades_as_responder.each do |tr|
      tr_info = {}
      proposer_deck_id = Card.find(tr[:proposer_card_id]).deck_id
      responder_deck_id = Card.find(tr[:responder_card_id]).deck_id
      tr_info[:partner_card_name] =  DECK.find{|h| h[:number].to_i == proposer_deck_id}[:name]
      tr_info[:user_card_name] =  DECK.find{|h| h[:number].to_i == responder_deck_id}[:name]
      tr_info[:trade_date] = tr[:updated_at].to_formatted_s(:long)
      tr_bundle.push(tr_info)
    end 
    trade_bundle = tp_bundle + tr_bundle
    trade_bundle.sort_by! { |h| h[:trade_date] }
    return trade_bundle
  end

end
