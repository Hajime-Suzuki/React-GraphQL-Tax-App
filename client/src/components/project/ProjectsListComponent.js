import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import { updateStaus } from '../../redux/modules/entities/project'
import { LoadingIcon } from '../UI/LoadingIcon'
import WithErrorMessage from '../UI/WithErrorMessage'
import ProjectsList from './ProjectsList'

class ProjectsListComponent extends Component {
  componentDidMount() {
    const { projects, getEntities } = this.props
    // when you reload on the single porject and come back here, you fetch all project data.
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
      entitiesErrorMessage
    } = this.props
    if (entitiesFetching) return <LoadingIcon />
    return (
      <WithErrorMessage message={entitiesErrorMessage || projectErrorMessage}>
        <ProjectsList
          projects={projects}
          handleChange={this.handleChange}
          postingId={postingId}
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
  { getEntities, updateStaus }
)(ProjectsListComponent)
