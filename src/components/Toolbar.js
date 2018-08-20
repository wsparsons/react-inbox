import React from 'react'

const Toolbar = ({ readMessages, unreadMessages, checkAll, deleteMessages, applyLabels, removeLabels, toggleCompose, messages }) => {

  const checkIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === true)
    const someMessages = messages.some(message => message.selected === true)

    if(allMessages) return `fa fa-check-square-o`
    else if (someMessages) return `fa fa-minus-square-o`
    else return `fa fa-square-o`
  }

  const countMessages = (messages) => {
    let counter = messages.reduce((total, message) => {
      if(message.read === false ) total++
      return total
    }, 0)
    return counter;
  }

  const disableIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === false)

    if(allMessages) return true
    else return false
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ countMessages(messages)}</span>
          unread message{countMessages(messages) !== 1 ? 's' : ''}
        </p>

        <a onClick={ toggleCompose } className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button onClick={ checkAll } className="btn btn-default">
          <i className={checkIcon(messages)}></i>
        </button>

        <button onClick={ readMessages } className="btn btn-default" disabled={disableIcon(messages)} >
          Mark As Read
        </button>

        <button onClick={ unreadMessages } className="btn btn-default" disabled={disableIcon(messages)}>
          Mark As Unread
        </button>

        <select onChange={ applyLabels } className="form-control label-select" disabled={disableIcon(messages)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={ removeLabels } className="form-control label-select" disabled={disableIcon(messages)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button onClick={ deleteMessages } className="btn btn-default" disabled={disableIcon(messages)}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
