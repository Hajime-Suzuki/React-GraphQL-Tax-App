import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { FieldProps, getIn } from 'formik'

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

export const renderFormikTextField = (
  { field, form: { touched, errors }, ...props }: FieldProps,
  style?: CSSStyleRule
) => {
  const errorMessage = getIn(errors, field.name)
  const isTouched = getIn(touched, field.name)

  if (field.value === null || field.value === undefined) field.value = ''

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...style
      }}
    >
      <TextField type="text" {...field} {...props} />
      {isTouched && errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  )
}
