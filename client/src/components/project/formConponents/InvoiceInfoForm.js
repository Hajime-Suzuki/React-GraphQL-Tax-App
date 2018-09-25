import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { Field, FieldArray } from 'redux-form'
import { renderDropdown } from '../../../libs/forms/renderDropdown'
import { renderExpenseAndIncome } from '../../../libs/forms/renderExpense'
import { renderTextField } from '../../../libs/forms/renderTextField'

const InvoiceForm = props => {
  const { handleChange } = props
  return (
    <Fragment>
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

      <FieldArray name="incomes" component={renderExpenseAndIncome} />

      <Field
        component={renderTextField}
        name="name"
        label="Name"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="rowPrice"
        label="Price"
        onChange={handleChange}
      />
      <Field
        component={renderDropdown}
        name="taxRate"
        label="Rate"
        onChange={handleChange}
      >
        <MenuItem value="0">0%</MenuItem>
        <MenuItem value="6">6%</MenuItem>
        <MenuItem value="21">21%</MenuItem>
      </Field>
      <Field
        component={renderTextField}
        name="date"
        label="Date"
        onChange={handleChange}
      />
      <Field
        component={renderDropdown}
        name="status"
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value="none">None</MenuItem>
        <MenuItem value="invoice">Invoice Sent</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
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
    </Fragment>
  )
}

export default InvoiceForm
