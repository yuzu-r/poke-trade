class CardsController < ApplicationController
  before_action :authenticate_user!, only: [:show, :create, :destroy, :update, :fetch_collection]
  def show
    @cards = current_user.cards
  end

  def new
    @card = Card.new
  end

  def create
  end

  def fetch_collection
    #@cards = current_user.cards
    # make the api call here because the other one is broken.
    @cards = Card.collection(current_user)
    render json: {cards: @cards}
  end

  private
    def card_params
      params.require(:card).permit(:deck, :is_available)
    end
end