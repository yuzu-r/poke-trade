class CreateTrades < ActiveRecord::Migration
  def change
    create_table :trades do |t|
      t.string "status", :default => 'pending'
      t.integer "proposer_id"
      t.integer "responder_id"
      t.integer "proposer_card_id"
      t.integer "responder_card_id"
      t.timestamps null: false
    end
  end
end
