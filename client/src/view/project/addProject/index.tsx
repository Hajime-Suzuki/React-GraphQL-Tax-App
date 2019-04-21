import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { adopt } from 'react-adopt'
import { MutationFn, MutationResult, QueryResult } from 'react-apollo'
import { ClientAction } from 'src/graphql/actions/client'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import { projectValidationSchemas } from '../helper/validationSchemas'
import AddProjectForm from './AddProjectForm'
import { getSelectedClient } from './selector'

export type AddProjectChildProps = {
  clients?: GetClientsList.GetClientsByUser[] | null
  mutationError?: string
  loading: boolean
  successMessage?: string | null
  selectedClient?: GetClientsList.GetClientsByUser
} & FormikProps<ProjectInput>

export default class AddProjectContainer extends React.Component {
  render = () => {
    return (
      <AddProjectRPC>
        {({
          getClients: { data: cData },
          addProject: { result },
          addProjectForm: formProps
        }: RenderProps) => {
          const clients = cData && cData.getClientsByUser
          const {
            error: mutationError,
            loading: mutationLoading,
            data
          } = result

          return (
            <AddProjectForm
              clients={clients}
              mutationError={mutationError && 'something went wrong'}
              loading={mutationLoading}
              successMessage={
                data && data.addProject && data.addProject.message
              }
              selectedClient={getSelectedClient({
                clientsList: clients,
                clientFormInput: formProps.values.client
              })}
              {...formProps}
            />
          )
        }}
      </AddProjectRPC>
    )
  }
}

const getClients = ({ render }: any) => (
  <GetClientsList.Component>{render}</GetClientsList.Component>
)

const addProject = ({ render }: any) => {
  return (
    <AddProject.Component
      onCompleted={data => {
        if (!data.addProject) return null
        ProjectActions.addNewProjectToList(data)
        ProjectActions.sortProjectsByProjectDate('-1')
        const client = data.addProject.client
        if (client) ClientAction.addClient(client)
      }}
    >
      {(mutation, result) => render({ mutation, result })}
    </AddProject.Component>
  )
}

const addProjectForm = ({
  addProject: { mutation },
  render
}: RenderProps & { render: any }) => (
  <Formik
    onSubmit={async (
      values: ProjectInput,
      { resetForm }: FormikActions<ProjectInput>
    ) => {
      await mutation!({
        variables: {
          data: values
        }
      })
      resetForm()
    }}
    validateOnChange={false}
    validateOnBlur={false}
    initialValues={addProjectInitialValues}
    validationSchema={projectValidationSchemas.addProjectValidationSchema}
    render={render}
  />
)

interface RenderProps {
  getClients: QueryResult<GetClientsList.Query, GetClientsList.Variables>
  addProject: {
    mutation: MutationFn<AddProject.Mutation, AddProject.Variables>
    result: MutationResult<AddProject.Mutation>
  }
  addProjectForm: FormikProps<ProjectInput>
}

const AddProjectRPC = adopt<RenderProps, any>({
  getClients,
  addProject,
  addProjectForm
})

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
