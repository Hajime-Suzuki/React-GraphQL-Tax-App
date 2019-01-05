import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as React from 'react'

export const TaxRateDropDown: React.SFC<any> = props => {
  return (
    <Select
      value={props.value}
      name="status"
      onChange={props.onChange || props.form.handleChange}
    >
      <MenuItem value="none">none</MenuItem>
      <MenuItem value="invoice">invoice</MenuItem>
      <MenuItem value="paid">paid</MenuItem>
    </Select>
  )
}
