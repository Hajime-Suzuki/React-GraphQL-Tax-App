import Typography from '@material-ui/core/Typography'
import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn } from 'react-apollo'
import { withRouter } from 'react-router'
import SelectClient from 'src/components/project/addProject/components/SelectClient'
import SelectedClientCard from 'src/components/project/addProject/components/SelectedClientCard'
import { getSelectedClient } from 'src/components/project/addProject/selector'
import { ProjectActions } from 'src/graphql/actions/projects'
import { GetClientsList } from 'src/graphql/components/clients'
import {
  DeleteProject,
  GetSingleProject,
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
import { GenerateFieldSettings } from '../../../helper/genrateFieldSettings'

interface OwnProps {
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
  basic: ProjectInput & { id: string }
  client?: GetSingleProject.Client | null
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
type Props = OwnProps & IRouterComponentProps
class EditBasicInfoFormAndClient extends React.Component<
  GetClientsList.Props<Props>
> {
  state = { confirmDialogOpen: false }
  unselectClient = (
    setFieldValue: FormikActions<ProjectInput>['setFieldValue']
  ) => () => setFieldValue('client.id', null)

  openDeleteDialog = () => this.setState({ confirmDialogOpen: true })

  closeDeleteDialog = () => this.setState({ confirmDialogOpen: false })

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
    const { selectedModal, handleCloseModal, basic, client } = this.props
    const { id: _, ...basicInfo } = basic
    const { data } = this.props
    const clients = data && data.getClientsByUser
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
                      // validationSchema={addProjectValidationSchema}
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
                              {clients && (
                                <SelectClient
                                  clients={clients}
                                  setFieldValue={setFieldValue}
                                />
                              )}

                              <SelectedClientCard
                                unselectClient={this.unselectClient(
                                  setFieldValue
                                )}
                                selectedClient={getSelectedClient({
                                  clientsList: clients,
                                  clientFormInput: values.client
                                })}
                              />
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

export default withRouter(
  GetClientsList.HOC<Props>({})(EditBasicInfoFormAndClient)
)
