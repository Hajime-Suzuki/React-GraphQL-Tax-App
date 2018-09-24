import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import { LoadingIcon } from '../UI/LoadingIcon'
import ProjectsList from './ProjectsList'
import { updateStaus } from '../../redux/modules/entities/project'

class ProjectsListComponent extends Component {
  componentDidMount() {
    const { projects, getEntities, userId } = this.props
    // when you reload on the single porject and come back here, you fetch all project data.
    if (!projects.length || projects.length === 1) getEntities(userId)
  }

  handleChange = (event, newValue, previousValue, projectId) => {
    this.props.updateStaus(projectId, newValue)
  }

  render() {
    const { entitiesFetching, fetching, posting } = this.props
    if (entitiesFetching || fetching || posting) return <LoadingIcon />
    return (
      <Fragment>
        <ProjectsList
          projects={this.props.projects}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

const mapSateToProps = state => ({
  userId: state.user.userId,
  projects: state.entities.projects.getProjects(),
  entitiesFetching: state.entities._status.fetching,
  fetching: state.entities.projects._status.fetching,
  posting: state.entities.projects._status.posting
})

export default connect(
  mapSateToProps,
  { getEntities, updateStaus }
)(ProjectsListComponent)
