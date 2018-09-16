import Typography from '@material-ui/core/Typography'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import WithErrorMessage from '../UI/WithErrorMessage'
import LoginForm from './LoginForm'
import { routes } from '../../routes/constants'
import { loginOrSignup } from '../../redux/modules/user'
import { userStatusType } from '../../redux/modules/user/model'
import PropTypes from 'prop-types'
import SignupForm from './SignupForm'

class LoginAndSignupForm extends Component {
  static propTypes = {
    userId: PropTypes.string,
    loginSignupStatus: userStatusType.isRequired
  }

  submit = values => {
    const type = this.props.match.path === '/signup' ? 'signup' : 'login'
    this.props.loginOrSignup(type, values)
  }

  render() {
    const { userId, loginSignupStatus, match } = this.props

    if (userId) return <Redirect to={routes.dashboard} />
    return (
      <Fragment>
        <Typography variant="display2">
          {match.path === '/signup' ? 'Signup' : 'Login'}
        </Typography>
        <WithErrorMessage message={loginSignupStatus.message}>
          {match.path === '/signup' ? (
            <SignupForm onSubmit={this.submit} />
          ) : (
            <LoginForm onSubmit={this.submit} />
          )}
        </WithErrorMessage>
      </Fragment>
    )
  }
}

const mapSateToProps = state => {
  return {
    userId: state.user.getId(),
    loginSignupStatus: state.user.getStatus()
  }
}

export default connect(
  mapSateToProps,
  { loginOrSignup }
)(LoginAndSignupForm)
