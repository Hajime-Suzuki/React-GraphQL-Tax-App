import React, { Component, Fragment } from 'react'
import SingleProject from './SingleProject'
import { connect } from 'react-redux'
import { getSingleProject } from '../../redux/modules/entities/project'
import EditFormModal from './modal/EditFormModal'
import EditExpenseIncomeForm from './formConponents/EditExpenseIncomeForm'

class SingleProjectComponent extends Component {
  state = { isModalOpen: false }
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

  updateItem = () => {
    console.log('update items')
    this.setState({ isModalOpen: false })
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <Fragment>
        <SingleProject
          project={this.props.project}
          openModal={this.openModal}
        />
        <EditFormModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          confirm={this.updateItem}
        >
          <EditExpenseIncomeForm />
        </EditFormModal>
      </Fragment>
    )
  }
}
const mapSateToProps = (state, props) => ({
  project: state.entities.projects.data.get(props.match.params.id)
})
export default connect(
  mapSateToProps,
  { getSingleProject }
)(SingleProjectComponent)
