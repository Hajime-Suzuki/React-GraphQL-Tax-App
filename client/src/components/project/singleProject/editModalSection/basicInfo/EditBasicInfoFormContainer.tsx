import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn } from 'react-apollo'
import { Omit, withRouter } from 'react-router'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import {
  DeleteProject,
  GetSingleProject,
  ProjectInput,
  UpdateBasicInfo
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'

import DeleteProjectModal from './DeleteProjectModal'
import EditBasicInfoForm from './EditBasicInfoForm'
import { ApolloError } from 'apollo-client'
import { SingleProjectChildProps } from '../..';

type BasicInfo = Omit<ProjectInput, 'client'>
interface OwnProps {
  selectedModal?: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
  basic: BasicInfo & { id: string }
}

export type EditBasicInfoChildProps = {
  updateError?: ApolloError;
  loading: boolean;
  values: ProjectInput;
  openDeleteDialog: any;
} & Pick<OwnProps, 'selectedModal' | 'handleCloseModal'> &
  BasicInfo &
  FormikProps<ProjectInput>

export interface DeleteProjectModalProps {
  closeDeleteDialog: any
  confirmDelete: any
  isConfirmDialogOpen: any
}

class EditBasicInfoFormContainer extends React.Component<
  GetClientsList.Props<OwnProps & IRouterComponentProps>
> {
  state = { isConfirmDialogOpen: false }

  openDeleteDialog = () => this.setState({ isConfirmDialogOpen: true })

  closeDeleteDialog = () => this.setState({ isConfirmDialogOpen: false })

  confirmDelete = (
    deleteProject: MutationFn<DeleteProject.Mutation, DeleteProject.Variables>
  ) => async () => {
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

  updateProject = (
    updateProject: MutationFn<
      UpdateBasicInfo.Mutation,
      UpdateBasicInfo.Variables
    >
  ) => async (values: ProjectInput) => {
    console.log(values)
    // await updateProject({
    //   variables: {
    //     data: values,
    //     projectId: this.props.match.params.id,
    //     clientId: values.client && values.client.id
    //   }
    // })
    this.props.handleCloseModal()
  }

  render() {
    const { basic } = this.props
    const { id: _, ...basicInfo } = basic

    return (
      <UpdateBasicInfo.Component
        refetchQueries={[
          {
            query: GetSingleProject.Document,
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
                // validationSchema={addProjectValidationSchema}
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
      </UpdateBasicInfo.Component>
    )
  }
}

export default withRouter(
  GetClientsList.HOC<OwnProps & IRouterComponentProps>({})(
    EditBasicInfoFormContainer
  )
)
