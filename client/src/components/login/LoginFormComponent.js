import Typography from '@material-ui/core/Typography'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import { loginRequest } from '../../redux/modules/signupLogin/signupLogin'
import WithErrorMessage from '../UI/WithErrorMessage'
import LoginForm from './LoginForm'
import { routes } from '../../routes/constants'
import { loginRequest } from '../../redux/modules/user/user'

class LoginFormComponent extends Component {
  submit = values => {
    this.props.loginRequest(values)
  }

  render() {
    const { userId, loginState } = this.props
    if (userId) return <Redirect to={routes.dashboard} />
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

const mapSateToProps = state => {
  return {
    loginState: state.signupLogin
    // userId: state.userId
  }
}

export default connect(
  mapSateToProps,
  { loginRequest }
)(LoginFormComponent)
