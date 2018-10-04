import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../../libs/forms/renderTextField'
import { renderDropdown } from '../../../libs/forms/renderDropdown'
import { renderStateMenuItems } from '../../../libs/forms/renderStateMenuItem'
import { format } from 'date-fns'
import { renderDatePicker } from '../../../libs/forms/renderDatePicker'
const GeneralEditForm = props => {
  const { handleChange, invoiceStatusFromForm } = props
  const isInvoiceSent = invoiceStatusFromForm !== 'none'

  return (
    <Fragment>
      <Field
        component={renderTextField}
        name="name"
        label="Invoice Name"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="invoiceNumber"
        label="Invoice Number"
        onChange={handleChange}
        disabled={isInvoiceSent}
      />

      <Field
        component={renderDatePicker}
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
        component={renderDatePicker}
        name="invoiceDate"
        label="Invoice Date"
        onChange={handleChange}
        disabled={isInvoiceSent}
      />
    </Fragment>
  )
}

const mapSateToProps = (_, { project }) => ({
  initialValues: {
    name: project && project.get('name'),
    invoiceNumber: project && project.get('invoiceNumber'),
    invoiceDate: project && project.get('invoiceDate'),
    status: project && project.get('status'),
    date: project && project.get('date'),
    test: '2018-09-09'
  }
})

export default connect(mapSateToProps)(
  reduxForm({
    form: 'generalInfo'
  })(GeneralEditForm)
)
