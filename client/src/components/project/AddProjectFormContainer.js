import React, { Component } from 'react'
import ProjectForm from './ProjectForm'
import { createNewProject } from '../../redux/modules/entities/project'
import { connect } from 'react-redux'
import { routes } from '../../routes/constants'
import { Redirect } from 'react-router-dom'

class AddProjectFormContainer extends Component {
  // state = {
  //   name: null,
  //   rowPrice: null,
  //   location: {
  //     city: null,
  //     streetAddress: null
  //   },
  //   status: null,
  //   link: null,
  //   date: null,
  //   taxRate: null,
  //   invoiceNum: null,
  //   contact: {
  //     name: null,
  //     email: null,
  //     phone: null
  //   },
  //   expense: []
  // }

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
