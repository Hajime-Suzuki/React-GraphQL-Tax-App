import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserData } from '../../redux/modules/data/data'
import ProjectsList from './ProjectsList'

class ProjectsListComponent extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.userId)
  }
  render() {
    return <ProjectsList projects={this.props.projects} />
  }
}

const mapSateToProps = state => ({
  userId: state.userId,
  projects: Object.values(state.data.projects)
})

export default connect(
  mapSateToProps,
  { getUserData }
)(ProjectsListComponent)