import React from 'react'
import { Link, Route } from 'react-router-dom'
import MessageBody from './MessageBody'

const Message = ({message, toggleClass, response, toggleStar, toggleRead, toggleId, visibility, findDatBod, bigBod }) => {

  const readClass = message.read ? 'read' : 'unread'
  const starClass = message.starred ? 'star fa fa-star' : 'star fa fa-star-o'
  const boxClass = message.selected ? 'selected' : ''

  const toggleMessage = message.read ? `/` : `/messages/${message.id}`


  return (
    <Link to={`${toggleMessage}`} className= {`row message ${readClass} ${boxClass}`} onClick= {(event) => {toggleRead(message)} } >
      <div className="col-xs-1">
        <div className="row">
          <div className={`col-xs-2 `} >
            <input type="checkbox" onClick= {(event) => {event.stopPropagation()
              toggleClass( message, 'selected')}} checked={ !!message.selected } readOnly={ true }/>
          </div>
          <div className="col-xs-2">
            <i className={`${starClass}`} onClick= {(event)=>{event.stopPropagation()
              event.preventDefault()
              toggleStar(message)}}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {message.labels.map((e, index) => <span className= "label label-warning" key = {index}>{e}</span>)}
        <a href="#a">
          {message.subject}
          <Route path={`/messages/${message.id}`} render={() => (
            <MessageBody
            bigBod = {bigBod}
            message = {message}
          />
        )} />
        </a>
      </div>

    </Link>

  )
}

export default Message
