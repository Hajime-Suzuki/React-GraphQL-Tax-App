import * as React from 'react'
import { QGetClientsList } from 'src/graphql/@types/types'
import {
  GetClientsListProps,
  withGetClientsList
} from 'src/graphql/components/clients'
import { PrivateRoutesChildProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import ClientsList from './ClientsList'

type Props = GetClientsListProps<PrivateRoutesChildProps>

export interface ClientsListChildProps {
  clients: NonNullable<QGetClientsList>
}

class ClientsListContainer extends React.Component<Props> {
  state = { isAddModalOpen: false }

  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getClientsByUser: clients } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />
    if (!clients) return 'You don\'t have a client yet'
    return <ClientsList clients={clients} />
  }
}

export default withGetClientsList<Props>({})(ClientsListContainer)
