import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as React from 'react'
import { Invoice_Status } from 'src/graphql/components/projects'
import InputLabel from '@material-ui/core/InputLabel'

interface RenderStateMenuItemArgs {
  value: string | number
  name: string
  onChange: (e: any) => void
  id?: string
  showLabel?: boolean
}

export const renderTaxRateField = ({
  value,
  name,
  onChange,
  ...rest
}: RenderStateMenuItemArgs) => {
  return (
    <div className="field-item select">
      <InputLabel shrink>Tax Rate</InputLabel>
      <Select value={value} name={name} onChange={onChange} {...rest}>
        <MenuItem value={0}>0%</MenuItem>
        <MenuItem value={9}>9%</MenuItem>
        <MenuItem value={21}>21%</MenuItem>
      </Select>
    </div>
  )
}

export const renderStatusField = ({
  value,
  name,
  onChange,
  showLabel = true,
  ...rest
}: RenderStateMenuItemArgs) => {
  return (
    <div className="field-item select">
      {showLabel && <InputLabel shrink>Status</InputLabel>}
      <Select value={value} name={name} onChange={onChange} {...rest}>
        <MenuItem value={Invoice_Status.None || ''}>None</MenuItem>
        <MenuItem value={Invoice_Status.Invoice}>Invoice</MenuItem>
        <MenuItem value={Invoice_Status.Paid}>Paid</MenuItem>
      </Select>
    </div>
  )
}
