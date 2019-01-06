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
import { renderDatePicker } from 'src/libs/forms/renderFields/renderDatePicker'
import { renderStatusField } from 'src/libs/forms/renderFields/renderDropdown'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { IRouterComponentProps } from 'src/routes/types'
import { Styles } from 'src/styles/sharedStyles'
import styled from 'styled-components'
import { SingleProjectChildProps } from '../..'
import EditFormModal from '../../../../../libs/forms/EditFormModal'
import { addProjectValidationSchema } from '../../../helper/addProjectValidationSchema'
import { GenerateFieldSettings } from '../../../helper/genrateFieldSettings'

interface Props {
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
  basic: ProjectInput & { id: string }
}

const CustomStyledForm: any = styled(Styles.Form)`
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
    console.log('deleted')
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
    const { selectedModal, handleCloseModal, basic } = this.props
    const { id: _, ...basicInfo } = basic
    return (
      <UpdateBasicInfo.Component>
        {(updateProject, { error: updateError, loading }) => {
          const initialValues = { ...basicInfo }
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
                        setFieldValue,
                        handleChange
                      }: FormikProps<typeof initialValues>) => {
                        return (
                          <EditFormModal
                            title="Edit Info"
                            maxWidth="md"
                            isOpen={selectedModal === 'basic'}
                            handleCloseModal={handleCloseModal}
                            handleConfirm={handleSubmit}
                            handleDeleteDialogOpen={this.openDeleteDialog}
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
                                {renderStatusField({
                                  value: values.status || '',
                                  name: 'status',
                                  id: 'status',
                                  onChange: handleChange
                                })}
                              </div>
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
}

export default withRouter(EditBasicInfoFormAndClient)
