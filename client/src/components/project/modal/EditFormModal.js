import React from 'react'
import {
  DialogTitle,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Button
} from '../../../../node_modules/@material-ui/core'

const EditFormModal = props => {
  const { closeModal, confirm, handleEntering, isOpen } = props
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      open={isOpen}
    >
      <DialogTitle>Edit Income</DialogTitle>
      <DialogContent>
        <Typography>Modal!</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={confirm} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditFormModal
