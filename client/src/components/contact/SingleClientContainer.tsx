import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { SingleClient } from 'src/graphql/components/clients'
import { LoadingIcon } from '../UI/LoadingIcon'

type Props = SingleClient.Props<RouteComponentProps<{ clientId: string }>>
class SingleClientContainer extends React.Component<Props> {
  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getSingleClient: client } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />
    if (!client) return 'No client found'
    return client.firstName
  }
}

export default SingleClient.HOC<Props>({
  options: ({ match }) => ({ variables: { id: match.params.clientId } })
})(SingleClientContainer)
