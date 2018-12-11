import * as React from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import {
  updateStaus,
  sortProjectByDate
} from '../../redux/modules/entities/project'
import { LoadingIcon } from '../UI/LoadingIcon'
import WithErrorMessage from '../UI/WithErrorMessage'
import ProjectsList from './ProjectsList2'

// TODO: Get only basic info.
// TODO: Fetch details when open single page.

class ProjectsListContainer extends React.Component<any> {
  componentDidMount() {
    const { projects, getEntities } = this.props
    // when you reload on the single porject and come back here, you fetch all project data.
    // now that dashboard has filtered projects, this component should fetch wholo project data anyway.

    if (!projects.length || projects.length === 1) getEntities()
  }

  handleChange = (e, newValue, previousValue, projectId) => {
    this.props.updateStaus(projectId, newValue)
  }

  render() {
    const {
      entitiesFetching,
      postingId,
      projects,
      projectErrorMessage,
      entitiesErrorMessage,
      sortProjectByDate
    } = this.props
    if (entitiesFetching) return <LoadingIcon />
    return (
      <WithErrorMessage message={entitiesErrorMessage || projectErrorMessage}>
        <ProjectsList
          projects={projects}
          handleChange={this.handleChange}
          postingId={postingId}
          sortProjectByDate={sortProjectByDate}
        />
      </WithErrorMessage>
    )
  }
}

const mapSateToProps = state => ({
  projects: state.entities.projects.getProjects(),
  entitiesFetching: state.entities._status.fetching,
  entitiesErrorMessage: state.entities._status.message,
  postingId: state.entities.projects._status.posting,
  projectErrorMessage: state.entities.projects._status.message
})

export default connect(
  mapSateToProps,
  { getEntities, updateStaus, sortProjectByDate }
)(ProjectsListContainer)
