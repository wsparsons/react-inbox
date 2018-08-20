import React from 'react'
import Body from './Body'

const Message = ({ id, subject, read, starred, selected, labels, body, starMessage, checkMessage }) => {

  const isRead = read ? 'read' : 'unread'
  const isSelected = selected ? 'selected' : ''
  const isStarred = starred ? 'fa-star' : 'fa-star-o'
  const isChecked = selected ? 'checked' : ''

  return (
    <div>
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
          { labels.map((label, index ) => <span key={index} className="label label-warning">{label}</span>) }
          <a href={ `#${id}` }>
            { subject }
          </a>
        </div>
      </div>
      { isSelected ? <Body body={body}/> : ''}
    </div>
  )
}

export default Message
