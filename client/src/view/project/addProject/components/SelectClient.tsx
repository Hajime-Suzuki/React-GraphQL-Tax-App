import Button from '@material-ui/core/Button'
import * as React from 'react'
import { AddProjectChildProps } from '..'
import { SelectClientModal } from './SelectClientModal'

interface Props {
  clients: NonNullable<AddProjectChildProps['clients']>
  setFieldValue: AddProjectChildProps['setFieldValue']
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
        <SelectClientModal
          clients={clients}
          isModalOpen={this.state.isModalOpen}
          handleCloseModal={this.handleCloseModal}
          selectClient={this.selectClient}
        />
      </React.Fragment>
    )
  }
}

export default SelectClient
