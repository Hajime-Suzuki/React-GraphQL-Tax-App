import Button from '@material-ui/core/Button'
import React, { Fragment } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { renderTextField } from '../../libs/forms/renderTextField'
import { StyledGridFormItem } from '../../styles/forms'
import { renderDropdown } from '../../libs/forms/renderDropdown'
import { renderExpense } from '../../libs/forms/renderExpense'
import { MainWrapper } from '../../styles/sharedStyles'
import MenuItem from '@material-ui/core/MenuItem'

const AddProjectForm = props => {
  const { handleSubmit, handleChange } = props
  return (
    <form onSubmit={handleSubmit}>
      <StyledGridFormItem container justify="center">
        <Field
          component={renderTextField}
          name="invoiceNum"
          label="Invoice Number"
          onChange={handleChange}
        />

        <Field
          component={renderTextField}
          name="invoiceDate"
          label="Invoice Date"
          onChange={handleChange}
        />

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
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Invoice">Invoice Sent</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
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

        <FieldArray name="members" component={renderExpense} />
      </StyledGridFormItem>
      <MainWrapper>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </MainWrapper>
    </form>
  )
}

export default reduxForm({ form: 'addProjectForm' })(AddProjectForm)
