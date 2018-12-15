import Grid from '@material-ui/core/Grid'
import { Field, FormikHandlers, Form } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from 'src/libs/forms/renderTextField'
import { AddProjectInitialValues } from '../../AddProjectContainer'
import { IncomesField } from './IncomesField'
import Button from '@material-ui/core/Button'

interface Props {
  values: AddProjectInitialValues
  handleChange: FormikHandlers['handleChange']
}

const fields = [
  {
    name: 'invoiceNumber',
    label: 'Invoice Number'
  },
  {
    name: 'invoiceDate',
    label: 'Invoice Date'
  },
  {
    name: 'name',
    label: 'Name'
  }
]

class InvoiceInfoForm extends React.PureComponent<Props> {
  render() {
    const {
      values: { incomes, expenses },
      handleChange
    } = this.props
    return (
      <Form>
        <Grid
          container
          justify="center"
          spacing={40}
          style={{ marginTop: 100 }}
        >
          <Grid item xs={12}>
            <Grid container justify="center">
              {fields.map((field, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    style={{ textAlign: 'center' }}
                    key={i}
                  >
                    <Field
                      name={field.name}
                      label={field.label}
                      component={renderFormikTextField}
                    />
                  </Grid>
                )
              })}
            </Grid>
            <IncomesField incomes={incomes} handleChange={handleChange} />
            <IncomesField expenses={expenses} handleChange={handleChange} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    )
  }
}

export default InvoiceInfoForm
