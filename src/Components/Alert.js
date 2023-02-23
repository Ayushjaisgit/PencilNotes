import React from 'react'

const Alert = (props) => {
  return (
    <div><div className="alert alert-primary" role="alert">
    {props.messege}
  </div></div>
  )
}

export default Alert