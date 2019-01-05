import * as React from 'react'
import Button from '@material-ui/core/Button'
import { AddProjectChildProps } from '..'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FormikActions } from 'formik'
import { AddProjectInput } from 'src/graphql/@types/clientTypes'

interface Props {
  clients: NonNullable<AddProjectChildProps['clients']>
  setFieldValue: FormikActions<AddProjectInput>['setFieldValue']
}

class SelectClient extends React.Component<Props> {
  state = {
    isModalOpen: false
  }
  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }
  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }
  selectClient = (clientId: string) => () => {
    this.props.setFieldValue('client.id', clientId)
    this.handleCloseModal()
  }
  render() {
    const { clients } = this.props

    return (
      <React.Fragment>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleOpenModal}
        >
          Select Client
        </Button>
        <Dialog open={this.state.isModalOpen} onClose={this.handleCloseModal}>
          <DialogTitle>Clients List</DialogTitle>
          <List>
            {clients.map(client => {
              return (
                <ListItem
                  button
                  key={client.id}
                  onClick={this.selectClient(client.id)}
                >
                  <ListItemText
                    primary={`${client.firstName} ${client.lastName}`}
                    secondary={client.email}
                  />
                </ListItem>
              )
            })}
          </List>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default SelectClient
