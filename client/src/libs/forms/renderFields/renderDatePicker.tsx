import Typography from '@material-ui/core/Typography'
import { addYears, endOfYear, format } from 'date-fns'
import { FormikActions, FormikState } from 'formik'
import { DatePicker } from 'material-ui-pickers'
import React from 'react'
import { ProjectInput } from 'src/graphql/components/projects'

interface DatePickerProps {
  field: {
    name: string
    label: string
    type?: string
  }
  values: FormikState<ProjectInput>['values']
  setFieldValue: FormikActions<ProjectInput>['setFieldValue']
  error: string
}

const endOf5YearsLater = endOfYear(addYears(new Date(), 4))
export const renderDatePicker = ({
  field,
  values,
  error,
  setFieldValue
}: DatePickerProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <DatePicker
        label={field.name}
        name={field.name}
        value={values[field.name] || null}
        onChange={(date: string) => {
          setFieldValue(field.name, date)
        }}
        animateYearScrolling
        clearable
        format="dd/MM/yyyy"
        minDate="2016-01-01"
        maxDate={format(endOf5YearsLater, 'yyyy-MM-dd')}
        className="field-item"
      />
      {error && <Typography color="error">{error}</Typography>}
    </div>
  )
}
