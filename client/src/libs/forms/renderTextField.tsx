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
