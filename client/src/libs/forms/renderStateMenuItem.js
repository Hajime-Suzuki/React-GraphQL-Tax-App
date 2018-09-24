import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

export const renderStateMenuItems = () => {
  const value = ['none', 'invoice', 'paid']
  return value.map((v, i) => (
    <MenuItem value={v} key={i}>
      {v}
    </MenuItem>
  ))
}
