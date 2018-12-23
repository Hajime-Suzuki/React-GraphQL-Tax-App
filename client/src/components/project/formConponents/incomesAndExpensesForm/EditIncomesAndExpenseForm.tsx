import * as React from 'react'
import {
  GetSingleProject,
  AddProjectInput,
  ExpenseAndIncomeInput
} from 'src/graphql/components/projects'
import { Formik, FormikProps } from 'formik'
import { IncomesAndExpenseFields } from '../../helper/IncomesAndExpenseFields'
import { StyledForm } from '../invoiceForm/InvoiceInfoForm'
import styled from 'styled-components'

interface Props {
  incomes?: ExpenseAndIncomeInput[]
  expenses?: ExpenseAndIncomeInput[]
  handleSubmit: () => void
}

const StyledForm2: any = styled(StyledForm)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

export const EditExpenseAndIncomeForm: React.SFC<Props> = ({
  incomes,
  expenses,
  handleSubmit
}) => {
  if (!incomes && !expenses) return null
  const type = !!incomes ? 'incomes' : 'expenses'

  return (
    <Formik
      initialValues={{ incomes, expenses }}
      onSubmit={handleSubmit}
      render={({ handleChange, values }: FormikProps<Partial<Props>>) => {
        return (
          <StyledForm2>
            <div className="form-section">
              <IncomesAndExpenseFields
                type={type}
                handleChange={handleChange}
                values={values}
              />
            </div>
          </StyledForm2>
        )
      }}
    />
  )
}
