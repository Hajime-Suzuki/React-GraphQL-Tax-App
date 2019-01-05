import TextField from '@material-ui/core/TextField'
import { FieldProps, getIn } from 'formik'
import React from 'react'
import Typography from '@material-ui/core/Typography'

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
      {isTouched && errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
    </div>
  )
}
