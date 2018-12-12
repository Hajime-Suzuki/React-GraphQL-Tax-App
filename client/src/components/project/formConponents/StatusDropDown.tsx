import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'

interface DropdownStatusProps {
  status: string
}

export const StatusDropdown: React.SFC<DropdownStatusProps> = props => {
  return (
    <Formik
      onSubmit={(values: DropdownStatusProps) => console.log(values)}
      initialValues={{ status: props.status }}
      render={(formProps: FormikProps<DropdownStatusProps>) => {
        return (
          <React.Fragment>
            <Select
              value={formProps.values.status}
              name="status"
              onChange={e => {
                formProps.handleChange(e)
                formProps.handleSubmit()
              }}
            >
              <MenuItem value="none">none</MenuItem>
              <MenuItem value="invoice">invoice</MenuItem>
              <MenuItem value="paid">paid</MenuItem>
            </Select>
          </React.Fragment>
        )
      }}
    />
  )
}
