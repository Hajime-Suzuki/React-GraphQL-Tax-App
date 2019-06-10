import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { adopt } from 'react-adopt'
import { QueryResult } from 'react-apollo'
import { ClientAction } from 'src/graphql/actions/client'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  AddProjectComponent,
  AddProjectMutationFn,
  ProjectInput
} from 'src/graphql/components/projects'
import { projectValidationSchemas } from '../helper/validationSchemas'
import AddProjectForm from './AddProjectForm'
import { getSelectedClient } from './selector'
import { QGetClientsList } from 'src/graphql/@types/types'
import {
  GetClientsListQuery,
  GetClientsListComponent,
  GetClientsListQueryVariables,
  Client
} from 'src/graphql/components/clients'

export type AddProjectChildProps = {
  clients?: QGetClientsList
  mutationError?: string
  loading: boolean
  successMessage?: string | null
  selectedClient?: Client
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
              selectedClient={
                getSelectedClient({
                  clientsList: clients,
                  clientFormInput: formProps.values.client
                })
              }
              {...formProps}
            />
          )
        }}
      </AddProjectRPC>
    )
  }
}

const getClients = ({ render }: any) => (
  <GetClientsListComponent>{render}</GetClientsListComponent>
)

const addProject = ({ render }: any) => {
  return (
    <AddProjectComponent
      onCompleted={data => {
        if (!data.addProject) return null
        ProjectActions.addNewProjectToList(data)
        ProjectActions.sortProjectsByProjectDate('-1')
        const client = data.addProject.client
        if (client) ClientAction.addClient(client as any) // TODO: fix
      }}
    >
      {(mutation, result) => render({ mutation, result })}
    </AddProjectComponent>
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
  getClients: QueryResult<GetClientsListQuery, GetClientsListQueryVariables>
  addProject: {
    mutation: AddProjectMutationFn
    result: any // MutationResult<AddProject.Mutation>
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
