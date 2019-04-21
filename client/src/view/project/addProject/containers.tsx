import { Formik, FormikActions, FormikProps } from 'formik'
import React from 'react'
import { adopt } from 'react-adopt'
import { MutationFn, MutationResult, QueryResult } from 'react-apollo'
import { ClientAction } from 'src/graphql/actions/client'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import { projectValidationSchemas } from '../helper/validationSchemas'

export interface RenderProps {
  getClients: QueryResult<GetClientsList.Query, GetClientsList.Variables>
  addProject: {
    mutation: MutationFn<AddProject.Mutation, AddProject.Variables>
    result: MutationResult<AddProject.Mutation>
  }
  addProjectForm: FormikProps<ProjectInput>
}

const getClients = ({ render }: any) => {
  return <GetClientsList.Component>{render}</GetClientsList.Component>
}

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
