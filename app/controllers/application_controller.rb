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
     devise_parameter_sanitizer.permit(:sign_in, keys: [:username])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
     devise_parameter_sanitizer.permit(:account_update, keys: [:username])
     devise_parameter_sanitizer.permit(:sign_in, keys: [:bio])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:bio])
     devise_parameter_sanitizer.permit(:account_update, keys: [:bio])
     devise_parameter_sanitizer.permit(:sign_in, keys: [:city])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:city])
     devise_parameter_sanitizer.permit(:account_update, keys: [:city])
     devise_parameter_sanitizer.permit(:sign_in, keys: [:state])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:state])
     devise_parameter_sanitizer.permit(:account_update, keys: [:state])
     devise_parameter_sanitizer.permit(:sign_in, keys: [:country])
     devise_parameter_sanitizer.permit(:sign_up, keys: [:country])
     devise_parameter_sanitizer.permit(:account_update, keys: [:country])

    end

end
