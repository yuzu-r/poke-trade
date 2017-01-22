class StaticPagesController < ApplicationController
  def show
    @cards = Pokemon::Card.where(set: 'base').where(supertype: 'pokemon').all
  end
end