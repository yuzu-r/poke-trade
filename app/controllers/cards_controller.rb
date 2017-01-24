class CardsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :create, :destroy, :update, :fetch_collection]
  def show
    @cards = current_user.cards
  end

  def new
    @card = Card.new
  end

  def create
    # receive the name, convert to id
    card_id = DECK.find{|h| h[:name] === card_params[:name]}[:number]
    new_card = Card.create(user_id: current_user.id, deck_id: card_id, is_available: true)
    if new_card.valid?
      render json: {:success => "success", :status_code => "200"}
    else
      flash[:alert] = 'Trade not created successfully.'
      render json: {:errors => "error!", :status_code => :unprocessable_entity}
    end
  end

  def destroy
    Card.destroy(card_params[:id])
    flash[:notice] = 'Card removed from trading pool.'
    redirect_to root_path
  end

  def fetch_collection
    # make the api call here because the other one is broken.
    @cards = Card.collection(current_user)
    render json: {cards: @cards}
  end

  def fetch_pool
    @cards = Card.trade_pool(current_user)
    render json: {cards: @cards}
  end

  private
    def card_params
      params.require(:card).permit(:name, :id)
    end
end