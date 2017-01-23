class CreateDecks < ActiveRecord::Migration
  def change
    create_table :decks do |t|
      t.string  :name
      t.integer :card_number
      t.string  :card_id
      t.string  :image_url
      t.timestamps null: false
    end
  end
end
