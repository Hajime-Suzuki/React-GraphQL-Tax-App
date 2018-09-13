import React, { Component } from 'react'
import SignupForm from './SignupForm'
import { connect } from 'react-redux'
import { signupRequest } from '../../redux/modules/signupLogin/singupLogin'

class SignupComponent extends Component {
  submit = values => {
    this.props.signupRequest(values)
  }
  render() {
    return <SignupForm onSubmit={this.submit} />
  }
}

export default connect(
  null,
  { signupRequest }
)(SignupComponent)
