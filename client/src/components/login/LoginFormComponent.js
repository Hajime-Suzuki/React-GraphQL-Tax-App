import React, { Component, Fragment } from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

import WithErrorMessage from '../UI/WithErrorMessage'
import { Redirect } from 'react-router-dom'
import { loginRequest } from '../../redux/modules/signupLogin/singupLogin'

class LoginFormComponent extends Component {
  submit = values => {
    this.props.loginRequest(values)
  }

  render() {
    if (this.props.user) return <Redirect to="/" />
    return (
      <Fragment>
        <h1>Login Page</h1>
        <WithErrorMessage
          showError={
            this.props.loginState && this.props.loginState !== 'pending'
          }
          message={this.props.loginState}
        >
          <LoginForm onSubmit={this.submit} />
        </WithErrorMessage>
      </Fragment>
    )
  }
}

const mapSateToProps = state => ({
  loginState: state.signup_login,
  user: state.user
})

export default connect(
  mapSateToProps,
  { loginRequest }
)(LoginFormComponent)
