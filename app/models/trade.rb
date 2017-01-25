class Trade < ActiveRecord::Base
  belongs_to :proposer, class_name: "User"
  belongs_to :responder, class_name: "User"
  # to-do: validate that the proposer card and responsder card are available

  def self.cancel(cancel_trade_params)
    trade = Trade.find(cancel_trade_params[:trade_id])
    puts "#{trade}"
    puts "#{cancel_trade_params[:user_id]}"
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
end
