import React, {Component} from 'react';
import './App.css';
import MessagesList from './Components/MessageList'
import Toolbar from './Components/toolBar'
import Navbar from './Components/navbar'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: this.props.messages
    }
  }

  applyLabel = (label) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(e => {
      if (e.selected && e.labels.indexOf(label) === -1){
        e.labels.push(label)
        return this.setState({messages: newMessages})
      }
    })
  }

  alterUnread = () => {
    let newMessages = this.messages.slice(0)
    return newMessages.map(e => {
      console.log(e.read);
    })
  }

  deleteEmail = (message) => {
    let newMessages = this.state.messages.slice(0)
    const goneMessage = newMessages.filter(e => {
        if(e.selected !== true){
          return e
        }
      })
    return this.setState({messages: goneMessage})
  }

  removeLabel = (label) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.forEach(e => {
      if (e.selected){
        let index = e.labels.indexOf(label)
        e.labels.splice(index, 1)
        return this.setState({messages: newMessages})
      }
    })
  }

  toggleClass = (event, message, nameOfClass) => {
    event.stopPropagation()
    const messageIndex = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    // console.log(newMessages[messageIndex][nameOfClass]);
    newMessages[messageIndex][nameOfClass] = !newMessages[messageIndex][nameOfClass]
    // console.log(newMessages[messageIndex][nameOfClass]);
    this.setState({messages: newMessages})
  }

  markRead = (event, read, messages) => {
    event.stopPropagation()
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      e.read = true
      return this.setState({messages: newMessages})
    })
  }

  markNew = (event, read, messages) => {
    event.stopPropagation()
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      e.read = false
      return this.setState({messages: newMessages})
    })
  }

  checkAll = (event, selected, messages) =>{
    event.stopPropagation()
    console.log(this.state.messages);
    let messageArr = this.state.messages.filter(message => message.selected)
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      if (messageArr.length < newMessages.length){
        e.selected = true
        return this.setState({messages: newMessages})
      }else{
        e.selected = false
        return this.setState({messages: newMessages})
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className= "container">
          <Toolbar messages={this.state.messages} alterUnread = {this.alterUnread} checkAll = {this.checkAll} deleteEmail = {this.deleteEmail} markRead = {this.markRead} markNew = {this.markNew} applyLabel = {this.applyLabel} removeLabel = {this.removeLabel}/>
          <MessagesList messages={this.state.messages} toggleClass= {this.toggleClass} />
        </div>

      </div>
    )
  }
}

export default App
