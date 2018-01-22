import React from 'react'
import { Link } from 'react-router-dom'

const Toolbar = ({
  messages,
  checkAll,
  markRead,
  markNew,
  applyLabel,
  removeLabel,
  deleteEmail,
  message,
  response,
  keepLabel,
  noLabel,
  composeMessage,
  visibility,
  messageVisibility,
  bigBod
}) => {

  const alterUnread = () => {
    const newArr = messages.filter(e => !e.read)
    return newArr.length
  }

  const addS = () => {
    const newArr = messages.filter(e => !e.read)
    return newArr.length > 1 ? 's' : ''
  }
  console.log('toggling compose');
  const toggleCompose =  visibility === 'none' ? '/compose' : '/'

  

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{`${alterUnread()}`}</span>
          unread message{`${addS()}`}
        </p>

        <Link to= {`${toggleCompose}`}  className="btn btn-danger" onClick = {(event) => {composeMessage()}}>
          <i className="fa fa-plus"></i>
        </Link>

        <button className="btn btn-default" onClick ={(event) => {checkAll(event, messages, 'selected')}}>
          <i className="fa fa-check-square-o"></i>
        </button>

        <button className="btn btn-default" onClick ={(event) => {markRead(event, messages, 'read')}}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick ={(event) => {markNew(event, messages, 'read')}}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange ={(event) => {keepLabel(messages, event)}}>
          <option selected="true" disabled="disabled">Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange ={(event) => {noLabel(messages, event)}}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick= {(event) => {

          deleteEmail(messages)}}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>

  )
}

export default Toolbar
