class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  protect_from_forgery with: :exception

  protected
    def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_in)        << :username
     devise_parameter_sanitizer.for(:sign_up)        << :username
     devise_parameter_sanitizer.for(:account_update) << :username
     devise_parameter_sanitizer.for(:sign_in)        << :bio
     devise_parameter_sanitizer.for(:sign_up)        << :bio
     devise_parameter_sanitizer.for(:account_update) << :bio
    end

end
