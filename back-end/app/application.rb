require 'pry'
require 'json'

class Application

  def call(env)
    resp = Rack::Response.new
    req = Rack::Request.new(env)

    if req.path.match(/tasks/) && req.get?

      tasks = Task.all.map do |task|
        {id: task.id, text: task.text, category: task.category.name}
      end

      return [200, { 'Content-Type' => 'application/json' }, [ {:tasks => tasks}.to_json ]]   

    elsif req.path.match(/tasks/) && req.post?

      data = JSON.parse req.body.read
      category = Category.find_by(name: data["category"])
      task = Task.create(text: data["text"], category: category)

      res_task = {id: task.id, text: task.text, category: task.category.name}

      return [200, { 'Content-Type' => 'application/json' }, [ {:task => res_task}.to_json ]]   

    elsif req.delete?

      id = req.path.split("/tasks/").last
      Task.find(id).delete

      return [200, { 'Content-Type' => 'application/json' }, [ {:message => "Task deleted!"}.to_json ]]

    else
      resp.write "Path Not Found"

    end

    resp.finish
  end


end
