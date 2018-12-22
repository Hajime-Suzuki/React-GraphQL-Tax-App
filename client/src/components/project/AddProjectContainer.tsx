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
    // console.log({ props: this.props })
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={addProjectInitialValues}
        // validationSchema={addProjectSchema}
        render={(formProps: FormikProps<AddProjectInput>) => {
          console.log({ formProps })
          return <InvoiceInfoForm {...formProps} />
        }}
      />
    )
  }
}

export default AddProject.HOC({})(AddProjectContainer)
