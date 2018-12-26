import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import InvoiceInfoForm from './formComponents/InvoiceInfoForm'
import { addProjectSchema } from './helper/addProjectValidationSchema'
import { ProjectActions } from 'src/graphql/actions/projects'

export const addProjectInitialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  name: '',
  projectDate: '',
  incomes: [],
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
      <AddProject.Component onCompleted={ProjectActions.addNewProjectToList}>
        {(addProject, { data, error: mutationError, loading }) => {
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
              validateOnBlur={false}
              initialValues={addProjectInitialValues}
              validationSchema={addProjectSchema}
              render={(formProps: FormikProps<ProjectInput>) => (
                <InvoiceInfoForm
                  mutationError={mutationError && 'something went wrong'}
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
