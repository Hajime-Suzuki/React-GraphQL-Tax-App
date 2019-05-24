import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { ProjectActions } from 'src/graphql/actions/projects'
import {
  GetProjectOverviewComponent,
  GetProjectOverviewQuery
} from 'src/graphql/components/projects'
import {
  IRouterComponentProps,
  PrivateRoutesChildProps
} from 'src/routes/types'
import { LoadingIcon } from '../../UI/LoadingIcon'
import ProjectsList from './ProjectsList'

type Props = PrivateRoutesChildProps & IRouterComponentProps

export interface ProjectListChildProps {
  projects: GetProjectOverviewQuery['projects']
  sortProjectsByProjectDate: () => void
  sortProjectByInvoiceDate: () => void
}

class ProjectsListContainer extends React.Component<Props> {
  sortProjectsByProjectDate = () =>
    ProjectActions.sortProjectsByProjectDate('-1')
  sortProjectByInvoiceDate = () =>
    ProjectActions.sortProjectsByInvoiceDate('-1')

  render() {
    const { userId } = this.props
    if (!userId) return null
    return (
      <GetProjectOverviewComponent variables={{ userId }}>
        {({ data, loading, error }) => {
          if (loading) return <LoadingIcon />
          if (error) return <p>{error.message}</p>
          if (!data) return null
          if (!data.projects.length)
            return (
              <Typography variant="display1">
                You don't have a project yet
              </Typography>
            )
          return (
            <ProjectsList
              projects={data.projects}
              sortProjectsByProjectDate={this.sortProjectsByProjectDate}
              sortProjectByInvoiceDate={this.sortProjectByInvoiceDate}
            />
          )
        }}
      </GetProjectOverviewComponent>
    )
  }
}

export default ProjectsListContainer
