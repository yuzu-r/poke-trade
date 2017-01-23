class AddUserToCards < ActiveRecord::Migration
  def change
    add_reference :cards, :user, foreign_key: true
  end
end
