Rails.application.routes.draw do
  devise_for :users
  #root 'static_pages#show'
  resource :cards
  resource :trades, only: [:create, :update, :show]
  root 'static_pages#trade_pool'
  get 'my_trades' => 'static_pages#trade_viewer' #for people
  get 'my_collection' => 'static_pages#my_collection' #for people
  get 'trade_pool' => 'static_pages#trade_pool' #for people
  get 'collection' => 'cards#fetch_collection' # for the component
  get 'pool' => 'cards#fetch_pool' # for the component
  get 'idle' => 'cards#fetch_idle' # for the component
  get 'pending' => 'cards#fetch_pending' # for the component
  patch 'cancel_trade' => 'trades#cancel_trade' # for component
  get 'active_trades' => 'trades#fetch_pending_trades' # for component
  patch 'accept' => 'trades#accept_trade' # for component
end
