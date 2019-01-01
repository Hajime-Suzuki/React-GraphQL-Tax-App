import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import AddProjectForm from './AddProjectForm'
import { addProjectValidationSchema } from './helper/addProjectValidationSchema'
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
    streetAddress: '',
    city: ''
  }
}

class AddProjectContainer extends React.PureComponent {
  render = () => {
    return (
      <AddProject.Component
        onCompleted={data => {
          ProjectActions.addNewProjectToList(data)
          ProjectActions.sortProjectsByProjectDate('-1')
        }}
      >
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
              validationSchema={addProjectValidationSchema}
              render={(formProps: FormikProps<ProjectInput>) => (
                <AddProjectForm
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
