class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.string :img_url
      t.string :email
      t.float :value
      t.timestamps
    end
  end
end
