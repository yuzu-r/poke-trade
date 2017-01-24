class DropForeignKey < ActiveRecord::Migration
  def change
    remove_foreign_key :cards, :decks
  end
end
