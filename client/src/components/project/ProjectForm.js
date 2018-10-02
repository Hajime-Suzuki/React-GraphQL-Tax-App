import Button from '@material-ui/core/Button'
import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { renderExpenseAndIncome } from '../../libs/forms/renderExpense'
import { StyledGridFormItem } from '../../styles/forms'
import { MainWrapper } from '../../styles/sharedStyles'
import ContactPersonForm from './formConponents/ContactPersonForm'
import InvoiceForm from './formConponents/InvoiceInfoForm'

// TODO: render date correctly.
const AddProjectForm = props => {
  const { handleSubmit, handleChange } = props
  return (
    <form onSubmit={handleSubmit}>
      <StyledGridFormItem container justify="center">
        <InvoiceForm handleChange={handleChange} />
        <FieldArray name="expenses" component={renderExpenseAndIncome} />
        <ContactPersonForm handleChange={handleChange} />
      </StyledGridFormItem>
      <MainWrapper>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </MainWrapper>
    </form>
  )
}

export default reduxForm({ form: 'addProjectForm' })(AddProjectForm)
