require 'rails_helper'

RSpec.describe Card, type: :model do
  it 'has a valid factory' do
    card_count = Card.count
    expect(FactoryGirl.create(:card)).to be_valid
    expect(Card.count).to eq card_count + 1       
  end
  it 'must have a valid deck_id to be valid'
  it 'must have a valid user to be valid'

end
