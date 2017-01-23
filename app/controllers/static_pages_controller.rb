class StaticPagesController < ApplicationController
  def show
    @card = Pokemon::Card.find('xy7-54')
    @cards = Pokemon::Card.where(set: 'Base Set 2')
      .where(supertype: 'pokemon')
      .where(number: '1|2')
      .all
  end
  
  def test
    render component: 'CollectionManager'
    #render component: 'Collection', props: {isLoading: true, loadingMessage: 'hi'}
  end
end