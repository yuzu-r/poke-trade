class AddToCards < ActiveRecord::Migration
  def change
    add_reference :cards, :deck, foreign_key: true
    add_column :cards, :is_available, :boolean, :default => false
    add_column :cards, :is_active, :boolean, :default => true
  end
end
