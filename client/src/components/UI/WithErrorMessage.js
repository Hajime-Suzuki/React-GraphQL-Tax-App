import React, { Fragment } from 'react'

const WithErrorMessage = ({ children, message, showError }) => {
  return (
    <Fragment>
      {showError ? <p>{message}</p> : null}
      {children}
    </Fragment>
  )
}

export default WithErrorMessage
