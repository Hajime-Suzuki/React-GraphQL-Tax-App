import React from 'react'
import { Field, reduxForm } from 'redux-form'

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field type="text" component="input" name="email" />
      <Field type="text" component="input" name="password" />
      <button type="submit">submit</button>
    </form>
  )
}

export default reduxForm({ form: 'login' })(LoginForm)
