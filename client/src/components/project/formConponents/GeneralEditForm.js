import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from '../../../libs/forms/renderTextField'
const GeneralEditForm = props => {
  const { handleChange } = props
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
      />

      <Field
        component={renderTextField}
        name="invoiceDate"
        label="Invoice Date"
        onChange={handleChange}
      />
    </Fragment>
  )
}

const mapSateToProps = (_, { project }) => ({
  initialValues: {
    name: project && project.get('name'),
    invoiceNumber: project && project.get('invoiceNumber'),
    invoiceDate: project && project.get('invoiceDate')
  }
})

export default connect(mapSateToProps)(
  reduxForm({
    form: 'generalInfo'
  })(GeneralEditForm)
)
