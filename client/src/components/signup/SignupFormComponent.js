import React, { Component, Fragment } from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { signupRequest } from '../../redux/modules/signupLogin/singupLogin'
import WithErrorMessage from '../UI/WithErrorMessage'
import Typography from '@material-ui/core/Typography'

class SignupComponent extends Component {
  submit = values => {
    this.props.signupRequest(values)
  }
  render() {
    return (
      <Fragment>
        <Typography variant="display2">Sign Up</Typography>
        <WithErrorMessage
          showError={
            this.props.loginState && this.props.loginState !== 'pending'
          }
          message={this.props.loginState}
        >
          <SignupForm onSubmit={this.submit} />
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
  { signupRequest }
)(SignupComponent)
