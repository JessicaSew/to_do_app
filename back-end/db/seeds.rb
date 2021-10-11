
# require 'pry'

Category.destroy_all
Task.destroy_all

food = Category.create(name:"Food")
money = Category.create(name:"Money")
misc = Category.create(name:"Misc")
work = Category.create(name: "Work")
# binding.pry

Task.create(text:"Do homework", category: work)
Task.create(text:"Buy groceries", category: food)
Task.create(text:"Clean room", category: misc)
Task.create(text:"Shop for shoes", category: misc)
Task.create(text:"Cook dinner", category: food)