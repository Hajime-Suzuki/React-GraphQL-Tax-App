import { FormikProps, withFormik, Formik } from 'formik'
import * as React from 'react'
import InvoiceInfoForm from './formConponents/invoiceForm/InvoiceInfoForm'
import { AddProject } from 'src/graphql/components/projects'

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
  ],
  contactPerson: {
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  }
}

export type AddProjectInitialValues = typeof addProjectInitialValues

type Props = AddProject.Props<{}>

class AddProjectContainer extends React.PureComponent<Props> {
  handleSubmit = (values: AddProjectInitialValues) => {
    const { mutate: addProject } = this.props
    const { contactPerson, incomes, expenses, ...rest } = values
    // TODO: update
    addProject!({
      variables: {
        data: rest
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <Formik
          onSubmit={this.handleSubmit}
          initialValues={addProjectInitialValues}
          render={(props: FormikProps<AddProjectInitialValues>) => {
            const { values, handleChange } = props
            return (
              <InvoiceInfoForm values={values} handleChange={handleChange} />
            )
          }}
        />
      </React.Fragment>
    )
  }
}

// export default withFormik<AddProject.Props, AddProjectInitialValues>({
//   // validationSchema: addProjectSchema,
//   // validateOnBlur: false,
//   // validateOnChange: false,
//   mapPropsToValues: () => addProjectInitialValues,
//   handleSubmit: (values, props) => console.log(values)
// })(AddProject.HOC({})(AddProjectContainer))
export default AddProject.HOC({})(AddProjectContainer)
