import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { SingleClient as SingleC } from 'src/graphql/components/clients'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleClient from './SingleClient'

type Props = SingleC.Props<RouteComponentProps<{ clientId: string }>>

class SingleClientContainer extends React.Component<Props> {
  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getSingleClient: client } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />
    if (!client) return 'No client found'
    return <SingleClient client={client} />
  }
}

export default SingleC.HOC<Props>({
  options: ({ match }) => ({ variables: { id: match.params.clientId } })
})(SingleClientContainer)
