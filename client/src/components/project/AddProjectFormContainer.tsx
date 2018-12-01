import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewProject } from '../../redux/modules/entities/project'
import { routes } from '../../routes/constants'
import ProjectForm from './ProjectForm'

// TODO: Add Error Message
// TODO: Add validation

class AddProjectFormContainer extends Component {
  handleSubmit = values => {
    this.props.createNewProject(values)
  }

  componentDidUpdate() {
    const { posting, message } = this.props.status

    // if there is no error message and posting (updated successfully), redirect to project component
    if (!posting && message === null) {
      this.props.history.push(routes.projects)
    }
  }

  render() {
    return (
      <ProjectForm
        onSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

const mapSateToProps = state => ({
  status: state.entities.projects._status
})
export default connect(
  mapSateToProps,
  { createNewProject }
)(AddProjectFormContainer)
