import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
    }
  }

  checkAll = () => {
    const allMessages = this.state.messages.every(message => message.selected === true)

    const newMessages = this.state.messages.map(message => {
      allMessages ? delete message.selected : message.selected = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  checkMessage = (id) => {
    const newMessages = this.state.messages.map(message => {
      if(message.id === id) message.selected ? delete message.selected : message.selected = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  starMessage = (id) => {
    const newMessages = this.state.messages.map(message => {
      if(message.id === id) message.starred = !message.starred
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  readMessages = () => {
    const newMessages = this.state.messages.map(message => {
      message.selected === true ? message.read = true : null
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  unreadMessages = () => {
    const newMessages = this.state.messages.map(message => {
      message.selected === true ? message.read = false : null
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  deleteMessages = () => {
    const newMessages = this.state.messages.filter(message =>
      !message.selected
    )
    this.setState({
      messages: newMessages
    })
  }

  applyLabels = (event) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        if(message.labels.includes(event.target.value)) return message
         else {message.labels.push(event.target.value) }
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  removeLabels = (event) => {
    const newMessages = this.state.messages.map(message => {
      if(message.selected === true) {
        const newLabels = message.labels.filter(label => label !== event.target.value)
        message.labels = newLabels
      }
      return message
    })
    this.setState({
      messages: newMessages
    })
  }



  render() {
    return (
      <div className="container">
        <Toolbar readMessages={this.readMessages} unreadMessages={this.unreadMessages} checkAll={this.checkAll} deleteMessages={this.deleteMessages} applyLabels={this.applyLabels} removeLabels={this.removeLabels} messages={ this.state.messages }/>
        <MessageList messages={ this.state.messages } checkMessage={ this.checkMessage } starMessage={ this.starMessage } />
      </div>
    );
  }
}

export default App;
