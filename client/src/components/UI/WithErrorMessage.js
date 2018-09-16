import React, { Fragment } from 'react'

const WithErrorMessage = ({ children, message }) => {
  return (
    <Fragment>
      {message ? <p>{message}</p> : null}
      {children}
    </Fragment>
  )
}

export default WithErrorMessage
