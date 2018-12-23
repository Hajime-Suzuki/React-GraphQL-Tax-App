import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { Field } from 'redux-form'
import { renderTextField } from '../../../libs/forms/renderTextField'

const ClientForm = props => {
  const { handleChange } = props
  return (
    <React.Fragment>
      <Typography>Contact Person</Typography>
      <Field
        component={renderTextField}
        name="client.firstName"
        label="First Name"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="client.lastName"
        label="Last Name"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="client.email"
        label="Email"
        onChange={handleChange}
      />
      <Field
        component={renderTextField}
        name="client.phone"
        label="Phone"
        onChange={handleChange}
      />

      <Field
        component={renderTextField}
        name="client.link"
        label="Link"
        onChange={handleChange}
      />
    </React.Fragment>
  )
}

export default ClientForm
