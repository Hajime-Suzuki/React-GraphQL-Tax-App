import React from 'react'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { FormControl, MenuItem } from '@material-ui/core'

// import {
//   Checkbox,
//   RadioGroup,
//   Select,
//   TextField,
//   Switch,
//   FormControlLabel
// } from 'redux-form-material-ui'
// const value = 100

export const renderDropdown = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
}) => {
  return (
    <Grid item className="item">
      <FormControl className={custom.className}>
        <InputLabel htmlFor={custom.className}>{label}</InputLabel>
        <Select {...input} {...custom} children={children} />
      </FormControl>
    </Grid>
  )
}
