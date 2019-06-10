import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as React from 'react'
import { QGetClientsList } from 'src/graphql/@types/types'

export interface SelectClientModalProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  selectClient: (id: string) => () => void
  clients: NonNullable<QGetClientsList>
  maxWidth?: DialogProps['maxWidth']
  children?: JSX.Element
}

export const SelectClientModal: React.FunctionComponent<
  SelectClientModalProps
> = props => {
  const {
    clients,
    isModalOpen,
    handleCloseModal,
    selectClient,
    children
  } = props
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
      <DialogTitle>Clients List</DialogTitle>
      <List>
        {clients.map(client => {
          return (
            <ListItem button key={client.id} onClick={selectClient(client.id)}>
              <ListItemText
                primary={`${client.firstName} ${client.lastName}`}
                secondary={client.email}
              />
            </ListItem>
          )
        })}
      </List>
      {children}
    </Dialog>
  )
}
