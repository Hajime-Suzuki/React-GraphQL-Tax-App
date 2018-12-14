import Grid from '@material-ui/core/Grid'
import { Field, Form, Formik, FormikProps } from 'formik'
import * as React from 'react'
import { StyledGridFormItem } from 'src/styles/forms'
import Button from '@material-ui/core/Button'
import InvoiceInfoForm from './formConponents/InvoiceInfoForm'

export interface FormProps {
  invoiceNumber: string
  invoiceDate: string
  incomes: {
    name: string
    price: number
  }[]
  name: string
  projectDate: string
}

const initialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  incomes: [],
  name: '',
  projectDate: ''
}

class AddProjectContainer extends React.PureComponent {
  render() {
    return (
      <Formik
        onSubmit={values => console.log(values)}
        initialValues={initialValues}
      >
        {({ values }: FormikProps<FormProps>) => {
          return (
            <Form>
              <StyledGridFormItem
                container
                justify="center"
                spacing={40}
                style={{ marginTop: 100 }}
              >
                <InvoiceInfoForm incomes={values.incomes} />
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </StyledGridFormItem>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

export default AddProjectContainer
