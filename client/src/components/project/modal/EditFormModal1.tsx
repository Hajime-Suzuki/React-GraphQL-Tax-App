import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import React from 'react'

const EditFormModal = props => {
  const {
    closeModal,
    cofirmAndEdit,
    handleEntering,
    isOpen,
    children,
    type
  } = props
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      open={isOpen}
    >
      <DialogTitle>Edit Income</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={() => cofirmAndEdit(type)} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditFormModal
