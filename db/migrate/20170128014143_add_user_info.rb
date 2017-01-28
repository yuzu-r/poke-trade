class AddUserInfo < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :city, :string, :limit => 50
    add_column :users, :state, :string, :limit => 40
    add_column :users, :country, :string
  end
end
