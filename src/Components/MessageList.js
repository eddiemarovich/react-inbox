import React from 'react'
import Message from './Messages'

const Messagelist = ({messages, toggleClass, response, toggleStar, toggleRead, keepLabel}) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} message={message}
      toggleClass= {toggleClass} response = {response} toggleRead= {toggleRead} keepLabel= {keepLabel} toggleStar = {toggleStar}/>))}
    </div>
  )
}


export default Messagelist
