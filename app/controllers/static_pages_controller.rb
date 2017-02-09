class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:trade_pool]
  def show
    #@card = Pokemon::Card.find('xy7-54')
  end

  def trade_viewer
    render component: 'TradeContainer'
  end
  
  def trade_pool
    render component: 'TradePool', 
      props: {loggedIn: signed_in?, signInPath: new_user_session_path, signUpPath: new_user_registration_path}
  end

  def my_collection
    render component: 'CollectionManager', props: {deck: DECK}
  end
end