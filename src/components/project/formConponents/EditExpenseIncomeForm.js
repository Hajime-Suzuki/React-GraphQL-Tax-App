import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { renderExpenseAndIncome } from '../../../libs/forms/renderExpense'

const EditExpenseIncomeForm = props => {
  const { defaultValues, type } = props

  return (
    <FieldArray
      name={type}
      component={renderExpenseAndIncome}
      defaultValues={defaultValues}
    />
  )
}

export default reduxForm({
  form: 'editExpenseIncome'
})(EditExpenseIncomeForm)
