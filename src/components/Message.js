import React from 'react'

const Message = ({ id, subject, read, starred, selected, labels, starMessage, checkMessage }) => {

  const isRead = read ? 'read' : 'unread'
  const isSelected = selected ? 'selected' : ''
  const isStarred = starred ? 'fa-star' : 'fa-star-o'
  const isChecked = selected ? 'checked' : ''

  return (
    <div className={ `row message ${isRead} ${isSelected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onClick={ () => checkMessage(id) } type="checkbox" checked={ isChecked }/>
          </div>
          <div className="col-xs-2">
            <i onClick={ () => starMessage(id) } className={`star fa ${isStarred}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        { labels.map(label => <span className="label label-warning">{label}</span>) }
        <a href={ `#${id}` }>
          { subject }
        </a>
      </div>
    </div>
  )
}

export default Message
