import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../libs/forms/renderTextField'
import { StyledGridFormItem } from '../../styles/forms'

const SignupForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledGridFormItem container direction="column" alignItems="center">
        <Grid item className="item">
          <Field
            component={renderTextField}
            name="firstName"
            label="first name"
            required={true}
          />
        </Grid>
        <Grid item className="item">
          <Field
            component={renderTextField}
            name="lastName"
            label="last name"
            required={true}
          />
        </Grid>
        <Grid item className="item">
          <Field
            component={renderTextField}
            name="email"
            label="email"
            required={true}
          />
        </Grid>
        <Grid item className="item">
          <Field
            type="password"
            component={renderTextField}
            name="password"
            label="password"
            required={true}
          />
        </Grid>
      </StyledGridFormItem>
      <Button type="submit" variant="contained" color="primary">
        submit
      </Button>
    </form>
  )
}

export default reduxForm({
  form: 'singup'
})(SignupForm)
