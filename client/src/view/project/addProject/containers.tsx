import { Formik, FormikActions, FormikProps } from 'formik'
import React from 'react'
import { adopt } from 'react-adopt'
import { QueryResult } from 'react-apollo'
import { ClientAction } from 'src/graphql/actions/client'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  GetClientsListComponent,
  GetClientsListQuery,
  GetClientsListQueryVariables
} from 'src/graphql/components/clients'
import {
  AddProjectComponent,
  AddProjectMutationFn,
  ProjectInput
} from 'src/graphql/components/projects'
import { projectValidationSchemas } from '../helper/validationSchemas'

export interface RenderProps {
  getClients: QueryResult<GetClientsListQuery, GetClientsListQueryVariables>
  addProject: {
    mutation: AddProjectMutationFn
    result: any // MutationResult<AddProject.Mutation>
  }
  addProjectForm: FormikProps<ProjectInput>
}

const getClients = ({ render }: any) => {
  return <GetClientsListComponent>{render}</GetClientsListComponent>
}

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
}: RenderProps & { render: any }) => {
  return (
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
}

export const AddProjectRPC = adopt<RenderProps, any>({
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
