import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../../libs/forms/renderTextField'
import { renderDropdown } from '../../../libs/forms/renderDropdown'
import { renderStateMenuItems } from '../../../libs/forms/renderStateMenuItem'
const GeneralEditForm = props => {
  const { handleChange, project } = props
  const isInvoiceSent = project.get('status') !== 'none'

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
    date: project && project.get('date')
  }
})

export default connect(mapSateToProps)(
  reduxForm({
    form: 'generalInfo'
  })(GeneralEditForm)
)
