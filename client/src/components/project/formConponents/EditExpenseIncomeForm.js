import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { renderExpenseAndIncome } from '../../../libs/forms/renderExpense'

// TODO: add incomes form
const EditExpenseIncomeForm = props => {
  return <FieldArray name="incomes" component={renderExpenseAndIncome} />
}

export default reduxForm({
  form: 'editExpenseIncome'
})(EditExpenseIncomeForm)
