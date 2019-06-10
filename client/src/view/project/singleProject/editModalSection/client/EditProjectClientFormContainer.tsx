import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { withRouter } from 'react-router'
import {
  GetClientsListProps,
  GetClientsListQuery,
  MutationUpdateClientProjectArgs,
  RemoveClientFromProjectComponent,
  RemoveClientFromProjectMutation,
  UpdateClientProjectComponent,
  UpdateClientProjectMutation,
  withGetClientsList,
  MutationRemoveClientFromProjectArgs
} from 'src/graphql/components/clients'
import { GetSingleProjectDocument } from 'src/graphql/components/projects'
// import {
//   GetClientsList,
//   RemoveClientFromProject,
//   UpdateClientProject
// } from 'src/graphql/components/clients'
import { ProjectRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from 'src/view/UI/LoadingIcon'
import { SingleProjectChildProps } from '../..'
import EditProjectClientForm from './EditProjectClientForm'

type Props = Pick<
  SingleProjectChildProps,
  'selectedModal' | 'handleCloseModal' | 'client'
> &
  ProjectRouterComponentProps

export type EditProjectClientChildProps = {
  update: (id: string) => () => void
  removeFromProject: () => void
  removeFromProjectMutation: MutationResult<RemoveClientFromProjectMutation>
  updateClientProjectMutation: MutationResult<UpdateClientProjectMutation>
  clientsList?: GetClientsListQuery['getClientsByUser']
} & Props

class EditProjectClientFormContainer extends React.Component<
  GetClientsListProps<Props>
> {
  state = { isModalOpen: false }

  refetchQueries = [
    {
      query: GetSingleProjectDocument,
      variables: { id: this.props.match.params.id }
    }
  ]

  updateClientProject = (update: UpdateProjectClientMutation) => (
    id: string
  ) => async () => {
    const res = await update({
      variables: { clientId: id, projectId: this.props.match.params.id }
    })
    console.log(res)
    this.props.handleCloseModal()
  }
  removeFromProject = (
    removeFromProject: RemoveFromProjectMutation
  ) => async () => {
    const {
      client,
      handleCloseModal,
      match: {
        params: { id }
      }
    } = this.props
    if (!client) return
    await removeFromProject({
      variables: { clientId: client.id, projectId: id }
    })
    handleCloseModal()
  }

  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, getClientsByUser: clientsList, error } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />

    return (
      <RemoveClientFromProjectComponent refetchQueries={this.refetchQueries}>
        {(removeFromProject, removeMutationProps) => (
          <UpdateClientProjectComponent refetchQueries={this.refetchQueries}>
            {(update, updateClientProjectMutation) => {
              return (
                <EditProjectClientForm
                  update={this.updateClientProject(update)}
                  removeFromProject={this.removeFromProject(removeFromProject)}
                  removeFromProjectMutation={removeMutationProps}
                  updateClientProjectMutation={updateClientProjectMutation}
                  clientsList={clientsList}
                  {...this.props}
                />
              )
            }}
          </UpdateClientProjectComponent>
        )}
      </RemoveClientFromProjectComponent>
    )
  }
}

export default withRouter(
  withGetClientsList<Props>({})(EditProjectClientFormContainer)
)

type UpdateProjectClientMutation = MutationFn<
  UpdateClientProjectMutation,
  MutationUpdateClientProjectArgs
>
type RemoveFromProjectMutation = MutationFn<
  RemoveClientFromProjectMutation,
  MutationRemoveClientFromProjectArgs
>
