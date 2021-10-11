class CreateTasksTable < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :text
      t.integer :category_id
    end
  end
end
