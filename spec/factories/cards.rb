FactoryGirl.define do
  factory :card do
    deck_id Deck.first.id
    user
  end
end
