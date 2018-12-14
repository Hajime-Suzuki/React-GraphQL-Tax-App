import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { Field, FieldProps, Formik, FormikProps } from 'formik'
import * as React from 'react'

interface Test {
  color: string
  status: number
  some: number
}

export const StatusDropdown: React.SFC = () => {
  return (
    <Formik
      onSubmit={(values: Test) => console.log(values)}
      initialValues={{ color: 'red', status: 10, some: 10 }}
      render={(formProps: FormikProps<Test>) => {
        return (
          <div>
            <Field
              name="some"
              onChange={formProps.handleSubmit}
              render={(props: FieldProps<Test['status']>) => (
                <Select
                  value={props.field.value}
                  name="some"
                  onChange={e => {
                    formProps.handleChange(e)
                  }}
                >
                  <MenuItem value={10}>AAA</MenuItem>
                  <MenuItem value={20}>BBB</MenuItem>
                  <MenuItem value={30}>CCC</MenuItem>
                </Select>
              )}
            />

            <Select
              value={formProps.values.status}
              name="status"
              onChange={e => {
                formProps.handleChange(e)
                formProps.handleSubmit()
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>

            <Field component="select" name="color">
              <option value="red">Red</option>
              <option value="pink">Pink</option>
              <option value="green">Green</option>
            </Field>
          </div>
        )
      }}
    />
  )
}
