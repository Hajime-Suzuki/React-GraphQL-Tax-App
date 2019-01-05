import { FormikActions } from 'formik'
import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import {
  SingleClient as SingleC,
  UpdateClient
} from 'src/graphql/components/clients'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleClient from './SingleClient'

type Props = SingleC.Props<RouteComponentProps<{ clientId: string }>>

export type SingleClientChildProps = {
  client: SingleC.GetSingleClient
  isModalOpen: boolean
  updateClient: MutationFn<UpdateClient.Mutation, UpdateClient.Variables>
  mutationResultProps: MutationResult<UpdateClient.Mutation>
  handleCloseModal: () => void
  handleOpenModal: () => void
  handleSubmit: (
    update: SingleClientChildProps['updateClient']
  ) => (
    values: SingleC.GetSingleClient,
    actions: FormikActions<SingleC.GetSingleClient>
  ) => void
} & RouteComponentProps<{ clientId: string }>

class SingleClientContainer extends React.Component<Props> {
  state = {
    isModalOpen: false
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleSubmit: SingleClientChildProps['handleSubmit'] = update => async (
    { id, ...values },
    { resetForm }
  ) => {
    const res = await update({
      variables: { clientId: id, data: values }
    })
    const client = res && res.data!.updateClient!.client

    if (client) {
      resetForm(client)
      this.setState({ isModalOpen: false })
    }
  }

  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getSingleClient: client } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />
    if (!client) return 'No client found'

    return (
      <UpdateClient.Component>
        {(update, mutationResultProps) => {
          return (
            <SingleClient
              client={client}
              updateClient={update}
              mutationResultProps={mutationResultProps}
              handleCloseModal={this.handleCloseModal}
              handleOpenModal={this.handleOpenModal}
              handleSubmit={this.handleSubmit}
              isModalOpen={this.state.isModalOpen}
            />
          )
        }}
      </UpdateClient.Component>
    )
  }
}

export default SingleC.HOC<Props>({
  options: ({ match }) => ({ variables: { id: match.params.clientId } })
})(SingleClientContainer)
