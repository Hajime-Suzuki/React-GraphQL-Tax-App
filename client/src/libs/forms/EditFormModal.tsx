import React from 'react'
import styled from 'styled-components'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'

interface Props {
  title?: string
  handleCloseModal: () => void
  handleConfirm: () => void
  isOpen: boolean
  error?: string
  loading?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | false
  showAction?: boolean
}

const EditFormModal: React.SFC<Props> = props => {
  const {
    handleCloseModal,
    handleConfirm,
    isOpen,
    children,
    title,
    error,
    loading,
    maxWidth = 'lg',
    showAction = true
  } = props

  return (
    <DialogWrapper
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth={maxWidth}
      fullWidth={true}
      open={isOpen}
    >
      <DialogTitle className="title">{title}</DialogTitle>

      <DialogContent>{children}</DialogContent>
      <Typography style={{ textAlign: 'center' }} color="error">
        {error}
      </Typography>
      {showAction && (
        <DialogActions className="actions-section">
          <Button onClick={handleCloseModal} color="primary" type="submit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={loading}>
            Ok
          </Button>
        </DialogActions>
      )}
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
