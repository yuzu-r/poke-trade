class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  def state_list
    country = CS.countries.find{|k,v| v == params[:country]}.first
    state_vals = CS.states(country).values.sort
    render json: {states: state_vals}
  end

  protected
    def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_in)        << :username
     devise_parameter_sanitizer.for(:sign_up)        << :username
     devise_parameter_sanitizer.for(:account_update) << :username
     devise_parameter_sanitizer.for(:sign_in)        << :bio
     devise_parameter_sanitizer.for(:sign_up)        << :bio
     devise_parameter_sanitizer.for(:account_update) << :bio
     devise_parameter_sanitizer.for(:sign_in)        << :city
     devise_parameter_sanitizer.for(:sign_up)        << :city
     devise_parameter_sanitizer.for(:account_update) << :city
     devise_parameter_sanitizer.for(:sign_in)        << :state
     devise_parameter_sanitizer.for(:sign_up)        << :state
     devise_parameter_sanitizer.for(:account_update) << :state
     devise_parameter_sanitizer.for(:sign_in)        << :country
     devise_parameter_sanitizer.for(:sign_up)        << :country
     devise_parameter_sanitizer.for(:account_update) << :country

    end

end
