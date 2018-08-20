import React, { Component } from 'react';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import Compose from './components/Compose'
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      messages: [
        // {
        //   "id": 1,
        //   "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
        //   "read": false,
        //   "starred": true,
        //   "labels": ["dev", "personal"]
        // },
        // {
        //   "id": 2,
        //   "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
        //   "read": false,
        //   "starred": false,
        //   "selected": true,
        //   "labels": []
        // },
        // {
        //   "id": 3,
        //   "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
        //   "read": false,
        //   "starred": true,
        //   "labels": ["dev"]
        // },
        // {
        //   "id": 4,
        //   "subject": "We need to program the primary TCP hard drive!",
        //   "read": true,
        //   "starred": false,
        //   "selected": true,
        //   "labels": []
        // },
        // {
        //   "id": 5,
        //   "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
        //   "read": false,
        //   "starred": false,
        //   "labels": ["personal"]
        // },
        // {
        //   "id": 6,
        //   "subject": "We need to back up the wireless GB driver!",
        //   "read": true,
        //   "starred": true,
        //   "labels": []
        // },
        // {
        //   "id": 7,
        //   "subject": "We need to index the mobile PCI bus!",
        //   "read": true,
        //   "starred": false,
        //   "labels": ["dev", "personal"]
        // },
        // {
        //   "id": 8,
        //   "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
        //   "read": true,
        //   "starred": true,
        //   "labels": []
        // }
      ],
      compose: false
    }
  }

  componentDidMount () {
    this.getAllMessages()
  }

  getAllMessages = async () => {
    const response = await axios.get('http://localhost:8082/api/messages')

    const newMessages = response.data.map(message => {
      message.selected = false
      return message
    })

    this.setState({
      messages : newMessages,
    })
  }

  starMessage = async (id) => {
    const response = await axios.patch('http://localhost:8082/api/messages', {messageIds:[id], command: "star" })

    if(response) this.getAllMessages()
  }

  readMessages = async () => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds, command: 'read', read: true })

    if(response) this.getAllMessages()
  }

  unreadMessages = async () => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds, command: 'read', read: false })

    if(response) this.getAllMessages()
  }

  checkAll = () => {
    const allMessages = this.state.messages.every(message => message.selected === true)

    const newMessages = this.state.messages.map(message => {
      allMessages ? message.selected = false : message.selected = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  checkMessage = (id) => {
    const newMessages = this.state.messages.map(message => {
      if(message.id === id) message.selected ? message.selected = false : message.selected = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  deleteMessages = async () => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds, command: 'delete' })

    if(response) this.getAllMessages()

  }

  applyLabels = async (event) => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds, command: 'addLabel', label: event.target.value})

    if(response) this.getAllMessages()

  }

  removeLabels = async (event) => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await axios.patch('http://localhost:8082/api/messages', { messageIds, command: 'removeLabel', label: event.target.value})

    if(response) this.getAllMessages()

  }

  createMessage = async ({ body, subject }) => {
    const response = await axios.post('http://localhost:8082/api/messages', { body, subject })

    if(response) this.getAllMessages()
    this.toggleCompose()
  }

  toggleCompose = () => {
    this.setState({
      compose: !this.state.compose
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          readMessages={this.readMessages} unreadMessages={this.unreadMessages} checkAll={this.checkAll} deleteMessages={this.deleteMessages} applyLabels={this.applyLabels} removeLabels={this.removeLabels} toggleCompose={this.toggleCompose}
          messages={ this.state.messages }
        />
        { this.state.compose ? <Compose createMessage={this.createMessage} /> : '' }
        <MessageList
          messages={ this.state.messages }
          checkMessage={ this.checkMessage }
          starMessage={ this.starMessage }
        />
      </div>
    );
  }
}

export default App;
