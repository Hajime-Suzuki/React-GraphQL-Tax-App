import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { Field } from 'redux-form'
import { renderTextField } from '../../../libs/forms/renderTextField'

const ContactPersonForm = props => {
  const { handleChange } = props
  return (
    <Fragment>
      <Typography>Contact Person</Typography>
      <Field
        component={renderTextField}
        name="contactPerson.firstName"
        label="First Name"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="contactPerson.lastName"
        label="Last Name"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="contactPerson.email"
        label="Email"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="contactPerson.phone"
        label="Phone"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="contactPerson.link"
        label="Link"
        onChange={handleChange}
      />
    </Fragment>
  )
}

export default ContactPersonForm
