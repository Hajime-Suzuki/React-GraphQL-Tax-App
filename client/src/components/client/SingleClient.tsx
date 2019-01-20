import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import { withRouter } from 'react-router'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import EditFormModal from '../../libs/forms/EditFormModal'
import ClientCard from '../shared/ClientCard'
import { SingleClientChildProps } from './SingleClientContainer'

class SingleClient extends React.Component<SingleClientChildProps> {
  render() {
    const {
      client,
      handleOpenModal,
      handleSubmit,
      isModalOpen,
      handleCloseModal,
      mutationResultProps: { loading, error },
      dirty
    } = this.props
    return (
      <Grid container justify="center">
        <Grid item xs={11} md={5}>
          <ClientCard client={client} handleOpenModal={handleOpenModal} />
        </Grid>
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
      </Grid>
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
