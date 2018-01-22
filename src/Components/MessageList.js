import React from 'react'
import Message from './Messages'

const Messagelist = ({messages, toggleClass, response, toggleStar, toggleRead, keepLabel, toggleId, toggleBody, bigBod  }) => {
  return (
    <div>
      {messages.map(message => (<Message key={message.id} bigBod={bigBod} toggleId= {toggleId} message={message}
      toggleClass= {toggleClass} toggleBody= {toggleBody} response = {response} toggleRead= {toggleRead} keepLabel= {keepLabel} toggleStar = {toggleStar}/>))}
    </div>
  )
}


export default Messagelist
