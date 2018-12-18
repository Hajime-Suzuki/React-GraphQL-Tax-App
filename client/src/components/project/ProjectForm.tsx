import Button from '@material-ui/core/Button'
import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { RenderExpenseAndIncome } from '../../libs/forms/renderExpense'
import { StyledGridFormItem } from '../../styles/forms'
import { MainWrapper } from '../../styles/sharedStyles'
import ClientForm from './formConponents/ContactPersonForm.1'
import InvoiceForm from './formConponents/InvoiceInfoForm2'

const AddProjectForm: React.SFC<any> = props => {
  const { handleSubmit, handleChange } = props
  return (
    <form onSubmit={handleSubmit}>
      <StyledGridFormItem container justify="center">
        <InvoiceForm handleChange={handleChange} />
        <FieldArray name="expenses" component={RenderExpenseAndIncome} />
        <ClientForm handleChange={handleChange} />
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