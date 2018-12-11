import MenuItem from '@material-ui/core/MenuItem'
import React from 'react'

type statusMenuItems = 'none' | 'invoice' | 'paid'

export const renderStateMenuItems = () => {
  const value: statusMenuItems[] = ['none', 'invoice', 'paid']
  return value.map((v, i) => (
    <MenuItem value={v} key={i}>
      {v}
    </MenuItem>
  ))
}
