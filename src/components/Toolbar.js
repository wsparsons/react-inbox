import React, { Component } from 'react'

class Toolbar extends Component {
  constructor (props){
    super(props)
  }

  checkIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === true)
    const someMessages = messages.some(message => message.selected === true)

    if(allMessages) return `fa fa-check-square-o`
    else if (someMessages) return `fa fa-minus-square-o`
    else return `fa fa-square-o`
  }

  countMessages = (messages) => {
    let counter = 0
    messages.map(message => {
      if(message.read === false)
      counter++
    })
    return counter;
  }

  disableIcon = (messages) => {
    const allMessages = messages.every(message => message.selected === undefined)
    console.log(allMessages);

    if(allMessages) return true
    else return false
  }

  render () {

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{ this.countMessages(this.props.messages)}</span>
            unread message{this.countMessages(this.props.messages) !== 1 ? 's' : ''}
          </p>

          <button onClick={ this.props.checkAll } className="btn btn-default">
            <i className={this.checkIcon(this.props.messages)}></i>
          </button>

          <button onClick={ this.props.readMessages } className="btn btn-default" disabled={this.disableIcon(this.props.messages)} >
            Mark As Read
          </button>

          <button onClick={ this.props.unreadMessages } className="btn btn-default" disabled={this.disableIcon(this.props.messages)}>
            Mark As Unread
          </button>

          <select onChange={ this.props.applyLabels } className="form-control label-select" disabled={this.disableIcon(this.props.messages)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={ this.props.removeLabels } className="form-control label-select" disabled={this.disableIcon(this.props.messages)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={ this.props.deleteMessages }className="btn btn-default" disabled={this.disableIcon(this.props.messages)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
