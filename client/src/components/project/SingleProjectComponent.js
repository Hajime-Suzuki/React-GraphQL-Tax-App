import React, { Component, Fragment } from 'react'
import SingleProject from './SingleProject'
import { connect } from 'react-redux'
import {
  getSingleProject,
  updateIncomes
} from '../../redux/modules/entities/project'
import EditFormModal from './modal/EditFormModal'
import EditExpenseIncomeForm from './formConponents/EditExpenseIncomeForm'
import { getFormValues } from 'redux-form'
import { LoadingIcon } from '../UI/LoadingIcon'

import { FieldArray, reduxForm, initialize } from 'redux-form'

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

    // console.log(this.props.project && this.props.project.get('incomes'))

    // initialize({
    //   editExpenseIncome: this.props.project && this.props.project.get('incomes')
    // })
  }

  updateItems = () => {
    const { updateIncomes, project, incomes } = this.props
    updateIncomes(project.get('id'), incomes)
    this.setState({ isModalOpen: false })
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  render() {
    if (this.props.fetching || !this.props.project) return <LoadingIcon />
    // console.log(this.props.project.get('incomes'))

    return (
      <Fragment>
        <SingleProject
          project={this.props.project}
          openModal={this.openModal}
        />
        <EditFormModal
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          cofirmAndEdit={this.updateItems}
        >
          <EditExpenseIncomeForm
            // items={this.props.project.get('incomes')}
            defaultValues={this.props.project.get('incomes')}
          />
        </EditFormModal>
      </Fragment>
    )
  }
}
const mapSateToProps = (state, props) => ({
  fetching: state.entities.projects._status.fetching,
  project: state.entities.projects.data.get(props.match.params.id),
  incomes: getFormValues('editExpenseIncome')(state)
})
export default connect(
  mapSateToProps,
  { getSingleProject, updateIncomes }
)(SingleProjectComponent)
