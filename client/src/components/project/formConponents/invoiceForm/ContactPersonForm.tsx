import { Field } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from '../../../../libs/forms/renderTextField'

class ContactPersonForm extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Field
          name="contactPerson.name"
          label="Name"
          component={renderFormikTextField}
        />
        <Field
          name="contactPerson.email"
          label="Email"
          component={renderFormikTextField}
        />
        <Field
          name="contactPerson.address"
          label="Address"
          component={renderFormikTextField}
        />
        <Field
          name="contactPerson.phone"
          label="Phone"
          component={renderFormikTextField}
        />
      </React.Fragment>
    )
  }
}

export default ContactPersonForm
