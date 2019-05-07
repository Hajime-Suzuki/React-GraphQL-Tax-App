import * as React from 'react'
import EditFormModal from 'src/libs/forms/EditFormModal'
import { Typography } from '@material-ui/core'
import { DeleteProjectComponent } from 'src/graphql/components/projects'
import { DeleteProjectModalProps } from './EditBasicInfoFormContainer'

class DeleteProjectModal extends React.Component<DeleteProjectModalProps> {
  render() {
    const { closeDeleteDialog, confirmDelete, isConfirmDialogOpen } = this.props
    return (
      <DeleteProjectComponent>
        {(
          deleteProject,
          { error: deleteProjectError, loading: deleteProjectLoading }
        ) => {
          return (
            <EditFormModal
              handleCloseModal={closeDeleteDialog}
              handleConfirm={confirmDelete(deleteProject)}
              isOpen={isConfirmDialogOpen}
              error={deleteProjectError && deleteProjectError.message}
              loading={deleteProjectLoading}
              maxWidth="xs"
            >
              <Typography variant="h6" style={{ textAlign: 'center' }}>
                Delete this project?
              </Typography>
            </EditFormModal>
          )
        }}
      </DeleteProjectComponent>
    )
  }
}

export default DeleteProjectModal
