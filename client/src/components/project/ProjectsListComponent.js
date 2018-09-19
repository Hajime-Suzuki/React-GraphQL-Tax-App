import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ProjectsList from './ProjectsList'
import { getEntities } from '../../redux/modules/entities'
import { MainWrapper } from '../../styles/sharedStyles'

class ProjectsListComponent extends Component {
  componentDidMount() {
    const { projects, getEntities, userId } = this.props
    if (!projects.length || projects.length === 1) getEntities(userId)
  }
  render() {
    // const projects = this.props.projects.getProjects()
    // console.log(projects)
    // return 'projects'
    return <ProjectsList projects={this.props.projects} />
  }
}

const mapSateToProps = state => ({
  userId: state.user.userId,
  projects: state.entities.projects.getProjects()
})

export default connect(
  mapSateToProps,
  { getEntities }
)(ProjectsListComponent)
