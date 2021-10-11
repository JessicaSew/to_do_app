
import React, {Component} from 'react'

class DisplayTask extends Component {
  render(){
    return (
      <div className='task'>
        <div className='label'>{this.props.task.category}</div>
        <div className='text'>{this.props.task.text}</div>
        <button onClick={() => this.props.handleDelete(this.props.task)} className="delete">Delete</button>
      </div>
    )
  }
}

export default DisplayTask;