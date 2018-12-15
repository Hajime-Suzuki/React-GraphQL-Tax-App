import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

export const renderTextField: React.SFC<any> = ({
  input,
  meta: { touched, error, dirty },
  defaultValue,
  ...custom
}) => {
  return (
    <Grid item className="item" xs={11}>
      <TextField {...input} {...custom} />
    </Grid>
  )
}

export const renderFormikTextField = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  return (
    <React.Fragment>
      <TextField type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </React.Fragment>
  )
}
