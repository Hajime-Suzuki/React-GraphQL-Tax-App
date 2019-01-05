import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as React from 'react'

interface RenderStateMenuItemArgs {
  value: string | number | undefined
  name: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  id?: string
}

export const StatusField = ({
  value,
  name,
  onChange,
  ...rest
}: RenderStateMenuItemArgs) => {
  return (
    <Select value={value} name={name} onChange={onChange} {...rest}>
      <MenuItem value={0}>0%</MenuItem>
      <MenuItem value={6}>6%</MenuItem>
      <MenuItem value={21}>21%</MenuItem>
    </Select>
  )
}
