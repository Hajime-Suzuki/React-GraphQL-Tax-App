import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import { ClientInput } from 'src/graphql/@types/types'
import {
  SingleClient as SingleC,
  UpdateClient
} from 'src/graphql/components/clients'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleClient from './SingleClient'

type UpdateClient = MutationFn<UpdateClient.Mutation, UpdateClient.Variables>

type Client = SingleC.GetSingleClient

type Props = SingleC.Props<RouteComponentProps<{ clientId: string }>>

export type SingleClientChildProps = {
  client: Client;
  isModalOpen: boolean;
  mutationResultProps: MutationResult<UpdateClient.Mutation>;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
} & RouteComponentProps<{ clientId: string }> &
  FormikProps<Client>

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

  handleSubmit = (update: UpdateClient) => async (
    values: ClientInput & { id: string },
    { resetForm }: FormikActions<Client>
  ) => {
    const res = await update({
      variables: { clientId: values.id, data: values }
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
            <Formik
              onSubmit={this.handleSubmit(update)}
              validateOnChange={false}
              initialValues={client}
              render={(formProps: FormikProps<Client>) => {
                return (
                  <SingleClient
                    client={client}
                    mutationResultProps={mutationResultProps}
                    handleCloseModal={this.handleCloseModal}
                    handleOpenModal={this.handleOpenModal}
                    handleSubmit={this.handleSubmit}
                    isModalOpen={this.state.isModalOpen}
                    {...formProps}
                  />
                )
              }}
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
