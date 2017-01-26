class TradesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :cancel_trade, :fetch_pending_trades]

  def create
    desired_card = Card.find(create_trade_params[:proposer_card_id])
    if desired_card.is_available
      params_plus_responder = create_trade_params.merge(responder_id: desired_card.user.id)
      @trade = Trade.create(params_plus_responder)
      if @trade.valid?
        desired_card.update_attributes(is_available: false)
        flash[:notice] = 'Trade request sent!'
        render json: {:success => "success", :status_code => "200"}
      else
        render json: {:errors => "error!", :status_code => :unprocessable_entity}
      end
    else
      render json: {:errors => "that card is not available!", :status_code => :unprocessable_entity}
    end
  end

  def cancel_trade
    cancel_me = Trade.cancel(cancel_trade_params)
    if cancel_me
      render json:{:success => "success", :status_code => "200"}
    else
      render json: {:errors => "error!", :status_code => :unprocessable_entity}
    end
  end

  def fetch_pending_trades
    # get the trades that current user has an action to take (they are responding to trade)
    # for each trade, they need to see the proposer's available cards
    # this can be got from Card.collection(t.proposer)
    trades = Trade.bundle(current_user)
    render json: {trades: trades}
  end

  private
    def create_trade_params
      params.require(:trade).permit(:proposer_card_id).merge(proposer_id: current_user.id)
    end

    def cancel_trade_params
      # can the same method be used regardless of whether user is proposer or responder?
      params.require(:trade).permit(:trade_id).merge(user_id: current_user.id)
    end
end