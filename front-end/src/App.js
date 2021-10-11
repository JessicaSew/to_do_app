import React from 'react';
import './App.css';
import { CATEGORIES } from './data'
import DisplayTask from "./components/DisplayTask"

class App extends React.Component {

  state = {
    categoryDisplay: "",
    newTask: "",
    chooseCategory: "Work",
    tasks: []
  }

  componentDidMount(){
    fetch("http://localhost:9292/tasks")
    .then(res => res.json())
    .then(data => this.setState({
      tasks: data.tasks
    }))
  }

  handleClick =(event) => {
    event.target.innerText === "All" ? 
    this.setState({categoryDisplay: ""}) :
    this.setState({categoryDisplay: event.target.innerText})
  }

  handleDelete  = (deleteTask) => {

    fetch("http://localhost:9292/tasks/"+deleteTask.id, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      } 
    })

    this.setState({
      tasks: this.state.tasks.filter(task => task !== deleteTask)
    })
  }

  handleAddTask = (e) => {
    e.preventDefault()

    fetch("http://localhost:9292/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.newTask, 
        category: this.state.chooseCategory
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        tasks: [...this.state.tasks, data.task], 
        newTask: ""
      })
    })
  }

  render() {
      
    let filterTasks = this.state.tasks.filter(task => task.category.includes(this.state.categoryDisplay))
    
    return (
      <div className="App">
        <h2>To Do List</h2>
        <div className='categories'>
          <h5>My Categories</h5>
          {CATEGORIES.map((category, i) => <button key={i} onClick={this.handleClick}>{category}</button>)}
        </div>
        <div className="tasks">
          <h5>My Tasks</h5>
          <form className="task-form">
            <input onChange={(e) => this.setState({newTask: e.target.value})} placeholder="Create New Task" type="text" value={this.state.newTask}></input>
              <select onChange={(e) => this.setState({chooseCategory: e.target.value})}>
                <option>Food</option>
                <option>Misc</option>
                <option>Money</option>
                <option>Work</option>
              </select>
            <input onClick={this.handleAddTask} type="submit" value="Submit"></input>
          </form>
          {filterTasks.map((task,i) => <DisplayTask key={i} task={task} handleDelete={this.handleDelete}/>)}
        </div>
      </div>
    );
  }
}


export default App;
