import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { SelectClientModal } from 'src/components/project/addProject/components/SelectClientModal'
import { EditProjectClientChildProps } from './EditProjectClientFormContainer'

class EditProjectClientForm extends React.Component<
  EditProjectClientChildProps
> {
  render() {
    const {
      selectedModal,
      handleCloseModal,
      error,
      loading,
      update,
      client,
      clientsList
    } = this.props
    if (!client || !clientsList) return null
    return (
      <SelectClientModal
        clients={clientsList}
        handleCloseModal={handleCloseModal}
        isModalOpen={selectedModal === 'client'}
        selectClient={update}
      >
        <div>
          <Typography>{error && error.message}</Typography>
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </SelectClientModal>
    )
  }
}

export default EditProjectClientForm
