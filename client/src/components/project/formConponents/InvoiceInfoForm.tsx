import * as React from 'react'
import { Field, FieldArray, ArrayHelpers } from 'formik'
import { renderFormikTextField } from 'src/libs/forms/renderTextField'
import Grid from '@material-ui/core/Grid'
import { FormProps } from '../AddProjectContainer'

interface Props {
  incomes: FormProps['incomes']
}
class InvoiceInfoForm extends React.PureComponent<Props> {
  render() {
    const { incomes } = this.props
    return (
      <React.Fragment>
        <Grid item>
          <Field
            name="invoiceNumber"
            label="Invoice Number"
            component={renderFormikTextField}
          />
        </Grid>
        <Grid item>
          <Field
            name="invoiceDate"
            label="Invoice Date"
            component={renderFormikTextField}
          />
        </Grid>
        <FieldArray
          name="incomes"
          render={(arrayHelpers: ArrayHelpers) => {
            return (
              <React.Fragment>
                <Field
                  name={`incomes.0`}
                  label="Name"
                  component={renderFormikTextField}
                />
                {/* {incomes.map((income, i) => {
                  return (
                    <Field
                      name={`${income}.name`}
                      label="Name"
                      component={renderFormikTextField}
                    />
                  )
                })} */}
              </React.Fragment>
            )
          }}
        />
        <Grid item>
          <Field name="name" label="Name" component={renderFormikTextField} />
        </Grid>
      </React.Fragment>
    )
  }
}

export default InvoiceInfoForm
