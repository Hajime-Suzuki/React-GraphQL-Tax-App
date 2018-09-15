import React, { Component, Fragment } from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signupRequest } from '../../redux/modules/signupLogin/singupLogin'
import WithErrorMessage from '../UI/WithErrorMessage'
import Typography from '@material-ui/core/Typography'
import { routes } from '../../routes/constants'

class SignupComponent extends Component {
  submit = values => {
    this.props.signupRequest(values)
  }
  render() {
    const { userId, loginState } = this.props
    if (userId) return <Redirect to={routes.dashboard} />
    return (
      <Fragment>
        <Typography variant="display2">Sign Up</Typography>
        <WithErrorMessage
          showError={loginState && loginState !== 'pending'}
          message={loginState}
        >
          <SignupForm onSubmit={this.submit} />
        </WithErrorMessage>
      </Fragment>
    )
  }
}

const mapSateToProps = state => ({
  loginState: state.signup_login,
  userId: state.userId
})

export default connect(
  mapSateToProps,
  { signupRequest }
)(SignupComponent)
