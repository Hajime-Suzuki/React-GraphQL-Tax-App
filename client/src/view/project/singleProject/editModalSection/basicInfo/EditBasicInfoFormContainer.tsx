import { ApolloError } from 'apollo-client'
import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { Omit, withRouter } from 'react-router'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  GetClientsListProps,
  withGetClientsList
} from 'src/graphql/components/clients'
import {
  DeleteProjectMutationFn,
  GetSingleProjectDocument,
  ProjectInput,
  UpdateBasicInfoComponent,
  UpdateBasicInfoMutationFn
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { projectValidationSchemas } from 'src/view/project/helper/validationSchemas'
import { SingleProjectChildProps } from '../..'
import DeleteProjectModal from './DeleteProjectModal'
import EditBasicInfoForm from './EditBasicInfoForm'

type BasicInfo = Omit<ProjectInput, 'client'>
interface OwnProps {
  selectedModal?: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
  basic: BasicInfo & { id: string }
}

export type EditBasicInfoChildProps = {
  updateError?: ApolloError
  loading: boolean
  values: ProjectInput
  openDeleteDialog: any
} & Pick<OwnProps, 'selectedModal' | 'handleCloseModal'> &
  BasicInfo &
  FormikProps<ProjectInput>

export interface DeleteProjectModalProps {
  closeDeleteDialog: any
  confirmDelete: any
  isConfirmDialogOpen: any
}

class EditBasicInfoFormContainer extends React.Component<
  GetClientsListProps<OwnProps & IRouterComponentProps>
> {
  state = { isConfirmDialogOpen: false }

  openDeleteDialog = () => this.setState({ isConfirmDialogOpen: true })

  closeDeleteDialog = () => this.setState({ isConfirmDialogOpen: false })

  confirmDelete = (deleteProject: DeleteProjectMutationFn) => async () => {
    await deleteProject({
      variables: { projectId: this.props.match.params.id }
    })
    console.log('deleted')
    ProjectActions.removeProject(this.props.match.params.id)
    this.props.history.replace('/projects')
  }

  unselectClient = (
    setFieldValue: FormikActions<ProjectInput>['setFieldValue']
  ) => () => setFieldValue('client.id', null)

  updateProject = (updateProject: UpdateBasicInfoMutationFn) => async (
    values: ProjectInput
  ) => {
    console.log(values)
    await updateProject({
      variables: {
        data: values,
        projectId: this.props.match.params.id
      }
    })
    this.props.handleCloseModal()
  }

  render() {
    const { basic } = this.props
    const { id: _, ...basicInfo } = basic

    return (
      <UpdateBasicInfoComponent
        refetchQueries={[
          {
            query: GetSingleProjectDocument,
            variables: { id: this.props.match.params.id }
          }
        ]}
      >
        {(updateProject, { error: updateError, loading }) => {
          return (
            <React.Fragment>
              <Formik
                initialValues={basicInfo}
                validateOnChange={false}
                validationSchema={
                  projectValidationSchemas.editBasicInfoValidationSchema
                }
                onSubmit={this.updateProject(updateProject)}
                render={(formProps: FormikProps<BasicInfo>) => {
                  return (
                    <React.Fragment>
                      <EditBasicInfoForm
                        openDeleteDialog={this.openDeleteDialog}
                        updateError={updateError}
                        loading={loading}
                        {...this.props}
                        {...formProps}
                      />
                      <DeleteProjectModal
                        closeDeleteDialog={this.closeDeleteDialog}
                        confirmDelete={this.confirmDelete}
                        isConfirmDialogOpen={this.state.isConfirmDialogOpen}
                      />
                    </React.Fragment>
                  )
                }}
              />
            </React.Fragment>
          )
        }}
      </UpdateBasicInfoComponent>
    )
  }
}

export default withRouter(
  withGetClientsList<OwnProps & IRouterComponentProps>({})(
    EditBasicInfoFormContainer
  )
)
