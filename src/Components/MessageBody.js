import React from 'react'
import { Link } from 'react-router-dom'

const MessageBody = ({ message, toggleBody, messageVisibility, visibility, bigBod}) => {

    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1" >
            {bigBod.body}
        </div>
      </div>
    )


}


export default MessageBody
