import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn } from 'react-apollo'
import { withRouter } from 'react-router'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  DeleteProject,
  ProjectInput,
  UpdateBasicInfo
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { theme } from 'src/styles/theme'
import styled from 'styled-components'
import { StyledForm } from '../../AddProjectForm'
import { addProjectValidationSchema } from '../../helper/addProjectValidationSchema'
import { GenerateFieldSettings } from '../../helper/genrateFieldSettings'
import { SingleProjectChildProps } from '../../SingleProjectContainer'
import EditFormModal from '../modal/EditFormModal'
import { renderDatePicker } from '../renderFields/renderDatePicker'
import { renderFields } from '../renderFields/renderFields'

interface Props {
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
  basic: ProjectInput & { id: string }
  client?: ProjectInput['client']
}

const CustomStyledForm: any = styled(StyledForm)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .title {
    margin-top: 2em;
  }
`

class EditBasicInfoFormAndClient extends React.Component<
  Props & IRouterComponentProps
> {
  state = {
    confirmDialogOpen: false
  }

  openDeleteDialog = () => {
    this.setState({ confirmDialogOpen: true })
  }

  closeDeleteDialog = () => {
    this.setState({ confirmDialogOpen: false })
  }

  confirmDelete = (
    deleteProject: MutationFn<DeleteProject.Mutation, DeleteProject.Variables>
  ) => async () => {
    await deleteProject({
      variables: { projectId: this.props.match.params.id }
    })
    ProjectActions.removeProject(this.props.match.params.id)
    this.props.history.replace('/projects')
  }

  updateProject = (
    updateProject: MutationFn<
      UpdateBasicInfo.Mutation,
      UpdateBasicInfo.Variables
    >
  ) => async (values: ProjectInput) => {
    await updateProject({
      variables: { data: values, projectId: this.props.match.params.id }
    })
    this.props.handleCloseModal()
  }

  render() {
    const { selectedModal, handleCloseModal, basic, client } = this.props
    const { id: _, ...basicInfo } = basic
    return (
      <UpdateBasicInfo.Component>
        {(updateProject, { error: updateError, loading }) => {
          const initialValues = { ...basicInfo, client }
          return (
            <DeleteProject.Component>
              {(
                deleteProject,
                { error: deleteProjectError, loading: deleteProjectLoading }
              ) => {
                return (
                  <React.Fragment>
                    <Formik
                      initialValues={initialValues}
                      validateOnChange={false}
                      validationSchema={addProjectValidationSchema}
                      onSubmit={this.updateProject(updateProject)}
                      render={({
                        handleSubmit,
                        values,
                        errors,
                        setFieldValue
                      }: FormikProps<typeof initialValues>) => {
                        return (
                          <EditFormModal
                            title="Edit Info"
                            isOpen={selectedModal === 'basic'}
                            handleCloseModal={handleCloseModal}
                            handleConfirm={handleSubmit}
                            error={
                              updateError &&
                              'Something went wrong. Please try again later.'
                            }
                            loading={loading}
                          >
                            <CustomStyledForm>
                              <div className="form-section">
                                {GenerateFieldSettings.generalFields.map(
                                  (field, i) => {
                                    if (field.type === 'date') {
                                      return (
                                        <React.Fragment key={i}>
                                          {renderDatePicker({
                                            field,
                                            values,
                                            setFieldValue,
                                            error: errors[field.name]
                                          })}
                                        </React.Fragment>
                                      )
                                    }
                                    return (
                                      <React.Fragment key={i}>
                                        {renderFields(field)}
                                      </React.Fragment>
                                    )
                                  }
                                )}
                              </div>

                              <div className="form-section">
                                <Typography variant="h6" className="title">
                                  Client Info
                                </Typography>
                                {GenerateFieldSettings.clientFields.map(
                                  (field, i) => (
                                    <React.Fragment key={i}>
                                      {renderFields(field)}
                                    </React.Fragment>
                                  )
                                )}
                              </div>
                              <this.OpenDeleteDialogButton />
                            </CustomStyledForm>
                          </EditFormModal>
                        )
                      }}
                    />
                    <EditFormModal
                      handleCloseModal={this.closeDeleteDialog}
                      handleConfirm={this.confirmDelete(deleteProject)}
                      isOpen={this.state.confirmDialogOpen}
                      error={deleteProjectError && deleteProjectError.message}
                      loading={deleteProjectLoading}
                      maxWidth="xs"
                    >
                      <Typography variant="h6" style={{ textAlign: 'center' }}>
                        Delete this project?
                      </Typography>
                    </EditFormModal>
                  </React.Fragment>
                )
              }}
            </DeleteProject.Component>
          )
        }}
      </UpdateBasicInfo.Component>
    )
  }
  OpenDeleteDialogButton = () => {
    return (
      <div className="form-section">
        <Button
          onClick={this.openDeleteDialog}
          style={{
            background: theme.palette.error.main,
            color: 'white',
            marginTop: '2em'
          }}
          variant="contained"
        >
          Delete
        </Button>
      </div>
    )
  }
}

export default withRouter(EditBasicInfoFormAndClient)
