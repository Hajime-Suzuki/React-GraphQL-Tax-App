import React, { Component } from 'react'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { loginRequest } from '../../redux/modules/login/login'
import WithErrorMessage from '../UI/WithErrorMessage'
import { Redirect } from 'react-router-dom'
class LoginFormComponent extends Component {
  submit = values => {
    this.props.loginRequest(values)
  }

  render() {
    if (this.props.user) return <Redirect to="/" />
    return (
      <WithErrorMessage showError={this.props.error} message={this.props.error}>
        <LoginForm onSubmit={this.submit} />
      </WithErrorMessage>
    )
  }
}

const mapSateToProps = state => ({
  error: state.login.message,
  user: state.login.user
})

export default connect(
  mapSateToProps,
  { loginRequest }
)(LoginFormComponent)
