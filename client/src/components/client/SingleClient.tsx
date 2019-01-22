import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
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
      editMutationResult: { loading: addLoading, error: addError },
      dirty,
      handleOpenDelete
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
          loading={addLoading || !dirty}
          error={addError && addError.message}
          handleDeleteDialogOpen={handleOpenDelete}
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
        <this.ConfirmDelete />
      </Grid>
    )
  }

  ConfirmDelete = () => {
    const {
      handleCloseDelete,
      handleDelete,
      isDeleteModalOpen,
      deleteMutationResult: { loading, error }
    } = this.props

    return (
      <EditFormModal
        handleCloseModal={handleCloseDelete}
        handleConfirm={handleDelete}
        isOpen={isDeleteModalOpen}
        error={error && error.message}
        loading={loading}
        maxWidth="xs"
      >
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          Delete this client?
        </Typography>
      </EditFormModal>
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
