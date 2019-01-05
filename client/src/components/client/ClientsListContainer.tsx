import * as React from 'react'
import { GetClientsList } from 'src/graphql/components/clients'
import { PrivateRoutesChildProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import ClientsList from './ClientsList'

type Props = GetClientsList.Props<PrivateRoutesChildProps>
class ClientsListContainer extends React.Component<Props> {
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

export default GetClientsList.HOC({})(ClientsListContainer)
