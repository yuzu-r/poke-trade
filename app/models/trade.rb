class Trade < ActiveRecord::Base
  belongs_to :proposer, class_name: "User"
  belongs_to :responder, class_name: "User"
  # to-do: validate that the proposer card and responsder card are available

  def self.cancel(cancel_trade_params)
    trade = Trade.find(cancel_trade_params[:trade_id])
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
    trade = Trade.find(accept_trade_params[:trade_id])
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
              .select('id, proposer_id,proposer_card_id').where(status: 'pending')
    trade_bundle = []
    trades.each do |t|
      cards = Card.collection(t.proposer)
      trade_info = t.as_json
      trade_info[:cards] = cards
      trade_bundle.push(trade_info)
      puts "trade_info is #{trade_info}"
    end
    return trade_bundle
  end

end
