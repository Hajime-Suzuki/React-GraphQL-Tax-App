import React, { Component } from 'react'
import SingleProject from './SingleProject'
import { connect } from 'react-redux'
import { getSingleProject } from '../../redux/modules/entities/project'

class SingleProjectComponent extends Component {
  componentDidMount() {
    const {
      project,
      getSingleProject,
      match: {
        params: { id }
      }
    } = this.props
    if (!project) {
      getSingleProject(id)
    }
  }
  render() {
    return <SingleProject project={this.props.project} />
  }
}
const mapSateToProps = (state, props) => ({
  project: state.entities.projects.data.get(props.match.params.id)
})
export default connect(
  mapSateToProps,
  { getSingleProject }
)(SingleProjectComponent)
