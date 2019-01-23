import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import { ClientInput } from 'src/graphql/@types/types'
import {
  SingleClient as SingleC,
  UpdateClient,
  DeleteClient,
  GetClientsList
} from 'src/graphql/components/clients'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleClient from './SingleClient'
import { RoutesNames } from 'src/routes/constants'
import { clientValidationSchemas } from './helpers/validation'

type Client = SingleC.GetSingleClient

type Props = SingleC.Props<RouteComponentProps<{ clientId: string }>>

export type SingleClientChildProps = {
  client: Client;
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editMutationResult: MutationResult<UpdateClient.Mutation>;
  deleteMutationResult: MutationResult<DeleteClient.Mutation>;
  handleCloseModal: () => void;
  handleOpenModal: () => void;

  handleOpenDelete: () => void;
  handleCloseDelete: () => void;
  handleDelete: () => void;
} & RouteComponentProps<{ clientId: string }> &
  FormikProps<Client>

class SingleClientContainer extends React.Component<Props> {
  state = {
    isModalOpen: false,
    isDeleteModalOpen: false
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false })
  }

  handleOpenModal = () => {
    this.setState({ isModalOpen: true })
  }

  handleSubmit = (
    update: MutationFn<UpdateClient.Mutation, UpdateClient.Variables>
  ) => async (
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

  handleOpenDelete = () => this.setState({ isDeleteModalOpen: true })

  handleCloseDelete = () => this.setState({ isDeleteModalOpen: false })

  handleDelete = (
    deleteClient: MutationFn<DeleteClient.Mutation, DeleteClient.Variables>
  ) => async () => {
    await deleteClient({
      variables: { clientId: this.props.match.params.clientId }
    })
    this.props.history.replace(RoutesNames.clientsList)
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
        {(edit, editMutationResult) => (
          <DeleteClient.Component
            refetchQueries={[{ query: GetClientsList.Document }]}
          >
            {(deleteClient, deleteMutationResult) => (
              <Formik
                onSubmit={this.handleSubmit(edit)}
                validateOnChange={false}
                validationSchema={clientValidationSchemas.addClientSchema}
                initialValues={{ client }}
                render={(formProps: FormikProps<SingleC.GetSingleClient>) => (
                  <SingleClient
                    client={client}
                    editMutationResult={editMutationResult}
                    handleCloseModal={this.handleCloseModal}
                    handleOpenModal={this.handleOpenModal}
                    handleSubmit={this.handleSubmit}
                    isModalOpen={this.state.isModalOpen}
                    handleOpenDelete={this.handleOpenDelete}
                    handleCloseDelete={this.handleCloseDelete}
                    handleDelete={this.handleDelete(deleteClient)}
                    isDeleteModalOpen={this.state.isDeleteModalOpen}
                    deleteMutationResult={deleteMutationResult}
                    {...formProps}
                  />
                )}
              />
            )}
          </DeleteClient.Component>
        )}
      </UpdateClient.Component>
    )
  }
}

export default SingleC.HOC<Props>({
  options: ({ match }) => ({ variables: { id: match.params.clientId } })
})(SingleClientContainer)
