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
import GeneralEditForm from './formConponents/GeneralEditForm'
import Button from '@material-ui/core/Button'

const incomes = 'incomes'
const expenses = 'expenses'
const general = 'general'

class SingleProjectComponent extends Component {
  state = {
    isIncomeModalOpen: false,
    isExpenseModalOpen: false,
    isGeneralEditModalOpen: false
  }

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
    const {
      project,
      updateIncomesAndExpenses,
      incomesAndExpenses,
      generalInfo
    } = this.props
    console.log(generalInfo)

    const dataToPass = type === general ? generalInfo : incomesAndExpenses
    updateIncomesAndExpenses(project.get('id'), dataToPass)
    this.closeModal()
  }

  test = () => {}

  openModal = type => {
    this.setState({ [type]: true })
  }
  closeModal = () => {
    this.setState({
      isIncomeModalOpen: false,
      isExpenseModalOpen: false,
      isGeneralEditModalOpen: false
    })
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

        {/* modals */}
        {[incomes, expenses].map(type => {
          const isOpen =
            type === incomes
              ? this.state.isIncomeModalOpen
              : this.state.isExpenseModalOpen
          return (
            <EditFormModal
              isOpen={isOpen}
              closeModal={this.closeModal}
              cofirmAndEdit={this.updateItems}
              type={type}
              key={type}
            >
              <EditExpenseIncomeForm
                type={type}
                defaultValues={this.props.project.get(type)}
              />
            </EditFormModal>
          )
        })}

        <EditFormModal
          isOpen={this.state.isGeneralEditModalOpen}
          closeModal={this.closeModal}
          cofirmAndEdit={this.updateItems}
          type={general}
        >
          <GeneralEditForm project={this.props.project} />
        </EditFormModal>
      </Fragment>
    )
  }
}
const mapSateToProps = (state, props) => ({
  fetching: state.entities.projects._status.fetching,
  posting: state.entities.projects._status.posting,
  project: state.entities.projects.data.get(props.match.params.id),
  incomesAndExpenses: getFormValues('editExpenseIncome')(state),
  generalInfo: getFormValues('generalInfo')(state)
})
export default connect(
  mapSateToProps,
  { getSingleProject, updateIncomesAndExpenses }
)(SingleProjectComponent)
