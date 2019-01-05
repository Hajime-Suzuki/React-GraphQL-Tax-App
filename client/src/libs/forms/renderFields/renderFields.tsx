import * as React from 'react'
import { Field } from 'formik'
import { renderFormikTextField } from './renderTextField'

interface Field {
  name: string
  label?: string
  type?: string
  required?: boolean
}

// if arrow function is passed to component, input is interrupted character by character
export const renderFields = (field: Field) => {
  return (
    <Field
      name={field.name}
      label={field.label}
      component={renderFormikTextField}
      className="field-item"
      type={field.type || 'text'}
    />
  )
}
