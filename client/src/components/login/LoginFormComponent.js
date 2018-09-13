import React, { Component } from 'react'
import LoginForm from './LoginForm'

class LoginFormComponent extends Component {
  submit = values => {
    // print the form values to the console
    console.log(values)
  }
  render() {
    return <LoginForm onSubmit={this.submit} />
  }
}

export default LoginFormComponent
