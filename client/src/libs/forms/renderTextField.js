import React from 'react'
import TextField from '@material-ui/core/TextField'

export const renderTextField = ({
  input,
  meta: { touched, error },
  ...custom
}) => <TextField {...input} {...custom} />
