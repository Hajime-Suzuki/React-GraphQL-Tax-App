import * as React from 'react'

const WithErrorMessage = ({ children, message }) => {
  return (
    <React.Fragment>
      {message ? <p>{message}</p> : null}
      {children}
    </React.Fragment>
  )
}

export default WithErrorMessage
