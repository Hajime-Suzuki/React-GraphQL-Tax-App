import Grid from '@material-ui/core/Grid'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { withRouter } from 'react-router'
import { SingleClient as SC } from 'src/graphql/components/clients'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import EditFormModal from '../../libs/forms/EditFormModal'
import ClientCard from '../shared/ClientCard'
import { SingleClientChildProps } from './SingleClientContainer'

class SingleClient extends React.Component<SingleClientChildProps> {
  render() {
    const { handleOpenModal, client } = this.props

    return (
      <Grid container justify="center">
        <Grid item xs={11} md={5}>
          <ClientCard client={client} handleOpenModal={handleOpenModal} />
        </Grid>
        <this.EditFormSection />
      </Grid>
    )
  }

  EditFormSection = () => {
    const {
      client,
      updateClient,
      handleSubmit,
      isModalOpen,
      handleCloseModal,
      mutationResultProps: { loading, error }
    } = this.props

    return (
      <Formik
        onSubmit={handleSubmit(updateClient)}
        validateOnChange={false}
        initialValues={client}
        render={(props: FormikProps<SC.GetSingleClient>) => {
          const { handleSubmit, dirty } = props
          return (
            <EditFormModal
              maxWidth="sm"
              isOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
              title="Edit Client Info"
              handleConfirm={handleSubmit}
              loading={loading || !dirty}
              error={error && error.message}
            >
              <Styles.Form>
                <div className="form-section">
                  {getFieldSettings().map(field => {
                    return (
                      <React.Fragment key={field.name}>
                        {renderFields(field)}
                      </React.Fragment>
                    )
                  })}
                </div>
              </Styles.Form>
            </EditFormModal>
          )
        }}
      />
    )
  }
}

const getFieldSettings = () => {
  return [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone' },
    { name: 'streetAddress', label: 'Street Address' },
    { name: 'postalCode', label: 'Postal Code' },
    { name: 'city', label: 'City' }
  ]
}

export default withRouter(SingleClient)
