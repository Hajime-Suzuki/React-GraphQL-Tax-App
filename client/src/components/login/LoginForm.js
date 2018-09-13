import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { renderTextField } from '../../libs/forms/renderTextField'
import { StyledGridFormItem } from '../../styles/forms'

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledGridFormItem container direction="column">
        <Grid item className="item">
          <Field component={renderTextField} name="email" label="email" />
        </Grid>
        <Grid item className="item">
          <Field
            type="password"
            component={renderTextField}
            name="password"
            label="password"
          />
        </Grid>
      </StyledGridFormItem>

      <Button type="submit" variant="contained" color="primary">
        submit
      </Button>
    </form>
  )
}

export default reduxForm({ form: 'login' })(LoginForm)
