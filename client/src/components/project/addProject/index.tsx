import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import { ValidationSchemas } from '../helper/validationSchemas'
import AddProjectForm from './AddProjectForm'
import { getSelectedClient } from './selector'

export type AddProjectChildProps = {
  clients?: GetClientsList.GetClientsByUser[] | null;
  mutationError?: string;
  loading: boolean;
  successMessage?: string | null;
  selectedClient?: GetClientsList.GetClientsByUser;
} & FormikProps<ProjectInput>

class AddProjectContainer extends React.Component<GetClientsList.Props<{}>> {
  render = () => {
    const { data } = this.props
    if (!data) return null

    const { getClientsByUser: clients } = data

    return (
      <AddProject.Component
        onCompleted={data => {
          ProjectActions.addNewProjectToList(data)
          ProjectActions.sortProjectsByProjectDate('-1')
          // TODO: update client list
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
              validationSchema={ValidationSchemas.addProjectValidationSchema}
              render={(formProps: FormikProps<ProjectInput>) => (
                <AddProjectForm
                  clients={clients}
                  mutationError={mutationError && 'something went wrong'}
                  loading={loading}
                  successMessage={
                    data && data.addProject && data.addProject.message
                  }
                  selectedClient={getSelectedClient({
                    clientsList: clients,
                    clientFormInput: formProps.values.client
                  })}
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

export const addProjectInitialValues = {
  invoiceNumber: '',
  invoiceDate: '',
  name: '',
  projectDate: '',
  incomes: [],
  expenses: [],
  client: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    streetAddress: '',
    city: ''
  }
}

export default GetClientsList.HOC({})(AddProjectContainer)
