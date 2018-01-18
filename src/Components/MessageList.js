import React from 'react'
import Message from './Messages'

const Messagelist = ({messages, toggleClass, response, toggleStar, toggleRead, keepLabel, toggleId}) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} toggleId= {toggleId} message={message}
      toggleClass= {toggleClass} response = {response} toggleRead= {toggleRead} keepLabel= {keepLabel} toggleStar = {toggleStar}/>))}
    </div>
  )
}


export default Messagelist
