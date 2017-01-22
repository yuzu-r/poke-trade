class StaticPagesController < ApplicationController
  def show
    @card = Pokemon::Card.find('xy7-54')
    #@cards = Pokemon::Card.where(set: 'base').where(supertype: 'pokemon').all
  end
end