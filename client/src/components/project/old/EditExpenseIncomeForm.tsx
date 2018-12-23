import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { RenderExpenseAndIncome } from '../../../libs/forms/renderExpense'

const EditExpenseIncomeForm: React.SFC<any> = props => {
  const { defaultValues, type } = props

  return (
    <FieldArray
      name={type}
      component={RenderExpenseAndIncome}
      defaultValues={defaultValues}
    />
  )
}

export default reduxForm({
  form: 'editExpenseIncome'
})(EditExpenseIncomeForm) as any
