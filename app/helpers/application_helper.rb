module ApplicationHelper
  def nice_location(city, state, country)
    if city.present? && state.present? && country.present?
      return city + ', ' + state + ' (' + country + ')'
    elsif !city.present? && !state.present? && !country.present?
      return 'not shared'
    elsif city.present? && !state.present? && !country.present?
      return city
    elsif !city.present? && state.present? && country.present?
      return state + ' (' + country + ')'
    elsif !city.present? && !state.present? && country.present?
      return country
    elsif city.present? && !state.present? && country.present?
      return city + ' (' + country + ')'
    end
    nil
  end
end
