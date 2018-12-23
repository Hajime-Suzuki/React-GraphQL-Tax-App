import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core'
import React from 'react'

interface Props {
  handleCloseModal: () => void
  confirmAndEdit: () => void
  handleEntering: () => void
  isOpen: boolean
  type: string
}
const EditFormModal: React.SFC<Props> = props => {
  const {
    handleCloseModal,
    confirmAndEdit,
    isOpen,
    handleEntering,
    children
  } = props

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="md"
      onEntering={handleEntering}
      open={isOpen}
    >
      <DialogTitle>Edit Income</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmAndEdit} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditFormModal
