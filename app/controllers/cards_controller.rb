class CardsController < ApplicationController
  before_action :authenticate_user!, except: [:fetch_pool]
  #def show
  #  @cards = current_user.cards
  #end

  #def new
  #  @card = Card.new
  #end

  def create
    # receive the name, convert to id
    card_id = DECK.find{|h| h[:name] === card_params[:name]}[:number]
    new_card = Card.create(user_id: current_user.id, deck_id: card_id, is_available: true)
    if new_card.valid?
      flash[:notice] = 'Card added to collection. Other traders will now see it in the trading pool.'
      render json: {:success => "success", :status_code => "200"}
    else
      flash[:alert] = 'Card not created successfully.'
      render json: {:errors => "error!", :status_code => :unprocessable_entity}
    end
  end

  def destroy
    Card.destroy(card_params[:id])
    flash[:notice] = 'Card removed from collection.'
    render json: {:success => "success"}
  end

  def fetch_collection
    @cards = Card.collection(current_user)
    render json: {cards: @cards}
  end

  def fetch_pool
    @cards = Card.trade_pool(current_user)
    render json: {cards: @cards}
  end

  def fetch_idle
    @cards = Card.idle_trades(current_user)
    render json: {cards: @cards}
  end

  def fetch_pending
    @cards = Card.action_pending(current_user)
    render json: {cards: @cards}
  end

  private
    def card_params
      params.require(:card).permit(:name, :id)
    end
end