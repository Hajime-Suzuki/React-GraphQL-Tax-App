import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import * as React from 'react'

// interface OwnProps {
//   projectId: string
// }
// interface MutationProps {
//   onSubmit: MutationFn<UpdateStatus.Mutation, UpdateStatus.Variables>
//   data?: MutationResult<UpdateStatus.Mutation>
// }

// interface Props {
//   value: InvoiceStatus
//   onChange: () => any
// }

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
