import React, { Fragment } from 'react'

const WithErrorMessage: React.SFC<{ message: string }> = ({
  children,
  message
}) => {
  return (
    <Fragment>
      {message ? <p>{message}</p> : null}
      {children}
    </Fragment>
  )
}

export default WithErrorMessage
