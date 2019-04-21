import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { withRouter } from 'react-router'
import { LoadingIcon } from 'src/view/UI/LoadingIcon'
import {
  GetClientsList,
  RemoveClientFromProject,
  UpdateClientProject
} from 'src/graphql/components/clients'
import { GetSingleProject } from 'src/graphql/components/projects'
import { ProjectRouterComponentProps } from 'src/routes/types'
import { SingleProjectChildProps } from '../..'
import EditProjectClientForm from './EditProjectClientForm'

type Props = Pick<
  SingleProjectChildProps,
  'selectedModal' | 'handleCloseModal' | 'client'
> &
  ProjectRouterComponentProps

export type EditProjectClientChildProps = {
  update: (id: string) => () => void;
  removeFromProject: () => void;
  removeFromProjectMutation: MutationResult<RemoveClientFromProject.Mutation>;
  updateClientProjectMutation: MutationResult<UpdateClientProject.Mutation>;
  clientsList?: GetClientsList.GetClientsByUser[] | null;
} & Props

class EditProjectClientFormContainer extends React.Component<
  GetClientsList.Props<Props>
> {
  state = { isModalOpen: false }

  refetchQueries = [
    {
      query: GetSingleProject.Document,
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
      <RemoveClientFromProject.Component refetchQueries={this.refetchQueries}>
        {(removeFromProject, removeMutationProps) => (
          <UpdateClientProject.Component refetchQueries={this.refetchQueries}>
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
          </UpdateClientProject.Component>
        )}
      </RemoveClientFromProject.Component>
    )
  }
}

export default withRouter(
  GetClientsList.HOC<Props>({})(EditProjectClientFormContainer)
)

type UpdateProjectClientMutation = MutationFn<
  UpdateClientProject.Mutation,
  UpdateClientProject.Variables
>
type RemoveFromProjectMutation = MutationFn<
  RemoveClientFromProject.Mutation,
  RemoveClientFromProject.Variables
>
