import React, { PureComponent } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoutes = props => {
  const { user, component: Component, ...rest } = props

  if (!user) return <Redirect to="/login" />
  return <Route {...rest} render={props => <Component {...props} />} />
}

const mapSateToProps = state => ({
  user: state.userId
})
export default connect(mapSateToProps)(PrivateRoutes)
