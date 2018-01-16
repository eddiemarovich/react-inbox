import React, {Component} from 'react';
import './App.css';
import MessagesList from './Components/MessageList'
import Toolbar from './Components/toolBar'
import Navbar from './Components/navbar'
import Compose from  './Components/Compose'
let clicker = true

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: [],
      visibility: 'none',
      subjectContent: '',
      messageContent: ''
    }
  }

  async componentDidMount() {
    const response = await fetch( 'http://localhost:8082/api/messages' )
    const json = await response.json()
    // console.log(json._embedded.messages);
    this.setState({messages: json._embedded.messages})
  }

  async response (body, method){
    return await fetch ('http://localhost:8082/api/messages', {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
  }

  alterUnread = (message) => {
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      let displayNum = e.read
      console.log(displayNum)
    })
  }

  deleteEmail = (message) => {
    let newMessages = this.state.messages.slice(0)
    const goneMessage = newMessages.filter(e => !e.selected)
    const messageIds = newMessages.filter(e => e.selected).map(e => e.id)
    const body = {
      messageIds,
      'command': "delete"
    }
    this.response(body, 'PATCH')
    this.setState({messages: goneMessage})
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

  keepLabel = (messages, event) => {
    const body = {
      'messageIds': [],
      'command':  'addLabel',
      'label': ''
    }
    this.state.messages.map(e =>{
      if(e.selected){
        body.messageIds.push(e.id)
        body.label = event.target.value
      }
    })
    this.response(body, 'PATCH')
    this.applyLabel(event.target.value)
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

  noLabel = (messages, event) => {
    const body = {
      'messageIds': [],
      'command': 'removeLabel',
      'label': ''
    }
    this.state.messages.map(e => {
      if (e.selected){
        body.messageIds.push(e.id)
        body.label = event.target.value
      }
    })
    this.response(body, 'PATCH')
    this.removeLabel(event.target.value)
  }

  toggleClass = (message, nameOfClass) => {
    const messageIndex = this.state.messages.indexOf(message)
    let newMessages = this.state.messages.slice(0)
    newMessages[messageIndex][nameOfClass] = !newMessages[messageIndex][nameOfClass]
    this.setState({messages: newMessages})
  }

  toggleRead (message){
     this.response({
      "messageIds": [message.id],
      "command": 'read',
      'read': !message.read
    }, 'PATCH')
    this.toggleClass(message, 'read')
  }


   toggleStar (message){
    this.response({
      "messageIds": [message.id],
      "command": 'star',
      'star': !message.starred
    }, 'PATCH')
    this.toggleClass(message, 'starred')
  }

  markRead = (event, read, messages) => {
    event.stopPropagation()
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      if (e.selected){
        e.read = true
        return this.setState({messages: newMessages})
      }
    })
  }

  markNew = (event, read, messages) => {
    event.stopPropagation()
    let newMessages = this.state.messages.slice(0)
    return newMessages.map(e => {
      if (e.selected){
        e.read = false
        return this.setState({messages: newMessages})
      }
    })
  }

  checkAll = (event, selected, messages) =>{
    event.stopPropagation()
    // console.log(this.state.messages);
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

  composeMessage = () => {
    if (clicker === true) {
      this.setState({visibility: 'block'})
      clicker = false
    }else{
      this.setState({visibility: 'none'})
      clicker = true
    }
  }

  getSubject = (event) => {
    let subject = event.target.value
    this.setState({subjectContent: subject})
  }

  getMessage = (event) => {
    let theMessage = event.target.value
    this.setState({messageContent: theMessage})
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className= "container">
          <Toolbar getMessage= {this.getMessage} getSubject= {this.getSubject} composeMessage= {this.composeMessage} messages={this.state.messages} noLabel= {this.noLabel} keepLabel = {this.keepLabel} response = {this.response} alterUnread = {this.alterUnread} checkAll = {this.checkAll} deleteEmail = {this.deleteEmail} markRead = {this.markRead} markNew = {this.markNew} applyLabel = {this.applyLabel} removeLabel = {this.removeLabel}/>
          <Compose subject= {this.state.subjectContent} theMessage= {this.state.messageContent} response= {this.response} getMessage= {this.getMessage} getSubject= {this.getSubject} visibility={this.state.visibility}/>
          <MessagesList messages={this.state.messages} toggleRead= {this.toggleRead.bind(this)} toggleStar = {this.toggleStar.bind(this)} toggleClass= {this.toggleClass} response = {this.response}/>
        </div>

      </div>
    )
  }
}

export default App
