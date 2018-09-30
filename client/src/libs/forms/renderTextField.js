import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
export const renderTextField = ({
  input,
  meta: { touched, error, dirty },
  ...custom
}) => {
  const defaultValue = custom.default
  console.log(dirty)

  return (
    <Grid item className="item" xs={11}>
      <TextField
        {...input}
        {...custom}
        // value={defaultValue && !dirty ? defaultValue : input.value}
      />
    </Grid>
  )
}
