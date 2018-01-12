import React from 'react'

const Message = ({message, toggleClass}) => {

  const readClass = message.read ? 'read' : 'unread'
  const starClass = message.starred ? 'star fa fa-star-o' : 'star fa fa-star'
  const boxClass = message.selected ? 'selected' : ''

  return (
    <div className= {`row message ${readClass} ${boxClass}`} onClick= {(event)=>{toggleClass(event, message, 'read')}}>
      <div className="col-xs-1">
        <div className="row">
          <div className={`col-xs-2 `} >
            <input type="checkbox" onClick= {(event) => {toggleClass(event, message, 'selected')}} checked={ !!message.selected } readOnly={ true }/>
          </div>
          <div className="col-xs-2">
            <i className={`${starClass}`} onClick= {(event)=>{toggleClass(event, message, 'starred')}}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((e, index) => <span className= "label label-warning" key = {index}>{e}</span>)}
        <a href="#a">
          {message.subject}
        </a>
      </div>
    </div>

  )
}

export default Message
