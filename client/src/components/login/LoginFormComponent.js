import Typography from '@material-ui/core/Typography'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginRequest } from '../../redux/modules/signupLogin/singupLogin'
import WithErrorMessage from '../UI/WithErrorMessage'
import LoginForm from './LoginForm'

class LoginFormComponent extends Component {
  submit = values => {
    this.props.loginRequest(values)
  }

  render() {
    const { user, loginState } = this.props
    if (user) return <Redirect to={`/dashboard/${user}`} />
    return (
      <Fragment>
        <Typography variant="display2">Login</Typography>
        <WithErrorMessage
          showError={loginState && loginState !== 'pending'}
          message={loginState}
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
