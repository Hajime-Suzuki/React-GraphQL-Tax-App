import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { AddProject } from 'src/graphql/components/projects'
import InvoiceInfoForm from './formConponents/invoiceForm/InvoiceInfoForm'
import { addProjectSchema } from './helper/addProjectValidationSchema'

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
  expenses: [],
  contactPerson: {
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  }
}

export type AddProjectInitialValues = typeof addProjectInitialValues & {
  expenses: typeof addProjectInitialValues['incomes']
}

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
  render = () => {
    return (
      <Formik
        onSubmit={this.handleSubmit}
        initialValues={addProjectInitialValues}
        validationSchema={addProjectSchema}
        render={(formProps: FormikProps<AddProjectInitialValues>) => {
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
