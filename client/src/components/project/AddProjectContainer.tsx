import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import InvoiceInfoForm from './formConponents/InvoiceInfoForm'
import { addProjectSchema } from './helper/addProjectValidationSchema'

export const addProjectInitialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  name: '',
  projectDate: '',
  incomes: [
    {
      name: '',
      price: '0',
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

class AddProjectContainer extends React.PureComponent {
  render = () => {
    return (
      <AddProject.Component>
        {(addProject, { data, error, loading }) => {
          return (
            <Formik
              onSubmit={async (
                values: ProjectInput,
                { resetForm }: FormikActions<ProjectInput>
              ) => {
                await addProject!({
                  variables: {
                    data: values
                  }
                })
                resetForm()
              }}
              validateOnChange={false}
              initialValues={addProjectInitialValues}
              validationSchema={addProjectSchema}
              render={(formProps: FormikProps<ProjectInput>) => (
                <InvoiceInfoForm
                  error={error && 'something went wrong'}
                  loading={loading}
                  successMessage={
                    data && data.addProject && data.addProject.message
                  }
                  {...formProps}
                />
              )}
            />
          )
        }}
      </AddProject.Component>
    )
  }
}

export default AddProjectContainer
