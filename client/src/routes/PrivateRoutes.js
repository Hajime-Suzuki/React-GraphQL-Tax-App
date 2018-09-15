import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { routes } from './constants'

const PrivateRoutes = props => {
  const { user, component: Component, ...rest } = props

  if (!user) return <Redirect to={routes.login} />
  return <Route {...rest} render={props => <Component {...props} />} />
}

const mapSateToProps = state => ({
  user: state.userId
})
export default connect(mapSateToProps)(PrivateRoutes)
