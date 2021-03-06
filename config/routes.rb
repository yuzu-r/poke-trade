Rails.application.routes.draw do
  devise_for :users, :path_prefix => 'devise', skip: :registrations
  devise_scope :user do
    resource :registration, only: [:new, :create, :edit, :update], 
    path_names: {new: 'sign_up'},
    controller: 'devise/registrations',
    as: :user_registration do
      get :cancel
    end
  end

  resources :users, only:[:show]

  resource :cards
  resource :trades, only: [:create, :update, :show]
  root 'static_pages#trade_pool'
  get 'my_trades' => 'static_pages#trade_viewer' #for people
  get 'my_collection' => 'static_pages#my_collection' #for people
  get 'trade_pool' => 'static_pages#trade_pool' #for people
  get 'about' => 'static_pages#about' #for people
  get 'collection' => 'cards#fetch_collection' # for the component
  get 'pool' => 'cards#fetch_pool' # for the component
  get 'idle' => 'cards#fetch_idle' # for the component
  get 'pending' => 'cards#fetch_pending' # for the component
  patch 'cancel_trade' => 'trades#cancel_trade' # for component
  get 'active_trades' => 'trades#fetch_pending_trades' # for component
  patch 'accept' => 'trades#accept_trade' # for component
  get 'states/:country' => 'application#state_list'
  get 'successful_trades' => 'trades#fetch_successful_trades' # for component
end
