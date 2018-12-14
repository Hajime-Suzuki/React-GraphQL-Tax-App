import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Field, FieldArray } from 'redux-form'
import { renderStateMenuItems } from '../../../libs/forms/renderStateMenuItem'
import { renderTextField } from '../../../libs/forms/renderTextField'
import { RenderExpenseAndIncome } from 'src/libs/forms/renderExpense'
import { renderDropdown } from 'src/libs/forms/renderDropdown'

const InvoiceForm = props => {
  const { handleChange } = props
  return (
    <React.Fragment>
      <Typography>Invoice Info</Typography>
      <Field
        component={renderTextField}
        name="invoiceNumber"
        label="Invoice Number"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="invoiceDate"
        label="Invoice Date"
        onChange={handleChange}
      />

      <FieldArray name="incomes" component={RenderExpenseAndIncome} />

      <Field
        component={renderTextField}
        name="name"
        label="Name"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="date"
        label="Project Date"
        onChange={handleChange}
      />

      <Field
        component={renderDropdown}
        name="status"
        label="Status"
        onChange={handleChange}
      >
        {renderStateMenuItems()}
      </Field>

      <Field
        component={renderTextField}
        name="streetAddress"
        label="Street Address"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="city"
        label="City"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="link"
        label="Link"
        onChange={handleChange}
      />
    </React.Fragment>
  )
}

export default InvoiceForm
