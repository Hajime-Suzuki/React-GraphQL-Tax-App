import React, { Component } from 'react'
import AddProjectForm from './AddProjcetForm'

class AddProjectFormContainer extends Component {
  state = {
    name: null,
    rowPrice: null,
    location: {
      city: null,
      streetAddress: null
    },
    status: null,
    link: null,
    date: null,
    taxRate: null,
    invoiceNum: null,
    contact: {
      name: null,
      email: null,
      phone: null
    },
    expense: []
  }

  handleSubmit = values => {
    console.log(values)
  }

  render() {
    return (
      <AddProjectForm
        onSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    )
  }
}

export default AddProjectFormContainer
