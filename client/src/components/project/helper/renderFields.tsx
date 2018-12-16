import * as React from 'react'
import { Field } from 'formik'
import { renderFormikTextField } from 'src/libs/forms/renderTextField'

interface Field {
  name: string
  label?: string
  type?: string
}

export const renderFields = (field: Field) => {
  return (
    <Field
      name={field.name}
      label={field.label}
      component={renderFormikTextField}
      className="field-item"
    />
  )
}
