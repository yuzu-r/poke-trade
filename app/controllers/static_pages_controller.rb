class StaticPagesController < ApplicationController
  def show
    @card = Pokemon::Card.find('xy7-54')
    @cards = Pokemon::Card.where(set: 'Base Set 2')
      .where(supertype: 'pokemon')
      .where(number: '1|2|25')
      .all
  end
  
  def test
    #render component: 'Pick'
    #puts "constant #{DECK[0]}"
    render component: 'CollectionManager', props: {deck: DECK}
    #render component: 'Collection', props: {isLoading: true, loadingMessage: 'hi'}
  end
end