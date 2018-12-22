import * as React from 'react'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  GetProjectOverview,
  UpdateStatus
} from 'src/graphql/components/projects'
import {
  IRouterComponentProps,
  PrivateRoutesChildProps
} from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import ProjectsList from './ProjectsList'

type Props = PrivateRoutesChildProps & IRouterComponentProps

class ProjectsListContainer extends React.Component<Props> {
  sortProjectsByProjectDate = () =>
    ProjectActions.sortProjectsByProjectDate('1')

  render() {
    const { userId } = this.props
    if (!userId) return null
    return (
      <GetProjectOverview.Component variables={{ userId }}>
        {({ data, loading, error }) => {
          if (loading) return <LoadingIcon />
          if (error) return <p>{error.message}</p>
          if (!data) return null

          return (
            <ProjectsList
              projects={data.getProjectsByUserId}
              sortProjectsByProjectDate={this.sortProjectsByProjectDate}
            />
          )
        }}
      </GetProjectOverview.Component>
    )
  }
}

export default ProjectsListContainer
