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
      updateClientProjectMutation: {
        error: updateError,
        loading: updateLoading
      },
      removeFromProjectMutation: { error: removeError, loading: removeLoading },
      update,
      removeFromProject,
      clientsList
    } = this.props

    if (!clientsList || !clientsList.length) return null

    return (
      <SelectClientModal
        clients={clientsList}
        maxWidth="sm"
        handleCloseModal={handleCloseModal}
        isModalOpen={selectedModal === 'client'}
        selectClient={update}
      >
        <div style={{ margin: '1em 0px', textAlign: 'center' }}>
          <Typography>{updateError && updateError.message}</Typography>
          <Typography>{removeError && removeError.message}</Typography>
          <Button
            onClick={removeFromProject}
            color="primary"
            variant="outlined"
            disabled={removeLoading}
          >
            Remove
          </Button>
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="contained"
            disabled={updateLoading}
          >
            Cancel
          </Button>
        </div>
      </SelectClientModal>
    )
  }
}

export default EditProjectClientForm
