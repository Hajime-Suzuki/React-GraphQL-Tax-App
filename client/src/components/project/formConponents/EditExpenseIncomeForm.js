import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { renderExpenseAndIncome } from '../../../libs/forms/renderExpense'

const EditExpenseIncomeForm = props => {
  const { defaultValues } = props

  return (
    <FieldArray
      name="incomes"
      component={renderExpenseAndIncome}
      defaultValues={defaultValues}
    />
  )
}

export default reduxForm({
  form: 'editExpenseIncome'
})(EditExpenseIncomeForm)
