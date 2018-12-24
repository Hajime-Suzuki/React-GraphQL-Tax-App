import * as React from 'react'
import {
  ExpenseAndIncomeInput,
  ProjectInput
} from 'src/graphql/components/projects'
import styled from 'styled-components'
import { IncomesAndExpenseFields } from '../../helper/IncomesAndExpenseFields'
import { StyledForm } from '../invoiceForm/InvoiceInfoForm'
import { SingleProjectChildProps } from '../../SingleProjectContainer'
import { Formik, FormikProps } from 'formik'
import EditFormModal from '../../modal/EditFormModal'

// price from server is String, while price for forms is number.
interface Props {
  incomes?: ExpenseAndIncomeInput[]
  expenses?: ExpenseAndIncomeInput[]
  handleSubmit: SingleProjectChildProps['handleSubmit']
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
}

const CustomStyledForm: any = styled(StyledForm)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

const EditExpenseAndIncomeForm: React.SFC<Props> = ({
  incomes,
  expenses,
  selectedModal,
  handleSubmit: updateProject,
  handleCloseModal
}) => {
  if (!incomes && !expenses) return null
  const type = !!incomes ? 'incomes' : 'expenses'

  return (
    <Formik
      initialValues={{ incomes, expenses }}
      validateOnChange={false}
      onSubmit={updateProject}
      render={({
        handleChange,
        values,
        handleSubmit
      }: FormikProps<ProjectInput>) => {
        return (
          <EditFormModal
            title="Edit Incomes"
            isOpen={selectedModal === type}
            handleCloseModal={handleCloseModal}
            handleConfirm={handleSubmit}
          >
            <CustomStyledForm>
              <div className="form-section">
                <IncomesAndExpenseFields
                  type={type}
                  handleChange={handleChange}
                  values={values}
                />
              </div>
            </CustomStyledForm>
          </EditFormModal>
        )
      }}
    />
  )
}

export default EditExpenseAndIncomeForm
