import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, checkMessage }) => {
  return (
      messages.map( message => <Message key={ message.id } starMessage={ starMessage } checkMessage={ checkMessage } { ...message }/> )
  )
}

export default MessageList
