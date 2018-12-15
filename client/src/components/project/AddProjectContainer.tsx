import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import InvoiceInfoForm from './formConponents/invoiceForm/InvoiceInfoForm'
import Typography from '@material-ui/core/Typography'

export const addProjectInitialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  name: '',
  projectDate: '',
  incomes: [
    {
      name: '',
      price: '',
      quantity: '',
      taxRate: 21
    }
  ],
  expenses: [
    {
      name: '',
      price: '',
      quantity: '',
      taxRate: 21
    }
  ]
}

export type AddProjectInitialValues = typeof addProjectInitialValues

class AddProjectContainer extends React.PureComponent<
  FormikProps<AddProjectInitialValues>
> {
  render() {
    const { values, handleChange } = this.props
    return <InvoiceInfoForm values={values} handleChange={handleChange} />
  }
}

export default withFormik<{}, AddProjectInitialValues, any>({
  mapPropsToValues: () => addProjectInitialValues,
  handleSubmit: values => console.log(values)
})(AddProjectContainer)
