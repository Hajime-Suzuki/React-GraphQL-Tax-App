import React from 'react'
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

interface Props {
  title: string
  type: string
  handleEntering: () => void
  handleCloseModal: () => void
  handleConfirm: () => void
  isOpen: boolean
}

const EditFormModal: React.SFC<Props> = props => {
  const {
    handleCloseModal,
    handleConfirm,
    isOpen,
    handleEntering,
    children,
    title
  } = props

  return (
    <DialogWrapper
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="lg"
      fullWidth={true}
      onEntering={handleEntering}
      open={isOpen}
    >
      <DialogTitle className="title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <DialogActions className="actions-section">
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Ok
        </Button>
      </DialogActions>
    </DialogWrapper>
  )
}

const DialogWrapper: any = styled(Dialog)`
  .title {
    text-align: center;
  }
  .actions-section {
    display: flex;
    margin-top: 1em;
    justify-content: space-evenly;
  }
`

export default EditFormModal
