import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationResult } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import { QSingleClient } from 'src/graphql/@types/types'
import {
  ClientInput,
  DeleteClientComponent,
  DeleteClientMutation,
  DeleteClientMutationFn,
  GetClientsListDocument,
  SingleClientProps,
  UpdateClientComponent,
  UpdateClientMutation,
  UpdateClientMutationFn,
  withSingleClient
} from 'src/graphql/components/clients'
import { RoutesNames } from 'src/routes/route-names'
import { LoadingIcon } from '../UI/LoadingIcon'
import { clientValidationSchemas } from './helpers/validation'
import SingleClient from './SingleClient'

type Client = QSingleClient

type Props = SingleClientProps<RouteComponentProps<{ clientId: string }>>

export type SingleClientChildProps = {
  client: NonNullable<QSingleClient>
  isModalOpen: boolean
  isDeleteModalOpen: boolean
  editMutationResult: MutationResult<UpdateClientMutation>
  deleteMutationResult: MutationResult<DeleteClientMutation>
  handleCloseModal: () => void
  handleOpenModal: () => void
  handleOpenDelete: () => void
  handleCloseDelete: () => void
  handleDelete: () => void
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

  handleSubmit = (update: UpdateClientMutationFn) => async (
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

  handleDelete = (deleteClient: DeleteClientMutationFn) => async () => {
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
      <UpdateClientComponent>
        {(edit, editMutationResult) => (
          <DeleteClientComponent
            refetchQueries={[{ query: GetClientsListDocument }]}
          >
            {(deleteClient, deleteMutationResult) => (
              <Formik
                onSubmit={this.handleSubmit(edit)}
                validateOnChange={false}
                validationSchema={clientValidationSchemas.editClientSchema}
                initialValues={client}
                render={(formProps: FormikProps<QSingleClient>) => (
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
          </DeleteClientComponent>
        )}
      </UpdateClientComponent>
    )
  }
}

export default withSingleClient<Props>({
  options: ({ match }) => ({ variables: { id: match.params.clientId } })
})(SingleClientContainer)
