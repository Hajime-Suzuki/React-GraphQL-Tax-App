import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import React from 'react'

export const renderDropdown = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <Grid item className="item" xs={11}>
      <FormControl className={custom.className}>
        <InputLabel htmlFor={custom.className}>{label}</InputLabel>
        <Select {...input} {...custom} children={children} />
      </FormControl>
    </Grid>
  )
}
