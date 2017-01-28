class AddBioToUsres < ActiveRecord::Migration
  def change
    add_column :users, :bio, :text, :limit => 350
  end
end
