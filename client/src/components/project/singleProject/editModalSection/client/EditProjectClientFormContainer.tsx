import { ApolloError } from 'apollo-client'
import * as React from 'react'
import { MutationFn } from 'react-apollo'
import {
  UpdateClientProject,
  GetClientsList
} from 'src/graphql/components/clients'
import { SingleProjectChildProps } from '../..'
import EditProjectClientForm from './EditProjectClientForm'
import { LoadingIcon } from 'src/components/UI/LoadingIcon'
import { withRouter } from 'react-router'
import { ProjectRouterComponentProps } from 'src/routes/types'
import { GetSingleProject } from 'src/graphql/components/projects'

type UpdateProjectClientMutation = MutationFn<
  UpdateClientProject.Mutation,
  UpdateClientProject.Variables
>

type Props = Pick<
  SingleProjectChildProps,
  'selectedModal' | 'handleCloseModal' | 'client'
> &
  ProjectRouterComponentProps

export type EditProjectClientChildProps = {
  update: (id: string) => () => void;
  clientsList?: GetClientsList.GetClientsByUser[] | null;
} & Props & { error?: ApolloError; loading: boolean }

class EditProjectClientFormContainer extends React.Component<
  GetClientsList.Props<Props>
> {
  state = { isModalOpen: false }

  updateClientProject = (update: UpdateProjectClientMutation) => (
    id: string
  ) => async () => {
    const res = await update({
      variables: { clientId: id, projectId: this.props.match.params.id }
    })
    console.log(res)
    this.props.handleCloseModal()
  }

  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, getClientsByUser: clientsList, error } = data
    if (error) return error.message
    if (loading) return <LoadingIcon />

    return (
      <UpdateClientProject.Component
        refetchQueries={[
          {
            query: GetSingleProject.Document,
            variables: { id: this.props.match.params.id }
          }
        ]}
      >
        {(update, { error, loading }) => {
          return (
            <EditProjectClientForm
              update={this.updateClientProject(update)}
              error={error}
              loading={loading}
              clientsList={clientsList}
              {...this.props}
            />
          )
        }}
      </UpdateClientProject.Component>
    )
  }
}

export default withRouter(
  GetClientsList.HOC<Props>({})(EditProjectClientFormContainer)
)
