import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { FieldProps } from 'formik'

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
  form,
  ...props
}: FieldProps) => {
  const { touched, errors } = form

  return (
    <React.Fragment>
      <TextField type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </React.Fragment>
  )
}

export const renderFormikArrayField = (
  { field, form, ...props }: FieldProps,
  index: number
) => {
  const { touched, errors } = form

  const [parentFieldName, fieldIndex, fieldName] = field.name.split('.')
  const incomesErrorField =
    errors[parentFieldName] && errors[parentFieldName]![index]

  const isTouched = touched[parentFieldName] && touched[parentFieldName]![index]
  const renderErrorCondition =
    fieldIndex === String(index) &&
    incomesErrorField &&
    incomesErrorField[fieldName]

  return (
    <React.Fragment>
      <TextField type="text" {...field} {...props} />
      {isTouched && renderErrorCondition && (
        <div className="error">{incomesErrorField![fieldName]}</div>
      )}
    </React.Fragment>
  )
}
