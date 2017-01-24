class StaticPagesController < ApplicationController
  def show
    @card = Pokemon::Card.find('xy7-54')
    @cards = Pokemon::Card.where(set: 'Base Set 2')
      .where(supertype: 'pokemon')
      .where(number: '1|2|25')
      .all
  end
  
  def test
    render component: 'TradePool'
  end

  def my_collection
    render component: 'CollectionManager', props: {deck: DECK}
  end
end