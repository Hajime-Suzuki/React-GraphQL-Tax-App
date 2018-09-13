import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField {...input} {...custom} />
)

const StyledGrid = styled(Grid)`
  .item {
    margin-bottom: 2em;
  }
`

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <StyledGrid container direction="column">
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
      </StyledGrid>

      <Button type="submit" variant="contained" color="primary">
        submit
      </Button>
    </form>
  )
}

export default reduxForm({ form: 'login' })(LoginForm)
