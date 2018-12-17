import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { AddProject, AddProjectInput } from 'src/graphql/components/projects'
import InvoiceInfoForm from './formConponents/invoiceForm/InvoiceInfoForm'

export const addProjectInitialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  name: '',
  projectDate: '',
  incomes: [
    {
      name: '',
      price: 0,
      quantity: 0,
      taxRate: 21
    }
  ],
  expenses: [],
  client: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    address: ''
  }
}

class AddProjectContainer extends React.PureComponent<AddProject.Props<{}>> {
  handleSubmit = async (
    values: AddProjectInput,
    formikActions: FormikActions<AddProjectInput>
  ) => {
    const { mutate: addProject } = this.props
    await addProject!({
      variables: {
        data: values
      }
    })

    formikActions.resetForm()
  }
  render = () => {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={addProjectInitialValues}
        // validationSchema={addProjectSchema}
        render={(formProps: FormikProps<AddProjectInput>) => {
          return <InvoiceInfoForm {...formProps} />
        }}
      />
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
