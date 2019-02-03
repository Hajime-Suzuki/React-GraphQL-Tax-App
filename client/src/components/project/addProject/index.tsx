import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import { AddProject, ProjectInput } from 'src/graphql/components/projects'
import { projectValidationSchemas } from '../helper/validationSchemas'
import AddProjectForm from './AddProjectForm'
import { getSelectedClient } from './selector'
import { ClientAction } from 'src/graphql/actions/client'
import { adopt } from 'react-adopt'
import { AddProjectRPC, RenderProps } from './containers'
import Typography from '@material-ui/core/Typography'

export type AddProjectChildProps = {
  clients?: GetClientsList.GetClientsByUser[] | null
  mutationError?: string
  loading: boolean
  successMessage?: string | null
  selectedClient?: GetClientsList.GetClientsByUser
} & FormikProps<ProjectInput>

// const Composed = adopt<{ container: RenderProps }, {}>({
//   container: <AddProjectRPC />
// })

class AddProjectContainer extends React.Component<GetClientsList.Props<{}>> {
  render = () => {
    const { data } = this.props
    if (!data) return null

    const { getClientsByUser: clients } = data

    return (
      <AddProjectRPC>
        {({ addProjectForm }: RenderProps) => {
          console.log(addProjectForm.values)
          return <div>test</div>
          // return (
          //   <Formik
          //     onSubmit={async (
          //       values: ProjectInput,
          //       { resetForm }: FormikActions<ProjectInput>
          //     ) => {
          //       await addProject!({
          //         variables: {
          //           data: values
          //         }
          //       })
          //       resetForm()
          //     }}
          //     validateOnChange={false}
          //     validateOnBlur={false}
          //     initialValues={addProjectInitialValues}
          //     validationSchema={
          //       projectValidationSchemas.addProjectValidationSchema
          //     }
          //     render={(formProps: FormikProps<ProjectInput>) => (
          //       <AddProjectForm
          //         clients={clients}
          //         mutationError={mutationError && 'something went wrong'}
          //         loading={loading}
          //         successMessage={
          //           data && data.addProject && data.addProject.message
          //         }
          //         selectedClient={getSelectedClient({
          //           clientsList: clients,
          //           clientFormInput: formProps.values.client
          //         })}
          //         {...formProps}
          //       />
          //     )}
          //   />
          // )
        }}
      </AddProjectRPC>
    )
    //   {(addProject, { data, error: mutationError, loading }) => {
    //     return (
    //       <Formik
    //         onSubmit={async (
    //           values: ProjectInput,
    //           { resetForm }: FormikActions<ProjectInput>
    //         ) => {
    //           await addProject!({
    //             variables: {
    //               data: values
    //             }
    //           })
    //           resetForm()
    //         }}
    //         validateOnChange={false}
    //         validateOnBlur={false}
    //         initialValues={addProjectInitialValues}
    //         validationSchema={
    //           projectValidationSchemas.addProjectValidationSchema
    //         }
    //         render={(formProps: FormikProps<ProjectInput>) => (
    //           <AddProjectForm
    //             clients={clients}
    //             mutationError={mutationError && 'something went wrong'}
    //             loading={loading}
    //             successMessage={
    //               data && data.addProject && data.addProject.message
    //             }
    //             selectedClient={getSelectedClient({
    //               clientsList: clients,
    //               clientFormInput: formProps.values.client
    //             })}
    //             {...formProps}
    //           />
    //         )}
    //       />
    //     )
    //   }}
    // }
  }
}

// export const addProjectInitialValues = {
//   invoiceNumber: '',
//   invoiceDate: '',
//   name: '',
//   projectDate: '',
//   incomes: [],
//   expenses: [],
//   client: {
//     id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     postalCode: '',
//     streetAddress: '',
//     city: ''
//   }
// }

export default GetClientsList.HOC({})(AddProjectContainer)
