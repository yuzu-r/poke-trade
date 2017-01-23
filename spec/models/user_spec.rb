require 'rails_helper'

RSpec.describe User, type: :model do
  it 'has a valid factory' do
    user_count = User.count
    expect(FactoryGirl.create(:user)).to be_valid
    expect(User.count).to eq user_count + 1    
  end
end
