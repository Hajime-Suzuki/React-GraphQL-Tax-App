import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import {
  getSingleProject,
  updateIncomesAndExpenses
} from '../../redux/modules/entities/project'
import { LoadingIcon } from '../UI/LoadingIcon'
import EditExpenseIncomeForm from './formConponents/EditExpenseIncomeForm'
import EditFormModal from './modal/EditFormModal'
import SingleProject from './SingleProject'

const incomes = 'incomes'
const expenses = 'expenses'

class SingleProjectComponent extends Component {
  state = { isIncomeModalOpen: false, isExpenseModalOpen: false }

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

  updateItems = type => {
    const { project, updateIncomesAndExpenses, incomesAndExpenses } = this.props

    updateIncomesAndExpenses(project.get('id'), type, incomesAndExpenses)
    this.setState({ isIncomeModalOpen: false, isExpenseModalOpen: false })
  }

  openModal = type => {
    this.setState({ [type]: true })
  }
  closeModal = () => {
    this.setState({ isIncomeModalOpen: false, isExpenseModalOpen: false })
  }

  render() {
    if (this.props.fetching || !this.props.project) return <LoadingIcon />

    return (
      <Fragment>
        <SingleProject
          project={this.props.project}
          openModal={this.openModal}
          posting={this.props.posting}
        />
        <EditFormModal
          isOpen={this.state.isIncomeModalOpen}
          closeModal={this.closeModal}
          cofirmAndEdit={this.updateItems}
          type={incomes}
        >
          <EditExpenseIncomeForm
            type={incomes}
            defaultValues={this.props.project.get(incomes)}
          />
        </EditFormModal>
        <EditFormModal
          isOpen={this.state.isExpenseModalOpen}
          closeModal={this.closeModal}
          cofirmAndEdit={this.updateItems}
          type={expenses}
        >
          <EditExpenseIncomeForm
            type={expenses}
            defaultValues={this.props.project.get(expenses)}
          />
        </EditFormModal>
      </Fragment>
    )
  }
}
const mapSateToProps = (state, props) => ({
  fetching: state.entities.projects._status.fetching,
  posting: state.entities.projects._status.posting,
  project: state.entities.projects.data.get(props.match.params.id),
  incomesAndExpenses: getFormValues('editExpenseIncome')(state)
})
export default connect(
  mapSateToProps,
  { getSingleProject, updateIncomesAndExpenses }
)(SingleProjectComponent)
