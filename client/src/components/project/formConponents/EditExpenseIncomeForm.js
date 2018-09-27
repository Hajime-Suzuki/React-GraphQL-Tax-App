import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { renderTextField } from '../../../libs/forms/renderTextField'

const EditExpenseIncomeForm = props => {
  return <Field name="income" label="income" component={renderTextField} />
}

export default reduxForm({
  form: 'editExpenseIncome'
})(EditExpenseIncomeForm)
