import React, { Component } from 'react'
import ProjectForm from './ProjectForm'
import { createNewProject } from '../../redux/modules/entities/project'
import { connect } from 'react-redux'

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
  posting: state.entities.projects._status.posting
})
export default connect(
  mapSateToProps,
  { createNewProject }
)(AddProjectFormContainer)
