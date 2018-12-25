import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { withRouter } from 'react-router'
import { UpdateBasicInfo, ProjectInput } from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import styled from 'styled-components'
import { SingleProjectChildProps } from '../../SingleProjectContainer'
import { StyledForm } from '../InvoiceInfoForm'
import Typography from '@material-ui/core/Typography'
import { GenerateFieldSettings } from '../../helper/genrateFieldSettings'
import { renderFields } from '../renderFields/renderFields'
import EditFormModal from '../modal/EditFormModal'

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
  render() {
    const {
      selectedModal,
      handleCloseModal,
      match: {
        params: { id }
      },
      basic,
      client
    } = this.props
    const { id: _, ...basicInfo } = basic
    return (
      <UpdateBasicInfo.Component>
        {(updateProject, { error, loading }) => {
          const initialValues = { ...basicInfo, client }

          return (
            <Formik
              initialValues={initialValues}
              validateOnChange={false}
              onSubmit={async (values: typeof initialValues) => {
                await updateProject({
                  variables: { data: values, projectId: id }
                })
                handleCloseModal()
              }}
              render={({ handleSubmit }: FormikProps<typeof initialValues>) => {
                return (
                  <EditFormModal
                    title="Edit Info"
                    isOpen={selectedModal === 'basic'}
                    handleCloseModal={handleCloseModal}
                    handleConfirm={handleSubmit}
                    error={
                      error && 'Something went wrong. Please try again later.'
                    }
                    loading={loading}
                  >
                    <CustomStyledForm>
                      <div className="form-section">
                        {GenerateFieldSettings.generalFields.map((field, i) => (
                          <React.Fragment key={i}>
                            {renderFields(field)}
                          </React.Fragment>
                        ))}
                      </div>

                      <div className="form-section">
                        <Typography variant="h6" className="title">
                          Client Info
                        </Typography>
                        {GenerateFieldSettings.clientFields.map((field, i) => (
                          <React.Fragment key={i}>
                            {renderFields(field)}
                          </React.Fragment>
                        ))}
                      </div>
                    </CustomStyledForm>
                  </EditFormModal>
                )
              }}
            />
          )
        }}
      </UpdateBasicInfo.Component>
    )
  }
}

export default withRouter(EditBasicInfoFormAndClient)
