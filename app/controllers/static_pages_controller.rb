class StaticPagesController < ApplicationController
  def show
    #@card = Pokemon::Card.find('xy7-54')
  end

  def trade_viewer
    render component: 'TradeContainer'
  end
  
  def trade_pool
    render component: 'TradePool'
  end

  def my_collection
    render component: 'CollectionManager', props: {deck: DECK}
  end
end